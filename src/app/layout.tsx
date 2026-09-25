import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { SkipLink } from "@/components/accessibility/skip-link";
import { RevealObserver } from "@/components/accessibility/reveal-observer";
import { JsonLd } from "@/components/seo/json-ld";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo/structured-data";
import { siteConfig, siteUrl } from "@/lib/site-config";
import { pages } from "@/lib/seo/pages";

// Self-hosted Inter (latin subset, variable weight). next/font preloads it and generates a
// size-adjusted fallback so text does not shift when the font arrives.
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.name} — ${siteConfig.descriptor}`, template: `%s | ${siteConfig.name}` },
  description: pages.home.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so reveal animations never hide content without JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <RevealObserver />
      </body>
    </html>
  );
}
