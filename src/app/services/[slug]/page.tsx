import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { CtaButton } from "@/components/ui/tracked-link";
import { consultationCta } from "@/lib/navigation";
import { allServices, findService, serviceDisclaimer, servicePath, servicesIndexPath } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo/metadata";
import { graph, webPageSchema } from "@/lib/seo/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findService((await params).slug);
  if (!found) return {};
  const { service } = found;
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: servicePath(service.slug),
    ogImagePath: "/og/services",
  });
}

const steps = [
  { title: "Tell us about your situation", text: "Share a few details in a free, no-obligation consultation." },
  { title: "Understand your options", text: "Our team walks you through the options that may be available." },
  { title: "Choose your next step", text: "You decide how you'd like to move forward — with no pressure." },
];

function BulletList({ items, icon }: { items: string[]; icon: "check" | "info" | "document" }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-lg leading-relaxed text-body">
          <Icon name={icon} className="mt-1 size-5 shrink-0 text-brand-700" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function ServicePage({ params }: Props) {
  const found = findService((await params).slug);
  if (!found) notFound();
  const { service, group } = found;
  const path = servicePath(service.slug);
  const related = group.services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={graph(webPageSchema({ path, name: service.title, description: service.description }))} />
      <PageHeader
        compact
        crumbs={[
          { name: "Services", path: servicesIndexPath },
          { name: service.title, path },
        ]}
        eyebrow={group.title}
        title={service.title}
        intro={service.description}
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CtaButton href={consultationCta.href} location={`service_${service.slug}_hero`} variant="primaryOnDark" arrow>
            Explore Your Options
          </CtaButton>
          {siteConfig.phone && siteConfig.phoneDisplay && (
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-white underline-offset-4 hover:underline"
            >
              <Icon name="phone" className="size-5 text-accent-300" />
              Call {siteConfig.phoneDisplay}
            </a>
          )}
        </div>
      </PageHeader>

      <section aria-labelledby="service-overview-title" className="bg-canvas py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <div>
              <h2 id="service-overview-title" className="text-[1.75rem] sm:text-3xl">
                What is {service.title.replace(" / ", " and ")}?
              </h2>
              {service.overview.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-body">
                  {p}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl sm:text-[1.75rem]">Who it may help</h2>
              <BulletList items={service.mayHelp} icon="check" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-[1.75rem]">How it works with Greenlight</h2>
              <ol className="mt-6 space-y-6">
                {steps.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="mt-1 text-lg leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="text-2xl">Things to consider</h2>
                <BulletList items={service.consider} icon="info" />
              </div>
              <div>
                <h2 className="text-2xl">What to have ready</h2>
                <BulletList items={service.haveReady} icon="document" />
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] lg:sticky lg:top-32">
              <h2 className="text-xl">Talk it through with our team</h2>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                A free consultation can help you understand what may be available for your situation.
              </p>
              <CtaButton href={consultationCta.href} location={`service_${service.slug}_sidebar`} arrow className="mt-5 w-full">
                {consultationCta.label}
              </CtaButton>

              {related.length > 0 && (
                <nav aria-labelledby="related-title" className="mt-8 border-t border-line pt-6">
                  <h2 id="related-title" className="text-lg">
                    Related in {group.title}
                  </h2>
                  <ul className="mt-2 divide-y divide-line">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <Link href={servicePath(s.slug)} className="flex min-h-13 items-center justify-between gap-3 py-2.5 text-lg font-medium text-ink hover:text-brand-700">
                          {s.title}
                          <Icon name="chevronRight" className="size-5 shrink-0 text-brand-700" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <Link href={servicesIndexPath} className="link mt-4 inline-flex min-h-11 items-center text-lg">
                View all services
              </Link>
            </div>
          </aside>
        </div>
        <p className="container-page mt-14 text-base text-muted">{serviceDisclaimer}</p>
      </section>

      <FinalCta
        title="Let's Look at Your Situation"
        body="Every financial situation is different. A consultation can help you understand which options may be available based on your circumstances."
        location={`service_${service.slug}`}
      />
    </>
  );
}
