// /api/contact — Cloudflare Pages Function. Runs on the Workers runtime (V8
// isolate), NOT Node. Accepts the "Book a Consultation" form submission,
// validates it, and sends it as email via SMTP using worker-mailer.
//
// Contract (agreed with Varsha, J01):
//   POST /api/contact
//   Content-Type: application/json
//   Body: { name, email, company, role, service, message, _hp? }
//   Response 200: { success: true }
//   Response 4xx/5xx: { success: false, error: "<generic message>" }
//
// Never leaks internal errors to the client. SMTP failures, validation
// internals, and stack traces log server-side (visible in `wrangler tail` or
// the Cloudflare dashboard's function logs) and the client only sees a generic
// message. This is deliberate: leaking "SMTP auth failed: bad password" tells
// an attacker they hit a real endpoint with real credentials behind it.

import { WorkerMailer } from 'worker-mailer';

// Environment bindings — see .dev.vars.example (local) and Cloudflare Pages
// dashboard → Settings → Environment variables (production).
interface Env {
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SMTP_PASS: string;
  MAIL_TO: string;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  role?: unknown;
  service?: unknown;
  message?: unknown;
  // Honeypot — a hidden form field a human never sees or fills. Bots that
  // blindly fill every input will trip this. See handler below.
  _hp?: unknown;
}

// Hard cap on request body. Rejects laughably-large payloads before we even
// attempt to parse JSON. 32 KB is ~4x the biggest legitimate submission.
const MAX_BODY_BYTES = 32 * 1024;

// Message length cap per the brief. Names/emails/etc. are capped separately
// below to prevent header-injection-shaped abuse of the SMTP envelope.
const MAX_MESSAGE_LEN = 5000;
const MAX_SHORT_FIELD_LEN = 200;

// RFC 5322 is too permissive for a form; this is the pragmatic "does this
// look like something we could send an email to" pattern.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Blocks CR/LF in short fields — these are what SMTP header-injection payloads
// use to smuggle extra headers into the outgoing mail.
const CRLF_RE = /[\r\n]/;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Belt-and-braces: the function response itself denies caching, so a
      // proxy can't accidentally serve someone else's response.
      'Cache-Control': 'no-store',
    },
  });
}

function fail(status: number, error: string): Response {
  return jsonResponse({ success: false, error }, status);
}

// Ensures a field is a non-empty string within the length cap and contains no
// CR/LF injection characters. Returns the trimmed value, or null on failure.
function asShortString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (v.length === 0 || v.length > MAX_SHORT_FIELD_LEN) return null;
  if (CRLF_RE.test(v)) return null;
  return v;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Reject anything that doesn't look like JSON up front. Browsers submitting
  // this form always send application/json; anything else is either a bot or
  // a misconfigured client.
  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return fail(415, 'Unsupported content type.');
  }

  // Reject over-sized bodies before spending CPU on JSON parsing. The
  // Content-Length header is untrusted (a client can lie), but if it IS
  // present and huge, refuse fast.
  const declaredLen = Number(request.headers.get('content-length') ?? '0');
  if (declaredLen > MAX_BODY_BYTES) {
    return fail(413, 'Payload too large.');
  }

  // Read the body as text, enforcing the cap even if Content-Length was
  // absent or lied. Anything over the cap gets a 413.
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, 'Payload too large.');
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(raw) as ContactPayload;
  } catch {
    return fail(400, 'Invalid JSON.');
  }

  // Honeypot check. A legitimate submission always leaves _hp empty (the
  // field is hidden with CSS/aria-hidden by Varsha's form component). A bot
  // that fills every input trips this. We return success so the bot logs
  // "OK" and moves on — no reason to teach it what tripped the trap.
  if (typeof payload._hp === 'string' && payload._hp.trim().length > 0) {
    console.log('contact: honeypot triggered, silently dropping');
    return jsonResponse({ success: true }, 200);
  }

  // Field validation. All required. Short fields have length + CRLF caps;
  // message has a longer cap but the same non-empty check.
  const name = asShortString(payload.name);
  const email = asShortString(payload.email);
  const company = asShortString(payload.company);
  const role = asShortString(payload.role);
  const service = asShortString(payload.service);
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name || !email || !company || !role || !service) {
    return fail(400, 'Please fill in all required fields.');
  }
  if (!EMAIL_RE.test(email)) {
    return fail(400, 'Please provide a valid email address.');
  }
  if (message.length === 0 || message.length > MAX_MESSAGE_LEN) {
    return fail(400, `Message must be between 1 and ${MAX_MESSAGE_LEN} characters.`);
  }

  // Env sanity. If SMTP isn't configured we want a clean server-side error,
  // not a cryptic worker-mailer stack.
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_USER || !env.SMTP_PASS || !env.MAIL_TO) {
    console.error('contact: SMTP env not configured');
    return fail(500, 'Mail service is temporarily unavailable.');
  }

  const port = Number(env.SMTP_PORT);
  if (!Number.isFinite(port) || port <= 0) {
    console.error('contact: invalid SMTP_PORT', env.SMTP_PORT);
    return fail(500, 'Mail service is temporarily unavailable.');
  }

  const subject = `New enquiry — ${company} (${service})`;
  const textBody = [
    `New enquiry from accurith.com`,
    ``,
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company}`,
    `Role:    ${role}`,
    `Service: ${service}`,
    ``,
    `Message:`,
    message,
  ].join('\n');

  const htmlBody = `
