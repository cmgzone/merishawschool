import type { Metadata } from "next";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Mission, Vision and Values",
  description:
    "Read Merishaw School's vision statement, mission statement, and MERISHAW core values.",
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
        imagePosition={content.pages.about.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <MotionReveal>
              <article className="h-full rounded-md border border-brand-line bg-brand-cream p-6 sm:p-8">
                <p className="text-sm font-bold uppercase text-brand-burgundy">
                  Our Vision
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                  {content.about.vision}
                </h2>
              </article>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <article className="h-full rounded-md border border-brand-line bg-brand-ink p-6 text-white sm:p-8">
                <p className="text-sm font-bold uppercase text-brand-gold">
                  Our Mission
                </p>
                <p className="mt-4 text-lg leading-9 text-white/90">
                  {content.about.mission}
                </p>
              </article>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.12} className="mt-14">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                {content.about.valuesIntro.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                {content.about.valuesIntro.title}
              </h2>
              {content.about.valuesIntro.description ? (
                <p className="mt-4 text-base leading-8 text-brand-muted sm:text-lg">
                  {content.about.valuesIntro.description}
                </p>
              ) : null}
            </div>
          </MotionReveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.about.values.map((value, index) => (
              <MotionReveal key={value.letter} delay={index * 0.035}>
                <article className="grid h-full grid-cols-[3.5rem_1fr] items-center gap-4 rounded-md border border-brand-line bg-white p-4 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-burgundy font-serif text-2xl font-semibold text-white">
                    {value.letter}
                  </div>
                  <p className="text-base font-semibold leading-7 text-brand-ink">
                    {value.label}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal delay={0.12} className="mt-14">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                {content.about.developmentPillarsIntro.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                {content.about.developmentPillarsIntro.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-brand-muted sm:text-lg">
                {content.about.developmentPillarsIntro.description}
              </p>
            </div>
          </MotionReveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {content.about.developmentPillars.map((pillar, index) => (
              <MotionReveal key={pillar.title} delay={index * 0.035}>
                <article className="h-full rounded-md border border-brand-line bg-brand-cream p-5 sm:p-6">
                  <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-brand-muted">
                    {pillar.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
