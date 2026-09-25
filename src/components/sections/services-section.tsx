import { debtTypes, services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: "h2" }) {
  const [featured, ...rest] = services;
  return (
    <section aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          as={headingLevel}
          id="services-title"
          eyebrow="How Greenlight helps"
          title="Debt Relief Built Around You."
          intro={`Every ${siteConfig.name} client gets a personal plan and real people in their corner.`}
          className="reveal"
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <li className="reveal flex flex-col justify-between rounded-[var(--radius-card)] bg-navy-900 p-8 text-on-dark shadow-[var(--shadow-raised)] md:col-span-2 xl:col-span-1 xl:row-span-2">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-accent-300">
              <Icon name={featured.icon} className="size-8" />
            </span>
            <span className="mt-6 block xl:mt-10">
              <span className="block text-2xl font-bold text-white sm:text-3xl">{featured.title}</span>
              <span className="mt-3 block text-lg leading-relaxed text-on-dark">{featured.text}</span>
            </span>
          </li>
          {rest.map((s) => (
            <li key={s.title} className="reveal flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)]">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={s.icon} className="size-7" />
              </span>
              <span>
                <span className="block text-xl font-semibold text-ink">{s.title}</span>
                <span className="mt-2 block text-lg leading-relaxed text-muted">{s.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="reveal mt-16 rounded-[var(--radius-card)] border border-line bg-canvas p-7 sm:p-10">
          <h3 className="text-2xl sm:text-3xl">Debts we can help with</h3>
          <p className="mt-2 max-w-3xl text-lg text-muted">
            We focus on unsecured debt. Secured debts such as mortgages and auto loans usually aren&apos;t eligible for
            debt relief programs.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {debtTypes.map((d) => (
              <li key={d.title} className="flex gap-4">
                <Icon name={d.icon} className="mt-0.5 size-7 shrink-0 text-brand-700" />
                <span>
                  <span className="block text-lg font-semibold text-ink">{d.title}</span>
                  <span className="mt-1 block text-[1.0625rem] leading-snug text-muted">{d.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
