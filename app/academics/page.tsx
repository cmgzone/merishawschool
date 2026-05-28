import type { Metadata } from "next";
import { CheckCircle2, Layers3, Route } from "lucide-react";
import AcademicCard from "@/components/AcademicCard";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import PillarCard from "@/components/PillarCard";
import SectionTitle from "@/components/SectionTitle";
import {
  cbeOverview,
  cbeStages,
} from "@/data/academics";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore Merishaw School's Competency-Based Education, pathways, core competencies, and holistic pillars.",
};

export default async function AcademicsPage() {
  const content = await getEditableContent();
  const cbePrograms = content.academics.programs.filter(
    (program) =>
      !program.title.includes("8-4-4") && !program.title.includes("8.4.4"),
  );

  return (
    <>
      <PageHeader
        eyebrow={content.pages.academics.eyebrow}
        title={content.pages.academics.title}
        description={content.pages.academics.description}
        image={content.pages.academics.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="CBE learning"
            title="A competency-based academic foundation."
            description="The academic model strengthens practical skills, core values, continuous assessment, mentorship, and preparation for future-ready pathways."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {cbePrograms.map((program, index) => (
              <AcademicCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <MotionReveal>
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                CBE / CBC
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                {cbeOverview.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-brand-muted">
                {cbeOverview.description}
              </p>
              <div className="mt-6 rounded-md border-l-4 border-brand-gold bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase text-brand-burgundy">
                  CBE-ready facilities
                </p>
                <p className="text-sm font-semibold leading-7 text-brand-ink">
                  {cbeOverview.facilitiesNote}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/admissions">Admissions Enquiry</ButtonLink>
                <ButtonLink href="/infrastructure" variant="secondary">
                  View Infrastructure
                </ButtonLink>
              </div>
            </MotionReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {cbeStages.map((stage, index) => (
                <MotionReveal key={stage.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-cream text-brand-burgundy">
                        <Layers3 className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-bold uppercase text-brand-burgundy">
                        Stage {index + 1}
                      </p>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl font-semibold text-brand-ink">
                      {stage.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {stage.description}
                    </p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <SectionTitle
              eyebrow="Senior school pathways"
              title="Room for strengths, talents, and aspirations."
              description="At Senior School, learners specialize based on their abilities and interests across three primary pathways."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {content.academics.cbePathways.map((pathway, index) => (
                <MotionReveal key={pathway} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-white">
                      <Route className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-xs font-bold uppercase text-brand-burgundy">
                      Pathway {index + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                      {pathway}
                    </h3>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Core competencies"
            title="Competencies that support lifelong learning."
            description="These competencies support critical thinking, collaboration, creativity, and confident lifelong learning."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.academics.cbeCompetencies.map((competency, index) => (
              <MotionReveal key={competency} delay={index * 0.035}>
                <div className="flex h-full gap-3 rounded-md border border-brand-line bg-brand-cream p-5 text-sm font-semibold leading-7 text-brand-ink">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-burgundy" />
                  <span>{competency}</span>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Pillars"
            title="Six pillars for holistic formation."
            description="Each pillar supports the school's aim of transforming boys into men of purpose and integrity."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.academics.pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="Discuss the right academic pathway for your son."
        description="Admissions can advise on CBE grades, learner placement, and the information needed for a complete application."
        primaryHref="/admissions"
        primaryLabel="Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
