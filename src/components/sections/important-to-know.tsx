import { disclosures } from "@/lib/content/disclosures";
import { sources } from "@/lib/content/sources";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

/** Always-visible, plain-English disclosures about how debt relief works. */
export function ImportantToKnow() {
  return (
    <section aria-labelledby="know-title" className="bg-canvas py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal">
          <SectionHeading
            id="know-title"
            eyebrow="Honest answers"
            title="Important Things to Know Before You Enroll."
            intro="Debt relief can help many people, but it has trade-offs. We want you to understand them up front — not after you sign."
          />
        </div>
        <ul className="reveal grid gap-4">
          {disclosures.map((d) => {
            const src = sources[d.source];
            return (
              <li key={d.title} className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6">
                <Icon name="info" className="mt-0.5 size-7 shrink-0 text-brand-700" />
                <div>
                  <h3 className="text-xl font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-lg leading-relaxed text-body">{d.text}</p>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex min-h-10 items-center gap-1.5 text-base">
                    Source: {src.publisher}
                    <Icon name="external" className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
