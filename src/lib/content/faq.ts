/*
 * CONTENT_REQUIRES_VERIFICATION
 * Short, sales-supportive FAQs following the owner's brief. Replace with the
 * exact wording from Greenlight's existing FAQ where it differs.
 */
import { siteConfig } from "@/lib/site-config";

export type FaqLink = { href: string; label: string; external?: boolean };
export type FaqItem = { id: string; question: string; answer: string[]; links?: FaqLink[] };

const { name, phoneDisplay, email, foundingYear } = siteConfig;
const consultation = siteConfig.consultationIsFree ? "a free consultation" : "a consultation";

export const faqs: FaqItem[] = [
  {
    id: "what-is-greenlight",
    question: `What is ${name}?`,
    answer: [
      `${name} helps consumers explore options for managing credit card and other unsecured debt.${
        foundingYear ? ` We've been working in the debt-relief industry since ${foundingYear}.` : ""
      } Our experienced team reviews your situation and helps you understand the options available to you.`,
    ],
  },
  {
    id: "which-debts",
    question: "What types of debt may qualify?",
    answer: ["Credit card debt, unsecured loans and other qualifying unsecured debt. We'll review which of your debts qualify during your consultation."],
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer: [`Request ${consultation} online in a few minutes, or call us${phoneDisplay ? ` at ${phoneDisplay}` : ""}. We'll take it from there.`],
    links: [{ href: "/free-consultation", label: "Get my free consultation" }],
  },
  {
    id: "consultation",
    question: "What happens during the consultation?",
    answer: [
      "A member of our team learns about your situation — your debts and your goals — and explains the options available to you. There's no obligation.",
    ],
  },
  {
    id: "process",
    question: "How does the process work?",
    answer: [
      "It's four simple steps: a free consultation, a review of your situation, a clear explanation of your options, and then you decide your next step. Our team works through the process with you and keeps you informed.",
    ],
    links: [{ href: "/how-it-works", label: "See how it works" }],
  },
  {
    id: "how-long",
    question: "How long does the process generally take?",
    answer: ["Every situation is different. Once we understand yours, we'll give you an estimated timeframe before you decide anything."],
  },
  {
    id: "contact",
    question: `How can I contact ${name}?`,
    answer: [
      [phoneDisplay && `Call us at ${phoneDisplay}`, email && `email ${email}`].filter(Boolean).join(", ") +
        ", or send a message through our contact page.",
    ],
    links: [{ href: "/contact", label: "Contact us" }],
  },
];

export const homeFaqIds = faqs.map((f) => f.id);

export function faqPlainText(item: FaqItem) {
  return item.answer.join(" ");
}
