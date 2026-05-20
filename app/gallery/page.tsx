import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import GalleryGrid from "@/components/GalleryGrid";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import PremiumSlideshow from "@/components/PremiumSlideshow";
import SectionTitle from "@/components/SectionTitle";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { galleryImages, showcaseSlides } from "@/data/gallery";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View Merishaw School campus, boarding, sports, facilities, and student life images.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Campus, facilities, and student life at Merishaw."
        description="Explore a cleaner visual tour of the learning spaces, boarding environment, sports grounds, and student-life moments."
        image="/images/gallery-aerial-campus.jpg"
      />

      <section className="bg-brand-burgundy px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
        <PremiumSlideshow
          slides={showcaseSlides}
          compact
          className="mx-auto max-w-7xl"
        />
      </section>

      <WelcomeVideoSection
        tone="light"
        eyebrow="Featured video"
        title="Watch the Merishaw School welcome video."
        description="Start with the official welcome video, then explore the campus, boarding, sports, learning, and student-life gallery below."
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Pictures"
            title="A visual tour of the school environment."
            description="Campus buildings, resource spaces, sports grounds, boarding facilities, and student-life moments."
          />
          <div className="mt-10">
            <GalleryGrid images={galleryImages} />
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <MotionReveal>
            <div className="aspect-video overflow-hidden rounded-md border border-brand-gold/40 bg-brand-burgundy shadow-premium">
              <iframe
                src="https://www.youtube.com/embed/RIQKNGVncwg"
                title="Merishaw School featured video"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-white">
              <ExternalLink className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              Follow Merishaw School on YouTube.
            </h2>
            <p className="mt-4 text-base leading-8 text-brand-muted">
              Watch the welcome video and follow the official YouTube channel
              for more of the Merishaw story.
            </p>
            <div className="mt-7">
              <ButtonLink href={siteConfig.socials.youtube}>
                Open YouTube Channel
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
