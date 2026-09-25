import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Eyebrow({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-base font-semibold tracking-[0.01em]",
        dark ? "text-accent-300" : "text-brand-700",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-0.5 w-6 rounded-full", dark ? "bg-accent-300" : "bg-brand-600")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  dark,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  dark?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          "mt-3 text-[2rem] leading-[1.15] sm:text-[2.5rem]",
          Tag === "h1" && "sm:text-5xl lg:text-[3.5rem]",
          dark && "text-white",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <div className={cn("mt-5 text-lead", dark ? "text-on-dark-muted" : "text-muted")}>{intro}</div>
      )}
    </div>
  );
}
