# Greenlight Debt Relief — website redesign

A modernized, production-ready redesign of [greenlightdebtrelief.com](https://greenlightdebtrelief.com/):
same company, same services, same contact details — with a premium, highly
readable (60+ friendly) and accessible experience.

## 🔒 Search visibility is intentionally DISABLED

SEO, AEO and GEO are out of scope for this phase. While
`NEXT_PUBLIC_ENABLE_INDEXING` is unset (the default):

| Control | Behaviour (verified) |
| --- | --- |
| `X-Robots-Tag` header | `noindex, nofollow, noarchive, nosnippet, noimageindex` on **every** response (pages, images, API) — the primary control |
| `<meta name="robots">` | `noindex, nofollow` on every page |
| `robots.txt` | `User-Agent: *` / `Disallow: /`, no sitemap listed |
| `/sitemap.xml` | 404 |
| Canonical links | not emitted |
| JSON-LD structured data | not emitted |

`robots.txt` alone does not prevent indexing — the noindex header is what does.
The strongest protection for a pre-launch deployment is a password: set
`SITE_BASIC_AUTH="username:password"` (see `src/proxy.ts`), or use your host's
deployment protection.

> ⚠️ **Do not deploy this configuration on the live greenlightdebtrelief.com
> domain.** A noindex site on the production domain will remove the existing
> Greenlight pages from Google and Bing. Deploy it on a staging/preview URL
> until launch, then enable indexing as part of going live.

**To "Enable SEO" later:** set `NEXT_PUBLIC_ENABLE_INDEXING=true` and rebuild.
That restores indexable robots.txt, the sitemap, canonical URLs and structured
data — no code changes needed (verified). Keyword/metadata optimization,
structured-data expansion and SEO/AEO/GEO content are deliberately not done yet.

## ⚠️ Assets and facts to supply before launch

The build environment's network policy blocked greenlightdebtrelief.com,
YouTube and the Wayback Machine, so the items below could not be retrieved.
Nothing was invented in their place.

| Item | Status | Where it goes |
| --- | --- | --- |
| Official Greenlight logo | ✅ **Integrated** (supplied PNG, 382 × 235, transparent) — header, footer, social images | `public/brand/README.md` |
| Favicon from the logo | ✅ **Integrated** — lightbulb mark isolated from the logo | `src/app/icon.png`, `src/app/apple-icon.png` |
| Proof 1–4 ("Still not convinced? See the results for yourself.") | **Missing** — labelled placeholders in dev; section hidden in production | `public/proof/README.md` |
| Brand colours | ✅ **Measured from the logo** — green #378108, deep green #1D5505, charcoal #222222, orange #E14002 (logo only) | `src/app/globals.css` |
| YouTube video `92CTw_kb6x8` | **Embedded** (click-to-play, privacy-enhanced). Thumbnail/title not verified from here. | `src/lib/site-config.ts` |
| Live site copy | Written from the brief and marked `CONTENT_REQUIRES_VERIFICATION`; "Top Rated" and "since 1998" need substantiation | `docs/content-verification.md` |

Note: an S3-hosted page titled "Greenlight Debt Validation" (for
`greenlightsdebtrelief.com`, with an "s") was reachable, but it lists a
different address and a "cancels debts in 6 months or less guaranteed" claim.
It was treated as **not** your site and nothing from it was used.

### Exact files to supply

| Asset | Save as | Then |
| --- | --- | --- |
| Optional: SVG or larger PNG of the logo, and a reversed (light-on-dark) version | `public/brand/greenlight-logo.svg` | Update `logo` in `src/lib/site-config.ts` |
| Proof 1 | `public/proof/proof-1.jpg` | Set `image` in `src/lib/content/proof.ts` |
| Proof 2 | `public/proof/proof-2.jpg` | 〃 |
| Proof 3 | `public/proof/proof-3.jpg` | 〃 |
| Proof 4 | `public/proof/proof-4.jpg` | 〃 |

## Owner checklist

**Confirm in `src/lib/site-config.ts`** (values marked `VERIFY`)

- [ ] Phone `+1 (877) 870-0717` and email `info@greenlightdebtrelief.com` match the live site.
- [ ] `legalName`, `address`, `hours` — add if you want them shown (currently hidden).
- [ ] `foundingYear` — add only if verifiable (enables "serving clients since …" on About).
- [ ] `isLawFirm: false`, `consultationIsFree: true` — must reflect reality.

**Confirm these descriptions are accurate** (edit copy if not)

- [ ] Qualifying debts: credit card debt, unsecured loans, other qualifying unsecured debt.
- [ ] Process: free consultation → review your situation → explore your options → you decide.
- [ ] Referral model: information may be shared with Greenlight's debt-relief partners (`sharesInformationWithPartners`).
- [ ] "Top Rated" and "since 1998" can be substantiated.
- [ ] You never ask for SSNs, full account numbers or bank passwords through the website.
- [ ] Your text-message practice matches the optional SMS consent wording.

**Legal review** — have counsel review the Disclaimer & Disclosures, Privacy
Policy, Terms, the form consent language (TCPA and partner sharing), and state
debt-relief licensing for the states you serve.

**Environment** — see `.env.example`

- [ ] `NEXT_PUBLIC_SITE_URL` (defaults to `https://greenlightdebtrelief.com`).
- [ ] Keep `NEXT_PUBLIC_ENABLE_INDEXING` unset during this phase; consider `SITE_BASIC_AUTH` on staging.
- [ ] `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_SECRET`) — consultation requests and contact messages are POSTed here as JSON. In production, forms refuse submissions with a friendly message until this is set, so no lead is silently lost.

