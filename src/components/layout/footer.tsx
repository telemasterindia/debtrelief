import Link from "next/link";
import { consultationCta, legalNav, primaryNav } from "@/lib/navigation";
import { operatorName, siteConfig } from "@/lib/site-config";
import { TrackedLink } from "@/components/ui/tracked-link";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";

export function Footer() {
  const year = new Date().getFullYear();
  const { address, phone, phoneDisplay, email, hours } = siteConfig;
  const linkClass = "inline-flex min-h-11 items-center text-[1.0625rem] text-body hover:text-brand-700 hover:underline";

  return (
    <footer className="border-t border-line bg-white text-body" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo heightClass="h-20" />
          <p className="mt-6 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
            Helping people explore their options for credit card and unsecured debt.
          </p>
          <ul className="mt-6 space-y-2 text-[1.0625rem]">
            {phone && phoneDisplay && (
              <li className="flex items-center gap-3">
                <Icon name="phone" className="size-5 shrink-0 text-brand-700" />
                <span>
                  <TrackedLink href={`tel:${phone}`} event="phone_click" params={{ location: "footer" }} className="inline-flex min-h-11 items-center font-semibold text-brand-700 underline underline-offset-4 hover:text-ink">
                    {phoneDisplay}
                  </TrackedLink>
                  {hours && <span className="block text-muted">{hours}</span>}
                </span>
              </li>
            )}
            {email && (
              <li className="flex items-center gap-3">
                <Icon name="mail" className="size-5 shrink-0 text-brand-700" />
                <TrackedLink href={`mailto:${email}`} event="email_click" params={{ location: "footer" }} className="inline-flex min-h-11 items-center break-all font-semibold text-brand-700 underline underline-offset-4 hover:text-ink">
                  {email}
                </TrackedLink>
              </li>
            )}
            {address && (
              <li>
                <address className="not-italic text-muted">
                  {address.street}, {address.city}, {address.region} {address.postalCode}
                </address>
              </li>
            )}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
          <div>
            <h3 className="text-lg font-semibold text-ink">Company</h3>
            <ul className="mt-4 space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={consultationCta.href} className="inline-flex min-h-11 items-center text-[1.0625rem] font-semibold text-brand-700 hover:text-ink hover:underline">
                  {consultationCta.label}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">Legal</h3>
            <ul className="mt-4 space-y-1">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-line bg-canvas">
        <div className="container-page space-y-3 py-8 text-[1.0625rem] leading-relaxed text-muted">
          <p>
            Results vary and are not guaranteed. Not all debts qualify. Any decision to move forward is yours.{" "}
            <Link href="/disclaimer" className="font-medium text-brand-700 underline underline-offset-4 hover:text-ink">
              See disclosures
            </Link>
            .
          </p>
          <p>
            © {year} {operatorName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
