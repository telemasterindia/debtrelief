"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type RefObject } from "react";
import { detectSceneMode, type SceneMode } from "./capabilities";
import { HeroFallback } from "./hero-fallback";

// Three.js is only ever downloaded on devices that will render it, and only after
// the page is interactive — it never blocks reading the hero text.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

export function HeroVisual({ eventSource }: { eventSource?: RefObject<HTMLElement | null> }) {
  const [mode, setMode] = useState<SceneMode | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = () => setMode(detectSceneMode());
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 300);
    return () => window.clearTimeout(t);
  }, []);

  // Pause rendering when the hero is scrolled out of view.
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  const show3d = mode?.kind === "3d";

  return (
    <div ref={wrap} className="relative aspect-square w-full" aria-hidden="true">
      <HeroFallback
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${show3d && ready ? "opacity-0" : "opacity-100"}`}
      />
      {show3d && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene
            quality={mode.quality}
            reducedMotion={mode.reducedMotion}
            active={active}
            eventSource={eventSource}
            onReady={() => requestAnimationFrame(() => setReady(true))}
            onFallback={() => {
              if (!new URLSearchParams(window.location.search).has("force3d")) setMode({ kind: "static" });
            }}
          />
        </div>
      )}
    </div>
  );
}
