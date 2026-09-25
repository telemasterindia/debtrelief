import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoPlayer } from "@/components/media/video-player";

export function VideoSection() {
  return (
    <section id="video" aria-labelledby="video-title" className="relative scroll-mt-24 bg-white pb-20 pt-16 sm:pb-28 sm:pt-20">
      <div className="container-page">
        <SectionHeading
          id="video-title"
          align="center"
          eyebrow="Watch our video"
          title={`Get to Know ${siteConfig.name}`}
          intro="Press play to hear directly from us about how we help people take on credit card and unsecured debt."
          className="reveal"
        />
        <div className="reveal mx-auto mt-12 max-w-5xl">
          <VideoPlayer videoId={siteConfig.youtubeVideoId} title={`${siteConfig.name} video`} />
        </div>
      </div>
    </section>
  );
}
