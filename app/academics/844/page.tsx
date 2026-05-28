import type { Metadata } from "next";
import { CheckCircle2, GraduationCap } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { curriculumTransition, legacy844Principles } from "@/data/academics";

export const metadata: Metadata = {
  title: "8-4-4 Curriculum",
  description:
    "Focused support for Merishaw School's Form 3 and Form 4 learners completing the final 8-4-4 cohorts.",
};

export default function Legacy844Page() {
  return (
    <>
      <PageHeader
        eyebrow="8-4-4 Curriculum"
        title="Focused support for Form 3 and Form 4 cohorts."
        description="A dedicated page for Merishaw learners completing the final 8-4-4 pathway with confidence, care, and preparation for the next step."
        image="/images/hero-tuition-block.png"
      />

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Current cohorts
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
              {curriculumTransition.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {curriculumTransition.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admissions">Admissions Enquiry</ButtonLink>
              <ButtonLink href="/academics" variant="secondary">
                View CBE Academics
              </ButtonLink>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="grid gap-3">
              {curriculumTransition.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex gap-4 rounded-md border border-brand-line bg-white p-5 shadow-sm"
                >
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-burgundy text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-7 text-brand-ink">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Core design principles"
            title="The structure behind the 8-4-4 pathway."
            description="This page keeps the 8-4-4 information separate from the CBE academics page so parents can review the legacy pathway clearly."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {legacy844Principles.map((principle, index) => (
              <MotionReveal key={principle.title} delay={index * 0.05}>
                <article className="h-full rounded-md border border-white/15 bg-white/10 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-gold text-brand-ink">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {principle.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="Speak with admissions about Form 3 and Form 4."
        description="Admissions can guide parents on the current 8-4-4 cohorts, placement, and the information needed for a complete enquiry."
        primaryHref="/admissions"
        primaryLabel="Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
