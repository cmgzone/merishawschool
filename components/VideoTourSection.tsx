import { PlayCircle } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { videoLinks } from "@/data/gallery";

const welcomeVideo = videoLinks[0];

export default function VideoTourSection() {
  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-md border border-brand-gold/50 bg-white p-4 shadow-premium sm:p-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:p-8">
        <MotionReveal>
          <div className="overflow-hidden rounded-md border border-brand-line bg-brand-ink shadow-card">
            <div className="aspect-video">
              <iframe
                src={welcomeVideo.href}
                title={welcomeVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
            <PlayCircle className="h-6 w-6" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase text-brand-burgundy">
            Welcome video
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            See the Merishaw experience before you visit.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Watch the welcome video for a quick feel of the campus, school
            culture, and values-led environment.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/gallery">View Gallery</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Book a Visit
            </ButtonLink>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
