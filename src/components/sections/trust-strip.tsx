import { Icon, type IconName } from "@/components/ui/icon";

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: "book", title: "Plain-English explanations", text: "No legal jargon. We explain what each document means." },
  { icon: "compass", title: "A transparent process", text: "You'll know what is reviewed and what happens next." },
  { icon: "lock", title: "Careful with your information", text: "Encrypted form. We never ask for your SSN online." },
  { icon: "scale", title: "Grounded in official sources", text: "Our guides cite the CFPB, FTC and federal law." },
];

export function TrustStrip() {
  return (
    <section aria-label="Our commitments" className="relative z-10 border-b border-line bg-white">
      <div className="container-page">
        <ul className="grid divide-line py-2 sm:grid-cols-2 sm:divide-x-0 lg:grid-cols-4 lg:divide-x">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4 border-b border-line py-6 last:border-b-0 sm:border-b-0 sm:py-8 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={item.icon} className="size-6" />
              </span>
              <span>
                <span className="block text-lg font-semibold leading-snug text-ink">{item.title}</span>
                <span className="mt-1 block text-[1.0625rem] leading-snug text-muted">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
