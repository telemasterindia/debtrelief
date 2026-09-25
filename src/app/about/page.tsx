/*
 * CONTENT_REQUIRES_VERIFICATION
 * Company description written from the owner's brief. Replace with Greenlight's
 * existing About Us wording where it differs.
 */
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { WhyGreenlight } from "@/components/sections/why-greenlight";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { graph, webPageSchema } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site-config";

const page = pages.about;
export const metadata: Metadata = pageMetadata(page, "about");

export default function AboutPage() {
  const { name, foundingYear } = siteConfig;
  const answers = [
    {
      q: "Who we are",
      a: `${name} helps consumers explore options for managing credit card and other unsecured debt.`,
    },
    ...(foundingYear
      ? [{ q: "How long we've been around", a: `We've been working in the debt-relief industry since ${foundingYear}.` }]
      : []),
    {
      q: "What we do",
      a: "Our experienced team reviews your situation, helps you understand the options available to you, and works through the process with you.",
    },
    {
      q: "Why contact us",
      a: "Debt can be complicated. You don't need to become an expert — our team deals with these situations every day and can help you decide the next step that's right for you.",
    },
  ];
  return (
    <>
      <JsonLd data={graph(webPageSchema({ path: page.path, name: page.title, description: page.description, type: "AboutPage" }))} />
      <PageHeader
        compact
        crumbs={[{ name: "About", path: page.path }]}
        title={`About ${name}`}
        intro={
          foundingYear
            ? `Helping consumers explore debt-relief options since ${foundingYear}.`
            : "Helping consumers explore options for credit card and unsecured debt."
        }
      />
      <section aria-label="About us" className="py-16 sm:py-20">
        <div className="container-page">
          <dl className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            {answers.map((item) => (
              <div key={item.q} className="reveal rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                <dt className="text-xl font-semibold text-ink">{item.q}</dt>
                <dd className="mt-2 text-lg leading-relaxed text-body">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <WhyGreenlight tone="canvas" />
      <FinalCta location="about_final" />
    </>
  );
}
