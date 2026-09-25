"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics/track";
import type { AnalyticsEventMap } from "@/lib/analytics/events";
import { ButtonLink } from "./button";

type TrackProps =
  | { event: "cta_click"; params: AnalyticsEventMap["cta_click"] }
  | { event: "phone_click"; params: AnalyticsEventMap["phone_click"] }
  | { event: "email_click"; params: AnalyticsEventMap["email_click"] };

export function TrackedLink({ event, params, onClick, ...rest }: TrackProps & ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, params as never);
        onClick?.(e);
      }}
    />
  );
}

export function CtaButton({
  location,
  onClick,
  ...rest
}: { location: string } & ComponentProps<typeof ButtonLink>) {
  return (
    <ButtonLink
      {...rest}
      onClick={(e) => {
        track("cta_click", { location, label: typeof rest.children === "string" ? rest.children : "cta" });
        onClick?.(e);
      }}
    />
  );
}
