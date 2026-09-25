import type { ComponentType } from "react";
import DebtValidationLetter from "./debt-validation-letter";
import DebtCollectorContactedYou from "./debt-collector-contacted-you";
import OldDebts from "./old-debts-and-time-limits";
import SpotScams from "./spot-debt-collection-scams";
import DebtReliefWhatToKnow from "./debt-relief-what-to-know";

export const articleBodies: Record<string, ComponentType> = {
  "debt-relief-what-to-know": DebtReliefWhatToKnow,
  "debt-validation-letter": DebtValidationLetter,
  "debt-collector-contacted-you": DebtCollectorContactedYou,
  "old-debts-and-time-limits": OldDebts,
  "spot-debt-collection-scams": SpotScams,
};
