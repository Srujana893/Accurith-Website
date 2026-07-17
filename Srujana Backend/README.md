# Accurith Website

Marketing site for **Accurith Technologies Private Limited** (Bengaluru).
Cybersecurity, IS/IT audit, risk advisory and digital forensics.

Read `CLAUDE.md` first — it explains the architecture (static export +
Cloudflare Pages Functions) and the ownership boundaries between Varsha
(frontend) and Srujana (backend/security/infra).

---

## Local development

### Prerequisites

- Node.js ≥ 20 (tested on 25.8.1)
- npm ≥ 10

### Install

```bash
npm install
cp .env.example .env.local
cp .dev.vars.example .dev.vars
```

Then fill in the values in `.env.local` and `.dev.vars`. Neither file is
committed — both are in `.gitignore`.

### Two dev servers, two purposes

**1. Frontend hot-reload (Varsha, and Srujana editing lib/):**

```bash
npm run dev
```

Serves on http://localhost:3000 with hot reload. `/functions/` does NOT run
here — the `/api/contact` endpoint will 404. Any code in `/functions/` that
imports `worker-mailer` will throw when reached.

**2. Full stack over the Workers runtime (Srujana, testing /api/*):**

```bash
npm run build
npm run pages:dev
```

Serves on http://127.0.0.1:8788. Real Cloudflare Workers runtime. Reads
`.dev.vars`. `/api/contact` works here. No hot reload — re-run `npm run build`
after code changes.

### Optional one-time git hook setup

Husky lives in this subdirectory. To make it fire from this project only:

```bash
git config --local core.hooksPath "Srujana Backend/.husky"
```

Run this from the repo root. Skip it if the repo eventually collapses to a
single project directory (see CLAUDE.md §9).

---

## Testing the contact endpoint locally

With `npm run pages:dev` running:

```bash
# 1. Method not allowed (405)
curl -i http://127.0.0.1:8788/api/contact

# 2. Missing content-type (415)
curl -i -X POST http://127.0.0.1:8788/api/contact -d '{}'

# 3. Missing fields (400)
curl -i -X POST http://127.0.0.1:8788/api/contact \
  -H 'Content-Type: application/json' -d '{}'

# 4. Invalid email (400)
curl -i -X POST http://127.0.0.1:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"S","email":"bad","company":"C","role":"R","service":"X","message":"m"}'

# 5. Honeypot triggered (200, silently dropped)
curl -i -X POST http://127.0.0.1:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"S","email":"s@s.com","company":"C","role":"R","service":"X","message":"m","_hp":"bot"}'

# 6. Valid — will attempt real SMTP send. With .dev.vars pointing at a fake
#    host (SMTP_HOST=smtp.invalid) you get 502 "Could not send your message."
#    With real creds you get 200 and an email arrives at MAIL_TO.
curl -i -X POST http://127.0.0.1:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"test@example.com","company":"Acme","role":"CTO","service":"Cyber security","message":"Hello."}'
```

Expected success:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: no-store
{"success":true}
```

Expected failure (fake SMTP):

```
HTTP/1.1 502 Bad Gateway
Content-Type: application/json; charset=utf-8
{"success":false,"error":"Could not send your message. Please try again shortly."}
```

The real SMTP error is logged in the wrangler terminal — it never reaches the
client.

---

## Adding a blog post

1. Create `content/blog/<slug>.mdx`.
2. Frontmatter (all required unless noted):

```mdx
---
title: 'Your title here'
date: '2026-07-17'
author: 'Your Name'
tags: ['optional', 'tags']
excerpt: 'One sentence, ~160 chars, shown on the /resources/blog list.'
draft: false   # set to true to hide from the sitemap and list
---

Your MDX body. Standard Markdown plus any React components Varsha exposes.
```

3. `npm run build` — the sitemap regenerates automatically.

The pipeline (in `src/lib/blog.ts`) will throw at build time if any required
frontmatter field is missing. That's intentional — a broken post should fail
the build, not render `undefined`.

---

## Deploying

Cloudflare Pages, connected to GitHub. Every push to `main` triggers a
production build; every push to `staging` (or `feature/*`) triggers a
preview deploy.

**Build settings (Cloudflare dashboard):**

```
Framework preset:      Next.js (Static HTML Export)
Build command:         npm run build
Build output dir:      out
Root directory:        Srujana Backend        # while the repo has this subdir
Node version:          20
```

**Environment variables (Cloudflare dashboard → Settings → Environment):**

| Var | Value example | Mark as encrypted? |
|-----|---------------|---------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://accurith.com` | No |
| `SMTP_HOST` | `smtp.gmail.com` | No |
| `SMTP_PORT` | `465` | No |
| `SMTP_USER` | `hello@accurith.com` | No |
| `SMTP_PASS` | (app password) | **Yes** |
| `MAIL_TO` | `hello@accurith.com` | No |

Add them for both Production and Preview environments.

**Post-deploy checks (do these once after the first deploy):**

- `curl -I https://accurith.com/` — verify all six security headers present.
- `curl https://accurith.com/.well-known/security.txt` — should return the file as `text/plain`.
- `curl https://accurith.com/sitemap.xml` — should list all routes.
- Rich Results Test (search.google.com/test/rich-results) — Organization schema should be recognized.
- SSL Labs (ssllabs.com/ssltest/) — expected A+.
- securityheaders.com — expected A (see CLAUDE.md §7 on the A→A+ path).
- Mozilla Observatory (observatory.mozilla.org) — expected B+ (~80/100).

---

## Env var reference

See `.env.example` and `.dev.vars.example` for the annotated versions.
Quick summary:

- **`.env.local`** (build time, browser-visible if prefixed with `NEXT_PUBLIC_`):
  `NEXT_PUBLIC_SITE_URL`
- **`.dev.vars`** (runtime, Worker only, never sent to browser):
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`

`.env*` and `.dev.vars` are git-ignored. `.example` files are committed.

---

## Troubleshooting

**"cloudflare:sockets not found" during `npm run dev`.**
Expected. `npm run dev` uses Node; `worker-mailer` needs the Workers runtime.
Test the endpoint via `npm run pages:dev` instead.

**Build fails with "export const dynamic … not configured".**
Something in `src/app/` returned a dynamic route handler. Static export
requires every handler to declare `export const dynamic = 'force-static'`.
Both `sitemap.ts` and `robots.ts` already do this.

**Contact form returns 502 with a fake SMTP host.**
That is the expected failure path — the endpoint tried to open a socket to
`smtp.invalid` and failed. Point `.dev.vars` at real credentials to send.

**`npm run build` succeeds but `/out/` has no `_headers` file.**
`/out/_headers` is Cloudflare Pages' contract — it's copied from
`/public/_headers` by the build. If it's missing, check `/public/_headers`
was not accidentally moved or renamed.

**Wrangler complains about a "space" in the path.**
The repo currently has `Srujana Backend/` (with a space) as the working
directory. Wrangler handles it internally, but scripts that shell out to
other tools may not. If you hit this, either rename the directory (git mv)
or run commands with the path quoted: `cd "Srujana Backend"`.

---

## Where things live

```
├── content/blog/            Srujana — MDX posts
├── functions/api/           Srujana — Pages Functions (server code)
├── public/
│   ├── _headers             Srujana — security headers
│   ├── .well-known/         Srujana — security.txt
│   ├── images/              Varsha — brand assets
│   └── icons/               Varsha — brand assets
├── src/
│   ├── app/
│   │   ├── layout.tsx       Shared (Srujana: metadata; Varsha: JSX shell)
│   │   ├── globals.css      Varsha — Tailwind v4 tokens
│   │   ├── page.tsx         Varsha — all pages
│   │   ├── sitemap.ts       Srujana
│   │   └── robots.ts        Srujana
│   ├── components/          Varsha — all React UI
│   └── lib/                 Srujana — metadata.ts, blog.ts, mail.ts
├── .env.example             Srujana — committed template
├── .dev.vars.example        Srujana — committed template
├── next.config.ts           Srujana — static export config
├── wrangler.toml            Srujana — Pages/Workers config
├── CLAUDE.md                Read first
└── TASKS.md                 S01–S30 tracker
```
