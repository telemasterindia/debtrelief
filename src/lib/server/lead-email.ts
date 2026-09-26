import "server-only";
import {
  COLLECTOR_CONTACT,
  DEBT_AMOUNTS,
  DEBT_TYPES,
  type ConsultationRequest,
} from "@/lib/validation/consultation-request";
import { US_STATES } from "@/lib/validation/us-states";

/** Every consultation lead is emailed here. */
export const LEAD_RECIPIENT = "Telemasterindia@gmail.com";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type LeadEmail = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
};

/** A validated consultation request as delivered by the API route (phone already normalized). */
export type ConsultationLead = Omit<ConsultationRequest, "phone"> & { phone: string | null };

/** Escapes text for safe inclusion in HTML (element content and attribute values). */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Removes line breaks so user input can never alter email headers such as the subject. */
function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim();
}

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? value;

const formatPhone = (digits: string | null) =>
  digits && digits.length === 10 ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}` : (digits ?? "—");

const yesNo = (v: boolean | undefined) => (v ? "Yes" : "No");

type Row = { label: string; value: string };
type Section = { title: string; rows: Row[] };

/** Converts a validated lead into a readable email (HTML + plain text). */
export function buildConsultationEmail(lead: ConsultationLead, submittedAt: Date, from: string): LeadEmail {
  const fullName = singleLine(`${lead.firstName} ${lead.lastName}`);
  const stateName = US_STATES.find(([code]) => code === lead.state)?.[1] ?? lead.state;
  const submitted = submittedAt.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long",
  });

  const sections: Section[] = [
    {
      title: "Contact details",
      rows: [
        { label: "First name", value: lead.firstName },
        { label: "Last name", value: lead.lastName },
        { label: "Email", value: lead.email },
        { label: "Phone", value: formatPhone(lead.phone) },
        { label: "State", value: `${stateName} (${lead.state})` },
      ],
    },
    {
      title: "Debt information",
      rows: [
        { label: "Debt type", value: labelFor(DEBT_TYPES, lead.debtType) },
        { label: "Approximate amount", value: labelFor(DEBT_AMOUNTS, lead.debtAmount) },
        { label: "Contacted by a debt collector", value: labelFor(COLLECTOR_CONTACT, lead.collectorContact) },
        { label: "Additional information", value: lead.details?.trim() ? lead.details.trim() : "(none provided)" },
      ],
    },
    {
      title: "Consent",
      rows: [
        { label: "Consent to be contacted (phone/email)", value: yesNo(lead.consentContact) },
        { label: "Read Privacy Policy and Terms", value: yesNo(lead.consentTerms) },
        { label: "Consent to text messages (SMS)", value: yesNo(lead.consentSms) },
      ],
    },
    {
      title: "Submission",
      rows: [
        { label: "Submitted", value: submitted },
        { label: "Submitted (UTC, ISO 8601)", value: submittedAt.toISOString() },
        { label: "Source", value: "Free consultation form (/free-consultation)" },
      ],
    },
  ];

  const htmlSections = sections
    .map(
      (s) => `
      <h2 style="margin:28px 0 8px;font-size:18px;color:#2e6e06;">${escapeHtml(s.title)}</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:15px;">
        ${s.rows
          .map(
            (r) => `<tr>
          <td style="padding:8px 12px 8px 0;border-bottom:1px solid #e3e7e3;color:#4a514c;width:40%;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e3e7e3;color:#222222;white-space:pre-wrap;vertical-align:top;">${escapeHtml(r.value)}</td>
        </tr>`,
          )
          .join("")}
      </table>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#222222;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-top:6px solid #378108;border-radius:8px;padding:28px;">
    <h1 style="margin:0;font-size:22px;">New Free Consultation Lead</h1>
    <p style="margin:8px 0 0;font-size:16px;color:#4a514c;">${escapeHtml(fullName)} requested a free consultation.</p>
    ${htmlSections}
  </div>
</body></html>`;

  const text = [
    "New Free Consultation Lead",
    `${fullName} requested a free consultation.`,
    ...sections.flatMap((s) => ["", s.title.toUpperCase(), ...s.rows.map((r) => `${r.label}: ${r.value}`)]),
  ].join("\n");

  return {
    from,
    to: [LEAD_RECIPIENT],
    subject: `New Free Consultation Lead — ${fullName}`,
    html,
    text,
    // Lets the team reply straight to the customer. Validated as an email address.
    reply_to: singleLine(lead.email),
  };
}

export type EmailConfig = { apiKey: string; from: string };

/** Server-side email configuration, or null when email delivery is not configured. */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_EMAIL_FROM?.trim();
  return apiKey && from ? { apiKey, from } : null;
}

/** Sends an email through the Resend HTTPS API. Never throws; never logs lead contents or credentials. */
export async function sendLeadEmail(email: LeadEmail, config: EmailConfig): Promise<boolean> {
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[consultation_request] email provider responded with status ${res.status}`);
      return false;
    }
    return true;
  } catch (err) {
    const reason = err instanceof Error && err.name === "TimeoutError" ? "timed out" : "request failed";
    console.error(`[consultation_request] email provider ${reason}`);
    return false;
  }
}
