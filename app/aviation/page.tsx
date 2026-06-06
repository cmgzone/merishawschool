import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Gauge, Plane, UsersRound } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const aviationIcons = [Plane, Compass, Gauge, UsersRound];

export const metadata: Metadata = {
  title: "Aviation",
  description:
    "Explore Merishaw School aviation exposure activities, including guided aircraft visits, cockpit familiarization, technical learning, and career awareness.",
};

export default async function AviationPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.aviation.eyebrow}
        title={content.pages.aviation.title}
        description={content.pages.aviation.description}
        image={content.pages.aviation.image}
        imagePosition={content.pages.aviation.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.aviation.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.aviation.intro.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {content.aviation.intro.description}
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.aviation.intro.image}
                alt={content.aviation.intro.imageAlt}
                fill
                className="object-cover"
                style={{ objectPosition: content.aviation.intro.imagePosition }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.aviation.highlightsIntro.eyebrow}
            title={content.aviation.highlightsIntro.title}
            description={content.aviation.highlightsIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.aviation.highlights.map((highlight, index) => {
              const Icon = aviationIcons[index] ?? Plane;

              return (
                <MotionReveal key={highlight.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {highlight.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.aviation.galleryIntro.eyebrow}
            title={content.aviation.galleryIntro.title}
            description={content.aviation.galleryIntro.description}
            tone="dark"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.aviation.gallery.map((photo, index) => (
              <MotionReveal
                key={`${photo.src}-${index}`}
                delay={index * 0.035}
                className={photo.className}
              >
                <div className="relative aspect-[4/3] h-full min-h-64 overflow-hidden rounded-md border border-white/20 bg-brand-ink shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={content.aviation.cta.eyebrow}
        title={content.aviation.cta.title}
        description={content.aviation.cta.description}
        primaryHref={content.aviation.cta.primaryHref}
        primaryLabel={content.aviation.cta.primaryLabel}
        secondaryHref={content.aviation.cta.secondaryHref}
        secondaryLabel={content.aviation.cta.secondaryLabel}
      />
    </>
  );
}
