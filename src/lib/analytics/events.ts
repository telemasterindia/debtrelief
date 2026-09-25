/**
 * Analytics event contract.
 *
 * Privacy rule: events describe *what the visitor did*, never *who they are* or
 * *what they owe*. No names, emails, phone numbers, free text, debt types,
 * amounts or states are ever sent. Only the allow-listed keys below survive.
 */
export type AnalyticsEventMap = {
  cta_click: { location: string; label: string };
  form_started: { form: "consultation" | "contact" };
  form_step_completed: { form: "consultation"; step: number };
  form_validation_error: { form: "consultation" | "contact"; step?: number; field: string };
  form_submitted: { form: "consultation" | "contact" };
  form_submit_failed: { form: "consultation" | "contact"; reason: "network" | "server" | "rejected" };
  faq_toggle: { question_id: string; open: boolean };
  phone_click: { location: string };
  email_click: { location: string };
  outbound_source_click: { source: string };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

const ALLOWED_KEYS = new Set([
  "location",
  "label",
  "form",
  "step",
  "field",
  "reason",
  "question_id",
  "open",
  "source",
]);

// Field names that must never be reported as values (defence in depth).
const MAX_VALUE_LENGTH = 80;

export function sanitizeParams(params: Record<string, unknown>): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (!ALLOWED_KEYS.has(key)) continue;
    if (typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    } else if (typeof value === "string") {
      // Strip anything that looks like an email address or a long digit sequence.
      if (/@/.test(value) || /\d{4,}/.test(value)) continue;
      out[key] = value.slice(0, MAX_VALUE_LENGTH);
    }
  }
  return out;
}
