import { PlayCircle } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";

type WelcomeVideoSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "light" | "cream";
};

export default function WelcomeVideoSection({
  eyebrow = "Welcome video",
  title = "Welcome to Merishaw School.",
  description = "Watch the Merishaw School welcome video and experience the campus, values, and learning environment behind the Home of the Boy Child.",
  tone = "light",
}: WelcomeVideoSectionProps) {
  return (
    <section
      className={
        tone === "cream"
          ? "bg-brand-cream px-4 py-16 sm:px-6 lg:px-8"
          : "bg-white px-4 py-16 sm:px-6 lg:px-8"
      }
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <MotionReveal>
          <div className="overflow-hidden rounded-md border border-brand-gold/40 bg-brand-burgundy shadow-premium">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/RIQKNGVncwg"
                title="Merishaw School welcome video"
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
            {eyebrow}
          </p>
          <h2 className="premium-heading mt-3 font-serif text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/admissions">Start Admissions</ButtonLink>
            <ButtonLink href="/gallery" variant="secondary">
              View Gallery
            </ButtonLink>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

