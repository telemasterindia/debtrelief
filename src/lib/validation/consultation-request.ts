import { z } from "zod";
import { STATE_CODES } from "./us-states";

// Our Content Security Policy disallows eval; tell Zod not to probe for it.
z.config({ jitless: true });

export const DEBT_TYPES = [
  { value: "credit_card", label: "Credit card" },
  { value: "medical", label: "Medical bill" },
  { value: "personal_loan", label: "Personal loan" },
  { value: "collection_account", label: "Collection account" },
  { value: "multiple", label: "Several types of debt" },
  { value: "other", label: "Other or not sure" },
] as const;

export const DEBT_AMOUNTS = [
  { value: "under_5k", label: "Under $5,000" },
  { value: "5k_10k", label: "$5,000 – $10,000" },
  { value: "10k_25k", label: "$10,000 – $25,000" },
  { value: "25k_50k", label: "$25,000 – $50,000" },
  { value: "over_50k", label: "More than $50,000" },
  { value: "unsure", label: "I'm not sure" },
] as const;

export const COLLECTOR_CONTACT = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "I'm not sure" },
] as const;

type Options = readonly { value: string; label: string }[];
const values = <T extends Options>(o: T) => o.map((x) => x.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Please enter your ${label}.`)
    .max(60, `Your ${label} must be 60 characters or fewer.`)
    .regex(/^[\p{L}][\p{L}\p{M}' .-]*$/u, `Please use letters only in your ${label}.`);

export const basicInfoSchema = z.object({
  firstName: name("first name"),
  lastName: name("last name"),
});

export const debtInfoSchema = z.object({
  debtType: z.enum(values(DEBT_TYPES), { error: "Please choose the type of debt." }),
  debtAmount: z.enum(values(DEBT_AMOUNTS), { error: "Please choose an approximate total." }),
  collectorContact: z.enum(values(COLLECTOR_CONTACT), {
    error: "Please tell us whether a debt collector has contacted you.",
  }),
  state: z.enum(STATE_CODES, { error: "Please choose the state where you live." }),
  details: z
    .string()
    .trim()
    .max(1000, "Please keep additional details under 1,000 characters.")
    .optional()
    .or(z.literal("")),
});

/** Normalizes a US phone number to 10 digits, or returns null if invalid. */
export function normalizeUsPhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  // Area code and exchange cannot start with 0 or 1 under the North American Numbering Plan.
  if (/^[01]/.test(digits) || /^[01]/.test(digits.slice(3))) return null;
  return digits;
}

export const contactInfoSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "That email address is too long.")
    .email("Please enter a complete email address, like name@example.com."),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .refine((v) => normalizeUsPhone(v) !== null, "Please enter a 10-digit U.S. phone number, like (555) 555-0123."),
});

export const consentSchema = z.object({
  consentContact: z.literal(true, {
    error: "Please check this box so we can contact you about your request.",
  }),
  consentTerms: z.literal(true, {
    error: "Please confirm you have read the Privacy Policy and Terms.",
  }),
  consentSms: z.boolean().optional(),
});

export const consultationRequestSchema = basicInfoSchema
  .extend(debtInfoSchema.shape)
  .extend(contactInfoSchema.shape)
  .extend(consentSchema.shape);

export type ConsultationRequest = z.infer<typeof consultationRequestSchema>;

export const consultationSteps = [
  { id: "basic", title: "About you", schema: basicInfoSchema },
  { id: "debt", title: "Your debt", schema: debtInfoSchema },
  { id: "contact", title: "How to reach you", schema: contactInfoSchema },
  { id: "consent", title: "Review and consent", schema: consentSchema },
] as const;

export const stepFields = consultationSteps.map((s) => Object.keys(s.schema.shape)) as string[][];

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "Please shorten your name."),
  email: contactInfoSchema.shape.email,
  message: z
    .string()
    .trim()
    .min(10, "Please write a short message (at least 10 characters).")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
