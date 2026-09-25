/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

const situations: { icon: IconName; q: string; a: string }[] = [
  { icon: "dollar", q: "Minimum payments barely move the balance", a: "High interest can mean you pay for years without making real progress." },
  { icon: "documents", q: "Several creditors, several due dates", a: "Keeping track of multiple cards and bills every month is exhausting." },
  { icon: "phone", q: "Calls and letters from collectors", a: "You may not be sure who you owe, or how much." },
  { icon: "clock", q: "Falling behind despite your best effort", a: "A job change, medical bills or rising costs can happen to anyone." },
];

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="bg-canvas py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="problem-title"
            eyebrow="You're not alone"
            title="When Credit Card Debt Feels Overwhelming, a Plan Helps."
            intro={
              <>
                <p>Debt can happen to anyone. What matters is the next step — and understanding your real options.</p>
                <p className="mt-4 font-medium text-ink">
                  If any of these sound familiar, a free consultation can help you see where you stand.
                </p>
              </>
            }
          />
        </div>
        <ul className="reveal space-y-4">
          {situations.map((item) => (
            <li key={item.q} className="flex gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-7">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-accent-300">
                <Icon name={item.icon} className="size-7" />
              </span>
              <span>
                <span className="block text-xl font-semibold leading-snug text-ink">{item.q}</span>
                <span className="mt-1.5 block text-lg leading-relaxed text-muted">{item.a}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
