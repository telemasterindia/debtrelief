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
    title: "Greenlight Debt Relief",
    description:
      "Get help exploring your options for credit card and unsecured debt. Start with a free, no-obligation consultation.",
    ogHeadline: "Get help with your credit card debt.",
    priority: 1,
    changeFrequency: "monthly",
  },
  howItWorks: {
    path: "/how-it-works",
    title: "How It Works",
    description: "Four simple steps, starting with a free consultation. The final decision is always yours.",
    ogHeadline: "How it works.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  freeConsultation: {
    path: "/free-consultation",
    title: "Get Your Free Consultation",
    description:
      "Request a free, no-obligation debt relief consultation with Greenlight Debt Relief in four short steps. No Social Security number needed.",
    ogHeadline: "Request your free consultation.",
    priority: 0.9,
    changeFrequency: "yearly",
  },
  faq: {
    path: "/faq",
    title: "FAQs",
    description: "Quick answers to common questions about Greenlight Debt Relief.",
    ogHeadline: "Frequently asked questions.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  about: {
    path: "/about",
    title: "About Greenlight Debt Relief",
    description: "Who we are and how we help people explore options for credit card and unsecured debt.",
    ogHeadline: "About Greenlight Debt Relief.",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  contact: {
    path: "/contact",
    title: "Contact Greenlight Debt Relief",
    description: "Call Greenlight Debt Relief, email us, or send a message.",
    ogHeadline: "Talk to Greenlight Debt Relief.",
    priority: 0.7,
    changeFrequency: "yearly",
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
    title: "Disclaimer & Disclosures",
    description: "Important disclosures about Greenlight Debt Relief and this website.",
    ogHeadline: "Disclaimer & disclosures",
    priority: 0.3,
    changeFrequency: "yearly",
  },
} satisfies Record<string, PageEntry>;

export type PageKey = keyof typeof pages;
