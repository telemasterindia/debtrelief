import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { pageMetadata } from "@/lib/seo/metadata";
import { pages } from "@/lib/seo/pages";
import { siteConfig } from "@/lib/site-config";

const page = pages.disclaimer;
export const metadata: Metadata = pageMetadata(page, "disclaimer");

/**
 * Business disclosures. Kept short and separate from the marketing pages.
 * LEGAL REVIEW REQUIRED before launch (see README).
 */
export default function DisclaimerPage() {
  const { name } = siteConfig;
  return (
    <LegalPage path={page.path} title="Disclaimer & Disclosures" description={page.description}>
      <ul>
        <li>
          <strong>No guaranteed results.</strong> Results vary from person to person. {name} does not guarantee that any
          debt will be settled or reduced, that you will receive any offer, or that you will save any particular amount.
        </li>
        <li>
          <strong>Your decision.</strong> Any options or offers that become available through {name} are for you to
          consider. Whether to move forward is always your choice, and all terms are explained in writing before you agree
          to anything.
        </li>
        <li>
          <strong>Not all debts qualify.</strong> Debt-relief options generally apply to unsecured debts such as credit
          cards and unsecured loans.
        </li>
        <li>
          <strong>Possible effects.</strong> Debt-relief programs can affect your credit, and forgiven debt may have tax
          consequences. Your consultant will explain what may apply to you before you decide.
        </li>
        <li>
          <strong>Not legal or tax advice.</strong> {siteConfig.isLawFirm ? "" : `${name} is not a law firm. `}Information
          on this website is general and is not legal, tax or financial advice.
        </li>
      </ul>
      <p>
        Questions? <Link href="/contact">Contact us</Link>
        {siteConfig.phoneDisplay ? ` or call ${siteConfig.phoneDisplay}` : ""}.
      </p>
    </LegalPage>
  );
}
