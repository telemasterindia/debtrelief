import type { SourceId } from "./sources";

/**
 * Plain-English disclosures about how debt relief works. These are shown in full
 * (never hidden behind an accordion) wherever the program is described.
 */
export const disclosures: { title: string; text: string; source: SourceId }[] = [
  {
    title: "Results vary",
    text: "Creditors are not required to negotiate or settle, and not every debt can be settled. No one can guarantee how much you'll save or how long it will take.",
    source: "ftcHowToGetOutOfDebt",
  },
  {
    title: "Your credit may be affected",
    text: "Debt relief can lower your credit scores, especially if payments to creditors stop. Late fees and interest may be added, and creditors may continue collection efforts, including lawsuits.",
    source: "cfpbDebtReliefPrograms",
  },
  {
    title: "Forgiven debt may be taxable",
    text: "If a creditor forgives part of a debt, the IRS may treat the forgiven amount as income. Some exceptions apply, such as insolvency.",
    source: "irsCanceledDebt",
  },
  {
    title: "When fees can be charged",
    text: "Under federal rules, debt relief companies that sell by phone generally cannot charge fees until they have settled or changed at least one of your debts and you've made a payment under that agreement. Every fee is explained in writing before you enroll.",
    source: "ftcTsrDebtRelief",
  },
  {
    title: "It isn't right for everyone",
    text: "Depending on your situation, calling your creditors directly, a nonprofit credit counselor, or speaking with a bankruptcy attorney may be a better fit. We'll tell you honestly if we think so.",
    source: "cfpbDebtReliefPrograms",
  },
];
