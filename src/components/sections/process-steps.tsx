import { processSteps } from "@/lib/content/process";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/tracked-link";

export function ProcessSteps({ headingLevel = "h2", showCta = true }: { headingLevel?: "h1" | "h2"; showCta?: boolean }) {
  return (
    <section aria-labelledby="process-title" className="on-dark relative isolate overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#124536_0%,rgba(8,23,49,0)_70%)]" />
      <div className="container-page">
        <SectionHeading
          as={headingLevel}
          id="process-title"
          dark
          align="center"
          eyebrow="How it works"
          title="How It Works, in Four Simple Steps."
          intro="Here is what happens, step by step."
          className="reveal"
        />

        <div className="relative mt-16">
        {/* Connecting rail (desktop): a static line with a slow light pulse travelling along it. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-[3.5rem] hidden h-px bg-gradient-to-r from-accent-400/10 via-accent-300/50 to-accent-400/10 lg:block">
          <span className="absolute -top-px left-0 h-[3px] w-24 rounded-full bg-gradient-to-r from-transparent via-accent-300 to-transparent motion-safe:animate-[rail_6s_linear_infinite]" />
        </div>
        <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-5 [perspective:1400px]">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="reveal group relative flex flex-col rounded-[var(--radius-card)] border border-white/12 bg-gradient-to-b from-navy-800 to-navy-900 p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] transition-transform duration-500 motion-safe:hover:[transform:rotateX(4deg)_translateY(-4px)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#22a35a,#0d5f2f)] text-white shadow-[0_0_0_6px_rgb(8_23_49),0_0_24px_rgb(74_222_128/0.4)]">
                  <Icon name={step.icon} className="size-7" />
                </span>
                <span className="text-lg font-semibold text-accent-300">Step {i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl text-white">{step.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-on-dark">{step.summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-white/12 pt-5">
                {step.details.map((d) => (
                  <li key={d} className="flex gap-3 text-[1.0625rem] leading-snug text-on-dark-muted">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-accent-300" />
                    {d}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        </div>

        {showCta && (
          <div className="reveal mt-14 flex flex-col items-center gap-4 text-center">
            <CtaButton href="/free-consultation" location="after_process" variant="onDark" arrow>
              Get My Free Consultation
            </CtaButton>
            <p className="max-w-xl text-[1.0625rem] text-on-dark-muted">
              A consultation does not create any obligation. Results vary and are not guaranteed.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
