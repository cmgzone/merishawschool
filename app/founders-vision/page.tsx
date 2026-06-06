import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Our Founder's Vision",
  description:
    "Read the founder's vision behind Merishaw School and its journey of turning boys into men of purpose and integrity.",
};

export default async function FoundersVisionPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.foundersVision.eyebrow}
        title={content.pages.foundersVision.title}
        description={content.pages.foundersVision.description}
        image={content.pages.foundersVision.image}
        imagePosition={content.pages.foundersVision.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.foundersVision.intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.foundersVision.intro.title}
            </h2>
            {content.foundersVision.intro.description ? (
              <p className="mt-5 text-base leading-8 text-brand-muted">
                {content.foundersVision.intro.description}
              </p>
            ) : null}
            <blockquote className="mt-6 rounded-md border-l-4 border-brand-burgundy bg-brand-cream p-5 font-serif text-2xl font-semibold leading-tight text-brand-ink">
              {content.foundersVision.intro.quote}
            </blockquote>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={content.foundersVision.intro.primaryAction.href}>
                {content.foundersVision.intro.primaryAction.label}
              </ButtonLink>
              <ButtonLink
                href={content.foundersVision.intro.secondaryAction.href}
                variant="secondary"
              >
                {content.foundersVision.intro.secondaryAction.label}
              </ButtonLink>
            </div>
          </MotionReveal>

          <div className="grid gap-4">
            {content.foundersVision.paragraphs.map((paragraph, index) => (
              <MotionReveal key={paragraph} delay={index * 0.05}>
                <article className="rounded-md border border-brand-line bg-brand-cream p-6 sm:p-8">
                  <p className="text-sm font-bold uppercase text-brand-burgundy">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-lg leading-9 text-brand-muted">
                    {paragraph}
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
