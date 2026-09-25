import { ImageResponse } from "next/og";
import { pages } from "@/lib/seo/pages";
import { resources } from "@/lib/content/resources";
import { siteConfig } from "@/lib/site-config";

const headlines: Record<string, string> = {
  ...Object.fromEntries(Object.entries(pages).map(([key, p]) => [key === "home" ? "home" : p.path.slice(1), p.ogHeadline])),
  ...Object.fromEntries(resources.map((r) => [`resource-${r.slug}`, r.title])),
};

export function generateStaticParams() {
  return Object.keys(headlines).map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headline = headlines[slug];
  if (!headline) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #040d1f 0%, #0e2445 60%, #0f4a3a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}>
            Greenlight<span style={{ color: "#86efac", marginLeft: 12 }}>Debt Relief</span>
          </div>
          <div style={{ fontSize: 24, color: "#b9c6da", marginTop: 6 }}>{siteConfig.descriptor}</div>
        </div>
        <div style={{ fontSize: headline.length > 48 ? 60 : 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 980, letterSpacing: -1.5 }}>
          {headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#86efac" }}>
          <div style={{ width: 40, height: 3, background: "#86efac" }} />
          Free consultation · Customized plans · greenlightdebtrelief.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
