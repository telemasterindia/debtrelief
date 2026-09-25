# Research notes

These notes record what informed the site's content and how each category of
information was treated. They follow a strict separation between **facts**,
**claims**, **general (authoritative) information** and **our content**.

## Access limitations (be aware)

During the build, the network policy of the build environment blocked direct
access to `greenlightdebtrelief.com`, `youtube.com`, `consumerfinance.gov` and
`ecfr.gov`. Research was therefore done through web-search result summaries of
those pages, not by reading them directly.

- **The YouTube reference video was not viewed.** The visual design is an
  original interpretation of the brief ("premium enterprise fintech, restrained
  3D, document + validation + security"), not of the video. If the video has
  specific qualities you want reflected, describe them and they can be applied.
- Regulatory statements were cross-checked across multiple summaries of primary
  sources (CFPB Regulation F pages, eCFR, the U.S. Code via govinfo, FTC
  consumer pages). Before launch, a qualified reviewer should confirm them
  against the primary sources linked in `src/lib/content/sources.ts`.

## Greenlight Debt Relief (competitive research only)

Nothing from Greenlight (text, testimonials, statistics, results, stories,
branding or images) is used on this site.

| Category | Notes |
| --- | --- |
| **Fact** (what their site/listings state) | Presents itself as a debt negotiation/settlement company for unsecured debts (credit cards, medical bills). Offers a free consultation. Listed phone and California address. BBB profile states it is not BBB accredited. |
| **Claim** (Greenlight's claims, unverified) | "Since 1998", "helped thousands", "lower monthly payments", "protect your credit", 5/5 stars from 359+ reviews. These are Greenlight's own claims and were **not** adopted or paraphrased. |
| **Structural takeaways** | Consumer debt sites lead with a consultation CTA, a short numbered process, debt-type categories, FAQs and trust elements. We kept the structure (process, FAQ, clear CTA) but replaced social proof with transparent commitments, because we have no verified proof of our own. |
| **Positioning difference** | Greenlight sells *settlement*. This site is about *validation* — getting accurate information — and repeatedly states that validation does not eliminate legitimately owed debts. |

## General information (authoritative sources)

Every rights-related statement on the site maps to one of these:

| Statement on site | Source |
| --- | --- |
| Collector must provide validation information in the initial communication or within 5 days | CFPB Ask CFPB #331; 12 CFR 1006.34(a); 15 U.S.C. 1692g(a) |
| Validation notice contents (collector name/address, itemization date, creditor on itemization date, account number, current creditor, itemization of interest/fees/payments/credits, current amount, validation period end date, how to dispute, original-creditor request) | 12 CFR 1006.34(c) |
| Itemization date is one of a fixed set of reference dates (e.g. last statement, charge-off) | 12 CFR 1006.34(b)(3) |
| Validation period ends 30 days after receipt; collector may assume receipt 5 business days after sending | 12 CFR 1006.34(b)(5) |
| Written dispute / original-creditor request within the period → collector must cease collection of the disputed portion until it mails verification | 15 U.S.C. 1692g(b) |
| No deadline for the collector to verify; it simply cannot collect until it does | 15 U.S.C. 1692g(b) (as summarized by consumer-law sources) |
| Failure to dispute may not be construed by a court as an admission of liability | 15 U.S.C. 1692g(c) |
| Collector may assume the debt is valid if not disputed within 30 days | FTC Debt Collection FAQs |
| Collector must not sue or threaten to sue on time-barred debt; debt not extinguished | 12 CFR 1006.26 |
| In some states a payment/acknowledgment can restart the limitations period | FTC Debt Collection FAQs |
| Call-time limits (8 a.m.–9 p.m.), no harassment, no false representations, written stop-contact request | FDCPA 1692c/1692d/1692e; FTC Debt Collection FAQs |
| Fake-collector warning signs; where to report | FTC "Fake and Abusive Debt Collectors"; ReportFraud.ftc.gov |
| Advance-fee rules for telemarketed debt relief | FTC TSR business guide (linked from the fee FAQ) |
| CFPB sample letters exist | CFPB "What should I do when a debt collector contacts me?" |

## Our content — what is (and is not) claimed about the business

The site makes **no** claims about customer counts, success rates, savings,
years in business, awards, accreditation, attorney or government relationships,
reviews or ratings. Structured data contains no review or rating markup.

Statements that describe **business practices** and must be confirmed by the
owner before launch are listed in the README under "Owner checklist".
