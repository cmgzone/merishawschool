import type { Metadata } from "next";
import Image from "next/image";
import { Medal, Target, Trophy, UsersRound } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";

const sportsProgrammes = [
  {
    title: "Soccer Academy",
    description:
      "Training and competitive play develop technique, fitness, decision-making, teamwork, and composure under pressure.",
    image: "/images/sports-soccer-match.jpeg",
    alt: "Merishaw Soccer Academy students competing for the ball",
  },
  {
    title: "Swimming",
    description:
      "Pool sessions help students build endurance, water confidence, stroke technique, discipline, and personal resilience.",
    image: "/images/sports-swimming-butterfly.jpeg",
    alt: "Merishaw School swimmer practising butterfly stroke",
  },
  {
    title: "Lacrosse",
    description:
      "Lacrosse introduces students to pace, coordination, tactical awareness, and a team sport with growing international reach.",
    image: "/images/sports-lacrosse-match.jpeg",
    alt: "Merishaw School students playing lacrosse on the field",
  },
];

const sportsGallery = [
  {
    src: "/images/sports-soccer-match.jpeg",
    alt: "Merishaw Soccer Academy students competing for the ball",
  },
  {
    src: "/images/gallery-soccer-academy.jpeg",
    alt: "Merishaw Soccer Academy student driving forward with the ball",
  },
  {
    src: "/images/sports-lacrosse-passing.jpeg",
    alt: "Merishaw School lacrosse students preparing a pass",
  },
  {
    src: "/images/sports-lacrosse-match.jpeg",
    alt: "Merishaw School students playing lacrosse on the field",
  },
  {
    src: "/images/sports-swimming-butterfly.jpeg",
    alt: "Merishaw School swimmer practising butterfly stroke",
  },
  {
    src: "/images/sports-swimming-breaststroke.jpeg",
    alt: "Merishaw School swimmer practising breaststroke",
  },
  {
    src: "/images/sports-swimming-training.jpeg",
    alt: "Merishaw School swimmer training in a pool lane",
  },
  {
    src: "/images/sports-swimming-freestyle.jpeg",
    alt: "Merishaw School swimmer practising freestyle in a pool lane",
  },
];

export const metadata: Metadata = {
  title: "Sports",
  description:
    "Explore Merishaw School sports, including soccer, swimming, lacrosse, structured coaching, teamwork, and talent development.",
};

export default function SportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Extra-curricular Activities"
        title="Sport that develops discipline, teamwork, and a winning mentality."
        description="Merishaw gives boys room to compete, train, and grow through soccer, swimming, lacrosse, and a wider culture of active participation."
        image="/images/sports-soccer-match.jpeg"
        imagePosition="center 54%"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Sports and talents
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Train the body. Strengthen the character.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Sporting life at Merishaw sits alongside academic focus and
              character formation. Boys learn how to prepare, respond to
              challenge, play for the team, and pursue steady improvement.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/clubs">Explore Clubs</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact School
              </ButtonLink>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/sports-lacrosse-passing.jpeg"
                alt="Merishaw School lacrosse students preparing a pass"
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
            eyebrow="Sports programme"
            title="Different sporting pathways. Shared habits of excellence."
            description="Each programme creates opportunities for fitness, resilience, teamwork, and confident participation."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {sportsProgrammes.map((programme, index) => (
              <MotionReveal key={programme.title} delay={index * 0.05}>
                <article className="h-full overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={programme.image}
                      alt={programme.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                      {programme.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {programme.description}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <MotionReveal>
            <div className="relative aspect-video overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/sports-coach.jpeg"
                alt="Merishaw School sports coach speaking beside the school field"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-gold">
              Coaching culture
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Purposeful guidance behind every training session.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-white/90">
              Merishaw&apos;s sporting environment encourages discipline,
              sportsmanship, courage, and a healthy competitive mindset.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { label: "Teamwork", icon: UsersRound },
                { label: "Resilience", icon: Trophy },
                { label: "Technique", icon: Target },
                { label: "Confidence", icon: Medal },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-md border border-white/15 bg-white/10 p-4"
                  >
                    <Icon className="h-5 w-5 text-brand-gold" />
                    <p className="text-sm font-bold">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Sports gallery"
            title="A closer look at active school life."
            description="From the field to the pool, students have room to train, participate, and develop their talents."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sportsGallery.map((photo, index) => (
              <MotionReveal key={photo.src} delay={index * 0.035}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Admissions"
        title="Find the right environment for your son's growth."
        description="Speak with the school team about academics, boarding, sports, clubs, and planning your visit to Merishaw."
        primaryHref="/admissions"
        primaryLabel="Start Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
