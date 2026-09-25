/**
 * Registry of indexable pages. Drives metadata, Open Graph images and the sitemap
 * so every page has a unique title, description and canonical URL.
 */
export type PageEntry = {
  path: string;
  /** Used for the <title> (the brand is appended by the root template). */
  title: string;
  description: string;
  /** Headline rendered on the Open Graph image. */
  ogHeadline: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const pages = {
  home: {
    path: "/",
    title: "Debt Validation Review — Know What You're Being Asked to Pay",
    description:
      "Plain-English help for U.S. consumers contacted by a debt collector. Learn how debt validation works and request a review of the information behind an account.",
    ogHeadline: "Know what you're being asked to pay for.",
    priority: 1,
    changeFrequency: "monthly",
  },
  debtValidation: {
    path: "/debt-validation",
    title: "What Is Debt Validation? A Plain-English Guide",
    description:
      "What debt validation means under federal rules, what a validation notice must include, your 30-day window to dispute, and what validation does not do.",
    ogHeadline: "What is debt validation? A plain-English guide.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How a Debt Validation Review Works — Step by Step",
    description:
      "The four steps of a debt validation review: what you share, what is reviewed, how documentation is evaluated, and how you learn your possible next steps.",
    ogHeadline: "How a validation review works, step by step.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  faq: {
    path: "/faq",
    title: "Debt Validation FAQ — Common Questions Answered",
    description:
      "Clear answers about debt validation: who can request it, what is reviewed, whether it removes a debt, fees, timing, privacy and what happens next.",
    ogHeadline: "Debt validation questions, answered clearly.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  about: {
    path: "/about",
    title: "About Us — Our Approach to Debt Validation Reviews",
    description:
      "Who we are, how we work, and the standards we hold ourselves to: plain language, transparency, privacy and no pressure.",
    ogHeadline: "A transparent approach to debt validation.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  contact: {
    path: "/contact",
    title: "Contact Us",
    description: "Questions about a debt validation review? Send us a message and we'll respond by email.",
    ogHeadline: "Questions? We're here to help.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  requestReview: {
    path: "/request-review",
    title: "Request a Debt Validation Review",
    description:
      "Request an initial debt validation review in four short steps. No Social Security number or account numbers needed.",
    ogHeadline: "Request a debt validation review.",
    priority: 0.9,
    changeFrequency: "yearly",
  },
  resources: {
    path: "/resources",
    title: "Debt Collection Resources & Guides",
    description:
      "Plain-English guides about debt validation letters, what to do when a collector contacts you, old debts and how to spot debt collection scams.",
    ogHeadline: "Plain-English guides to debt collection.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How we collect, use, share and protect the information you provide on this website.",
    ogHeadline: "Privacy Policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  terms: {
    path: "/terms",
    title: "Terms & Conditions",
    description: "The terms that apply when you use this website and request a debt validation review.",
    ogHeadline: "Terms & Conditions",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  disclaimer: {
    path: "/disclaimer",
    title: "Legal & Educational Disclaimer",
    description:
      "Important limits of the information on this website: educational only, not legal advice, and no guaranteed results.",
    ogHeadline: "Disclaimer",
    priority: 0.3,
    changeFrequency: "yearly",
  },
} satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof pages;
