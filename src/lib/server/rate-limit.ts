/**
 * Minimal in-memory fixed-window rate limiter. Suitable for a single instance;
 * behind multiple serverless instances it limits per instance only, so pair it
 * with platform-level protection (e.g. a WAF rule) in production.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

const DEFAULT_LIMIT = Number(process.env.FORM_RATE_LIMIT) || 5;

export function rateLimit(key: string, limit = DEFAULT_LIMIT, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 10_000) {
      for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
    }
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
