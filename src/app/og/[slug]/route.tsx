import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { pages } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";

const headlines: Record<string, string> = {
  ...Object.fromEntries(Object.entries(pages).map(([key, p]) => [key === "home" ? "home" : p.path.slice(1), p.ogHeadline])),
};

export function generateStaticParams() {
  return Object.keys(headlines).map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headline = headlines[slug];
  if (!headline) return new Response("Not found", { status: 404 });
  const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/greenlight-logo.png")).toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#ffffff",
          borderTop: "14px solid #378108",
          color: "#222222",
          fontFamily: "sans-serif",
        }}
      >
        {/* Official logo at its intrinsic 382 × 235 aspect ratio */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={229} height={141} alt="Greenlight Debt Relief" />
        <div style={{ fontSize: headline.length > 48 ? 58 : 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000, letterSpacing: -1.5 }}>
          {headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, color: "#2e6e06" }}>
          <div style={{ width: 44, height: 4, background: "#378108" }} />
          {siteConfig.consultationIsFree ? "Free consultation" : "Consultation"} · {siteConfig.phoneDisplay ?? "greenlightdebtrelief.com"}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
