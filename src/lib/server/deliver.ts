import "server-only";
import { buildConsultationEmail, getEmailConfig, sendLeadEmail, type ConsultationLead } from "./lead-email";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };
type Kind = "consultation_request" | "contact_message";

const discardAllowed = () => process.env.NODE_ENV !== "production" || process.env.ALLOW_LEAD_DISCARD === "true";

/** Posts a submission to LEAD_WEBHOOK_URL (optional CRM/automation destination). */
async function sendWebhook(url: string, kind: Kind, data: Record<string, unknown>, submittedAt: Date): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ type: kind, submittedAt: submittedAt.toISOString(), data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[${kind}] webhook responded with status ${res.status}`);
      return false;
    }
    return true;
  } catch {
    console.error(`[${kind}] webhook request failed`);
    return false;
  }
}

/**
 * Delivers a validated submission. Personal information is never written to server logs.
 *
 * Consultation requests:
 *   - Primary destination: email to Telemasterindia@gmail.com (RESEND_API_KEY + LEAD_EMAIL_FROM).
 *     If the email is not sent, delivery fails — the customer never sees a false success.
 *   - Optional: also posted to LEAD_WEBHOOK_URL. Once the email has been sent, a webhook
 *     failure is logged but does not fail the request (avoids duplicate leads on retry).
 *   - In production, email must be configured (unless ALLOW_LEAD_DISCARD=true for testing).
 *
 * Contact messages keep the existing webhook-only behaviour.
 */
export async function deliverSubmission(kind: Kind, data: Record<string, unknown>): Promise<DeliveryResult> {
  const submittedAt = new Date();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (kind === "consultation_request") {
    const emailConfig = getEmailConfig();
    if (emailConfig) {
      const email = buildConsultationEmail(data as ConsultationLead, submittedAt, emailConfig.from);
      if (!(await sendLeadEmail(email, emailConfig))) return { ok: false, reason: "failed" };
      if (webhookUrl && !(await sendWebhook(webhookUrl, kind, data, submittedAt))) {
        console.error(`[${kind}] lead emailed; optional webhook delivery failed`);
      }
      return { ok: true };
    }
    if (!discardAllowed()) {
      console.error(`[${kind}] email delivery is not configured (RESEND_API_KEY / LEAD_EMAIL_FROM); submission rejected.`);
      return { ok: false, reason: "not_configured" };
    }
    // Development or explicit ALLOW_LEAD_DISCARD testing: fall through to the existing behaviour below.
  }

  if (!webhookUrl) {
    if (discardAllowed()) {
      console.info(`[${kind}] accepted without delivery (no delivery destination configured). Contents not logged.`);
      return { ok: true };
    }
    console.error(`[${kind}] LEAD_WEBHOOK_URL is not configured; submission rejected.`);
    return { ok: false, reason: "not_configured" };
  }

  return (await sendWebhook(webhookUrl, kind, data, submittedAt)) ? { ok: true } : { ok: false, reason: "failed" };
}
