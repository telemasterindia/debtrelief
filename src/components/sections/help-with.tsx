import Link from "next/link";
import { helpWith } from "@/lib/content/greenlight";
import { servicesIndexPath } from "@/lib/content/services";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function HelpWith() {
  return (
    <section aria-labelledby="help-title" className="bg-canvas py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="help-title"
          align="center"
          eyebrow="Debt relief & financial options"
          title="What We Help With."
          className="reveal"
        />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {helpWith.map((h) => (
            <li key={h.title} className="reveal rounded-[var(--radius-card)] border border-line bg-white p-7 text-center shadow-[var(--shadow-card)]">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon name={h.icon} className="size-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{h.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">{h.text}</p>
            </li>
          ))}
        </ul>
        <p className="reveal mt-10 text-center text-lg">
          <Link href={servicesIndexPath} className="link inline-flex min-h-11 items-center gap-1.5">
            Explore all services
            <Icon name="arrowRight" className="size-5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
