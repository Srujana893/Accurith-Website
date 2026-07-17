# TASKS — Srujana track (S01–S30)

Status legend: ✅ done · 🟡 in progress · ⬜ pending · ⚫ blocked (see notes)

## Monday — Setup

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S01 | P0 | GitHub repo + branch protection (main, staging, feat/*) | ⚫ | Requires Accurith GitHub org access — client action |
| S02 | P0 | Next.js 16 scaffold, TS, ESLint, Tailwind v4, App Router, src/, `@/*`, `output: 'export'`, `images.unoptimized`, `/out` verified | ✅ | |
| S03 | P0 | ESLint + Prettier + Husky + lint-staged | ✅ | `.husky/pre-commit` created; devs must run `git config core.hooksPath ".husky"` locally once (see README) |
| S04 | P0 | Security headers in `public/_headers` (HSTS, CSP, XFO, XCTO, Referrer, Permissions, COOP) | ✅ | See CLAUDE.md §7 for grade honesty |
| S05 | P1 | Cloudflare Pages project + custom domain | ⚫ | Requires Cloudflare + DNS access — Srujana dashboard action |
| S06 | P1 | `security.txt` at `/.well-known/` (RFC 9116) | ✅ | Expires 2027-07-17 |
| S07 | P0 | `.env.example` + `.dev.vars.example`, all vars commented, `.gitignore` covers | ✅ | |

## Tuesday — Backend + SEO

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S08 | P0 | `functions/api/contact.ts` — POST, validate, worker-mailer, honeypot, generic errors | ✅ | Rate limit via Cloudflare WAF — not in code, see CLAUDE.md §5 |
| S09 | P1 | Consent-mode cookie banner scaffolding | ⬜ | Blocked on Varsha's UI component |
| S10 | P1 | Plausible or Umami analytics loader (post-consent) | ⬜ | Analytics account not yet created — Srujana action |
| S11 | P0 | MDX pipeline: `next-mdx-remote` + `gray-matter`, `src/lib/blog.ts` | ✅ | |
| S12 | P0 | Sample MDX post with real frontmatter | ✅ | `content/blog/why-your-site-headers-are-your-first-security-signal.mdx` |
| S13 | P0 | `src/lib/metadata.ts` — `createMetadata()` helper | ✅ | |
| S14 | P0 | Organization JSON-LD in root layout + `sitemap.ts` + `robots.ts` | ✅ | Bengaluru address baked in |

## Wednesday — Wiring

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S15 | P1 | Wire contact form to `/api/contact` | ⬜ | Blocked on Varsha's `<ContactForm>` |
| S16 | P1 | Add `createMetadata()` call to every page | ⬜ | Blocked on Varsha's page.tsx files |
| S17 | P2 | Wire `getAllPosts()` into `/resources/blog` | ⬜ | Blocked on Varsha's `BlogCard`, `BlogPostLayout` |
| S18 | P2 | Trust & Security page copy (technical sections) | ⬜ | |

## Thursday — Legal + polish

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S19 | P1 | Legal page drafts (Privacy, Terms, Cookies, DPA) — "pending counsel review" banner | ⬜ | |
| S20 | P2 | Report-a-vulnerability page copy | ⬜ | |
| S21 | P2 | 404 page copy (pass to Varsha for layout) | ⬜ | |

## Friday — Ship prep

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S22 | P0 | Cloudflare WAF rate-limit rule on `/api/contact` | ⚫ | Requires production Cloudflare Pages project — dashboard action |
| S23 | P0 | Production env vars in Cloudflare dashboard (SMTP_*, MAIL_TO, NEXT_PUBLIC_SITE_URL) | ⚫ | Requires the SMTP mailbox to be chosen — client / Srujana action |
| S24 | P0 | Final security scan pass (SSL Labs / securityheaders / Observatory) | ⬜ | Run after DNS is live |
| S25 | P1 | Verify `security.txt` accessible on production | ⬜ | Post-deploy check |
| S26 | P1 | Verify sitemap submitted to Search Console | ⬜ | Post-DNS |
| S27 | P2 | Verify Organization JSON-LD in Rich Results Test | ⬜ | Post-deploy |

## Saturday — Launch

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S28 | P0 | Merge to main, tag release | ⬜ | |
| S29 | P0 | Prod smoke test: contact form end-to-end | ⬜ | |

## Sunday — Handover

| ID  | Priority | Task | Status | Notes |
|-----|----------|------|--------|-------|
| S30 | P1 | Runbook + handover doc | ⬜ | |

---

## Blocked-on-Varsha inventory

Anything Srujana can't finish because it needs a component or a page that
Varsha owns. Flag these in the daily 10-min standup.

- S15: `<ContactForm>` component that POSTs to `/api/contact` with the honeypot
       field `_hp` hidden via CSS/aria-hidden.
- S16: Page files that import and call `createMetadata()` from `@/lib/metadata`.
- S17: `<BlogCard>` (list view) and `<BlogPostLayout>` (post view) components,
       plus `/src/app/resources/blog/page.tsx` and
       `/src/app/resources/blog/[slug]/page.tsx` route files.

## Blocked-on-client-or-dashboard inventory

Things Srujana cannot finish from the laptop alone.

- S01: GitHub Accurith org access + repo creation.
- S05: Cloudflare Pages project + DNS at the registrar.
- S22: WAF rate-limit rule (needs the production project to exist).
- S23: SMTP mailbox choice + app password + populating Cloudflare env vars.
- Leadership bios/credentials, service copy, brand asset confirmation.
