import type { Metadata } from "next";
import AcademicCard from "@/components/AcademicCard";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import PillarCard from "@/components/PillarCard";
import SectionTitle from "@/components/SectionTitle";
import { academicPrograms, cbeCompetencies, cbePathways, pillars } from "@/data/academics";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore Merishaw School's 8.4.4 curriculum, Competency-Based Education, pathways, core competencies, and holistic pillars.",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Learning pathways that prepare boys for national and global success."
        description="Merishaw combines 8.4.4, Competency-Based Education, practical skills, mentorship, and holistic pillars for future-ready learning."
        image="/images/hero-tuition-block.png"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Programs"
            title="A balanced academic foundation."
            description="The old curriculum page emphasizes rigorous academics, practical skills, global competitiveness, tailored learning paths, and seamless transitions to tertiary education."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {academicPrograms.map((program, index) => (
              <AcademicCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              CBE pathways
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              Senior school pathways with room for strengths and aspirations.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              The old website identifies three CBE pathways available for
              learners as they progress into Senior Secondary.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admissions">Admissions Enquiry</ButtonLink>
              <ButtonLink href="/downloads" variant="secondary">
                Fee Structure
              </ButtonLink>
            </div>
          </MotionReveal>
          <div className="grid gap-4">
            {cbePathways.map((pathway, index) => (
              <MotionReveal key={pathway} delay={index * 0.05}>
                <div className="rounded-md border border-brand-line bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold uppercase text-brand-burgundy">
                    Pathway {index + 1}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                    {pathway}
                  </h3>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Core competencies"
            title="Competencies that support lifelong learning."
            description="These competencies come from the CBE content audited from the old website."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cbeCompetencies.map((competency, index) => (
              <MotionReveal key={competency} delay={index * 0.035}>
                <div className="rounded-md border border-brand-line bg-brand-cream p-5 text-sm font-semibold leading-7 text-brand-ink">
                  {competency}
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
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="Discuss the right academic pathway for your son."
        description="Admissions can advise on 8.4.4, CBE grades, and the information needed for a complete application."
        primaryHref="/admissions"
        primaryLabel="Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact Us"
      />
    </>
  );
}
