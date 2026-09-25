export type ResourceMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  readingMinutes: number;
  datePublished: string;
  dateModified: string;
};

export const resources: ResourceMeta[] = [
  {
    slug: "debt-relief-what-to-know",
    title: "Debt Relief: What to Know Before You Enroll",
    shortTitle: "Debt relief: what to know",
    description:
      "How debt relief works, who it may help, its trade-offs for your credit and taxes, the fee rules companies must follow, and alternatives to consider.",
    summary: "How debt relief works, its trade-offs, the fee rules, and the alternatives — explained honestly.",
    readingMinutes: 6,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
  },
  {
    slug: "debt-validation-letter",
    title: "The Debt Validation Letter: What It Must Include and How to Respond",
    shortTitle: "The debt validation letter",
    description:
      "What a debt collector's validation notice must include under federal rules, how to read it line by line, and how to request more information or dispute the debt.",
    summary:
      "What the collector's validation notice must tell you, how to read it, and how to respond in writing within the validation period.",
    readingMinutes: 7,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
  },
  {
    slug: "debt-collector-contacted-you",
    title: "A Debt Collector Contacted You. Here's What to Do Next.",
    shortTitle: "When a collector contacts you",
    description:
      "A calm, step-by-step checklist for the first days after a debt collector calls or writes, based on guidance from the CFPB and FTC.",
    summary: "A calm, step-by-step checklist for the first days after a collector calls or writes to you.",
    readingMinutes: 6,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
  },
  {
    slug: "old-debts-and-time-limits",
    title: "Old Debts and Time Limits: What \"Time-Barred Debt\" Means",
    shortTitle: "Old debts and time limits",
    description:
      "What a statute of limitations is, what collectors may and may not do about time-barred debts, and why a payment on an old debt deserves careful thought.",
    summary: "What happens when a debt is very old, and why you should understand the time limit before paying.",
    readingMinutes: 5,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
  },
  {
    slug: "spot-debt-collection-scams",
    title: "How to Spot a Fake Debt Collector",
    shortTitle: "Spotting fake debt collectors",
    description:
      "Warning signs of debt collection scams from the FTC, how to check whether a collector is real, and where to report a scam.",
    summary: "Warning signs that a caller may not be a real debt collector, and how to protect yourself.",
    readingMinutes: 4,
    datePublished: "2026-09-25",
    dateModified: "2026-09-25",
  },
];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
