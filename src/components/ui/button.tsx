import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./icon";

type Variant = "primary" | "secondary" | "onDark" | "ghostDark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-center rounded-[var(--radius-control)] font-semibold tracking-[-0.005em] transition-[background-color,color,box-shadow,transform] duration-200 select-none disabled:cursor-not-allowed disabled:opacity-60 motion-safe:active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.2)_inset,0_8px_20px_-8px_rgb(19_122_61/0.7)] hover:bg-brand-700",
  secondary: "bg-white text-ink ring-2 ring-inset ring-line-strong hover:ring-ink hover:bg-canvas",
  onDark: "bg-white text-navy-900 hover:bg-brand-50 shadow-[0_8px_24px_-10px_rgb(0_0_0/0.6)]",
  ghostDark: "bg-white/5 text-white ring-2 ring-inset ring-white/35 hover:bg-white/12 hover:ring-white/70",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5 text-[1.0625rem]",
  lg: "min-h-14 px-7 text-lg",
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

export function ButtonLink({
  variant = "primary",
  size = "lg",
  arrow,
  children,
  className,
  ...rest
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Icon name="arrowRight" className="size-5 shrink-0" />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  arrow,
  children,
  className,
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Icon name="arrowRight" className="size-5 shrink-0" />}
    </button>
  );
}
