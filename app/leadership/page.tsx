import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import LeadershipCard from "@/components/LeadershipCard";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet Merishaw School leadership and student council voices.",
};

export default async function LeadershipPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.leadership.eyebrow}
        title={content.pages.leadership.title}
        description={content.pages.leadership.description}
        image={content.pages.leadership.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="School leadership"
            title="Guiding the Merishaw community."
            description="The school culture is guided by mentorship, academic purpose, and strong accountability."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {content.leadership.leaders.map((leader, index) => (
              <LeadershipCard key={leader.name} {...leader} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Governance"
            title="Student council voices."
            description="Student leadership gives learners responsibility, confidence, and a voice within the school community."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {content.leadership.studentCouncil.map((member, index) => (
              <MotionReveal key={member.role} delay={index * 0.05}>
                <blockquote className="h-full rounded-md border border-brand-line bg-white p-7 shadow-card">
                  <p className="font-serif text-2xl font-semibold text-brand-ink">
                    {member.role}
                  </p>
                  <p className="mt-5 text-base leading-8 text-brand-muted">
                    &quot;{member.quote}&quot;
                  </p>
                </blockquote>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Formation"
        title="Leadership is part of the student experience."
        description="Merishaw's student life emphasizes resilience, teamwork, commitment, enthusiasm, and growth."
        primaryHref="/admissions"
        primaryLabel="Admissions"
        secondaryHref="/about"
        secondaryLabel="About Merishaw"
      />
    </>
  );
}