## Site purpose and structure

A **customer-facing referral / consultation website** for Greenlight Debt
Relief — focused on trust, a simple explanation of what Greenlight can help
with, and getting the visitor to request a free consultation or call. It is not
an educational resource: debt-relief education, legal/tax explanations and
government-resource content have been removed.

**Navigation:** Home · About · How It Works · FAQs · Contact · **Get Free Consultation**

**Homepage:** hero → benefits (More Savings, Dedicated Account Managers, Live
Online Access, Top Rated) → what we can help with → how it works (4 steps) →
official video → why Greenlight + about → proof (hidden until real assets) →
6 short FAQs → contact CTA.

**Pages:** `/` · `/about` · `/how-it-works` · `/faq` · `/contact` ·
`/free-consultation` · `/privacy` · `/terms` · `/disclaimer`. Removed pages
(`/debt-relief`, `/debt-validation`, `/resources/*`) redirect to `/`.

**Copy rules:** no guarantees of settlement, savings, lower payments or
becoming debt-free; the customer always decides whether to move forward.
Unverified claims ("Top Rated", "since 1998") are listed in
`docs/content-verification.md`.

## Tech stack & commands

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS 4 · React Three
Fiber + drei + Three.js (hero only, lazy-loaded) · React Hook Form + Zod ·
Vitest · Playwright + axe-core.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm test             # unit tests
npx playwright test  # E2E + accessibility (run `npm run build` first)
```

## Key design decisions

- **Readability first:** Inter (self-hosted), 18px body text, high-contrast
  tokens (all text ≥ WCAG AA), 48–56px targets, visible labels, strong focus ring.
- **3D that never gets in the way:** loads only on ≥768px screens with
  hardware WebGL, after the page is idle; phones, low-end devices, software
  WebGL and slow frame rates get a matching static illustration; static under
  `prefers-reduced-motion`. Append `?force3d` to preview it on a GPU-less machine.
- **Form UX for seniors:** progress indicator, large radio cards, an error
  summary linking to each field, errors re-checked while typing (never on blur,
  which would shift the layout as the visitor clicks Continue), a check-and-edit
  step, plain consent language. Server-side validation, honeypot and per-IP
  rate limiting (`FORM_RATE_LIMIT`).
- **Privacy-safe analytics:** `track()` pushes allow-listed, PII-stripped events
  to `window.dataLayer`; no vendor is loaded.
- **SEO architecture (dormant):** page registry, metadata helpers, sitemap and
  JSON-LD builders remain in `src/lib/seo/` but are switched off by
  `src/lib/seo/indexing.ts`. Only basic titles and social-share images are active.

## QA status

- Lint, typecheck, unit tests and production build pass.
- 72 Playwright tests pass on desktop and mobile, including axe WCAG 2.2 AA
  scans of all 9 pages (0 violations), noindex header + meta on every page,
  robots.txt `Disallow: /`, sitemap 404, the consultation flow, redirect, video
  click-to-play, real contact details, keyboard access, mobile menu, reduced
  motion, redirects for removed pages, a check that no educational/legal terms
  appear on marketing pages, and that proof placeholders never reach production.
- Lighthouse (local production build): Performance 98–100 and Accessibility 100
  on mobile and desktop for `/`, `/free-consultation` and `/debt-relief`, CLS 0.
  (Lighthouse's SEO score is now expected to fail because of noindex.)
  The test machine has no GPU, so desktop scores reflect the static hero illustration.
