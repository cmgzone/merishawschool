import type { Metadata } from "next";
import Image from "next/image";
import {
  Atom,
  Brain,
  CircleDot,
  Flag,
  Gauge,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Palette,
  Trophy,
  UsersRound,
} from "lucide-react";
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
  {
    title: "World Scholar's Cup",
    description:
      "Academic competitions and conferences celebrate the joy of learning while encouraging students to discover new strengths.",
    icon: Globe2,
  },
];

const clubPhotos = [
  {
    src: "/images/academics-robotics-circuit.jpeg",
    alt: "Merishaw School student testing a robotics circuit during a practical STEM activity",
    className: "sm:col-span-2",
  },
  {
    src: "/images/academics-agriculture.jpeg",
    alt: "Merishaw School students learning practical agriculture skills in the school garden",
    className: "",
  },
  {
    src: "/images/clubs-music-drums.jpeg",
    alt: "Drum kit ready for Merishaw School music and talent development activities",
    className: "",
  },
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

const signatureClubs = [
  {
    title: "The Omanyala Sprint Club",
    description:
      "Launched in partnership with Africa's fastest man, Ferdinand Omanyala, to nurture grassroots sprint talent.",
    icon: Flag,
  },
  {
    title: "Merishaw Drift Club",
    description:
      "A first-of-its-kind school motorsport and drift club in the country, providing practical exposure through garages and driving experts.",
    icon: Gauge,
  },
  {
    title: "STEM Club",
    description:
      "Science, technology, engineering, and mathematics come alive through hands-on competitions and projects.",
    icon: Atom,
  },
];

const clubDirectories = [
  {
    title: "Academic and creative",
    description: "Art Club, Wildlife Club, Journalism Club, and Languages Club",
    icon: Palette,
  },
  {
    title: "Service and leadership",
    description: "Scouts Club, St. John, and Red Cross",
    icon: HeartHandshake,
  },
  {
    title: "Faith societies",
    description: "Christian Union (CU) and Young Christian Society (YCS)",
    icon: UsersRound,
  },
];

export const metadata: Metadata = {
  title: "Clubs",
  description:
    "Explore Merishaw School clubs and activities, including the World Scholar's Cup, the Omanyala Sprint Club, Merishaw Drift Club, STEM Club, chess, table tennis, badminton, service, leadership, and faith societies.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        cinematic
        eyebrow="Extra-curricular Activities"
        title="Clubs that create room for strategy, skill, and friendship."
        description="The World Scholar's Cup, chess, table tennis, badminton, and wider student interests give boys more ways to grow beyond the classroom."
        image="/images/world-scholars-conference-attendance.jpeg"
        imagePosition="center 42%"
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
              academics, boarding routines, and sport. The World Scholar&apos;s
              Cup adds an academic competition and conference experience,
              chess introduces strategic thinking, and indoor activities
              create space for regular practice and friendly competition.
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
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <MotionReveal>
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
              <Globe2 className="h-7 w-7" />
            </div>
            <p className="mt-6 text-sm font-bold uppercase text-brand-burgundy">
              Featured club
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              World Scholar&apos;s Cup
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Merishaw School is a proud host and participant in the World
              Scholar&apos;s Cup. The school regularly hosts the Rift Valley
              Regional Rounds and sends strong delegations of scholars to
              international events.
            </p>
            <p className="mt-4 text-base leading-8 text-brand-muted">
              The experience celebrates the joy of learning while motivating
              students not only to demonstrate their existing strengths, but
              also to discover new ones.
            </p>
            <p className="mt-4 border-l-4 border-brand-gold pl-4 text-sm font-semibold leading-7 text-brand-ink">
              World Scholar&apos;s creates a unique academic competition and
              conference experience: a celebration of learning, teamwork, and
              the confidence to try something new.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-brand-gold/50 bg-brand-cream p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-burgundy">
                  2026 theme
                </p>
                <p className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
                  Are We There Yet?
                </p>
              </div>
              <div className="rounded-md border border-brand-gold/50 bg-brand-cream p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-burgundy">
                  Global progression
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-brand-ink">
                  Qualifying teams can progress through 2026 Global Rounds,
                  including Bangkok, Prague, and Dubai, and earn invitations to
                  the Tournament of Champions at Yale University.
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-md border border-brand-gold/50 bg-brand-cream p-4">
              <Trophy className="h-5 w-5 shrink-0 text-brand-burgundy" />
              <p className="text-sm font-semibold leading-7 text-brand-ink">
                Learning, teamwork, confidence, and discovery matter at every
                stage of the experience.
              </p>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium">
              <Image
                src="/images/world-scholars-competition-writing.jpeg"
                alt="Merishaw School students participating in a World Scholar's Cup academic competition"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Signature clubs"
            title="Distinctive programs that turn interests into real-world growth."
            description="Merishaw gives boys practical opportunities to explore sport, engineering, innovation, leadership, creativity, and service."
            align="center"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {signatureClubs.map((club, index) => {
              const Icon = club.icon;

              return (
                <MotionReveal key={club.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-6 w-6" />
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

          <div className="mt-8 rounded-md border border-brand-gold/50 bg-brand-burgundy p-6 text-white shadow-premium sm:p-8">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-gold">
                  Additional clubs and societies
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  More ways to discover a strength, serve others, and belong.
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {clubDirectories.map((group) => {
                  const Icon = group.icon;

                  return (
                    <div
                      key={group.title}
                      className="rounded-md border border-white/20 bg-white/10 p-4"
                    >
                      <Icon className="h-5 w-5 text-brand-gold" />
                      <p className="mt-4 text-sm font-bold uppercase tracking-[0.1em] text-brand-gold">
                        {group.title}
                      </p>
                      <p className="mt-2 text-sm font-medium leading-7 text-white/85">
                        {group.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Activity gallery"
            title="Clubs, talents, and practical interests in motion."
            description="Students explore technology, agriculture, music, movement, focus, and friendly competition beyond the classroom timetable."
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
