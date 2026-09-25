/*
 * CONTENT_REQUIRES_VERIFICATION
 * Step names follow the owner's brief. Descriptions were written for this redesign.
 */
import type { IconName } from "@/components/ui/icon";

export type ProcessStep = { title: string; icon: IconName; summary: string };

export const processSteps: ProcessStep[] = [
  { title: "Free Consultation", icon: "message", summary: "Call us or request a consultation online. There's no cost and no obligation." },
  { title: "Review Your Situation", icon: "search", summary: "We talk through your debts and your budget with you." },
  { title: "Explore Your Options", icon: "compass", summary: "We explain the debt-relief options that may be available to you." },
  { title: "Decide What Works for You", icon: "checkCircle", summary: "You choose whether to move forward. The decision is always yours." },
];
