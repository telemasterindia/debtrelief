"use client";

import { useRef, type ReactNode } from "react";
import { HeroVisual } from "@/components/3d/hero-visual";

/** Dark hero backdrop; the whole area acts as the pointer source for the 3D scene. */
export function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="on-dark relative isolate overflow-hidden bg-deep-900"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_75%_35%,rgb(55_129_8/0.35)_0%,rgb(22_27_23/0)_65%),radial-gradient(ellipse_60%_50%_at_10%_100%,#1f2620_0%,rgb(22_27_23/0)_60%)]"
      />
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 -z-10" />
      {children}
      <div className="container-page pointer-events-none relative -mt-6 pb-10 lg:absolute lg:inset-0 lg:mt-0 lg:flex lg:items-center lg:justify-end lg:pb-0">
        <div className="mx-auto w-full max-w-[24rem] sm:max-w-[26rem] lg:mx-0 lg:w-[48%] lg:max-w-[40rem]">
          <HeroVisual eventSource={ref} />
        </div>
      </div>
    </section>
  );
}
