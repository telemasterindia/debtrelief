import type { IconName } from "@/components/ui/icon";

/** Greenlight Debt Relief's services, as described on the existing website. */
export const services: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "message",
    title: "Free Consultation",
    text: "Start with a no-cost, no-obligation conversation about your debts, your budget and the options that may fit.",
  },
  {
    icon: "compass",
    title: "Customized Plans",
    text: "Your plan is built around your situation and a monthly amount you can afford — not a one-size-fits-all program.",
  },
  {
    icon: "scale",
    title: "Creditor Negotiation",
    text: "We work directly with your creditors to try to reduce what you owe on credit cards and other unsecured debts.",
  },
  {
    icon: "user",
    title: "Dedicated Account Manager",
    text: "Your main point of contact, who answers your questions and keeps you informed from start to finish.",
  },
  {
    icon: "lock",
    title: "Live Online Access",
    text: "Check where your program stands through your secure online account.",
  },
];

export const debtTypes: { icon: IconName; title: string; text: string }[] = [
  { icon: "dollar", title: "Credit cards", text: "Balances on bank and store credit cards." },
  { icon: "documents", title: "Medical bills", text: "Unpaid hospital, doctor and other medical bills." },
  { icon: "document", title: "Personal loans", text: "Unsecured personal and signature loans." },
  { icon: "inbox", title: "Other unsecured debt", text: "Other debts not backed by property. We'll confirm which of yours may qualify." },
];
