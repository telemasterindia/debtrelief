import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { disclosures } from "@/lib/content/disclosures";
import { sources } from "@/lib/content/sources";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";

const page = pages.disclaimer;
export const metadata: Metadata = pageMetadata(page, "disclaimer");

export default function DisclaimerPage() {
  return (
    <LegalPage path={page.path} title="Disclaimer & Important Disclosures" description={page.description}>
      <h2 style={{ marginTop: 0 }}>About debt relief</h2>
      <p>Please read these points before deciding whether a debt relief program is right for you.</p>
      {disclosures.map((d) => (
        <div key={d.title}>
          <h3>{d.title}</h3>
          <p>
            {d.text}{" "}
            <a href={sources[d.source].url} target="_blank" rel="noopener noreferrer">
              Source: {sources[d.source].publisher}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      ))}
      <h3>Not all debts are eligible</h3>
      <p>
        Debt relief programs generally work with unsecured debts such as credit cards. Secured debts, such as mortgages and
        auto loans, usually are not eligible. We will tell you during your consultation which of your debts may qualify.
      </p>
      <h3>Client results</h3>
      <p>
        Any client results shown on this website are individual results. They are not typical or guaranteed, and your
        results will depend on your debts, your creditors and your ability to complete the program.
      </p>

      <h2>Educational information, not legal or tax advice</h2>
      <p>
        The guides on this website are general and educational. They describe federal rules that apply to many debt
        situations in the United States. They are not legal or tax advice and may not apply to your situation.
      </p>
      {!siteConfig.isLawFirm && (
        <p>
          <strong>{siteConfig.name} is not a law firm.</strong> We do not provide legal advice or legal representation, and
          no attorney-client relationship is created by using this website or requesting a consultation.
        </p>
      )}

      <h2>Your deadlines still apply</h2>
      <p>
        Requesting a consultation does not pause or extend any deadline, including any deadline to respond to a lawsuit.{" "}
        <strong>If you have been sued, respond by the court&apos;s deadline and contact a licensed attorney.</strong>
      </p>

      <h2>State laws differ</h2>
      <p>
        Many states have their own debt relief, debt collection and consumer protection laws. For advice about the laws that
        apply to you, please consult a licensed attorney in your state.
      </p>

      <h2>No government affiliation</h2>
      <p>
        {siteConfig.name} is not affiliated with, endorsed by or acting on behalf of the Consumer Financial Protection
        Bureau, the Federal Trade Commission, the IRS or any government agency. We link to their public resources for your
        reference.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work to keep our information accurate and up to date, and we cite official sources. Laws and guidance can change.
        If you believe something is out of date, please <Link href="/contact">let us know</Link>.
      </p>
    </LegalPage>
  );
}
