/*
 * CONTENT_REQUIRES_VERIFICATION
 * Short, conversion-focused FAQs based on the owner's brief. Replace with the
 * exact wording from Greenlight's existing FAQ where it differs.
 */
import { siteConfig } from "@/lib/site-config";

export type FaqLink = { href: string; label: string; external?: boolean };
export type FaqItem = { id: string; question: string; answer: string[]; links?: FaqLink[] };

const { name, phoneDisplay, email } = siteConfig;
const consultation = siteConfig.consultationIsFree ? "a free consultation" : "a consultation";

export const faqs: FaqItem[] = [
  {
    id: "what-is-greenlight",
    question: `What is ${name}?`,
    answer: [
      `${name} helps people with credit card and other unsecured debt explore their debt-relief options — starting with ${consultation}.`,
    ],
  },
  {
    id: "which-debts",
    question: "What types of debt may qualify?",
    answer: [
      "Credit card debt, unsecured loans and other qualifying unsecured debt. Secured debts, such as mortgages and car loans, usually don't qualify. We'll tell you which of your debts may qualify during your consultation.",
    ],
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: [
      `Request a ${siteConfig.consultationIsFree ? "free " : ""}consultation online — it takes a few minutes — or call us${phoneDisplay ? ` at ${phoneDisplay}` : ""}.`,
    ],
    links: [{ href: "/free-consultation", label: "Get my free consultation" }],
  },
  {
    id: "consultation",
    question: "How does the consultation work?",
    answer: [
      "A Greenlight consultant talks with you about your debts and your budget, then explains the options that may be available to you. There's no obligation — you decide whether to move forward.",
    ],
  },
  {
    id: "how-long",
    question: "How long does the process take?",
    answer: [
      "It depends on your situation, including how much you owe and the options you choose. We'll give you an estimated timeframe before you decide anything.",
    ],
  },
  {
    id: "contact",
    question: `How can I contact ${name}?`,
    answer: [
      [phoneDisplay && `Call us at ${phoneDisplay}`, email && `email ${email}`].filter(Boolean).join(", or ") +
        ", or send us a message through our contact page.",
    ],
    links: [{ href: "/contact", label: "Contact us" }],
  },
];

export const homeFaqIds = faqs.map((f) => f.id);

export function faqPlainText(item: FaqItem) {
  return item.answer.join(" ");
}
