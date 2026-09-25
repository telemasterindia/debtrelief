# Content verification checklist

The site is a **referral / consultation website** for Greenlight Debt Relief.
Its copy was written from the owner's brief (the existing greenlightdebtrelief.com
site could not be reached during development). Files containing unverified copy
carry a `CONTENT_REQUIRES_VERIFICATION` comment:

```
grep -rn CONTENT_REQUIRES_VERIFICATION src
```

## Claims that need substantiation before launch

| Claim | Where | What's needed |
| --- | --- | --- |
| "Top Rated" | `src/lib/content/greenlight.ts` (benefits) | A named, current rating source (e.g. which review platform and rating). Remove if it can't be substantiated. |
| "Since 1998" | `src/lib/site-config.ts` → `foundingYear` | Confirm against company records. Set to `null` to hide. |
| "More Savings" | `src/lib/content/greenlight.ts` | Kept deliberately soft ("options that may help you pay less"). No percentages or amounts. |
| Phone / email | `src/lib/site-config.ts` | Confirm they match the live site. |
| Partner sharing | `src/lib/site-config.ts` → `sharesInformationWithPartners` | Confirm the referral model: consent text and Privacy Policy say information may be shared with Greenlight's debt-relief partners. |

## Copy to compare with the existing Greenlight site

| Area | File |
| --- | --- |
| Hero headline and intro | `src/components/sections/hero.tsx` |
| Benefits, "help with", "why Greenlight" | `src/lib/content/greenlight.ts` |
| How it works (4 steps) | `src/lib/content/process.ts` |
| FAQs (6) | `src/lib/content/faq.ts` |
| About page | `src/app/about/page.tsx` |
| Video section heading | `src/components/sections/video-section.tsx` |
| Form success message | `src/components/forms/form-success.tsx` |

## Legal review

Privacy Policy, Terms, Disclaimer & Disclosures, and the form consent language
(including partner sharing and TCPA consent) need review by counsel.
