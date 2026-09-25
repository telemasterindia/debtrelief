import { NextResponse } from "next/server";
import { normalizeUsPhone, reviewRequestSchema } from "@/lib/validation/review-request";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { deliverSubmission } from "@/lib/server/deliver";

export async function POST(request: Request) {
  if (!rateLimit(`review:${clientKey(request)}`)) {
    return NextResponse.json(
      { ok: false, message: "We received several requests from your connection. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We could not read your request. Please try again." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = reviewRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some information needs to be corrected. Please review the highlighted fields.",
        fieldErrors: Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])),
      },
      { status: 422 },
    );
  }

  const data = { ...parsed.data, phone: normalizeUsPhone(parsed.data.phone) };
  const result = await deliverSubmission("review_request", data);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "We could not send your request right now. Please try again in a few minutes." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
