import { services } from "@/lib/content/services";
import { Icon } from "@/components/ui/icon";

/** Quick summary of what every Greenlight client gets. */
export function TrustStrip() {
  const items = services.filter((s) => s.title !== "Creditor Negotiation");
  return (
    <section aria-label="What you get with Greenlight" className="relative z-10 border-b border-line bg-white">
      <div className="container-page">
        <ul className="grid py-2 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {items.map((item) => (
            <li key={item.title} className="flex items-center gap-4 border-b border-line py-5 last:border-b-0 sm:border-b-0 sm:py-7 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={item.icon} className="size-6" />
              </span>
              <span className="text-lg font-semibold leading-snug text-ink">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
