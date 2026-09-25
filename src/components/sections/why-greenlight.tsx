import { valueStatement, whyGreenlight } from "@/lib/content/greenlight";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

/** Compact "why contact Greenlight" section — directly after the hero. */
export function WhyGreenlight({ tone = "white" }: { tone?: "white" | "canvas" }) {
  return (
    <section aria-labelledby="why-title" className={`${tone === "canvas" ? "bg-canvas" : "bg-white"} py-20 sm:py-24`}>
      <div className="container-page">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow="Why Greenlight"
          title="You Don't Have to Figure This Out Alone."
          intro={valueStatement}
          className="reveal"
        />
        <ul className="mx-auto mt-14 grid max-w-6xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {whyGreenlight.map((w) => (
            <li key={w.title} className="reveal flex gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={w.icon} className="size-6" />
              </span>
              <span>
                <h3 className="text-xl font-semibold">{w.title}</h3>
                <p className="mt-1.5 text-lg leading-relaxed text-muted">{w.text}</p>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
