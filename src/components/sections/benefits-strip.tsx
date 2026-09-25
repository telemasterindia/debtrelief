import { benefits } from "@/lib/content/greenlight";
import { Icon } from "@/components/ui/icon";

/** Greenlight's four headline benefits, directly under the hero. */
export function BenefitsStrip() {
  return (
    <section aria-label={`Why people choose Greenlight`} className="relative z-10 border-b border-line bg-white">
      <div className="container-page">
        <ul className="grid gap-x-8 py-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <li key={b.title} className="flex gap-4 border-b border-line py-6 last:border-b-0 sm:border-b-0 lg:py-8">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={b.icon} className="size-6" />
              </span>
              <span>
                <span className="block text-lg font-semibold leading-snug text-ink">{b.title}</span>
                <span className="mt-1 block text-[1.0625rem] leading-snug text-muted">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
