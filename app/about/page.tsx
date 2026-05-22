import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Merishaw School's mission, vision, values, facilities, and purpose-led residential boys' education model.",
};

export default async function AboutPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.about.eyebrow}
        title={content.pages.about.title}
        description={content.pages.about.description}
        image={content.pages.about.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.about.overview.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              {content.about.overview.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-brand-muted">
              {content.about.overview.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.about.overview.image}
                alt={content.about.overview.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <WelcomeVideoSection
        tone="cream"
        eyebrow="A welcome to Merishaw"
        title="See the Merishaw environment before you visit."
        description="The welcome video gives parents a closer feel of the campus, school identity, and values-led formation that shape the Merishaw experience."
      />

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Mission, vision, values"
            title="Purpose-driven global leaders empowered for success."
            description="The mission, vision, and values give families a clear view of the school's foundation."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <MotionReveal>
              <article className="h-full rounded-md border border-brand-line bg-white p-7 shadow-card">
                <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                  Vision
                </h3>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  {content.about.vision}
                </p>
              </article>
            </MotionReveal>
            <MotionReveal delay={0.05}>
              <article className="h-full rounded-md border border-brand-line bg-white p-7 shadow-card">
                <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                  Mission
                </h3>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  {content.about.mission}
                </p>
              </article>
            </MotionReveal>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.about.values.map((value, index) => (
              <MotionReveal key={value.label} delay={index * 0.035}>
                <div className="rounded-md border border-brand-line bg-white p-5">
                  <p className="font-serif text-3xl font-semibold text-brand-burgundy">
                    {value.letter}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-brand-ink">
                    {value.label}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            eyebrow="Facilities"
            title="A campus designed for learning, boarding, creativity, and sport."
            description="Academic, residential, creative, dining, and sporting spaces support a complete school experience."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {content.academics.facilities.map((facility, index) => (
              <MotionReveal key={facility} delay={index * 0.035}>
                <div className="rounded-md border border-brand-line bg-brand-cream p-4 text-sm font-semibold leading-7 text-brand-ink">
                  {facility}
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={content.about.architecture.image}
                alt={content.about.architecture.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-gold">
              {content.about.architecture.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {content.about.architecture.title}
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-white/90">
              {content.about.architecture.description}
            </p>
            <div className="mt-7">
              <ButtonLink href="/gallery" variant="support">
                See the Campus
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </section>

      <CTASection
        eyebrow="Leadership"
        title="Read the messages from Merishaw's leadership."
        description="The leadership page introduces the people and student voices shaping Merishaw's culture."
        primaryHref="/leadership"
        primaryLabel="View Leadership"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
