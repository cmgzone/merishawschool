import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import SectionTitle from "@/components/SectionTitle";
import { admissionsProcess } from "@/data/home";

type AdmissionsStep = (typeof admissionsProcess)[number];

type AdmissionsProcessSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  introCardTitle?: string;
  introCardDescription?: string;
  processItems?: AdmissionsStep[];
  showIntroCard?: boolean;
  showActions?: boolean;
};

export default function AdmissionsProcessSection({
  eyebrow = "Admissions Process",
  title = "A calm, clear path from enquiry to joining.",
  description = "Parents get a simple journey: enquire, share student details, review requirements, then plan the next step with the school.",
  introCardTitle = "What to prepare",
  introCardDescription = "Have parent contact details, student information, preferred curriculum, intended grade or form, and any recent academic records ready for the admissions conversation.",
  processItems = admissionsProcess,
  showIntroCard = true,
  showActions = true,
}: AdmissionsProcessSectionProps) {
  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              description={description}
            />
            {showIntroCard ? (
              <MotionReveal delay={0.08}>
                <div className="mt-8 rounded-md border border-brand-gold/60 bg-white p-6 shadow-card">
                  <p className="text-sm font-bold uppercase text-brand-burgundy">
                    {introCardTitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {introCardDescription}
                  </p>
                </div>
              </MotionReveal>
            ) : null}
            {showActions ? (
              <MotionReveal delay={0.12}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/admissions">Start Admissions</ButtonLink>
                  <ButtonLink href="/downloads" variant="secondary">
                    View Fees
                  </ButtonLink>
                </div>
              </MotionReveal>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processItems.map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.05}>
                <article className="group relative h-full overflow-hidden rounded-md border border-brand-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-premium">
                  <div className="absolute right-5 top-4 font-serif text-5xl font-semibold text-brand-burgundy/10 transition group-hover:text-brand-burgundy/20">
                    {item.step}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-burgundy">
                    Step {item.step}
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {item.description}
                  </p>
                  <p className="mt-5 rounded-md bg-brand-cream px-3 py-2 text-xs font-semibold text-brand-ink">
                    {item.note}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
