import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon, type IconName } from "./icon";

type Tone = "info" | "notice" | "success";

const tones: Record<Tone, { box: string; icon: IconName; iconColor: string }> = {
  info: { box: "bg-brand-50 border-brand-100 text-ink", icon: "info", iconColor: "text-brand-700" },
  notice: { box: "bg-notice-50 border-[#f1dca6] text-ink", icon: "alert", iconColor: "text-notice-800" },
  success: { box: "bg-success-50 border-[#bfe3cc] text-ink", icon: "checkCircle", iconColor: "text-success-700" },
};

/** Always-visible callout for important information and disclosures. */
export function Notice({
  tone = "info",
  title,
  children,
  className,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div className={cn("flex gap-4 rounded-[var(--radius-card)] border p-5 sm:p-6", t.box, className)}>
      <Icon name={t.icon} className={cn("mt-0.5 size-7 shrink-0", t.iconColor)} />
      <div className="text-[1.0625rem] leading-relaxed sm:text-lg">
        {title && <p className="font-semibold text-ink">{title}</p>}
        <div className={cn(title && "mt-1", "text-body")}>{children}</div>
      </div>
    </div>
  );
}
