import type { Metadata } from "next";
import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const aboutStoryStepTitles = [
  "The challenge",
  "The response",
  "The name",
  "The transformation",
  "The mission environment",
  "The vision",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Merishaw School's mission, vision, values, facilities, and purpose-led residential boys' education model.",
};

export default async function AboutPage() {
  const content = await getEditableContent();
  const storySteps = content.about.overview.paragraphs
    .slice(2)
    .map((paragraph, index) => ({
      title: aboutStoryStepTitles[index] ?? `Part ${index + 1}`,
      paragraph,
    }));

  return (
    <>
      <PageHeader
        eyebrow={content.pages.about.eyebrow}
        title={content.pages.about.title}
        description={content.pages.about.description}
        image={content.pages.about.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <MotionReveal>
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                {content.about.overview.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
                {content.about.overview.title}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-brand-muted">
                {content.about.overview.paragraphs
                  .slice(0, 2)
                  .map((paragraph) => (
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
          <MotionReveal
            delay={0.1}
            className="mt-12 border-t border-brand-line pt-10"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                The Merishaw story
              </p>
              <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink">
                Read the story in sequence.
              </h3>
            </div>
            <div className="mt-8 grid gap-4">
              {storySteps.map((step, index) => (
                <article
                  key={step.paragraph}
                  className="grid gap-4 rounded-md border border-brand-line bg-brand-cream p-5 sm:grid-cols-[4.5rem_1fr] sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy font-serif text-xl font-semibold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl font-semibold text-brand-ink">
                      {step.title}
                    </h4>
                    <p className="mt-3 max-w-5xl text-base leading-8 text-brand-muted">
                      {step.paragraph}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </MotionReveal>
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

    </>
  );
}
