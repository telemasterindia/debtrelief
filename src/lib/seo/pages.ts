/**
 * Registry of indexable pages. Drives metadata, Open Graph images and the sitemap
 * so every page has a unique title, description and canonical URL.
 */
export type PageEntry = {
  path: string;
  title: string;
  description: string;
  ogHeadline: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

export const pages = {
  home: {
    path: "/",
    title: "Greenlight Debt Relief — Credit Card & Unsecured Debt Relief",
    description:
      "Greenlight Debt Relief offers a free consultation, customized debt relief plans, creditor negotiation, a dedicated account manager and live online access.",
    ogHeadline: "Get help with your credit card debt.",
    priority: 1,
    changeFrequency: "monthly",
  },
  debtRelief: {
    path: "/debt-relief",
    title: "Credit Card & Unsecured Debt Relief Services",
    description:
      "How Greenlight Debt Relief helps with credit card and other unsecured debt: customized plans, creditor negotiation, a dedicated account manager and live online access.",
    ogHeadline: "Credit card & unsecured debt relief.",
    priority: 0.95,
    changeFrequency: "monthly",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How Our Debt Relief Process Works — Step by Step",
    description:
      "From your free consultation to a customized plan and creditor negotiation: every step of the Greenlight Debt Relief process, explained in plain English.",
    ogHeadline: "How our debt relief process works.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  freeConsultation: {
    path: "/free-consultation",
    title: "Request Your Free Debt Relief Consultation",
    description:
      "Request a free, no-obligation debt relief consultation with Greenlight Debt Relief in four short steps. No Social Security number needed.",
    ogHeadline: "Request your free consultation.",
    priority: 0.9,
    changeFrequency: "yearly",
  },
  debtValidation: {
    path: "/debt-validation",
    title: "What Is Debt Validation? Your Rights With Debt Collectors",
    description:
      "What debt validation means under federal rules, what a validation notice must include, your 30-day window to dispute, and what validation does not do.",
    ogHeadline: "Debt validation: know your rights with collectors.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  faq: {
    path: "/faq",
    title: "Debt Relief FAQ — Common Questions Answered",
    description:
      "Straight answers about debt relief with Greenlight: which debts qualify, fees, credit impact, taxes on forgiven debt, timing, your account manager and more.",
    ogHeadline: "Debt relief questions, answered honestly.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  about: {
    path: "/about",
    title: "About Greenlight Debt Relief",
    description:
      "Who we are and how we work: customized plans, dedicated account managers, live online access and honest answers about debt relief.",
    ogHeadline: "About Greenlight Debt Relief.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  contact: {
    path: "/contact",
    title: "Contact Greenlight Debt Relief",
    description: "Call Greenlight Debt Relief, email us, or send a message. We're here to answer your questions about debt relief.",
    ogHeadline: "Talk to Greenlight Debt Relief.",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  resources: {
    path: "/resources",
    title: "Debt Relief & Debt Collection Guides",
    description:
      "Plain-English guides about debt relief, debt collectors, validation letters, old debts and how to avoid debt relief and collection scams.",
    ogHeadline: "Plain-English guides to debt and your rights.",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How Greenlight Debt Relief collects, uses, shares and protects the information you provide on this website.",
    ogHeadline: "Privacy Policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  terms: {
    path: "/terms",
    title: "Terms & Conditions",
    description: "The terms that apply when you use the Greenlight Debt Relief website and request a consultation.",
    ogHeadline: "Terms & Conditions",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  disclaimer: {
    path: "/disclaimer",
    title: "Disclaimer & Important Disclosures",
    description:
      "Important disclosures about debt relief: results vary, credit impact, taxes on forgiven debt, fees, and the limits of the information on this website.",
    ogHeadline: "Disclaimer & important disclosures",
    priority: 0.3,
    changeFrequency: "yearly",
  },
} satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof pages;
