/*
 * CONTENT_REQUIRES_VERIFICATION
 * Positioning, item names and example phrasing come from the owner's brief.
 * Items marked CLAIM must be supportable before launch — see
 * docs/content-verification.md.
 */
import type { IconName } from "@/components/ui/icon";

export type Item = { icon: IconName; title: string; text: string };

/** Owner-approved positioning statements. */
export const valueStatement =
  "Debt can be complicated. Our experienced team can help you understand your situation and explore the options available to you.";

/** Why customers contact Greenlight. */
export const whyGreenlight: Item[] = [
  // CLAIM: industry experience (company history configured in site-config).
  {
    icon: "history",
    title: "Experience",
    text: "Our experience in the industry gives our team an understanding of how the process works and how to work toward available solutions with creditors.",
  },
  { icon: "message", title: "Dedicated Support", text: "A dedicated account manager who knows your situation and keeps you informed." },
  { icon: "compass", title: "Personalized Approach", text: "Every situation is different. We take the time to understand yours." },
  { icon: "lock", title: "Live Online Access", text: "Check where things stand anytime through your online account." },
  { icon: "user", title: "Customer-Focused Process", text: "Clear explanations, ongoing communication and no pressure." },
  { icon: "documents", title: "More Options", text: "We help you understand the opportunities available to you, so you can choose what fits." },
];

/** What Greenlight helps with. */
export const helpWith: Item[] = [
  { icon: "dollar", title: "Credit Card Debt", text: "Balances on bank and store credit cards." },
  { icon: "document", title: "Unsecured Loans", text: "Personal loans not backed by a home or car." },
  { icon: "documents", title: "Other Qualifying Unsecured Debt", text: "We'll review which of your debts qualify." },
];
