import type { Metadata } from "next";
import Image from "next/image";
import {
  Atom,
  Brain,
  CircleDot,
  Flag,
  Gauge,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Palette,
  Trophy,
  UsersRound,
} from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const highlightIcons = [Brain, CircleDot, UsersRound, Lightbulb, Globe2];
const signatureIcons = [Flag, Gauge, Atom];
const directoryIcons = [Palette, HeartHandshake, UsersRound];

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Explore Merishaw School clubs and activities, including the World Scholar's Cup, the Omanyala Sprint Club, Merishaw Drift Club, STEM Club, chess, table tennis, badminton, service, leadership, and faith societies.",
};

export default async function ClubsPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        cinematic
        eyebrow={content.pages.clubs.eyebrow}
        title={content.pages.clubs.title}
        description={content.pages.clubs.description}
        image={content.pages.clubs.image}
        imagePosition={content.pages.clubs.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.clubs.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.clubs.intro.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {content.clubs.intro.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {content.clubs.intro.primaryAction ? (
                <ButtonLink href={content.clubs.intro.primaryAction.href}>
                  {content.clubs.intro.primaryAction.label}
                </ButtonLink>
              ) : null}
              {content.clubs.intro.secondaryAction ? (
                <ButtonLink
                  href={content.clubs.intro.secondaryAction.href}
                  variant="secondary"
                >
                  {content.clubs.intro.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.clubs.intro.image}
                alt={content.clubs.intro.imageAlt}
                fill
                className="object-cover"
                style={{ objectPosition: content.clubs.intro.imagePosition }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.clubs.highlightsIntro.eyebrow}
            title={content.clubs.highlightsIntro.title}
            description={content.clubs.highlightsIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.clubs.highlights.map((club, index) => {
              const Icon = highlightIcons[index] ?? Lightbulb;

              return (
                <MotionReveal key={`${club.title}-${index}`} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {club.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {club.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <MotionReveal>
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
              <Globe2 className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase text-brand-burgundy">
              {content.clubs.featured.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.clubs.featured.title}
            </h2>
            {content.clubs.featured.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-base leading-8 text-brand-muted"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-4 border-l-4 border-brand-gold pl-4 text-sm font-semibold leading-7 text-brand-ink">
              {content.clubs.featured.callout}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-brand-gold/50 bg-brand-cream p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-burgundy">
                  {content.clubs.featured.themeEyebrow}
                </p>
                <p className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                  {content.clubs.featured.themeTitle}
                </p>
              </div>
              <div className="rounded-md border border-brand-gold/50 bg-brand-cream p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-burgundy">
                  {content.clubs.featured.progressionEyebrow}
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-brand-ink">
                  {content.clubs.featured.progressionDescription}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-md border border-brand-gold/50 bg-brand-cream p-4">
              <Trophy className="h-5 w-5 shrink-0 text-brand-burgundy" />
              <p className="text-sm font-semibold leading-7 text-brand-ink">
                {content.clubs.featured.note}
              </p>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium">
              <Image
                src={content.clubs.featured.image}
                alt={content.clubs.featured.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.clubs.signatureIntro.eyebrow}
            title={content.clubs.signatureIntro.title}
            description={content.clubs.signatureIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {content.clubs.signatureClubs.map((club, index) => {
              const Icon = signatureIcons[index] ?? Atom;

              return (
                <MotionReveal key={`${club.title}-${index}`} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {club.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {club.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>

          <div className="mt-8 rounded-md border border-brand-gold/50 bg-brand-burgundy p-6 text-white shadow-premium sm:p-8">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-gold">
                  {content.clubs.additionalClubs.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  {content.clubs.additionalClubs.title}
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {content.clubs.additionalClubs.groups.map((group, index) => {
                  const Icon = directoryIcons[index] ?? UsersRound;

                  return (
                    <div
                      key={`${group.title}-${index}`}
                      className="rounded-md border border-white/20 bg-white/10 p-4"
                    >
                      <Icon className="h-5 w-5 text-brand-gold" />
                      <p className="mt-4 text-sm font-bold uppercase tracking-[0.1em] text-brand-gold">
                        {group.title}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-7 text-white/85">
                        {group.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.clubs.galleryIntro.eyebrow}
            title={content.clubs.galleryIntro.title}
            description={content.clubs.galleryIntro.description}
            tone="dark"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {content.clubs.gallery.map((photo, index) => (
              <MotionReveal
                key={`${photo.src}-${index}`}
                delay={index * 0.05}
                className={photo.className}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/20 bg-brand-ink shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={content.clubs.cta.eyebrow}
        title={content.clubs.cta.title}
        description={content.clubs.cta.description}
        primaryHref={content.clubs.cta.primaryHref}
        primaryLabel={content.clubs.cta.primaryLabel}
        secondaryHref={content.clubs.cta.secondaryHref}
        secondaryLabel={content.clubs.cta.secondaryLabel}
      />
    </>
  );
}
