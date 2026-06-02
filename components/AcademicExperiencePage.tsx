import Image from "next/image";
import {
  BookOpenCheck,
  CheckCircle2,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import type { AcademicExperiencePage as AcademicExperiencePageData } from "@/data/academics";

const highlightIcons = [BookOpenCheck, Lightbulb, CheckCircle2, Sparkles];

export default function AcademicExperiencePage({
  page,
}: {
  page: AcademicExperiencePageData;
}) {
  const primaryPhoto = page.photos[0];

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.heroImage}
        showImage={Boolean(page.heroImage)}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div
          className={`mx-auto grid max-w-7xl gap-10 ${
            primaryPhoto ? "lg:grid-cols-[0.9fr_1.1fr] lg:items-center" : ""
          }`}
        >
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Learning experience
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {page.introTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {page.introDescription}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/academics">Explore Academics</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Plan a Visit
              </ButtonLink>
            </div>
          </MotionReveal>

          {primaryPhoto ? (
            <MotionReveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium">
                <Image
                  src={primaryPhoto.src}
                  alt={primaryPhoto.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            </MotionReveal>
          ) : null}
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="What students develop"
            title="Practical experiences that strengthen learning habits."
            description="Each experience gives boys another way to build confidence, responsibility, curiosity, and a sense of purpose."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((highlight, index) => {
              const Icon = highlightIcons[index] ?? CheckCircle2;

              return (
                <MotionReveal key={highlight.title} delay={index * 0.04}>
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

      {page.photos.length > 1 ? (
        <section className="bg-brand-burgundy px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Inside the experience"
              title="Spaces and moments that make learning visible."
              description="A closer look at the environment supporting student curiosity, skill, and steady growth."
              tone="dark"
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {page.photos.map((photo, index) => (
                <MotionReveal
                  key={photo.src}
                  delay={index * 0.05}
                  className={photo.className}
                >
                  <div className="relative aspect-[16/10] h-full overflow-hidden rounded-md border border-white/20 bg-brand-ink shadow-card">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition duration-700 hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        eyebrow="Admissions"
        title="Explore a learning environment built for the whole boy."
        description="Speak with the school team about academics, student opportunities, curriculum pathways, and planning a visit."
        primaryHref="/admissions"
        primaryLabel="Start Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
