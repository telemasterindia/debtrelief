/*
 * CONTENT_REQUIRES_VERIFICATION
 * Step names and descriptions as provided in the owner's brief.
 */
import type { IconName } from "@/components/ui/icon";

export type ProcessStep = { title: string; icon: IconName; summary: string };

export const processSteps: ProcessStep[] = [
  { title: "Free Consultation", icon: "message", summary: "Tell us about your situation." },
  {
    title: "Review Your Situation",
    icon: "search",
    summary: "Our team reviews your information and helps you understand the options that may be available.",
  },
  { title: "Explore Your Options", icon: "compass", summary: "We explain the available path based on your circumstances." },
  { title: "Decide Your Next Step", icon: "checkCircle", summary: "You decide whether you want to move forward." },
];
