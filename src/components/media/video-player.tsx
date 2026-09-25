"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics/track";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/icon";

/**
 * Click-to-play YouTube embed.
 *
 * Nothing is loaded from YouTube until the visitor presses Play (faster pages, no
 * third-party tracking on page load). The player uses youtube-nocookie.com and
 * YouTube's own accessible controls and captions once playing.
 */
export function VideoPlayer({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumbOk, setThumbOk] = useState(true);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  // The image may finish (or fail) before hydration, when React's onLoad/onError
  // handlers are not yet attached — so also check its state when the ref attaches.
  const checkThumb = (img: HTMLImageElement | null) => {
    if (!img || !img.complete) return;
    if (img.naturalWidth >= 200) setThumbLoaded(true);
    else setThumbOk(false);
  };
  const frameRef = useRef<HTMLIFrameElement>(null);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <figure className="[perspective:1600px]">
      <div className="group relative motion-safe:transition-transform motion-safe:duration-700 motion-safe:[transform:rotateX(4deg)] motion-safe:hover:[transform:rotateX(0deg)] motion-safe:focus-within:[transform:rotateX(0deg)]">
        {/* Layered frame for depth */}
        <div aria-hidden="true" className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-brand-500/25 via-navy-700/20 to-accent-400/20 blur-2xl" />
        <div aria-hidden="true" className="absolute inset-x-10 -bottom-3 h-full rounded-[1.5rem] bg-navy-700/25" />
        <div className="relative overflow-hidden rounded-[1.5rem] bg-navy-950 p-2 shadow-[0_40px_80px_-30px_rgb(4_13_31/0.7)] ring-1 ring-white/10">
          <div className="relative aspect-video overflow-hidden rounded-[1.1rem] bg-navy-900">
            {playing ? (
              <iframe
                ref={frameRef}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1`}
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => frameRef.current?.focus()}
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPlaying(true);
                  track("cta_click", { location: "video", label: "play_video" });
                }}
                className="absolute inset-0 flex h-full w-full items-center justify-center text-left"
                aria-label={`Play video: ${title}`}
              >
                {/* Branded poster: always shown; the YouTube thumbnail layers on top when it loads. */}
                <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_70%_30%,#15603a_0%,#0e2445_55%,#040d1f_100%)]" />
                <span aria-hidden="true" className="grid-backdrop absolute inset-0" />
                {thumbOk && (
                  // eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, loaded lazily
                  <img
                    ref={checkThumb}
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onError={() => setThumbOk(false)}
                    onLoad={(e) => checkThumb(e.currentTarget)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${thumbLoaded ? "opacity-80" : "opacity-0"}`}
                  />
                )}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

                <span className="relative flex flex-col items-center gap-3 sm:gap-4">
                  <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand-700 shadow-[0_0_0_10px_rgb(255_255_255/0.15),0_20px_40px_-10px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-105 sm:size-24">
                    <svg viewBox="0 0 24 24" className="ml-1 size-8 sm:size-10" aria-hidden="true" focusable="false">
                      <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="rounded-full bg-navy-950/70 px-4 py-1.5 text-lg font-semibold text-white sm:px-5 sm:py-2">Play video</span>
                </span>

                <span className="absolute bottom-6 left-7 right-7 hidden items-center justify-between gap-4 text-white sm:flex">
                  <span className="text-lg font-bold sm:text-xl">
                    Greenlight<span className="text-accent-300"> Debt Relief</span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-base text-muted sm:flex-row sm:gap-4">
        <span>Video from {siteConfig.name}. Opens in the YouTube player.</span>
        <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-11 items-center gap-1.5">
          Watch on YouTube
          <Icon name="external" className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}
