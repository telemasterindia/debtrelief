import "server-only";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

/**
 * Delivers a validated submission to the configured webhook.
 * Personal information is never written to server logs.
 */
export async function deliverSubmission(kind: "consultation_request" | "contact_message", data: Record<string, unknown>): Promise<DeliveryResult> {
  const url = process.env.LEAD_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production" || process.env.ALLOW_LEAD_DISCARD === "true") {
      console.info(`[${kind}] accepted without delivery (no LEAD_WEBHOOK_URL configured). Contents not logged.`);
      return { ok: true };
    }
    console.error(`[${kind}] LEAD_WEBHOOK_URL is not configured; submission rejected.`);
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ type: kind, submittedAt: new Date().toISOString(), data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[${kind}] webhook responded with status ${res.status}`);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch {
    console.error(`[${kind}] webhook request failed`);
    return { ok: false, reason: "failed" };
  }
}
