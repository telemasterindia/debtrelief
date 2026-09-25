# Content verification checklist

Every file below carries a `CONTENT_REQUIRES_VERIFICATION` comment. The copy in
them was written from the owner's brief, **not** copied from
greenlightdebtrelief.com (unreachable from the build environment). Compare each
item with the live site and replace it with the exact Greenlight wording, then
remove the marker.

Find them all with: `grep -rn CONTENT_REQUIRES_VERIFICATION src`

| Area | File | What to verify |
| --- | --- | --- |
| Hero headline & intro | `src/components/sections/hero.tsx` | Headline, supporting sentence, reassurance points |
| Video section heading | `src/components/sections/video-section.tsx` | Heading/intro around the official video |
| Services | `src/lib/content/services.ts` | Service names and descriptions; eligible debt types (medical bills and personal loans were taken from third-party listings) |
| Process | `src/lib/content/process.ts` | Step names/descriptions; "you agree to each settlement"; fees/timeframe given in writing |
| "You're not alone" section | `src/components/sections/problem-section.tsx` | Tone and situations |
| Commitments | `src/components/sections/expectations.tsx` | Each commitment is an operational promise — confirm all are true |
| FAQ | `src/lib/content/faq.ts` | Every answer that describes Greenlight's program |
| About | `src/app/about/page.tsx` | Company description; add verified history if desired |
| Debt relief page | `src/app/debt-relief/page.tsx` | Page intro |
| Form success message | `src/components/forms/form-success.tsx` | "A Greenlight consultant will reach out…" — confirm the real follow-up process |

Regulatory disclosures (`src/lib/content/disclosures.ts`), legal pages and the
educational guides are based on CFPB/FTC/IRS sources rather than Greenlight
copy; they still need legal review but are not marked.
