import type { ComponentType } from "react";
import DebtValidationLetter from "./debt-validation-letter";
import DebtCollectorContactedYou from "./debt-collector-contacted-you";
import OldDebts from "./old-debts-and-time-limits";
import SpotScams from "./spot-debt-collection-scams";

export const articleBodies: Record<string, ComponentType> = {
  "debt-validation-letter": DebtValidationLetter,
  "debt-collector-contacted-you": DebtCollectorContactedYou,
  "old-debts-and-time-limits": OldDebts,
  "spot-debt-collection-scams": SpotScams,
};
