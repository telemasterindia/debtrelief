import { sanitizeParams, type AnalyticsEventMap, type AnalyticsEventName } from "./events";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Vendor-neutral event tracking. Events are pushed to `window.dataLayer`
 * (compatible with Google Tag Manager and most tag managers) and dispatched as a
 * DOM `CustomEvent` named "analytics" so any other integration can subscribe.
 * No analytics vendor is loaded by default.
 */
export function track<E extends AnalyticsEventName>(event: E, params: AnalyticsEventMap[E]) {
  if (typeof window === "undefined") return;
  const payload = { event, ...sanitizeParams(params as Record<string, unknown>) };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("analytics", { detail: payload }));
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
