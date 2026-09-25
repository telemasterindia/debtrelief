import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

/**
 * The official Greenlight Debt Relief logo.
 *
 * The logo exists only as a full-colour version for light backgrounds (its
 * "DEBT RELIEF" wordmark is charcoal), so it is only ever placed on white or
 * light surfaces. It is never recoloured, filtered, stretched or cropped; its
 * height is set and the width follows the intrinsic 382 × 235 aspect ratio.
 */
export function Logo({ className, heightClass = "h-[3.75rem] sm:h-[4.5rem]" }: { className?: string; heightClass?: string }) {
  const { logo } = siteConfig;
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center rounded-lg py-1.5", className)}>
      {logo ? (
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={`${logo.alt} — home`}
          priority
          sizes="(min-width: 640px) 118px, 98px"
          className={cn("w-auto", heightClass)}
        />
      ) : (
        <span className="whitespace-nowrap text-[1.1875rem] font-bold text-ink sm:text-[1.375rem]">
          {siteConfig.name}
          <span className="sr-only"> — home</span>
        </span>
      )}
    </Link>
  );
}
