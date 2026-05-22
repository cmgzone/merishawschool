import Image from "next/image";
import {
  Award,
  BedDouble,
  BookOpenCheck,
  Building2,
  HeartHandshake,
  Mail,
  Phone,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import AcademicCard from "@/components/AcademicCard";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import HeroSection from "@/components/HeroSection";
import MotionReveal from "@/components/MotionReveal";
import PillarCard from "@/components/PillarCard";
import PremiumSlideshow from "@/components/PremiumSlideshow";
import PrincipalWelcomeSection from "@/components/PrincipalWelcomeSection";
import SectionTitle from "@/components/SectionTitle";
import SupportChildSection from "@/components/SupportChildSection";
import VideoTourSection from "@/components/VideoTourSection";
import { getEditableContent } from "@/data/admin-content";

const whyChooseIcons = [ShieldCheck, BookOpenCheck, Building2, Award];

const boardingHighlights = [
  {
    title: "Structured boarding",
    description: "A calm residential rhythm helps boys grow in discipline, care, and independence.",
    icon: BedDouble,
  },
  {
    title: "Mentorship culture",
    description: "Teachers and leaders guide learners beyond academics into character and confidence.",
    icon: UsersRound,
  },
  {
    title: "Whole-school life",
    description: "Sport, faith, arts, service, and leadership sit beside classroom excellence.",
    icon: HeartHandshake,
  },
];

export default async function Home() {
  const content = await getEditableContent();

  return (
    <>
      <HeroSection slides={content.home.heroSlides} statsItems={content.home.stats} />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Why Merishaw
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              A focused boys&apos; school with a clear promise.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">
              Merishaw blends residential care, strong academics, faith, mentorship,
              and leadership so boys can grow with purpose and confidence.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {content.home.highlights.map((highlight) => (
                <div
                  key={highlight.value}
                  className="rounded-md border border-brand-line bg-brand-cream p-4"
                >
                  <p className="font-serif text-2xl font-semibold text-brand-ink">
                    {highlight.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase leading-5 text-brand-muted">
                    {highlight.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about">Learn About Merishaw</ButtonLink>
              <ButtonLink href="/admissions" variant="secondary">
                Start Admissions
              </ButtonLink>
            </div>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.home.whyChoose.slice(0, 4).map((item, index) => {
              const Icon = whyChooseIcons[index] ?? ShieldCheck;

              return (
                <MotionReveal key={item.title} delay={index * 0.05}>
                  <article className="group h-full rounded-md border border-brand-line bg-brand-cream p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:bg-white hover:shadow-premium">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold transition group-hover:bg-brand-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {item.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <VideoTourSection />

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Academic pathways"
            title="Curriculum options shaped for excellence and future readiness."
            description="Parents can quickly understand the learning routes available before moving into the full Academics page."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.academics.programs.map((program, index) => (
              <AcademicCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[16/11] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/gallery-dormitory.jpeg"
                alt="Merishaw School boarding facilities"
                fill
                className="object-cover brightness-105"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Boarding and student life
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              A home-away-from-home with structure, warmth, and ambition.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              The residential experience gives students a stable environment for
              study, friendship, worship, sport, talent development, and daily
              mentorship.
            </p>
            <div className="mt-7 grid gap-4">
              {boardingHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-md border border-brand-line bg-brand-cream p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-brand-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-brand-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-7">
              <ButtonLink href="/about" variant="secondary">
                Explore School Life
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Six pillars"
            title="A wider formation model for academics, talent, service, and character."
            description="The pillars give parents a simple view of how Merishaw develops the whole student."
            tone="dark"
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {content.academics.pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Facilities preview
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Spaces built for learning, boarding, creativity, and sport.
            </h2>
            <div className="mt-7 grid gap-3">
              {content.academics.facilities.slice(0, 4).map((facility) => (
                <div
                  key={facility}
                  className="rounded-md border border-brand-line bg-brand-cream p-4 text-sm font-semibold leading-7 text-brand-ink"
                >
                  {facility}
                </div>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href="/about" variant="secondary">
                View Facilities
              </ButtonLink>
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/gallery-resource-centre.jpeg"
                alt="Merishaw School resource centre"
                fill
                className="object-cover brightness-105"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <PrincipalWelcomeSection principal={content.leadership.leaders[0]} />

      <CTASection
        eyebrow="Admissions"
        title="Ready to discuss the right pathway for your son?"
        description="Start with a simple enquiry. The admissions team can guide you on curriculum options, grade placement, fees, and the next school visit."
        primaryHref="/admissions"
        primaryLabel="Start Admissions"
        secondaryHref="/downloads"
        secondaryLabel="Fees & Downloads"
      />

      <SupportChildSection
        content={content.support.content}
        initiatives={content.support.initiatives}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="Gallery preview"
              title="A closer look at campus life."
              description="See the classrooms, boarding spaces, grounds, and student-life moments that shape the Merishaw experience."
            />
            <ButtonLink href="/gallery" variant="secondary">
              View Gallery
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <PremiumSlideshow slides={content.gallery.showcaseSlides} compact />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.gallery.images.slice(0, 3).map((image, index) => (
                <MotionReveal key={image.src} delay={index * 0.05}>
                  <div className="relative overflow-hidden rounded-md border border-brand-line bg-brand-cream p-3 shadow-card">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-white">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 30vw, 100vw"
                      />
                    </div>
                    <p className="mt-3 text-xs font-bold uppercase text-brand-burgundy">
                      {image.category}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-md border border-brand-gold/50 bg-white p-7 shadow-premium lg:grid-cols-[1fr_0.9fr] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Contact CTA
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Book a visit or speak with Merishaw School.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              For admissions, school visits, sponsorship conversations, or
              general enquiries, the school team is ready to help.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">Contact Us</ButtonLink>
              <ButtonLink
                href={`tel:${content.site.contact.phonePrimary.replace(/\s/g, "")}`}
                variant="secondary"
              >
                Call Now
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-3">
            <a
              href={`tel:${content.site.contact.phonePrimary.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-md border border-brand-line bg-brand-cream p-4 transition hover:border-brand-gold"
            >
              <Phone className="h-5 w-5 shrink-0 text-brand-burgundy" />
              <span className="text-sm font-semibold text-brand-ink">
                {content.site.contact.phonePrimary} / {content.site.contact.phoneSecondary}
              </span>
            </a>
            <a
                href={`mailto:${content.site.contact.email}`}
              className="flex items-center gap-4 rounded-md border border-brand-line bg-brand-cream p-4 transition hover:border-brand-gold"
            >
              <Mail className="h-5 w-5 shrink-0 text-brand-burgundy" />
              <span className="break-all text-sm font-semibold text-brand-ink">
                {content.site.contact.email}
              </span>
            </a>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
