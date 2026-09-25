import Image from "next/image";
import { proofDisclaimer, proofItems } from "@/lib/content/proof";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * "Still not convinced? See the results for yourself." — Greenlight's existing
 * proof (Proof 1–4). Shows only genuine assets configured in lib/content/proof.ts.
 * Missing assets appear as labelled placeholders in development and the section
 * is hidden in production until at least one asset is added.
 */
export function ProofSection() {
  const available = proofItems.filter((p) => p.image);
  const showPlaceholders = process.env.NODE_ENV !== "production";
  if (available.length === 0 && !showPlaceholders) return null;
  const items = showPlaceholders ? proofItems : available;

  return (
    <section aria-labelledby="proof-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="proof-title"
          align="center"
          eyebrow="Client results"
          title="Still Not Convinced? See the Results for Yourself."
          className="reveal"
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id} className="reveal">
              {p.image ? (
                <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)]">
                  <Image src={p.image.src} width={p.image.width} height={p.image.height} alt={p.image.alt} className="h-auto w-full" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  <figcaption className="border-t border-line p-4 text-base">
                    <span className="font-semibold text-ink">{p.label}</span>
                    {p.caption && <span className="block text-muted">{p.caption}</span>}
                  </figcaption>
                </figure>
              ) : (
                <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-danger-700 bg-danger-50 p-6 text-center">
                  <p className="text-lg font-bold text-danger-700">{p.label}</p>
                  <p className="mt-2 text-base text-body">
                    Missing asset. Add the original {p.label} image from greenlightdebtrelief.com — see public/proof/README.md.
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-danger-700">Development placeholder</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="reveal mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-muted">{proofDisclaimer}</p>
      </div>
    </section>
  );
}
