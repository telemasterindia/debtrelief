import Link from "next/link";
import { whyGreenlight } from "@/lib/content/greenlight";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyGreenlight() {
  return (
    <section aria-labelledby="why-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal">
          <SectionHeading id="why-title" eyebrow="Why Greenlight" title="Real People Who Take the Time to Help." />
          {/* About Greenlight — brief company information */}
          <div className="mt-8 rounded-[var(--radius-card)] bg-canvas p-7">
            <h3 className="text-xl font-semibold">About {siteConfig.name}</h3>
            <p className="mt-3 text-lg leading-relaxed text-body">
              {siteConfig.foundingYear
                ? `${siteConfig.name} has been helping consumers explore debt-relief options since ${siteConfig.foundingYear}.`
                : `${siteConfig.name} helps consumers explore debt-relief options for credit card and unsecured debt.`}
            </p>
            <Link href="/about" className="link mt-4 inline-flex min-h-12 items-center gap-2 text-lg">
              More about us
              <Icon name="arrowRight" className="size-5" />
            </Link>
          </div>
        </div>
        <ul className="reveal grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {whyGreenlight.map((w) => (
            <li key={w.title} className="border-t-2 border-ink pt-5">
              <Icon name={w.icon} className="size-7 text-brand-700" />
              <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
