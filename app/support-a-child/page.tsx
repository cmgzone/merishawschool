import type { Metadata } from "next";
import { HeartHandshake, ShieldCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import SupportChildSection from "@/components/SupportChildSection";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Support a Boy's Education",
  description:
    "Support a Boy's Education sponsorship pathway for Merishaw School, without payment integration.",
};

export default async function SupportAChildPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.support.eyebrow}
        title={content.pages.support.title}
        description={content.pages.support.description}
        image={content.pages.support.image}
        imagePosition={content.pages.support.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.support.sponsorshipIntro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              {content.support.sponsorshipIntro.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {content.support.sponsorshipIntro.description}
            </p>
            <p className="mt-4 rounded-md border border-brand-gold/70 bg-brand-cream p-4 text-sm leading-7 text-brand-muted">
              {content.support.content.note}
            </p>
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.support.sponsorshipAreas.map((area, index) => (
              <MotionReveal key={area} delay={index * 0.05}>
                <div className="h-full rounded-md border border-brand-line bg-brand-cream p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-7 text-brand-ink">
                    {area}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <SupportChildSection
        content={content.support.content}
        initiatives={content.support.initiatives}
        primaryHref={content.support.sectionPrimaryAction.href}
        primaryLabel={content.support.sectionPrimaryAction.label}
        secondaryHref={content.support.sectionSecondaryAction.href}
        secondaryLabel={content.support.sectionSecondaryAction.label}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.support.initiativesIntro.eyebrow}
            title={content.support.initiativesIntro.title}
            description={content.support.initiativesIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.support.initiatives.map((initiative, index) => (
              <MotionReveal key={initiative} delay={index * 0.04}>
                <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                  <HeartHandshake className="h-6 w-6 text-brand-burgundy" />
                  <p className="mt-4 text-sm font-semibold leading-7 text-brand-ink">
                    {initiative}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={content.support.cta.eyebrow}
        title={content.support.cta.title}
        description={content.support.cta.description}
        primaryHref={content.support.cta.primaryHref}
        primaryLabel={content.support.cta.primaryLabel}
        secondaryHref={content.support.cta.secondaryHref}
        secondaryLabel={content.support.cta.secondaryLabel}
      />
    </>
  );
}
