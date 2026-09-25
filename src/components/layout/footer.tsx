import Link from "next/link";
import { legalNav, primaryNav } from "@/lib/navigation";
import { operatorName, siteConfig } from "@/lib/site-config";
import { resources } from "@/lib/content/resources";
import { TrackedLink } from "@/components/ui/tracked-link";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { address, phone, phoneDisplay, email, hours } = siteConfig;

  return (
    <footer className="on-dark bg-navy-950 text-on-dark" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-on-dark-muted">
            Credit card and unsecured debt relief with customized plans, creditor negotiation, a dedicated account manager
            and live online access.
          </p>
          <div className="mt-6 space-y-2 text-[1.0625rem] text-on-dark-muted">
            {siteConfig.legalName && <p>Operated by {siteConfig.legalName}</p>}
            {address && (
              <address className="not-italic">
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            )}
            {phone && phoneDisplay && (
              <p>
                <TrackedLink href={`tel:${phone}`} event="phone_click" params={{ location: "footer" }} className="font-semibold text-white underline">
                  {phoneDisplay}
                </TrackedLink>
                {hours && <span className="block">{hours}</span>}
              </p>
            )}
            {email && (
              <p>
                <TrackedLink href={`mailto:${email}`} event="email_click" params={{ location: "footer" }} className="font-semibold text-white underline">
                  {email}
                </TrackedLink>
              </p>
            )}
          </div>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white">Company</h3>
            <ul className="mt-4 space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[1.0625rem] text-on-dark-muted hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/free-consultation" className="inline-flex min-h-11 items-center text-[1.0625rem] font-semibold text-accent-300 hover:text-white hover:underline">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white">Guides</h3>
            <ul className="mt-4 space-y-1">
              {resources.map((r) => (
                <li key={r.slug}>
                  <Link href={`/resources/${r.slug}`} className="inline-flex min-h-11 items-center py-1 text-[1.0625rem] leading-snug text-on-dark-muted hover:text-white hover:underline">
                    {r.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white">Legal</h3>
            <ul className="mt-4 space-y-1">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-[1.0625rem] text-on-dark-muted hover:text-white hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-base font-semibold uppercase tracking-[0.08em] text-white">Official help</h3>
            <ul className="mt-4 space-y-1">
              <li>
                <a href="https://www.consumerfinance.gov/complaint/" rel="noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center text-[1.0625rem] text-on-dark-muted hover:text-white hover:underline">
                  CFPB complaints<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="https://reportfraud.ftc.gov/" rel="noopener noreferrer" target="_blank" className="inline-flex min-h-11 items-center text-[1.0625rem] text-on-dark-muted hover:text-white hover:underline">
                  Report fraud to the FTC<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/12">
        <div className="container-page space-y-4 py-10 text-base leading-relaxed text-on-dark-muted">
          <p>
            <strong className="font-semibold text-white">Important:</strong> The information on this website is general
            and educational.{" "}
            {siteConfig.isLawFirm ? "It is not legal advice for your specific situation." : `${siteConfig.name} is not a law firm and does not provide legal advice.`}{" "}
            Results vary and are not guaranteed; creditors are not required to settle. Debt relief may hurt your credit,
            creditors may continue collection efforts, and forgiven debt may be taxable. Not all debts are eligible. If you
            have been sued, please contact a licensed attorney.
          </p>
          <p>
            {siteConfig.name} is not affiliated with the Consumer Financial Protection Bureau, the Federal Trade Commission
            or any government agency. Links to government websites are provided for your reference.
          </p>
          <p>
            © {year} {operatorName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
