import { helpWith } from "@/lib/content/greenlight";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/tracked-link";

export function HelpWith() {
  return (
    <section aria-labelledby="help-title" className="bg-canvas py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="help-title"
          align="center"
          eyebrow="What we can help with"
          title="Help With Credit Card and Unsecured Debt."
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
        <div className="reveal mt-12 text-center">
          <CtaButton href="/free-consultation" location="help_with" arrow>
            Get My Free Consultation
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
