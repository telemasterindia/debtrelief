import { siteConfig } from "@/lib/site-config";

export type FaqLink = { href: string; label: string; external?: boolean };
export type FaqItem = {
  id: string;
  question: string;
  /** Plain-text paragraphs (also used verbatim in FAQPage structured data). */
  answer: string[];
  links?: FaqLink[];
  category: "basics" | "process" | "costs-privacy";
};

const { name } = siteConfig;

export const faqs: FaqItem[] = [
  {
    id: "what-is-debt-relief",
    category: "basics",
    question: "What is debt relief?",
    answer: [
      `Debt relief is a way to work toward resolving debt you are struggling to pay. With ${name}, that means a customized plan built around a monthly amount you can afford, while we negotiate with your creditors to try to settle your debts for less than the full balance.`,
      "It is designed for people with significant credit card or other unsecured debt who are having real difficulty keeping up with payments.",
    ],
    links: [{ href: "/debt-relief", label: "See how our debt relief services work" }],
  },
  {
    id: "which-debts",
    category: "basics",
    question: "Which debts can Greenlight help with?",
    answer: [
      "We focus on credit card debt and other unsecured debts — debts that are not backed by property — such as medical bills and personal loans.",
      "Secured debts, such as mortgages and auto loans, usually are not eligible for debt relief programs. During your free consultation we'll tell you which of your debts may qualify.",
    ],
  },
  {
    id: "right-for-me",
    category: "basics",
    question: "Is debt relief right for me?",
    answer: [
      "It depends on your debts, your income and your goals. Debt relief can be a fit if you owe a significant amount of unsecured debt and can't keep up with minimum payments.",
      "It isn't right for everyone. If you can manage your payments, calling your creditors directly or working with a nonprofit credit counselor may be better. In some situations, speaking with a bankruptcy attorney makes sense. We'll give you an honest opinion.",
    ],
    links: [{ href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-credit-counseling-and-debt-settlement-debt-consolidation-or-credit-repair-en-1449/", label: "CFPB: Comparing credit counseling, debt settlement and other options", external: true }],
  },
  {
    id: "guaranteed-result",
    category: "basics",
    question: "Is a result guaranteed?",
    answer: [
      "No. Creditors are not required to negotiate or settle, and results vary from person to person. No honest company can guarantee how much you'll save or exactly how long it will take.",
      "Be cautious of any company that guarantees to eliminate your debt or promises fast results.",
    ],
    links: [{ href: "https://consumer.ftc.gov/articles/how-get-out-debt", label: "FTC: How to get out of debt", external: true }],
  },
  {
    id: "credit-impact",
    category: "basics",
    question: "How does debt relief affect my credit?",
    answer: [
      "Debt relief can lower your credit scores, particularly if payments to creditors stop while funds are set aside for settlements. Settled accounts may be reported as \"settled\" rather than \"paid in full.\"",
      "Your consultant will walk you through the possible effects on your credit before you decide anything.",
    ],
    links: [{ href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-relief-program-and-how-do-i-know-if-i-should-use-one-en-1457/", label: "CFPB: What to know about debt relief programs", external: true }],
  },
  {
    id: "collection-calls",
    category: "basics",
    question: "Will creditors stop contacting me?",
    answer: [
      "Not necessarily. Creditors and debt collectors may continue to contact you, and they may take legal action to collect.",
      "Your dedicated account manager can help you understand what to expect. You also have rights under federal law when a debt collector contacts you, including the right to validation information about the debt.",
    ],
    links: [{ href: "/debt-validation", label: "Know your rights: debt validation explained" }],
  },
  {
    id: "taxes",
    category: "basics",
    question: "Is forgiven debt taxable?",
    answer: [
      "It can be. If a creditor forgives part of a debt, the IRS may consider the forgiven amount taxable income, and you may receive a Form 1099-C. There are exceptions — for example, if you are insolvent when the debt is forgiven.",
      "Talk with a tax professional about your situation.",
    ],
    links: [{ href: "https://www.irs.gov/taxtopics/tc431", label: "IRS: Canceled debt — is it taxable or not?", external: true }],
  },
  {
    id: "consultation",
    category: "process",
    question: "How does the free consultation work?",
    answer: [
      "You can call us or request a consultation online. A Greenlight consultant will talk with you about your debts, income and monthly budget.",
      "If our program may fit, we'll explain the plan, the estimated timeframe and every fee in writing. If it doesn't fit, we'll tell you. The consultation is free and there is no obligation.",
    ],
    links: [{ href: "/free-consultation", label: "Request your free consultation" }],
  },
  {
    id: "account-manager",
    category: "process",
    question: "What does my dedicated account manager do?",
    answer: [
      "Your account manager is your main point of contact throughout the program. They answer your questions, explain settlement offers and keep you informed about your progress.",
    ],
  },
  {
    id: "online-access",
    category: "process",
    question: "What is live online access?",
    answer: [
      "Enrolled clients can log in to a secure online account to see where their program stands, including progress on each debt.",
    ],
  },
  {
    id: "how-long",
    category: "process",
    question: "How long does the program take?",
    answer: [
      "It depends on how much you owe, how much you can set aside each month, and your creditors. Your consultant will give you an estimated timeframe in writing before you enroll.",
    ],
  },
  {
    id: "what-to-provide",
    category: "process",
    question: "What information should I provide?",
    answer: [
      "To get started we only need your name, contact details, state, and a general picture of your debt — the type and an approximate amount.",
      "Please do not enter your Social Security number, full account numbers, bank details or passwords on this website. We never ask for them through a web form.",
    ],
  },
  {
    id: "what-happens-next",
    category: "process",
    question: "What happens after I submit my information?",
    answer: [
      "A member of our team will contact you by phone or email, using the details you provided, to schedule or begin your free consultation.",
      "Submitting a request does not create any obligation and does not guarantee a particular result.",
    ],
  },
  {
    id: "what-is-debt-validation",
    category: "process",
    question: "What is debt validation?",
    answer: [
      "Debt validation is your right to get basic information about a debt from a debt collector — such as who the creditor is and how the amount was calculated.",
      "A collector must provide this validation information in its first communication or within five days after it. If you dispute the debt in writing within the validation period (generally 30 days after you receive the notice), the collector must pause collection of the disputed debt until it sends verification. Validation does not erase a debt you legitimately owe.",
    ],
    links: [{ href: "/debt-validation", label: "Read our plain-English guide to debt validation" }],
  },
  {
    id: "fees",
    category: "costs-privacy",
    question: "Are there fees?",
    answer: [
      ...(siteConfig.consultationIsFree ? ["The consultation is free."] : []),
      "If you enroll, all fees are explained in writing before you sign anything. Under federal rules, debt relief companies that sell their services by phone generally cannot charge fees until they have settled or changed at least one of your debts and you have made at least one payment under that agreement.",
    ],
    links: [{ href: "https://www.ftc.gov/business-guidance/resources/debt-relief-services-telemarketing-sales-rule-guide-business", label: "FTC: Rules on fees for debt relief services", external: true }],
  },
  {
    id: "is-it-secure",
    category: "costs-privacy",
    question: "Is my information secure?",
    answer: [
      "Information you submit on this website is sent over an encrypted (HTTPS) connection. We collect only what we need to respond to you, and we do not sell your personal information.",
    ],
    links: [{ href: "/privacy", label: "Read our Privacy Policy" }],
  },
  {
    id: "legal-advice",
    category: "costs-privacy",
    question: "Is this legal or tax advice?",
    answer: siteConfig.isLawFirm
      ? ["The information on this website is general. It is not legal or tax advice for your specific situation."]
      : [
          `No. ${name} is not a law firm and does not provide legal or tax advice. The information on this website is general and educational.`,
          "For legal questions — especially if you have been sued — please talk with a licensed attorney. For tax questions, talk with a tax professional.",
        ],
    links: [{ href: "/disclaimer", label: "Read our disclaimer" }],
  },
  {
    id: "sued",
    category: "costs-privacy",
    question: "What if I've been sued over a debt?",
    answer: [
      "Do not ignore a lawsuit. Respond by the deadline on the court papers, or the court may enter a judgment against you. Talk with a licensed attorney as soon as possible, and let us know during your consultation.",
    ],
    links: [{ href: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-when-a-debt-collector-contacts-me-en-1695/", label: "CFPB: What to do when a debt collector contacts you", external: true }],
  },
];

export const homeFaqIds = ["what-is-debt-relief", "which-debts", "guaranteed-result", "credit-impact", "fees", "consultation"];

export function faqPlainText(item: FaqItem) {
  return item.answer.join(" ");
}
