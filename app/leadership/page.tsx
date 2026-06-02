import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, ShieldCheck, UsersRound } from "lucide-react";
import CTASection from "@/components/CTASection";
import LeadershipCard from "@/components/LeadershipCard";
import MotionReveal from "@/components/MotionReveal";
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

function StudentCouncilSection({
  people,
}: {
  people: EditableLeadershipPerson[];
}) {
  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Student Leaders and Student Council"
          title="Student leadership built around responsibility, service, and teamwork."
          description="Our student leaders and council represent learner voice, support daily school life, and work with school leadership to strengthen responsibility, confidence, and belonging."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-6xl">
          <MotionReveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-brand-line bg-white shadow-premium">
              <Image
                src="/images/student-council-team.jpeg"
                alt="Merishaw School student leaders and student council standing together"
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 1152px, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((person, index) => (
            <MotionReveal key={`${person.role}-${index}`} delay={index * 0.04}>
              <article className="h-full rounded-md border border-brand-line bg-white p-5 text-center shadow-card">
                <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full border-4 border-brand-cream bg-brand-cream shadow-sm sm:w-48">
                  <Image
                    src={person.image}
                    alt={
                      person.role === "School President"
                        ? `${person.name} - ${person.role}`
                        : `${person.role} student council portrait`
                    }
                    fill
                    className="object-cover object-top"
                    sizes="192px"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-burgundy">
                    {person.role}
                  </p>
                  {person.role === "School President" ? (
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                      {person.name}
                    </h3>
                  ) : null}
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {person.description}
                  </p>
                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoverningCouncilSection() {
  const councilPriorities = [
    {
      title: "Institutional stewardship",
      description:
        "Supports a clear long-term direction for the school and responsible stewardship of its mission and resources.",
      icon: HeartHandshake,
    },
    {
      title: "Standards and accountability",
      description:
        "Keeps attention on sound governance, quality expectations, and transparent decision-making.",
      icon: ShieldCheck,
    },
    {
      title: "Community partnership",
      description:
        "Strengthens constructive relationships around the shared purpose of forming confident, responsible young men.",
      icon: UsersRound,
    },
  ];

  return (
    <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Governing Council"
          title="Stewardship that keeps the school focused on its purpose."
          description="The Governing Council supports institutional direction, accountability, and the partnerships that help Merishaw continue to grow with confidence."
          align="center"
          tone="dark"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {councilPriorities.map((priority, index) => {
            const Icon = priority.icon;

            return (
              <MotionReveal key={priority.title} delay={index * 0.06}>
                <article className="h-full rounded-md border border-white/15 bg-white/10 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-burgundy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold">
                    {priority.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/80">
                    {priority.description}
                  </p>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CampusSupportSection() {
  const supportPoints = [
    {
      title: "Visible protection",
      description:
        "A dedicated security team supports a safe, orderly campus throughout the school day.",
      icon: ShieldCheck,
    },
    {
      title: "A wider circle of care",
      description:
        "Teachers, boarding teams, and support staff work together around each Moran.",
      icon: UsersRound,
    },
    {
      title: "Confidence to grow",
      description:
        "A protected environment gives boys room to focus, participate, and develop independence.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <MotionReveal>
          <div className="relative aspect-[16/11] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium">
            <Image
              src="/images/leadership-security-team.jpeg"
              alt="Merishaw School security team standing together at the campus entrance"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent px-6 pb-6 pt-20 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-gold">
                Security team
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold">
                A visible layer of care around every Moran.
              </p>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            Safe residential environment
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            Care is built into the rhythm of school life.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Merishaw&apos;s concentric campus idea is also a daily practice:
            students learn and grow within a wider community of teachers,
            residential teams, and support staff.
          </p>
          <div className="mt-7 space-y-3">
            {supportPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article
                  key={point.title}
                  className="flex gap-4 rounded-md border border-brand-line bg-brand-cream p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-brand-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-brand-muted">
                      {point.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </MotionReveal>
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
        showImage={false}
      />

      <LeadershipPeopleSection
        eyebrow="Board Members"
        title="Governance with purpose and accountability."
        description="Board members provide strategic oversight, stewardship, and support for the school's mission and long-term development."
        people={leadership.boardMembers}
        columns="four"
      />

      <GoverningCouncilSection />

      <PrincipalWelcomeSection principal={leadership.principal} variant="full" />

      <LeadershipPeopleSection
        eyebrow="Senior Management Team"
        title="Coordinating academics, boarding, welfare, and daily school life."
        description="The senior management team supports the principal in running a focused, orderly, and caring residential school environment."
        people={leadership.seniorManagement}
      />

      <CampusSupportSection />

      <StudentCouncilSection people={leadership.studentCouncil} />

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
