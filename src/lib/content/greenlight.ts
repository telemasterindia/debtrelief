/*
 * CONTENT_REQUIRES_VERIFICATION
 * Benefit names, "help with" categories and company points come from the
 * owner's brief (existing Greenlight website content). The short descriptions
 * were written for this redesign. Items marked CLAIM are factual claims that
 * must be substantiated before launch — see docs/content-verification.md.
 */
import type { IconName } from "@/components/ui/icon";

export type Item = { icon: IconName; title: string; text: string };

/** Greenlight's four headline benefits (names from the existing website). */
export const benefits: Item[] = [
  // CLAIM: savings are possible but never guaranteed — keep the wording soft.
  { icon: "dollar", title: "More Savings", text: "We look for options that may help you pay less on your debt." },
  { icon: "user", title: "Dedicated Account Managers", text: "One point of contact who knows your situation." },
  { icon: "lock", title: "Live Online Access", text: "Check where things stand anytime, online." },
  // CLAIM: "Top Rated" must be backed by a named, current rating source.
  { icon: "checkCircle", title: "Top Rated", text: "Clients value our friendly, personal service." },
];

/** What Greenlight can help with. */
export const helpWith: Item[] = [
  { icon: "dollar", title: "Credit Card Debt", text: "Balances on bank and store credit cards." },
  { icon: "document", title: "Unsecured Loans", text: "Personal loans that aren't backed by a home or car." },
  { icon: "documents", title: "Other Unsecured Debt", text: "Other qualifying debts. We'll confirm which of yours may qualify." },
];

/** Why Greenlight. */
export const whyGreenlight: Item[] = [
  // CLAIM: founding year shown only when siteConfig.foundingYear is set.
  { icon: "history", title: "Experience", text: "Years of helping people explore their debt-relief options." },
  { icon: "compass", title: "A Personal Approach", text: "Options built around your situation, not a one-size-fits-all script." },
  { icon: "message", title: "Dedicated Support", text: "Real people who answer your questions and keep you informed." },
  { icon: "lock", title: "Online Access", text: "See your progress whenever it suits you." },
  { icon: "user", title: "Customer-Focused", text: "No pressure. You decide what works for you." },
];
