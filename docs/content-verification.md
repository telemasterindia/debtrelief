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
| Industry experience / "work toward available solutions with creditors" | `src/lib/content/greenlight.ts` | Owner-supplied wording. Do not strengthen into specific creditor relationships unless verified and approved. |
| "Since 1998" | `src/lib/site-config.ts` → `foundingYear` | Confirm against company records. Set to `null` to hide. |
| "Top Rated", "More Savings" | Not currently shown | Removed from the homepage in favour of the owner's "Why Greenlight" list. Re-add only with a named rating source (Top Rated) and without amounts or percentages (savings). |
| Phone / email | `src/lib/site-config.ts` | Confirm they match the live site. |
| Partner sharing | `src/lib/site-config.ts` → `sharesInformationWithPartners` | Confirm the referral model: consent text and Privacy Policy say information may be shared with Greenlight's debt-relief partners. |

## Copy to compare with the existing Greenlight site

| Area | File |
| --- | --- |
| Hero headline and intro | `src/components/sections/hero.tsx` |
| Value statement, "why Greenlight", "help with" | `src/lib/content/greenlight.ts` |
| How it works (4 steps) | `src/lib/content/process.ts` |
| FAQs (7) | `src/lib/content/faq.ts` |
| About page and homepage About section | `src/app/about/page.tsx`, `src/components/sections/about-greenlight.tsx` |
| Video section heading | `src/components/sections/video-section.tsx` |
| Form success message | `src/components/forms/form-success.tsx` |

## Legal review

Privacy Policy, Terms, Disclaimer & Disclosures, and the form consent language
(including partner sharing and TCPA consent) need review by counsel.
