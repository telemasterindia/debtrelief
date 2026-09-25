import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FinalCta } from "@/components/sections/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Icon } from "@/components/ui/icon";
import { Notice } from "@/components/ui/notice";
import { SourceList } from "@/components/ui/source-list";
import { CtaButton } from "@/components/ui/tracked-link";
import { noticeContents } from "@/lib/content/validation";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { articleSchema, graph, webPageSchema } from "@/lib/seo/structured-data";

const page = pages.debtValidation;
export const metadata: Metadata = pageMetadata(page, "debt-validation");

const toc = [
  { id: "meaning", label: "What debt validation means" },
  { id: "notice", label: "The validation notice" },
  { id: "timeline", label: "Key dates and deadlines" },
  { id: "dispute", label: "How to dispute or ask questions" },
  { id: "who", label: "Who the rules apply to" },
  { id: "limits", label: "What validation does not do" },
  { id: "help", label: "How Greenlight can help" },
];

export default function DebtValidationPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: page.path, name: page.title, description: page.description }),
          articleSchema({ path: page.path, headline: page.title, description: page.description, datePublished: "2026-09-25", dateModified: "2026-09-25" }),
        )}
      />
      <PageHeader
        crumbs={[{ name: "Debt Validation", path: page.path }]}
        eyebrow="Guide"
        title="What Is Debt Validation?"
        intro="A plain-English explanation of your right to information about a debt in collection — based on federal law and guidance from the Consumer Financial Protection Bureau."
        meta="Last reviewed September 25, 2026 · About 8 minutes to read"
      />

      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-base font-semibold uppercase tracking-[0.08em] text-muted">On this page</p>
          <ol className="mt-4 space-y-1 border-l-2 border-line">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="-ml-0.5 flex min-h-11 items-center border-l-2 border-transparent py-1 pl-4 text-[1.0625rem] leading-snug text-body hover:border-brand-600 hover:text-brand-700">
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0">
          <div className="prose-readable">
            <h2 id="meaning" style={{ marginTop: 0 }}>What debt validation means</h2>
            <p>
              When a debt collector contacts you, federal law gives you the right to basic information about the debt. This
              is called <strong>validation information</strong>. It helps you answer three simple questions: Is this my
              debt? Who is it owed to? And is the amount correct?
            </p>
            <p>
              &quot;Debt validation&quot; describes this whole process — receiving that information, reviewing it, and, if
              something is wrong or unclear, disputing the debt or asking for more details.
            </p>

            <h2 id="notice">The validation notice</h2>
            <p>
              A debt collector must give you validation information either in its first communication with you or within
              five days after it. Most collectors send it as a letter called a <strong>validation notice</strong>. Under the
              federal debt collection rule (Regulation F), it generally includes:
            </p>
          </div>

          <ul className="mt-6 grid max-w-[44rem] gap-3 sm:grid-cols-2">
            {noticeContents.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-line bg-canvas p-4 text-[1.0625rem] leading-snug">
                <Icon name="check" className="mt-0.5 size-5 shrink-0 text-success-700" />
                {item}
              </li>
            ))}
          </ul>

          <div className="prose-readable mt-8">
            <p>
              The &quot;itemization date&quot; is a reference date the collector chooses from a short list set by the rule —
              such as the last statement date or the charge-off date. It lets you see how the amount has changed since then.
            </p>
            <p>
              <Link href="/resources/debt-validation-letter">Read our line-by-line guide to the validation notice.</Link>
            </p>

            <h2 id="timeline">Key dates and deadlines</h2>
          </div>

          <ol className="mt-6 max-w-[44rem] space-y-0">
            {[
              { when: "First contact", what: "The collector calls, writes, emails or texts you about the debt." },
              { when: "Within 5 days", what: "If the first message didn't include it, the collector must send the validation information." },
              { when: "About 30 days after you receive the notice", what: "The validation period ends. The notice shows the exact date. Disputing in writing before then gives you the strongest protection." },
              { when: "After that date", what: "You can still dispute or ask questions, but the collector is not required to pause collection in the same way." },
            ].map((s, i, arr) => (
              <li key={s.when} className="relative flex gap-5 pb-8 last:pb-0">
                {i < arr.length - 1 && <span aria-hidden="true" className="absolute left-[1.1rem] top-10 h-[calc(100%-2.5rem)] w-0.5 bg-line" />}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-base font-bold text-accent-300">{i + 1}</span>
                <div>
                  <p className="text-xl font-semibold text-ink">{s.when}</p>
                  <p className="mt-1 text-lg leading-relaxed">{s.what}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="prose-readable mt-10">
            <h2 id="dispute">How to dispute or ask questions</h2>
            <p>
              If you do not recognize the debt, believe the amount is wrong, or need more information, you can dispute the
              debt or request the name and address of the original creditor. The validation notice explains how.
            </p>
            <p>
              If you do this <strong>in writing, before the validation period ends</strong>, the collector must stop
              collecting the disputed debt until it sends you verification of the debt (or the original creditor&apos;s name
              and address).
            </p>
            <ul>
              <li>Keep a copy of everything you send and receive.</li>
              <li>Consider sending letters by certified mail with a return receipt.</li>
              <li>The CFPB offers free sample letters you can adapt.</li>
            </ul>
            <p>
              Not disputing a debt does not mean you admit that you owe it. Under the law, a court may not treat your failure
              to dispute as an admission of liability.
            </p>

            <h2 id="who">Who the rules apply to</h2>
            <p>
              These federal rules apply to <strong>debt collectors</strong> — generally, companies that collect debts owed to
              someone else, including debt buyers. They usually do not apply to the original lender collecting its own
              debt. They cover <strong>consumer debts</strong>: personal, family or household debts such as credit cards,
              medical bills and personal loans.
            </p>
            <p>Your state may have additional protections.</p>
          </div>

          <div id="limits" className="scroll-mt-28">
            <Notice tone="notice" title="What validation does not do" className="mt-12 max-w-[44rem]">
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>It does not erase or eliminate a debt you legitimately owe.</li>
                <li>It does not guarantee any outcome.</li>
                <li>If the collector verifies the debt, it may continue collecting.</li>
                <li>It does not replace responding to a lawsuit. If you are sued, respond by the court&apos;s deadline.</li>
              </ul>
            </Notice>
          </div>

          <div className="prose-readable">
            <h2 id="help">How Greenlight can help</h2>
            <p>
              If you are struggling with credit card or other unsecured debt, Greenlight Debt Relief can talk through your
              options in a free consultation — including whether a customized debt relief plan may fit your situation.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaButton href="/free-consultation" location="debt_validation_page" arrow>
              Get My Free Consultation
            </CtaButton>
            <CtaButton href="/how-it-works" location="debt_validation_page_secondary" variant="secondary">
              How It Works
            </CtaButton>
          </div>

          <SourceList
            className="mt-14 max-w-[44rem] rounded-[var(--radius-card)] border border-line bg-canvas p-6"
            ids={["regF34", "cfpbValidationInfo", "fdcpa1692g", "ftcDebtCollectionFaqs", "cfpbWhatToDo"]}
          />
        </article>
      </div>
      <FinalCta location="debt_validation_final" />
    </>
  );
}
