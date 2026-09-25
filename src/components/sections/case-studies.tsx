import { caseStudies, caseStudyDisclaimer } from "@/lib/content/case-studies";

/** Renders only when verified case studies exist. */
export function CaseStudies() {
  const items = caseStudies.filter((c) => c.verified);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="case-studies-heading" className="mt-20">
      <h3 id="case-studies-heading" className="text-2xl sm:text-3xl">
        Individual examples
      </h3>
      <p className="mt-3 max-w-3xl text-lg text-muted">{caseStudyDisclaimer}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((c) => (
          <article key={c.id} className="rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)]">
            <p className="text-base font-semibold text-brand-700">
              {c.debtType} · {c.date}
              {c.amount ? ` · ${c.amount}` : ""}
            </p>
            <dl className="mt-4 space-y-3 text-[1.0625rem]">
              <div><dt className="font-semibold text-ink">Situation</dt><dd>{c.situation}</dd></div>
              <div><dt className="font-semibold text-ink">What was done</dt><dd>{c.actionTaken}</dd></div>
              <div><dt className="font-semibold text-ink">Documented outcome</dt><dd>{c.documentedOutcome}</dd></div>
              <div><dt className="font-semibold text-ink">Limitations</dt><dd>{c.limitations}</dd></div>
            </dl>
            <p className="mt-5 border-t border-line pt-4 text-base text-muted">Individual example — not a typical or guaranteed result.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
