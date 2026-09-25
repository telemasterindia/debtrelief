# Ledgerwise — Debt Validation Review website

A production Next.js website that helps U.S. consumers understand debt
validation and request an initial review. Built for readability (including
visitors aged 60+), accessibility (WCAG 2.2 AA), trust and performance.

> "Ledgerwise" is a working brand name defined in one place
> (`src/lib/site-config.ts`). Replace it with your real brand before launch.

## Owner checklist — required before launch

Nothing on this site was invented to fill gaps. The items below are either
blank (and therefore hidden) or describe practices you must confirm are true.

**Fill in `src/lib/site-config.ts`**

- [ ] `name` / `descriptor` — your brand.
- [ ] `legalName`, `address`, `phone`, `phoneDisplay`, `email`, `hours` — shown on
      About, Contact, the footer and in Organization structured data only when
      set. Trust pages are much stronger with these filled in.
- [ ] `foundingYear` — only if verifiable.
- [ ] `isLawFirm` — controls every "we are not a law firm" statement.
- [ ] `initialReviewIsFree` — controls every "free to request" statement.
- [ ] `legalLastUpdated` — date shown on Privacy, Terms and Disclaimer.

**Confirm these practices are true** (edit the copy if not)

- [ ] You contact every requester by phone or email to confirm the request.
- [ ] You never ask for SSNs, full account numbers or bank passwords via the web.
- [ ] You do not sell personal information or share it with other companies for their marketing (Privacy Policy).
- [ ] Any paid service and its fees are disclosed in writing before agreement.
      If you sell debt relief services by phone, the FTC Telemarketing Sales
      Rule's advance-fee restrictions may apply.
- [ ] Your text-message practice matches the optional SMS consent wording.

**Legal review**

- [ ] Have a licensed attorney review the Privacy Policy, Terms, Disclaimer,
      consent language (TCPA) and the state licensing requirements for debt
      relief / debt validation services in the states you serve.

**Environment** — see `.env.example`

- [ ] `NEXT_PUBLIC_SITE_URL` — canonical domain (used by canonicals, sitemap, Open Graph).
- [ ] `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_SECRET`) — where review
      requests and contact messages are POSTed as JSON. **In production, forms
      refuse submissions (HTTP 503 with a friendly message) until this is set**,
      so no request is ever silently lost.

## Tech stack

Next.js 16 (App Router, TypeScript) · React 19 · Tailwind CSS 4 · React Three
Fiber + drei + Three.js (hero only, lazy-loaded) · React Hook Form + Zod ·
Vitest · Playwright + axe-core.

## Commands

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # production build (type-checks)
npm start
npm run lint
npm run typecheck
npm test            # unit tests (Vitest)
npx playwright test # E2E + accessibility tests (builds must exist: run `npm run build` first)
```

## Project structure

```
src/
  app/                    routes (/, /debt-validation, /how-it-works, /faq, /about,
                          /contact, /request-review, /resources/[slug], /privacy,
                          /terms, /disclaimer), API routes, sitemap, robots, OG images
  components/
    3d/                   hero scene (R3F), static fallback, capability detection
    accessibility/        skip link, reduced-motion-aware reveal
    articles/             resource guide bodies
    forms/                multi-step review form, contact form, accessible fields
    layout/               header, footer, page header (breadcrumbs), legal layout
    sections/             homepage / shared sections
    seo/                  JSON-LD
    ui/                   buttons, icons, notices, source citations
  lib/
    analytics/            privacy-safe event tracking (dataLayer + DOM event)
    content/              FAQ, resources, process, sources, case studies
    seo/                  page registry, metadata, structured data
    server/               webhook delivery, rate limiting
    validation/           Zod schemas (shared by client and server)
docs/research-notes.md    research sources and fact/claim separation
e2e/                      Playwright tests
```

## Key design decisions

- **Readability first.** Inter (self-hosted), 18px body text, 1.65 line
  height, high-contrast colour tokens (all text ≥ AA, most ≥ AAA), 48–56px
  tap targets, visible labels on every field, a thick two-tone focus ring.
- **3D that never gets in the way.** The Three.js scene loads only on devices
  ≥ 768px wide with hardware-accelerated WebGL, after the page is idle. Phones,
  data-saver, low-memory devices, software-rendered WebGL, and devices that
  can't hold a smooth frame rate get a matching static illustration. The scene
  pauses off-screen and is static under `prefers-reduced-motion`. Text is never
  placed over the 3D. Append `?force3d` to a URL to preview the 3D on a machine
  without a GPU.
- **Trust without fake proof.** No testimonials, ratings, statistics or badges.
  Instead: a "What you can expect" commitments section, visible disclosures,
  and citations to CFPB/FTC/U.S. Code on every rights claim. Verified case
  studies can be added to `src/lib/content/case-studies.ts`; the section stays
  hidden until one exists and each entry carries date, situation, debt type,
  amount (optional), action, documented outcome and limitations.
- **Form UX for seniors.** Four short steps with a progress indicator, large
  radio cards, an error summary that links to each field, errors re-checked as
  you type (never on blur, which would shift the layout as you click Continue),
  a review-and-edit screen, and plain consent language. Server-side Zod
  validation, a honeypot and per-IP rate limiting (`FORM_RATE_LIMIT`) protect
  the API.
- **Privacy-safe analytics.** `track()` pushes to `window.dataLayer` and a DOM
  `analytics` event. Parameters are allow-listed and stripped of anything that
  looks like personal data; debt details are never sent. No vendor script is
  loaded — add your tag manager and update the Privacy Policy first.
- **SEO.** Unique titles/descriptions/canonicals, per-page Open Graph images,
  Twitter cards, sitemap, robots, breadcrumbs, and JSON-LD (Organization,
  WebSite, WebPage, BreadcrumbList, FAQPage, Article). No review or rating
  schema.

## QA status (at time of writing)

- Unit tests, lint, typecheck and production build pass.
- 54 Playwright tests pass on desktop and mobile (Pixel 7), including axe
  WCAG 2.2 AA scans of all 15 pages (0 violations), the full form flow,
  keyboard access, mobile menu, reduced motion and no horizontal scrolling.
- Lighthouse (local production build): 97–100 in Performance, Accessibility,
  Best Practices and SEO on mobile and desktop for the pages tested, CLS 0.
  Note: the test machine has no GPU, so the desktop home-page score reflects
  the static illustration; profile the 3D scene on real GPU hardware as well.
