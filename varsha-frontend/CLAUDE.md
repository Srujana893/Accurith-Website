# CLAUDE.md — SUPERSEDED (legacy folder)

> **⚠️ THIS FOLDER IS LEGACY. Do not build here.**
> On 2026-07-18 the frontend in this folder was merged into **`Srujana Backend/`**,
> which is now the single canonical app. The authoritative project knowledge is
> **`Srujana Backend/CLAUDE.md`** — read that instead of this file.
> This folder is kept temporarily as a reference/backup and will be deleted
> after the team reviews the merged app.

---

## What changed (architecture pivot, confirmed by both developers)

The original plan described in this file — **static export, Cloudflare Pages
Functions, Zoho CRM, no database** — is dead. The confirmed architecture is:

| Layer     | Now                                                                |
| --------- | ------------------------------------------------------------------ |
| Hosting   | **Railway** (Node runtime), Cloudflare in front (DNS/CDN/WAF/TLS)  |
| App       | Next.js 16, App Router, TypeScript, **`output: 'standalone'`**     |
| Styling   | **Tailwind v4, CSS-first** — tokens in `src/app/globals.css` `@theme`; there is **no `tailwind.config.ts`** |
| DB        | **PostgreSQL on Railway + Prisma** (Consultation, JobOpening, JobApplication) |
| Forms     | Real API routes: `POST /api/consultation`, `POST /api/careers/apply`, `GET /api/careers/openings` — every submission writes to Postgres AND emails an alert (nodemailer → SMTP) |
| Security  | Per-request **CSP nonce** via `src/middleware.ts` + five static headers in `next.config.ts` |
| Blog      | MDX files in `/content/blog/` via `src/lib/blog.ts`, rendered at `/resources/blog` |

## What was merged from here into `Srujana Backend/`

- All 21 page routes, the full component library (`src/components/`), the
  design system (migrated from `tailwind.config.ts` v3 tokens to Tailwind v4
  `@theme`), the brand logo system, fonts, and public assets.
- The contact form now posts to the real `/api/consultation` (with honeypot);
  `/careers` lists openings from the API with a working application form;
  the blog renders real MDX posts.
- Route changes vs. this folder: careers moved `/about/careers` → `/careers`;
  blog moved `/resources` (hardcoded) → `/resources/blog` (MDX pipeline).
- Still mocked in the merged app: the Products **early-access form**
  (`src/mocks/earlyAccess.ts`) — no backend endpoint exists yet (Srujana's
  call whether it becomes an API route or folds into consultation).

## Still true (unchanged principles)

The honest-framing copy rules, the trust-first design strategy, the three
signature design elements, the credential-first identity, WCAG 2.1 AA, and
the "no fake content" rules all carry over unchanged — they are restated in
the canonical CLAUDE.md's never-do list.
