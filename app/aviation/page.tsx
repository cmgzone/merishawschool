import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Gauge, Plane, UsersRound } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";

const aviationHighlights = [
  {
    title: "Aircraft familiarization",
    description:
      "Students encounter aircraft systems, cockpit instruments, and the practical language of aviation in a guided setting.",
    icon: Plane,
  },
  {
    title: "Career awareness",
    description:
      "Exposure to aviation helps boys connect classroom curiosity with future pathways in flight, engineering, and related fields.",
    icon: Compass,
  },
  {
    title: "Technical curiosity",
    description:
      "Close-up learning moments encourage questions, observation, and a deeper interest in how aircraft operate.",
    icon: Gauge,
  },
  {
    title: "Confidence and teamwork",
    description:
      "Shared experiences give students room to learn together, listen carefully, and imagine ambitious futures.",
    icon: UsersRound,
  },
];

const aviationPhotos = [
  {
    src: "/images/aviation-group-briefing.jpeg",
    alt: "Merishaw School aviation students receiving a briefing beside an aircraft",
    className: "sm:col-span-2 lg:col-span-2",
  },
  {
    src: "/images/aviation-student-controls.jpeg",
    alt: "Merishaw School aviation student learning at the aircraft controls",
    className: "",
  },
  {
    src: "/images/aviation-aircraft-propeller.jpeg",
    alt: "Merishaw School aviation students examining an aircraft propeller",
    className: "",
  },
  {
    src: "/images/aviation-technical-briefing.jpeg",
    alt: "Merishaw School aviation students listening to a technical briefing",
    className: "sm:col-span-2",
  },
  {
    src: "/images/aviation-cockpit-selfie.jpeg",
    alt: "A Merishaw School student and aviation mentor inside an aircraft",
    className: "",
  },
  {
    src: "/images/aviation-cockpit-introduction.jpeg",
    alt: "Merishaw School aviation student exploring an aircraft cockpit",
    className: "",
  },
  {
    src: "/images/aviation-student-flight.jpeg",
    alt: "Merishaw School aviation student observing the cockpit instruments",
    className: "",
  },
];

export const metadata: Metadata = {
  title: "Aviation",
  description:
    "Explore Merishaw School aviation exposure activities, including guided aircraft visits, cockpit familiarization, technical learning, and career awareness.",
};

export default function AviationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Academics / Aviation"
        title="Aviation exposure that turns curiosity into possibility."
        description="Students step closer to the world of flight through guided aircraft visits, cockpit familiarization, technical conversations, and career awareness."
        image="/images/aviation-group-briefing.jpeg"
        imagePosition="center 48%"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Learning beyond the classroom
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Give ambition a real-world point of reference.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Merishaw&apos;s aviation exposure introduces learners to aircraft,
              technical environments, and the people who work within them. These
              practical encounters help boys ask better questions, build
              confidence, and see how academic effort can connect to future
              possibilities.
            </p>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/aviation-student-controls.jpeg"
                alt="Merishaw School aviation student learning at the aircraft controls"
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
            eyebrow="Aviation experience"
            title="Practical exposure shaped around curiosity, confidence, and future pathways."
            description="The experience gives learners a closer view of aviation while reinforcing the habits that support wider academic and personal growth."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aviationHighlights.map((highlight, index) => {
              const Icon = highlight.icon;

              return (
                <MotionReveal key={highlight.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-5 shadow-card">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {highlight.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {highlight.description}
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
            eyebrow="Aviation gallery"
            title="A closer look at the learning experience."
            description="Students explore aircraft, cockpit environments, and guided technical conversations during aviation exposure activities."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aviationPhotos.map((photo, index) => (
              <MotionReveal
                key={photo.src}
                delay={index * 0.035}
                className={photo.className}
              >
                <div className="relative aspect-[4/3] h-full min-h-64 overflow-hidden rounded-md border border-white/20 bg-brand-ink shadow-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Admissions"
        title="Discover the wider Merishaw learning experience."
        description="Speak with the school team about admissions, curriculum pathways, student opportunities, and planning a school visit."
        primaryHref="/admissions"
        primaryLabel="Start Admissions"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
