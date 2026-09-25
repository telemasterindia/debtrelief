import { NextResponse, type NextRequest } from "next/server";

/**
 * Optional password protection for pre-launch/staging deployments.
 *
 * Set SITE_BASIC_AUTH="username:password" in the deployment environment to
 * require a login for every page. Leave it unset to disable. This is the
 * strongest way to keep a pre-launch site out of search results.
 */
const credentials = process.env.SITE_BASIC_AUTH;

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function proxy(request: NextRequest) {
  if (!credentials) return NextResponse.next();
  const header = request.headers.get("authorization") ?? "";
  const [scheme, encoded] = header.split(" ");
  if (scheme === "Basic" && encoded) {
    try {
      if (safeEqual(atob(encoded), credentials)) return NextResponse.next();
    } catch {
      // fall through to the challenge
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Greenlight Debt Relief preview", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
