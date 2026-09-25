# Greenlight Debt Relief — website redesign

A modernized, production-ready redesign of [greenlightdebtrelief.com](https://greenlightdebtrelief.com/):
same company, same services, same contact details — with a premium, highly
readable (60+ friendly), accessible and search-optimized experience.

## ⚠️ Assets and facts to supply before launch

The build environment's network policy blocked greenlightdebtrelief.com,
YouTube and the Wayback Machine, so the items below could not be retrieved.
Nothing was invented in their place.

| Item | Status | Where it goes |
| --- | --- | --- |
| Official Greenlight logo | **Missing** — company name shown as text | `public/brand/README.md` |
| Favicon from the logo | **Missing** — transparent placeholder | `public/brand/README.md` |
| Proof 1–4 ("Still not convinced? See the results for yourself.") | **Missing** — labelled placeholders in dev; section hidden in production | `public/proof/README.md` |
| Exact brand colors | Approximated with an accessible green | `src/app/globals.css` (`--color-brand-*`) |
| YouTube video `92CTw_kb6x8` | **Embedded** (click-to-play, privacy-enhanced). Thumbnail/title not verified from here. | `src/lib/site-config.ts` |
| Live site copy | Not readable from here — copy was written from the services listed in the brief | pages under `src/app` |

Note: an S3-hosted page titled "Greenlight Debt Validation" (for
`greenlightsdebtrelief.com`, with an "s") was reachable, but it lists a
different address and a "cancels debts in 6 months or less guaranteed" claim.
It was treated as **not** your site and nothing from it was used.

## Owner checklist

**Confirm in `src/lib/site-config.ts`** (values marked `VERIFY`)

- [ ] Phone `+1 (877) 870-0717` and email `info@greenlightdebtrelief.com` match the live site.
- [ ] `legalName`, `address`, `hours` — add if you want them shown (currently hidden).
- [ ] `foundingYear` — add only if verifiable (enables "serving clients since …" on About).
- [ ] `isLawFirm: false`, `consultationIsFree: true` — must reflect reality.

**Confirm these descriptions of the program are accurate** (edit copy if not)

- [ ] Eligible debts: credit cards, medical bills, personal loans, other unsecured debt; secured debts usually not eligible.
- [ ] Process: free consultation → customized plan around an affordable monthly amount → creditor negotiation → track progress online.
- [ ] Clients agree to each settlement before it is final; fees and timeframe are given in writing before enrollment.
- [ ] Fee timing complies with the FTC Telemarketing Sales Rule (the site states the rule, and that fees are explained in writing).
- [ ] You never ask for SSNs, full account numbers or bank passwords through the website.
- [ ] You do not sell personal information or share it for other companies' marketing (Privacy Policy).
- [ ] Your text-message practice matches the optional SMS consent wording.

**Legal review** — have counsel review the disclosures, Privacy Policy, Terms,
TCPA consent language, and state debt-relief licensing for the states you serve.

**Environment** — see `.env.example`

- [ ] `NEXT_PUBLIC_SITE_URL` (defaults to `https://greenlightdebtrelief.com`).
- [ ] `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_SECRET`) — consultation requests and contact messages are POSTed here as JSON. In production, forms refuse submissions with a friendly message until this is set, so no lead is silently lost.

## What changed in the redesign

- **Brand:** Greenlight Debt Relief throughout; real phone and email in the top
  bar, header, footer, contact page, consultation page and structured data.
  Click-to-call everywhere (including a sticky Call / Free Consultation bar on phones).
- **Positioning:** debt relief first — free consultation, customized plans,
  creditor negotiation, dedicated account manager, live online access,
  financial freedom. Debt-validation content kept as free educational guides.
- **Video:** the official video `92CTw_kb6x8` directly below the hero in a
  large framed card. Nothing loads from YouTube until Play is pressed; the
  player uses youtube-nocookie.com. `VideoObject` structured data included.
- **Proof:** "Still not convinced? See the results for yourself." with Proof
  1–4 slots, plus an always-visible "individual results, not typical or
  guaranteed" disclaimer.
- **Honest disclosures:** an always-visible "Important things to know" section
  (results vary, credit impact, taxes on forgiven debt, fee rules, alternatives),
  each linked to the CFPB, FTC or IRS.
- **Form:** "Request your free consultation" in four short steps (old
  `/request-review` URL permanently redirects to `/free-consultation`).

## Pages

`/` · `/debt-relief` · `/how-it-works` · `/free-consultation` · `/faq` · `/about`
· `/contact` · `/resources` (+ 5 guides) · `/debt-validation` · `/privacy` ·
`/terms` · `/disclaimer`

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
- **SEO:** unique titles/descriptions/canonicals, per-page OG images, sitemap,
  robots, breadcrumbs, JSON-LD (Organization, WebSite, WebPage, Service,
  VideoObject, BreadcrumbList, FAQPage, Article). No review/rating markup.

## QA status

- Lint, typecheck, unit tests and production build pass.
- 66 Playwright tests pass on desktop and mobile, including axe WCAG 2.2 AA
  scans of all 17 pages (0 violations), the consultation flow, redirect, video
  click-to-play, real contact details, keyboard access, mobile menu, reduced
  motion, and a check that proof placeholders never reach production.
- Lighthouse (local production build): Performance 98–100, Accessibility 100,
  SEO 100 on mobile and desktop for `/`, `/free-consultation` and `/debt-relief`, CLS 0.
  The test machine has no GPU, so desktop scores reflect the static hero illustration.
