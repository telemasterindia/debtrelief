import type { IconName } from "@/components/ui/icon";

export type ProcessStep = { title: string; icon: IconName; summary: string; details: string[] };

export const processSteps: ProcessStep[] = [
  {
    title: "Free Consultation",
    icon: "message",
    summary: "Talk with a Greenlight consultant about your debts, your budget and your goals. We look at your situation before recommending anything.",
    details: [
      "A review of your debts and monthly budget",
      "An honest answer about whether our program may fit",
      "No cost and no obligation",
    ],
  },
  {
    title: "Your Customized Plan",
    icon: "compass",
    summary: "If our program is a good fit, we build a plan around a monthly amount you can afford.",
    details: [
      "Built around your budget, not a template",
      "Timeframe, fees and terms explained in writing before you enroll",
      "You decide whether to enroll",
    ],
  },
  {
    title: "We Negotiate With Creditors",
    icon: "scale",
    summary: "We work directly with your creditors to try to reach settlements for less than the full balance you owe.",
    details: [
      "Your dedicated account manager keeps you informed",
      "Each settlement is explained to you, and you agree before it is final",
      "Results vary — creditors are not required to settle",
    ],
  },
  {
    title: "Track Progress & Move Forward",
    icon: "checkCircle",
    summary: "Follow your progress anytime with live online access as you work toward financial freedom.",
    details: [
      "Live online access to your program",
      "Updates as each debt is resolved",
      "Support from your account manager throughout",
    ],
  },
];