<!doctype html>
<html><body style="font-family:system-ui,sans-serif;color:#1B2A4A;line-height:1.5;">
  <h2 style="color:#0E9E82;margin:0 0 12px;">New enquiry from accurith.com</h2>
  <table cellpadding="4" style="border-collapse:collapse;">
    <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
    <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
    <tr><td><b>Company</b></td><td>${escapeHtml(company)}</td></tr>
    <tr><td><b>Role</b></td><td>${escapeHtml(role)}</td></tr>
    <tr><td><b>Service</b></td><td>${escapeHtml(service)}</td></tr>
  </table>
  <h3 style="margin:16px 0 4px;">Message</h3>
  <pre style="white-space:pre-wrap;font-family:inherit;background:#f5f7fa;padding:12px;border-radius:6px;">${escapeHtml(message)}</pre>
</body></html>`.trim();

  try {
    // 465 = implicit TLS. 587 = STARTTLS. worker-mailer picks the right dance
    // based on `secure` + `startTls`. Port 25 is blocked by Cloudflare outbound
    // and is not a supported option here.
    const mailer = await WorkerMailer.connect({
      host: env.SMTP_HOST,
      port,
      secure: port === 465,
      startTls: port !== 465,
      credentials: { username: env.SMTP_USER, password: env.SMTP_PASS },
      authType: ['plain', 'login'],
      socketTimeoutMs: 10_000,
      responseTimeoutMs: 10_000,
    });

    await mailer.send({
      from: { name: 'Accurith Website', email: env.SMTP_USER },
      to: { email: env.MAIL_TO },
      // reply-to = enquirer so Srujana can just hit Reply from the inbox and
      // it goes to the human, not to the SMTP mailbox.
      reply: { name, email },
      subject,
      text: textBody,
      html: htmlBody,
    });

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    // Log real error server-side so we can debug; return generic to client.
    console.error('contact: mail send failed', err);
    return fail(502, 'Could not send your message. Please try again shortly.');
  }
};

// Any non-POST method — 405 with an Allow header per RFC 7231.
export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === 'POST') {
    // Should never reach here — onRequestPost handles POST — but keep as
    // defense-in-depth in case of routing changes.
    return fail(500, 'Routing error.');
  }
  return new Response(JSON.stringify({ success: false, error: 'Method not allowed.' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Allow: 'POST',
    },
  });
};
