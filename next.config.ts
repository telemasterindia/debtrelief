import type { NextConfig } from "next";
import { indexingEnabled, noIndexValue } from "./src/lib/seo/indexing";

const isProd = process.env.NODE_ENV === "production";

// A conservative Content Security Policy. Next.js injects small inline bootstrap
// scripts, so 'unsafe-inline' is required for scripts unless nonces are adopted.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  // YouTube: the official Greenlight video thumbnail and privacy-enhanced embed.
  "img-src 'self' data: blob: https://i.ytimg.com",
  "frame-src https://www.youtube-nocookie.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/request-review", destination: "/free-consultation", permanent: true },
      // Educational pages removed from the site; send any old links to the homepage.
      ...["/debt-relief", "/debt-validation", "/resources", "/resources/:slug*"].map((source) => ({
        source,
        destination: "/",
        permanent: false,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Primary pre-launch indexing control: applies to every response, including
          // images, PDFs and API routes that cannot carry a <meta> tag.
          ...(indexingEnabled ? [] : [{ key: "X-Robots-Tag", value: noIndexValue }]),
          ...(isProd
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
