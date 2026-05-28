import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import LeadershipCard from "@/components/LeadershipCard";
import PageHeader from "@/components/PageHeader";
import PrincipalWelcomeSection from "@/components/PrincipalWelcomeSection";
import SectionTitle from "@/components/SectionTitle";
import {
  getEditableContent,
  type EditableLeadershipPerson,
} from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet Merishaw School leadership and student council voices.",
};

type LeadershipSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  people: EditableLeadershipPerson[];
  tone?: "white" | "cream";
  columns?: "three" | "four";
};

function LeadershipPeopleSection({
  eyebrow,
  title,
  description,
  people,
  tone = "white",
  columns = "three",
}: LeadershipSectionProps) {
  const gridClass =
    columns === "four"
      ? "mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
      : "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className={`${tone === "cream" ? "bg-brand-cream" : "bg-white"} px-4 py-16 sm:px-6 lg:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <div className={gridClass}>
          {people.map((person, index) => (
            <LeadershipCard
              key={`${person.role}-${person.name}-${index}`}
              {...person}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function LeadershipPage() {
  const content = await getEditableContent();
  const { leadership } = content;

  return (
    <>
      <PageHeader
        eyebrow={content.pages.leadership.eyebrow}
        title={content.pages.leadership.title}
        description={content.pages.leadership.description}
        image={content.pages.leadership.image}
        imageFit="contain"
        imagePosition="right center"
      />

      <LeadershipPeopleSection
        eyebrow="Board Members"
        title="Governance with purpose and accountability."
        description="Board members provide strategic oversight, stewardship, and support for the school's mission and long-term development."
        people={leadership.boardMembers}
        columns="four"
      />

      <PrincipalWelcomeSection principal={leadership.principal} variant="full" />

      <LeadershipPeopleSection
        eyebrow="Senior Management Team"
        title="Coordinating academics, boarding, welfare, and daily school life."
        description="The senior management team supports the principal in running a focused, orderly, and caring residential school environment."
        people={leadership.seniorManagement}
      />

      <LeadershipPeopleSection
        eyebrow="Student Council"
        title="A student voice within the school community."
        description="The student council gives learners responsibility, confidence, and a structured way to work with school leadership."
        people={leadership.studentCouncil}
        tone="cream"
      />

      <LeadershipPeopleSection
        eyebrow="Student Leadership"
        title="Student Leaders."
        description="Student leaders help build responsibility, service, discipline, and peer mentorship across daily school life."
        people={leadership.studentLeaders}
        columns="four"
      />

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
