# CLAUDE.md — Accurith Website (Srujana Backend)

Read this before editing anything. It supersedes any older CLAUDE.md in the
tree — the earlier version was written before development started and named
Zoho CRM as the mail path; the actual implementation is SMTP over Cloudflare
Workers via `worker-mailer`.

---

## 1. The one constraint that shapes everything

**Next.js static export → Cloudflare Pages, with Pages Functions for server code.**

- `next.config.ts` sets `output: 'export'` and `images: { unoptimized: true }`.
- `next build` produces `/out/`. Cloudflare Pages serves it as static files.
- **No Next.js API routes at runtime.** Anything server-side lives in
  `/functions/` as Cloudflare Pages Functions (Workers runtime, V8 isolate,
  NOT Node.js).
- Node-only APIs will appear to work under `npm run dev` and fail in
  production. If a package needs `net`, `fs`, `child_process`, or nodemailer's
  SMTP transport at runtime, it does not belong in `/functions/`.

**Security headers live in `/public/_headers`.** Cloudflare Pages reads that
file at deploy time. `headers()` in `next.config.ts` does nothing under static
export — don't put security headers there.

---

## 2. Ownership boundaries — do not cross

### Srujana owns (edit these):

| Path | Purpose |
|------|---------|
| `/functions/` | All Cloudflare Pages Functions (the real API) |
| `/src/lib/` | `mail.ts`, `metadata.ts`, `blog.ts` — build-time helpers |
| `/content/blog/` | MDX posts |
| `/public/.well-known/` | `security.txt` |
| `/public/_headers` | Security headers (NOT `next.config.ts`) |
| `next.config.ts` | Static-export config only |
| `/src/app/layout.tsx` | The `metadata` export + JSON-LD injection (see §3 caveat) |
| `.env.example`, `.dev.vars.example`, `wrangler.toml` | Config templates |
| `src/app/sitemap.ts`, `src/app/robots.ts` | SEO build artifacts |

### Varsha owns (stop and ask):

| Path | Purpose |
|------|---------|
| `/src/components/` | All React UI |
| `/src/app/globals.css` | Tailwind v4 design tokens |
| `/public/images/`, `/public/icons/` | Brand assets |
| `/src/app/**/page.tsx` | All page visuals |

**Tailwind v4 note:** there is NO `tailwind.config.ts`. Tokens live in
`globals.css` via `@theme inline { ... }`. Do not create a Tailwind config file.

### The layout.tsx caveat

The brief says Srujana owns "the metadata export ONLY — never the visual JSX"
in `layout.tsx`. The JSON-LD injection had to touch the JSX (there is no
metadata-only escape hatch for JSON-LD in Next.js App Router). The single
`<script type="application/ld+json">` tag inside `<body>` is Srujana's; the
`<html>` / `<body>` shell and any font wiring is Varsha's. Data lives in
`src/lib/metadata.ts` — Varsha never has to touch it.

---

## 3. Architecture

```
                             ┌──────────────────────────────────────────────┐
Browser ──── GET / ────────► │ Cloudflare Pages CDN (serves /out/)          │
                             │  + /public/_headers → six security headers   │
Browser ── POST /api/contact │  + /public/.well-known/security.txt          │
        │                    └──────────────────────────────────────────────┘
        │                                    │
        │                                    ▼ /api/* route → Pages Function
        │                    ┌──────────────────────────────────────────────┐
        └───────────────────►│ /functions/api/contact.ts (V8 isolate)       │
                             │  - validate + honeypot + size cap            │
                             │  - worker-mailer → cloudflare:sockets        │
                             │  - SMTP over TLS on 587 (STARTTLS) or 465    │
                             └──────────────────────────────────────────────┘
                                            │
                                            ▼
                             ┌──────────────────────────────────────────────┐
                             │ Provider-agnostic SMTP (Gmail / SES / Zoho…) │
                             │ Configured only via env vars in the CF dash  │
                             └──────────────────────────────────────────────┘
```

**No database. No CMS.** Blog posts are MDX files in `/content/blog/`.
Enquiries are email — MAIL_TO is a shared inbox.

---

## 4. Never-do list

1. **Never** put security headers in `next.config.ts`. Static export ignores
   them. Use `/public/_headers`.
2. **Never** use nodemailer's SMTP transport in `/functions/`. It cannot open
   sockets on Workers. Use `worker-mailer`.
3. **Never** use port 25 for SMTP. Cloudflare Workers block outbound port 25.
   Use 587 (STARTTLS) or 465 (implicit TLS).
4. **Never** hardcode an SMTP provider hostname in code. Config comes from
   `SMTP_HOST` env var so the provider can be swapped by editing the dashboard.
5. **Never** put `NEXT_PUBLIC_` on a secret. That prefix inlines the value into
   the browser bundle. SMTP credentials must not carry it.
6. **Never** put the SMTP host in CSP `connect-src`. CSP governs the browser;
   the SMTP connection happens inside the Worker, invisible to the browser.
