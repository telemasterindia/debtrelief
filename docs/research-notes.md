# Research notes

These notes record what informed the site's content and how each category of
information was treated. They follow a strict separation between **facts**,
**claims**, **general (authoritative) information** and **our content**.

## Access limitations (be aware)

During the build, the network policy of the build environment blocked direct
access to `greenlightdebtrelief.com`, `youtube.com`, `web.archive.org`, `consumerfinance.gov` and
`ecfr.gov`. Research was therefore done through web-search result summaries of
those pages, not by reading them directly.

- **The YouTube video (92CTw_kb6x8) could not be viewed.** It is embedded as
  the official Greenlight video; its title, length and thumbnail were not verified.
- Regulatory statements were cross-checked across multiple summaries of primary
  sources (CFPB Regulation F pages, eCFR, the U.S. Code via govinfo, FTC
  consumer pages). Before launch, a qualified reviewer should confirm them
  against the primary sources linked in `src/lib/content/sources.ts`.

## Greenlight Debt Relief (our company — source of truth)

The project is a redesign of greenlightdebtrelief.com. Its content, logo, video,
contact details and proof are the company's own. Because the live site could not
be read from the build environment, the redesign uses:

- **From the owner's brief:** email info@greenlightdebtrelief.com, phone
  +1 (877) 870-0717, video 92CTw_kb6x8, services (credit card and unsecured debt
  relief, customized plans, dedicated account managers, live online access, free
  consultation, creditor negotiation, debt relief process, financial freedom),
  and the "Still not convinced? See the results for yourself." Proof 1–4 section.
- **Found in search listings but NOT used until verified by the owner:** a
  Laguna Beach, CA address, "since 1998", "helped thousands" and a "5/5 from
  359+ reviews" rating. These are left out; add them in `site-config.ts` or the
  copy if they are accurate and substantiated.
- **Not used:** a lookalike S3 page for `greenlightsdebtrelief.com` (different
  domain and address, "guaranteed in 6 months" claim).

## General information (authoritative sources)

Every rights-related statement on the site maps to one of these:

| Statement on site | Source |
| --- | --- |
| Creditors are not required to settle; savings/time can't be guaranteed | FTC "How To Get Out of Debt"; CFPB Ask CFPB #1457 |
| Debt relief can hurt credit; late fees/interest; collection and lawsuits may continue | CFPB Ask CFPB #1457 |
| Forgiven debt may be taxable; insolvency and other exceptions | IRS Topic 431 |
| Telemarketed debt relief fees only after settlement, agreement and a payment; required disclosures (time, savings needed, consequences) | FTC TSR business guide; FTC "How To Get Out of Debt" |
| Alternatives: creditors directly, nonprofit credit counseling, bankruptcy | CFPB Ask CFPB #1449, #1457; FTC |
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
