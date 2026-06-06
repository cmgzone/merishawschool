import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Layers3, Route } from "lucide-react";
import AcademicCard from "@/components/AcademicCard";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
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
        imagePosition={content.pages.academics.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.academics.cbeIntro.eyebrow}
            title={content.academics.cbeIntro.title}
            description={content.academics.cbeIntro.description}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {cbePrograms.map((program, index) => (
              <AcademicCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Learning in action"
            title="Knowledge becomes confidence when boys can put it to work."
            description="Merishaw combines focused classroom learning with practical spaces for robotics, agriculture, science, and workshop exposure."
            tone="dark"
          />
          <div className="mt-10 grid auto-rows-[15rem] gap-4 md:grid-cols-4">
            {content.academics.learningInAction.map((item, index) => (
              <MotionReveal
                key={item.title}
                delay={index * 0.04}
                className={item.className}
              >
                <article className="group relative h-full overflow-hidden rounded-md border border-white/15 bg-brand-ink shadow-card">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-serif text-2xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <MotionReveal>
              <p className="text-sm font-bold uppercase text-brand-burgundy">
                {content.academics.cbeOverview.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                {content.academics.cbeOverview.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-brand-muted">
                {content.academics.cbeOverview.description}
              </p>
              <div className="mt-6 rounded-md border-l-4 border-brand-gold bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase text-brand-burgundy">
                  {content.academics.cbeOverview.noteEyebrow}
                </p>
                <p className="text-sm font-semibold leading-7 text-brand-ink">
                  {content.academics.cbeOverview.note}
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.academics.cbeOverview.primaryAction.href}>
                  {content.academics.cbeOverview.primaryAction.label}
                </ButtonLink>
                <ButtonLink
                  href={content.academics.cbeOverview.secondaryAction.href}
                  variant="secondary"
                >
                  {content.academics.cbeOverview.secondaryAction.label}
                </ButtonLink>
              </div>
            </MotionReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.academics.cbeStages.map((stage, index) => (
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
              eyebrow={content.academics.pathwaysIntro.eyebrow}
              title={content.academics.pathwaysIntro.title}
              description={content.academics.pathwaysIntro.description}
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
            eyebrow={content.academics.competenciesIntro.eyebrow}
            title={content.academics.competenciesIntro.title}
            description={content.academics.competenciesIntro.description}
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

    </>
  );
}
