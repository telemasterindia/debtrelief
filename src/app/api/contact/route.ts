import { NextResponse } from "next/server";
import { contactMessageSchema } from "@/lib/validation/review-request";
import { clientKey, rateLimit } from "@/lib/server/rate-limit";
import { deliverSubmission } from "@/lib/server/deliver";

export async function POST(request: Request) {
  if (!rateLimit(`contact:${clientKey(request)}`)) {
    return NextResponse.json(
      { ok: false, message: "We received several messages from your connection. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "We could not read your message. Please try again." }, { status: 400 });
  }
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }
  const parsed = contactMessageSchema.safeParse(body);
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
  const result = await deliverSubmission("contact_message", parsed.data);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "We could not send your message right now. Please try again in a few minutes." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true });
}
