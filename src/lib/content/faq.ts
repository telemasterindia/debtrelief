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

const feeAnswer = siteConfig.initialReviewIsFree
  ? [
      "Requesting an initial review is free and does not commit you to anything.",
      "If, after the review, any paid service is offered, every fee will be explained to you in writing before you agree to anything. You are never obligated to purchase a service.",
    ]
  : [
      "Any fee that applies will be explained to you in writing before you agree to anything. You are never obligated to purchase a service.",
    ];

const legalAdviceAnswer = siteConfig.isLawFirm
  ? [
      "The information on this website is general and educational. It is not legal advice for your specific situation, and reading it does not create an attorney-client relationship.",
    ]
  : [
      "No. The information on this website is general and educational. We are not a law firm, and nothing on this website is legal advice.",
      "If you have been sued, or you have questions about your legal rights in your state, please talk with a licensed attorney. Legal aid organizations in your area may be able to help at low or no cost.",
    ];

export const faqs: FaqItem[] = [
  {
    id: "what-is-debt-validation",
    category: "basics",
    question: "What is debt validation?",
    answer: [
      "Debt validation is the process of getting basic information about a debt from a debt collector so you can understand what you are being asked to pay.",
      "Under federal rules, a debt collector must give you \"validation information\" — such as the name of the creditor, the amount owed, and how the amount changed over time — either in its first communication with you or within five days after it.",
      "If you dispute the debt in writing within the validation period (generally 30 days after you receive the notice), the collector must pause collection of the disputed debt until it sends you verification.",
    ],
    links: [{ href: "/debt-validation", label: "Read the full guide to debt validation" }],
  },
  {
    id: "who-may-request",
    category: "basics",
    question: "Who may request validation?",
    answer: [
      "If a debt collector contacts you about a consumer debt — a personal, family or household debt such as a credit card, medical bill or personal loan — federal law gives you the right to receive validation information and to dispute the debt.",
      "These federal rules mainly apply to third-party debt collectors and debt buyers. They generally do not apply to an original lender collecting its own debt, although other laws and your state's laws may still protect you.",
      "Anyone who has questions about a debt collection account can request an initial review with us.",
    ],
  },
  {
    id: "what-is-reviewed",
    category: "process",
    question: "What information may be reviewed?",
    answer: [
      "A review looks at the information connected to the account. Depending on what is available, that may include who is collecting the debt, the original and current creditor, the amount claimed, how the amount was calculated (interest, fees, payments and credits), the account history, the collection letters you have received, and any documentation you provide.",
      "What can be reviewed depends on what information is available. Not every account has complete records.",
    ],
    links: [{ href: "/how-it-works", label: "See how a review works" }],
  },
  {
    id: "does-it-eliminate-debt",
    category: "basics",
    question: "Does debt validation eliminate debt?",
    answer: [
      "No. Debt validation does not erase or eliminate a debt you legitimately owe.",
      "Its purpose is to make sure you have accurate information about a debt: who is collecting it, who it is owed to, and how much is claimed. If the debt is verified, the collector may continue collecting it.",
    ],
  },
  {
    id: "guaranteed-result",
    category: "basics",
    question: "Does validation guarantee a result?",
    answer: [
      "No. No one can honestly guarantee a specific result. Every account is different, and the outcome depends on the facts, the documentation that exists, and the law that applies.",
      "Be cautious of any company that promises to remove a debt, guarantees savings, or tells you to stop communicating with your creditors.",
    ],
    links: [{ href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-relief-program-and-how-do-i-know-if-i-should-use-one-en-1457/", label: "CFPB: What to know about debt relief programs", external: true }],
  },
  {
    id: "how-long",
    category: "process",
    question: "How long does a review take?",
    answer: [
      "It depends on your situation and on how quickly information about the account can be gathered. After you submit a request, we will contact you to explain the next steps and a realistic timeframe for your situation.",
      "If you dispute a debt in writing with a collector during the validation period, federal law does not set a deadline for the collector to respond. Instead, it requires the collector to stop collecting the disputed debt until it sends you verification.",
    ],
  },
  {
    id: "what-happens-next",
    category: "process",
    question: "What happens after I submit my information?",
    answer: [
      "We will contact you by phone or email, using the details you provided, to confirm your request and ask about the account.",
      "We will then explain what information may be available, what was found, and what next steps may be open to you. You decide whether to take any next step.",
      "Submitting a request does not create an obligation and does not guarantee any result.",
    ],
  },
  {
    id: "fees",
    category: "costs-privacy",
    question: "Is there a fee?",
    answer: feeAnswer,
    links: [{ href: "https://www.ftc.gov/business-guidance/resources/debt-relief-services-telemarketing-sales-rule-guide-business", label: "FTC: Rules on fees for debt relief services", external: true }],
  },
  {
    id: "what-to-provide",
    category: "process",
    question: "What information should I provide?",
    answer: [
      "To start, we only need your name, your contact details, your state, and a general description of the debt — the type of debt and an approximate amount.",
      "It helps to have any letters or notices from the debt collector nearby when we talk. Please do not enter your Social Security number, full account numbers, bank details or passwords on this website. We will never ask for them through a web form.",
    ],
  },
  {
    id: "is-it-secure",
    category: "costs-privacy",
    question: "Is my information secure?",
    answer: [
      "Your form is sent over an encrypted (HTTPS) connection. We collect only what is needed to respond to your request, and we do not sell your personal information.",
      "Our Privacy Policy explains exactly what we collect, how it is used, and the choices you have.",
    ],
    links: [{ href: "/privacy", label: "Read the Privacy Policy" }],
  },
  {
    id: "documentation-unavailable",
    category: "process",
    question: "What happens if documentation is unavailable?",
    answer: [
      "Sometimes records are incomplete — for example, when a debt has been sold several times. If information is missing, we will tell you what could and could not be found.",
      "Missing documentation does not automatically mean a debt is not owed. It is one of the facts to understand as you consider your options, and you may want to talk with a licensed attorney about what it means in your state.",
    ],
  },
  {
    id: "legal-advice",
    category: "costs-privacy",
    question: "Is this legal advice?",
    answer: legalAdviceAnswer,
    links: [{ href: "/disclaimer", label: "Read our full disclaimer" }],
  },
  {
    id: "sued",
    category: "basics",
    question: "What if I have been sued over a debt?",
    answer: [
      "Do not ignore a lawsuit. If you receive court papers, respond by the deadline listed on them. If you do not respond, the court may enter a judgment against you.",
      "Talk with a licensed attorney as soon as possible. A validation review is not a substitute for responding to a lawsuit.",
    ],
    links: [{ href: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-when-a-debt-collector-contacts-me-en-1695/", label: "CFPB: What to do when a debt collector contacts you", external: true }],
  },
  {
    id: "old-debt",
    category: "basics",
    question: "What if the debt is very old?",
    answer: [
      "Each state sets a time limit, called a statute of limitations, for suing over a debt. Under federal rules, a debt collector may not sue or threaten to sue you over a debt that is past that limit.",
      "An old debt does not simply disappear, however, and collectors may still ask you to pay it. In some states, making a payment or acknowledging an old debt can restart the time limit, so it is wise to understand your situation before you pay.",
    ],
    links: [{ href: "/resources/old-debts-and-time-limits", label: "Read our guide to old debts and time limits" }],
  },
];

export const homeFaqIds = [
  "what-is-debt-validation",
  "does-it-eliminate-debt",
  "guaranteed-result",
  "what-happens-next",
  "fees",
  "legal-advice",
];

export function faqPlainText(item: FaqItem) {
  return item.answer.join(" ");
}
