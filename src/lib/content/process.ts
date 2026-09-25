import type { IconName } from "@/components/ui/icon";

export type ProcessStep = { title: string; icon: IconName; summary: string; details: string[] };

export const processSteps: ProcessStep[] = [
  {
    title: "Submit Information",
    icon: "inbox",
    summary: "Answer a few short questions about the debt and tell us how to reach you. It takes just a few minutes.",
    details: [
      "Your name, state and contact details",
      "The type of debt and an approximate amount",
      "Whether a debt collector has contacted you",
      "No Social Security number or account numbers",
    ],
  },
  {
    title: "Information Is Reviewed",
    icon: "search",
    summary: "We read what you shared and contact you to understand your situation and the letters you have received.",
    details: [
      "We confirm your request by phone or email",
      "We ask what notices or letters you have",
      "We note any deadlines, such as the dispute date",
    ],
  },
  {
    title: "Documentation Is Evaluated",
    icon: "documents",
    summary: "Available documentation and account information are looked at carefully, piece by piece.",
    details: [
      "Who is collecting, and who the debt is owed to",
      "How the amount is itemized over time",
      "What information is present — and what is missing",
    ],
  },
  {
    title: "Understand Your Next Steps",
    icon: "compass",
    summary: "We explain what was found, in plain English, and the steps that may be available to you. You decide what to do.",
    details: [
      "A clear summary of what was and wasn't found",
      "Options that may be available in your situation",
      "No pressure and no obligation",
    ],
  },
];