7. **Never** loosen a security header silently. If Next.js breaks under a
   strict CSP, add `'unsafe-inline'` to `style-src` (accepted trade-off) but
   flag any script-src change explicitly.
8. **Never** claim a certification Accurith doesn't hold. "We align to" or
   "we help clients achieve" — never "we are certified". Frameworks are text
   chips, never badge images.
9. **Never** create `tailwind.config.ts`. Tailwind v4 uses CSS-first config.
10. **Never** edit Varsha's files. Stop and describe what you needed instead.

---

## 5. Rate limiting — the honest answer

We do not implement in-Worker rate limiting because:

- Each Pages Function invocation runs in a fresh isolate. In-memory counters
  do not persist across invocations, and there is no cross-isolate shared
  memory. Any counter you write will silently under-count and give false
  security.
- KV works but adds ~50 ms latency per request and eventual consistency means
  a determined attacker can burst past any threshold before propagation.
- Durable Objects work correctly (strong consistency) but cost money and are
  overkill for a form expecting ~5 enquiries/week.

**The right answer for us is a Cloudflare WAF Rate Limiting Rule at the edge**,
configured in the dashboard once the domain is live:

- Dashboard → Security → WAF → Rate limiting rules → Create rule
- Match: `http.request.uri.path eq "/api/contact"` AND `http.request.method eq "POST"`
- Threshold: 5 requests per IP per 60 seconds → Block for 10 minutes
- Free plan allows one rate-limiting rule; that's enough.

The honeypot (`_hp` field) in `functions/api/contact.ts` handles automated
bot spam. Real DDoS or credential-stuffing-shaped abuse hits the WAF layer
before it reaches the Worker.

---

## 6. Local dev — the trap

`npm run dev` is Next.js dev in Node. `/functions/` doesn't run there and
`cloudflare:sockets` doesn't exist there. `worker-mailer` will throw if
imported. Two commands you actually need:

```bash
# Varsha's flow (unchanged):
npm run dev                    # Next.js dev server on :3000, hot reload

# Srujana's flow (to test /functions/):
npm run build && npm run pages:dev
# → wrangler pages dev out --compatibility-date=2024-09-23 \
#     --compatibility-flag=nodejs_compat  on :8788
```

Wrangler reads `.dev.vars` for env vars (git-ignored). Production reads from
the Cloudflare Pages dashboard → Settings → Environment variables.

**Compatibility settings verified working with worker-mailer 1.2.1:**
`compatibility_date = "2024-09-23"`, `compatibility_flags = ["nodejs_compat"]`.
Set in `wrangler.toml`. Do not change without re-running the curl test.

---

## 7. CSP grade — the honest ceiling

The current CSP includes `'unsafe-inline'` in `script-src` because Next.js
App Router emits inline hydration scripts. Consequence:

| Scanner | Current grade | Ceiling as configured |
|---------|--------------|------------------------|
| securityheaders.com | A | A+ (green across the board — they don't dock for unsafe-inline) |
| Mozilla Observatory | B+ (~80/100) | B+ — Observatory deducts 20 points for unsafe-inline in script-src |
| SSL Labs | A+ | A+ (TLS handled by Cloudflare, not us) |

To reach A+ on Observatory: implement per-request script nonces via a
Cloudflare Worker middleware that rewrites the HTML before it leaves the
edge, OR pre-compute hashes of every inline script Next.js emits and pin
those in the CSP. Either is 1–2 days of work plus test coverage. Deferred
until we have client sign-off that the grade matters more than the effort.

---

## 8. Contact API contract (J01)

`POST /api/contact` with `Content-Type: application/json`.

```jsonc
// Request body
{
  "name": "string, 1-200 chars, no CR/LF",
  "email": "string, valid email",
  "company": "string, 1-200 chars",
  "role": "string, 1-200 chars",
  "service": "string, 1-200 chars",
  "message": "string, 1-5000 chars",
  "_hp": ""    // honeypot — MUST be empty; hidden field in Varsha's form
}

// Response 200
{ "success": true }

// Response 4xx / 5xx
{ "success": false, "error": "<generic client-safe message>" }
```

Status codes: 200 OK, 400 Bad Request, 405 Method Not Allowed, 413 Payload
Too Large, 415 Unsupported Media Type, 500 Server config error, 502 Mail
send failed.

Never displays raw SMTP or stack errors to the client. Everything logs
server-side (visible via `wrangler tail` locally or the Cloudflare dashboard's
function logs in production).

---

## 9. Two-directory reality check

Right now the repo has two sibling Next.js scaffolds:

- `Srujana Backend/` — this project (Srujana's ownership, contains functions/)
- `varsha-frontend/` — Varsha's scaffold on branch `feature/varsha-frontend`

Cloudflare Pages Functions must sit next to the built `/out/`, so eventually
these must merge into ONE project. Suggested merge direction: Varsha's
components + pages fold INTO this project (which already has the functions/,
_headers, security.txt, wrangler.toml, MDX pipeline). That merge is not done
yet — flag it before either developer starts deep dependency work that will
be re-done post-merge.
