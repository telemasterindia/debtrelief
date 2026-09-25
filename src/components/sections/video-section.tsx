/*
 * CONTENT_REQUIRES_VERIFICATION
 * This copy was written from the owner's brief because greenlightdebtrelief.com
 * could not be reached during development. It is NOT verified Greenlight copy.
 * Compare with the live site and replace with the exact Greenlight wording.
 * See docs/content-verification.md.
 */
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/section-heading";
import { CtaButton } from "@/components/ui/tracked-link";
import { VideoPlayer } from "@/components/media/video-player";

export function VideoSection() {
  return (
    <section id="video" aria-labelledby="video-title" className="relative scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow>Watch our video</Eyebrow>
          <h2 id="video-title" className="mt-3 text-[2rem] sm:text-[2.75rem]">
            See How {siteConfig.name} Works
          </h2>
          <p className="mt-4 text-lead text-muted">A short introduction from our team.</p>
        </div>
        <div className="reveal mx-auto mt-12 max-w-5xl">
          <VideoPlayer videoId={siteConfig.youtubeVideoId} title={`See how ${siteConfig.name} works`} />
        </div>
        <div className="reveal mt-12 flex flex-col items-center gap-3 text-center">
          <CtaButton href="/free-consultation" location="after_video" arrow>
            Get My Free Consultation
          </CtaButton>
          <p className="text-base text-muted">{siteConfig.consultationIsFree ? "Free and no obligation." : "No obligation."}</p>
        </div>
      </div>
    </section>
  );
}
