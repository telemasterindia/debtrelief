/**
 * Authoritative sources cited across the site. Every substantive statement
 * about consumer rights links back to one of these primary or government sources.
 */
export type Source = { id: string; publisher: string; title: string; url: string };

export const sources = {
  cfpbValidationInfo: {
    id: "cfpbValidationInfo",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "What information does a debt collector have to give me about the debt they're trying to collect from me?",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-information-does-a-debt-collector-have-to-give-me-about-the-debt-en-331/",
  },
  regF34: {
    id: "regF34",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "Regulation F, 12 CFR § 1006.34 — Notice for validation of debts",
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1006/34/",
  },
  regF26: {
    id: "regF26",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "Regulation F, 12 CFR § 1006.26 — Collection of time-barred debts",
    url: "https://www.consumerfinance.gov/rules-policy/regulations/1006/26/",
  },
  fdcpa1692g: {
    id: "fdcpa1692g",
    publisher: "U.S. Government Publishing Office",
    title: "Fair Debt Collection Practices Act, 15 U.S.C. § 1692g — Validation of debts",
    url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title15/html/USCODE-2023-title15-chap41-subchapV-sec1692g.htm",
  },
  cfpbWhatToDo: {
    id: "cfpbWhatToDo",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "What should I do when a debt collector contacts me?",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-when-a-debt-collector-contacts-me-en-1695/",
  },
  cfpbDebtReliefPrograms: {
    id: "cfpbDebtReliefPrograms",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "What is a debt relief program and how do I know if I should use one?",
    url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-relief-program-and-how-do-i-know-if-i-should-use-one-en-1457/",
  },
  cfpbComplaint: {
    id: "cfpbComplaint",
    publisher: "Consumer Financial Protection Bureau (CFPB)",
    title: "Submit a complaint about a financial product or service",
    url: "https://www.consumerfinance.gov/complaint/",
  },
  ftcDebtCollectionFaqs: {
    id: "ftcDebtCollectionFaqs",
    publisher: "Federal Trade Commission (FTC)",
    title: "Debt Collection FAQs",
    url: "https://consumer.ftc.gov/articles/debt-collection-faqs",
  },
  ftcFakeCollectors: {
    id: "ftcFakeCollectors",
    publisher: "Federal Trade Commission (FTC)",
    title: "Fake and Abusive Debt Collectors",
    url: "https://consumer.ftc.gov/articles/fake-abusive-debt-collectors",
  },
  ftcTsrDebtRelief: {
    id: "ftcTsrDebtRelief",
    publisher: "Federal Trade Commission (FTC)",
    title: "Debt Relief Services & the Telemarketing Sales Rule: A Guide for Business",
    url: "https://www.ftc.gov/business-guidance/resources/debt-relief-services-telemarketing-sales-rule-guide-business",
  },
  ftcReportFraud: {
    id: "ftcReportFraud",
    publisher: "Federal Trade Commission (FTC)",
    title: "ReportFraud.ftc.gov",
    url: "https://reportfraud.ftc.gov/",
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
