import type { Metadata } from "next";
import Image from "next/image";
import { Medal, Target, Trophy, UsersRound } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const coachingIcons = [UsersRound, Trophy, Target, Medal];

export const metadata: Metadata = {
  title: "Sports",
  description:
    "Explore Merishaw School sports, including soccer, swimming, lacrosse, structured coaching, teamwork, and talent development.",
};

export default async function SportsPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.sports.eyebrow}
        title={content.pages.sports.title}
        description={content.pages.sports.description}
        image={content.pages.sports.image}
        imagePosition={content.pages.sports.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.sports.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.sports.intro.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {content.sports.intro.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {content.sports.intro.primaryAction ? (
                <ButtonLink href={content.sports.intro.primaryAction.href}>
                  {content.sports.intro.primaryAction.label}
                </ButtonLink>
              ) : null}
              {content.sports.intro.secondaryAction ? (
                <ButtonLink
                  href={content.sports.intro.secondaryAction.href}
                  variant="secondary"
                >
                  {content.sports.intro.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.sports.intro.image}
                alt={content.sports.intro.imageAlt}
                fill
                className="object-cover"
                style={{ objectPosition: content.sports.intro.imagePosition }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.sports.programmeIntro.eyebrow}
            title={content.sports.programmeIntro.title}
            description={content.sports.programmeIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.sports.programmes.map((programme, index) => (
              <MotionReveal key={programme.title} delay={index * 0.05}>
                <article className="h-full overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={programme.image}
                      alt={programme.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                      {programme.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {programme.description}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <MotionReveal>
            <div className="relative aspect-video overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.sports.coaching.image}
                alt={content.sports.coaching.imageAlt}
                fill
                className="object-cover"
                style={{ objectPosition: content.sports.coaching.imagePosition }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-gold">
              {content.sports.coaching.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {content.sports.coaching.title}
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-white/90">
              {content.sports.coaching.description}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {content.sports.coachingValues.map((label, index) => {
                const Icon = coachingIcons[index] ?? Medal;

                return (
                  <div
                    key={`${label}-${index}`}
                    className="flex items-center gap-3 rounded-md border border-white/15 bg-white/10 p-4"
                  >
                    <Icon className="h-5 w-5 text-brand-gold" />
                    <p className="text-sm font-bold">{label}</p>
                  </div>
                );
              })}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.sports.galleryIntro.eyebrow}
            title={content.sports.galleryIntro.title}
            description={content.sports.galleryIntro.description}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.sports.gallery.map((photo, index) => (
              <MotionReveal key={`${photo.src}-${index}`} delay={index * 0.035}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={content.sports.cta.eyebrow}
        title={content.sports.cta.title}
        description={content.sports.cta.description}
        primaryHref={content.sports.cta.primaryHref}
        primaryLabel={content.sports.cta.primaryLabel}
        secondaryHref={content.sports.cta.secondaryHref}
        secondaryLabel={content.sports.cta.secondaryLabel}
      />
    </>
  );
}
