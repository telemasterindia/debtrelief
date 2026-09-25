import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

/**
 * Greenlight Debt Relief brand lock-up.
 *
 * Uses the official logo from `siteConfig.logo` when it is provided. Until then
 * the company name is shown as plain text — no substitute logo is drawn.
 */
export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  const { logo } = siteConfig;
  return (
    <Link href="/" className={cn("inline-flex min-h-12 items-center rounded-lg", className)}>
      {logo ? (
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={`${logo.alt} — home`}
          priority
          className={cn("h-11 w-auto", dark && "rounded-md bg-white px-2 py-1")}
        />
      ) : (
        <span className="flex flex-col leading-none">
          <span className={cn("whitespace-nowrap text-[1.1875rem] font-bold tracking-[-0.02em] sm:text-[1.375rem]", dark ? "text-white" : "text-ink")}>
            Greenlight<span className={dark ? "text-accent-300" : "text-brand-600"}> Debt Relief</span>
          </span>
          <span className="sr-only"> — home</span>
        </span>
      )}
    </Link>
  );
}
