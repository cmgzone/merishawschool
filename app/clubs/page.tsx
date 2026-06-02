import type { Metadata } from "next";
import Image from "next/image";
import { Brain, CircleDot, Lightbulb, UsersRound } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";

const clubHighlights = [
  {
    title: "Chess Club",
    description:
      "Chess gives students a structured space for concentration, patience, strategy, foresight, and thoughtful decision-making.",
    icon: Brain,
  },
  {
    title: "Table Tennis",
    description:
      "Fast-paced rallies encourage coordination, reflexes, focus, and friendly competition in the indoor activity space.",
    icon: CircleDot,
  },
  {
    title: "Badminton",
    description:
      "Badminton develops movement, agility, consistency, and confidence through regular practice and match play.",
    icon: UsersRound,
  },
  {
    title: "Student Interests",
    description:
      "Clubs help boys explore interests, practise leadership, and build friendships beyond the classroom timetable.",
    icon: Lightbulb,
  },
];

const clubPhotos = [
  {
    src: "/images/clubs-table-tennis.jpeg",
    alt: "Merishaw School students playing table tennis",
    className: "sm:col-span-2",
  },
  {
    src: "/images/clubs-badminton-court.jpeg",
    alt: "Merishaw School student playing badminton on the indoor court",
    className: "",
  },
  {
    src: "/images/clubs-badminton-serve.jpeg",
    alt: "Merishaw School student preparing a badminton serve",
    className: "",
  },
];

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Explore Merishaw School clubs and indoor activities, including chess, table tennis, badminton, strategy, teamwork, and student interests.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Extra-curricular Activities"
        title="Clubs that create room for strategy, skill, and friendship."
        description="Chess, table tennis, badminton, and wider student interests give boys more ways to grow beyond the classroom."
        image="/images/clubs-table-tennis.jpeg"
        imagePosition="center 52%"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Student interests
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Strong school life includes time to think, practise, and connect.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Club activities give students a healthy balance alongside
              academics, boarding routines, and sport. Chess introduces
              strategic thinking, while badminton and table tennis create
              active indoor spaces for regular practice and friendly
              competition.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/sports">Explore Sports</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact School
              </ButtonLink>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/clubs-badminton-court.jpeg"
                alt="Merishaw School student playing badminton on the indoor court"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Clubs and activities"
            title="Different interests. Valuable habits."
            description="Clubs give boys space to focus, collaborate, discover new strengths, and enjoy purposeful time together."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clubHighlights.map((club, index) => {
              const Icon = club.icon;

              return (
                <MotionReveal key={club.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {club.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {club.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Activity gallery"
            title="Indoor activities with a lively competitive rhythm."
            description="Students enjoy spaces for movement, focus, and friendly match play."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {clubPhotos.map((photo, index) => (
              <MotionReveal
                key={photo.src}
                delay={index * 0.05}
                className={photo.className}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/20 bg-brand-ink shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="School life"
        title="Explore a school environment built for the whole boy."
        description="Speak with the school team about academics, boarding, clubs, sport, and the admissions pathway."
        primaryHref="/admissions"
        primaryLabel="Start Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
