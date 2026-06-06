import type { Metadata } from "next";
import { BookOpenCheck, HeartHandshake, UsersRound } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const initiativeIcons = [UsersRound, HeartHandshake, BookOpenCheck];

export const metadata: Metadata = {
  title: "CSR — Corporate Social Responsibility",
  description:
    "Learn about Merishaw School's CSR programs focused on community development, education, health, water, and nutrition.",
};

export default async function CSRPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.csr.eyebrow}
        title={content.pages.csr.title}
        description={content.pages.csr.description}
        image={content.pages.csr.image}
        imagePosition={content.pages.csr.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <MotionReveal>
            <h2 className="font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              {content.csr.body.title}
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-brand-muted">
              {content.csr.body.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.csr.initiativesIntro.eyebrow}
            title={content.csr.initiativesIntro.title}
            description={content.csr.initiativesIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.csr.initiatives.map((initiative, index) => {
              const Icon = initiativeIcons[index] ?? HeartHandshake;

              return (
                <MotionReveal key={initiative.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {initiative.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {initiative.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={content.csr.cta.eyebrow}
        title={content.csr.cta.title}
        description={content.csr.cta.description}
        primaryHref={content.csr.cta.primaryHref}
        primaryLabel={content.csr.cta.primaryLabel}
        secondaryHref={content.csr.cta.secondaryHref}
        secondaryLabel={content.csr.cta.secondaryLabel}
      />
    </>
  );
}
