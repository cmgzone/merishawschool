import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { facilities, values } from "@/data/academics";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Merishaw School's mission, vision, values, facilities, and purpose-led residential boys' education model.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A home where boys are mentored into men of integrity."
        description="Merishaw School combines a serene boarding environment, strong academics, outstanding facilities, and a Christian foundation for whole-person growth."
        image="/images/resource-centre.jpeg"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              School overview
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              State-of-the-art residential education for the boy child.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-brand-muted">
              <p>
                Merishaw School is a residential boys&apos; high school offering the
                National Curriculum under 8.4.4 and Competency-Based Education
                at Junior and Senior Secondary School.
              </p>
              <p>
                The school develops unique programs to bring up wholesome young
                men who can meet the needs of society and provide leadership in
                their families, workplaces, the country, and the global stage.
              </p>
              <p>
                The approach emphasizes mentorship, empowerment, academic
                excellence, character formation, and the restoration of focus on
                the boy child.
              </p>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/campus-life.jpg"
                alt="Merishaw School campus life"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <WelcomeVideoSection
        tone="cream"
        eyebrow="A welcome to Merishaw"
        title="See the Merishaw environment before you visit."
        description="The welcome video gives parents a closer feel of the campus, school identity, and values-led formation that shape the Merishaw experience."
      />

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Mission, vision, values"
            title="Purpose-driven global leaders empowered for success."
            description="The mission, vision, and values give families a clear view of the school's foundation."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <MotionReveal>
              <article className="h-full rounded-md border border-brand-line bg-white p-7 shadow-card">
                <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                  Vision
                </h3>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  To develop purpose driven global leaders empowered for success.
                </p>
              </article>
            </MotionReveal>
            <MotionReveal delay={0.05}>
              <article className="h-full rounded-md border border-brand-line bg-white p-7 shadow-card">
                <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                  Mission
                </h3>
                <p className="mt-4 text-base leading-8 text-brand-muted">
                  Merishaw aims to provide a world class education that equips
                  learners with skills to become critical thinkers, effective
                  communicators, God fearing, and compassionate leaders with
                  integrity through the pursuit of academic excellence.
                </p>
              </article>
            </MotionReveal>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <MotionReveal key={value.label} delay={index * 0.035}>
                <div className="rounded-md border border-brand-line bg-white p-5">
                  <p className="font-serif text-3xl font-semibold text-brand-burgundy">
                    {value.letter}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-brand-ink">
                    {value.label}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionTitle
            eyebrow="Facilities"
            title="A campus designed for learning, boarding, creativity, and sport."
            description="Academic, residential, creative, dining, and sporting spaces support a complete school experience."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((facility, index) => (
              <MotionReveal key={facility} delay={index * 0.035}>
                <div className="rounded-md border border-brand-line bg-brand-cream p-4 text-sm font-semibold leading-7 text-brand-ink">
                  {facility}
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src="/images/gallery-aerial-campus.jpg"
                alt="Aerial view of Merishaw School"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-gold">
              Architectural concept
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              Built as a home away from home.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-white/90">
              Merishaw&apos;s campus is designed to feel calm, ordered, and
              inspiring, with the facilities and environment learners need to
              fully enjoy school life.
            </p>
            <div className="mt-7">
              <ButtonLink href="/gallery" variant="support">
                See the Campus
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </section>

      <CTASection
        eyebrow="Leadership"
        title="Read the messages from Merishaw's leadership."
        description="The leadership page introduces the people and student voices shaping Merishaw's culture."
        primaryHref="/leadership"
        primaryLabel="View Leadership"
        secondaryHref="/contact"
        secondaryLabel="Contact School"
      />
    </>
  );
}
