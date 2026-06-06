import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent } from "@/data/admin-content";

const foundersVisionParagraphs = [
  "I am a proud son of teachers, and I believe the seed for Merishaw School was nurtured in me from an early age. The journey I embarked on has been driven by deep conviction and passionate commitment to bridge the growing gap in academic performance, welfare, and the leadership role of the boy child. The journey has not been devoid of curve balls and challenges, but keeping my eyes on the prize has kept my team motivated and committed to achieving a vision that will outlast us and many generations to come.",
  "My vision is to develop a critical mass of young men, Morans, equipped with the skills, character, and knowledge to create a sustained and continuously escalating spin-off effect that changes society and the world as a whole through the boy child.",
  "Our success in gaining milestones has inspired me to transform retrospective pride into a strategic compass, turning yesterday's victories into the creative fuel and momentum needed for tomorrow's boldest goals.",
  "It has elevated my understanding of success by embracing a mindful, forward-looking practice that goes beyond the surface, valuing moments when we must pivot direction and be prepared for uncharted challenges.",
];

export const metadata: Metadata = {
  title: "Our Founder's Vision",
  description:
    "Read the founder's vision behind Merishaw School and its journey of turning boys into men of purpose and integrity.",
};

export default async function FoundersVisionPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Our Founder's Vision"
        description="A visionary journey turning boys into men of purpose and integrity."
        image={content.about.overview.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Founder&apos;s Vision
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              A visionary journey: turning boys into men of purpose and
              integrity.
            </h2>
            <blockquote className="mt-6 rounded-md border-l-4 border-brand-burgundy bg-brand-cream p-5 font-serif text-2xl font-semibold leading-tight text-brand-ink">
              Success is not a destination; it&apos;s a journey.
            </blockquote>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about">Mission and Values</ButtonLink>
              <ButtonLink href="/leadership" variant="secondary">
                Leadership
              </ButtonLink>
            </div>
          </MotionReveal>

          <div className="grid gap-4">
            {foundersVisionParagraphs.map((paragraph, index) => (
              <MotionReveal key={paragraph} delay={index * 0.05}>
                <article className="rounded-md border border-brand-line bg-brand-cream p-6 sm:p-8">
                  <p className="text-sm font-bold uppercase text-brand-burgundy">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-lg leading-9 text-brand-muted">
                    {paragraph}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
