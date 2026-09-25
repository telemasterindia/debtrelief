import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={className}>
      <rect width="40" height="40" rx="10" fill="#0b57d0" />
      <path d="M13 9.5h9.5l5.5 5.5v14a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2v-17.5a2 2 0 0 1 2-2z" fill="#fff" />
      <path d="M22.5 9.5V15H28" fill="none" stroke="#9cc0ff" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 18.5h7M15 22h5" stroke="#9fb3d1" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="26" cy="26.5" r="6" fill="#081731" />
      <path d="m23.4 26.6 1.8 1.8 3.4-3.6" fill="none" stroke="#7dd3fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3 rounded-lg", className)}>
      <LogoMark className="size-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.3125rem] font-bold tracking-[-0.02em]", dark ? "text-white" : "text-ink")}>
          {siteConfig.name}
        </span>
        <span className={cn("mt-1 text-[0.875rem] font-medium", dark ? "text-on-dark-muted" : "text-muted")}>
          {siteConfig.descriptor}
        </span>
      </span>
      <span className="sr-only">— home</span>
    </Link>
  );
}
