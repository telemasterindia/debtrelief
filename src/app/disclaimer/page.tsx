import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";

const page = pages.disclaimer;
export const metadata: Metadata = pageMetadata(page, "disclaimer");

export default function DisclaimerPage() {
  return (
    <LegalPage path={page.path} title="Legal & Educational Disclaimer" description={page.description}>
      <h2 style={{ marginTop: 0 }}>Educational information, not legal advice</h2>
      <p>
        The information on this website is general and educational. It describes federal rules that apply to many debt
        collection situations in the United States. It is not legal advice, and it may not apply to your situation.
      </p>
      {!siteConfig.isLawFirm && (
        <p>
          <strong>{siteConfig.name} is not a law firm.</strong> We do not provide legal advice or legal representation, and
          no attorney-client relationship is created by using this website or requesting a review.
        </p>
      )}

      <h2>No guaranteed results</h2>
      <p>
        Debt validation is a way to get accurate information about a debt. It does not eliminate a debt that is legitimately
        owed. Requesting a review does not guarantee that any debt will be removed, reduced, settled or found invalid, or
        that any particular outcome will occur. Results depend on the facts of each account, the documentation available
        and the laws that apply.
      </p>
      <p>
        If we ever publish an example of an individual situation, it will be clearly labeled as an individual example — not
        a typical or guaranteed result.
      </p>

      <h2>Your deadlines still apply</h2>
      <p>
        Requesting a review does not pause or extend any deadline. This includes the dispute date in a debt collector&apos;s
        validation notice and any deadline to respond to a lawsuit. <strong>If you have been sued, respond by the
        court&apos;s deadline and contact a licensed attorney.</strong>
      </p>

      <h2>State laws differ</h2>
      <p>
        Many states have their own debt collection and consumer protection laws, and time limits for lawsuits vary by state
        and type of debt. For advice about the laws that apply to you, please consult a licensed attorney in your state.
      </p>

      <h2>No government affiliation</h2>
      <p>
        {siteConfig.name} is not affiliated with, endorsed by or acting on behalf of the Consumer Financial Protection
        Bureau, the Federal Trade Commission or any government agency. We link to their public resources for your
        reference.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work to keep our information accurate and up to date, and we cite official sources. Laws and guidance can
        change. Each guide shows the date it was last reviewed. If you believe something is out of date, please{" "}
        <Link href="/contact">let us know</Link>.
      </p>
    </LegalPage>
  );
}
