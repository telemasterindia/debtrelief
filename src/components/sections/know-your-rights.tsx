import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/** Links the educational debt-validation content from debt relief pages. */
export function KnowYourRights() {
  const links = [
    { href: "/debt-validation", title: "What is debt validation?", text: "Your right to information about a debt in collection." },
    { href: "/resources/debt-collector-contacted-you", title: "A collector contacted you", text: "A calm checklist for the first few days." },
    { href: "/resources/spot-debt-collection-scams", title: "Avoid scams", text: "Warning signs of fake collectors and debt relief scams." },
  ];
  return (
    <section aria-labelledby="rights-title" className="on-dark bg-navy-900 py-16 sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="reveal">
          <p className="text-base font-semibold text-accent-300">Free guides</p>
          <h2 id="rights-title" className="mt-2 text-[2rem] text-white sm:text-4xl">Know Your Rights With Debt Collectors.</h2>
          <p className="mt-4 text-lg leading-relaxed text-on-dark">
            Plain-English guides based on federal law and official CFPB and FTC guidance — free to read.
          </p>
        </div>
        <ul className="reveal grid gap-4 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-white/15 bg-white/[0.04] p-6 transition-colors hover:bg-white/[0.08]">
                <span className="text-xl font-semibold text-white">{l.title}</span>
                <span className="mt-2 flex-1 text-[1.0625rem] leading-snug text-on-dark-muted">{l.text}</span>
                <span className="mt-4 inline-flex items-center gap-2 font-semibold text-accent-300">
                  Read the guide
                  <Icon name="arrowRight" className="size-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
