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
          background: "linear-gradient(135deg, #040d1f 0%, #0e2445 60%, #173a73 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#0b57d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="44" height="44" viewBox="0 0 40 40">
              <path d="M13 9.5h9.5l5.5 5.5v14a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2v-17.5a2 2 0 0 1 2-2z" fill="#fff" />
              <circle cx="26" cy="26.5" r="6" fill="#081731" />
              <path d="m23.4 26.6 1.8 1.8 3.4-3.6" fill="none" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{siteConfig.name}</div>
            <div style={{ fontSize: 24, color: "#b9c6da" }}>{siteConfig.descriptor}</div>
          </div>
        </div>
        <div style={{ fontSize: headline.length > 48 ? 60 : 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 980, letterSpacing: -1.5 }}>
          {headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#7dd3fc" }}>
          <div style={{ width: 40, height: 3, background: "#7dd3fc" }} />
          Plain-English information for U.S. consumers
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
