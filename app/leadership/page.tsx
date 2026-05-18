import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import LeadershipCard from "@/components/LeadershipCard";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { leaders, studentCouncil } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet Merishaw School leadership and student council content adapted from the old website.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Leadership rooted in mentorship, growth, and accountability."
        description="This page organizes the principal's note, director note, and student council content found on the old website."
        image="/images/principal-david-kariuki.png"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="School leadership"
            title="Guiding the Merishaw community."
            description="One leadership profile is verified by name; the director/founder naming requires client confirmation before launch."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {leaders.map((leader, index) => (
              <LeadershipCard key={leader.name} {...leader} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Governance"
            title="Student council voices from the old website."
            description="The old governance page included short reflections from the School Captain and Deputy School Captain."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {studentCouncil.map((member, index) => (
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
