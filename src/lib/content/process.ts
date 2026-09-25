/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */
import type { IconName } from "@/components/ui/icon";

export type ProcessStep = { title: string; icon: IconName; summary: string; details: string[] };

export const processSteps: ProcessStep[] = [
  {
    title: "Free Consultation",
    icon: "message",
    summary: "Call us or request a consultation online. There is no cost and no obligation.",
    details: ["Talk with a Greenlight consultant", "Ask any question you have"],
  },
  {
    title: "Review Your Situation",
    icon: "search",
    summary: "We look at your debts, your income and your monthly budget together.",
    details: ["We tell you honestly if our program may fit", "We tell you which debts may qualify"],
  },
  {
    title: "Build a Customized Plan",
    icon: "compass",
    summary: "If the program fits, we build a plan around a monthly amount you can afford.",
    details: ["Fees and timeframe explained in writing", "You decide whether to enroll"],
  },
  {
    title: "Work Toward Resolving Your Debt",
    icon: "checkCircle",
    summary: "We negotiate with your creditors, and you follow your progress online.",
    details: ["Your account manager keeps you informed", "You agree to each settlement first"],
  },
];
