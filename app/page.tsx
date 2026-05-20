import Image from "next/image";
import {
  Award,
  BookOpenCheck,
  Building2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AcademicCard from "@/components/AcademicCard";
import AdmissionsProcessSection from "@/components/AdmissionsProcessSection";
import ButtonLink from "@/components/ButtonLink";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import DownloadCard from "@/components/DownloadCard";
import EditorialStatement from "@/components/EditorialStatement";
import ExperiencePathwaysSection from "@/components/ExperiencePathwaysSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import LeadershipCard from "@/components/LeadershipCard";
import MotionReveal from "@/components/MotionReveal";
import PillarCard from "@/components/PillarCard";
import PremiumSlideshow from "@/components/PremiumSlideshow";
import PrincipalWelcomeSection from "@/components/PrincipalWelcomeSection";
import SectionTitle from "@/components/SectionTitle";
import SignatureExperienceSection from "@/components/SignatureExperienceSection";
import SupportChildSection from "@/components/SupportChildSection";
import ValuesMarquee from "@/components/ValuesMarquee";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { academicPrograms, pillars } from "@/data/academics";
import { downloads } from "@/data/downloads";
import { galleryImages, showcaseSlides } from "@/data/gallery";
import { whoWeAreHighlights, whyChooseMerishaw } from "@/data/home";
import { leaders } from "@/data/leadership";

const whyChooseIcons = [
  ShieldCheck,
  BookOpenCheck,
  Building2,
  HeartHandshake,
  Award,
  Sparkles,
];

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuesMarquee />
      <EditorialStatement />
      <SignatureExperienceSection />
      <WelcomeVideoSection tone="light" />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/resource-centre.jpeg"
                alt="Merishaw School resource centre"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Who We Are
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              A serious residential school for boys, built around purpose.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Merishaw extends a warm welcome to prospective students and
              parents. The school offers the National Curriculum under 8.4.4
              and the Competency-Based Curriculum at Junior and Senior Secondary,
              with programs developed to bring up wholesome young men who can
              serve society with leadership and integrity.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {whoWeAreHighlights.map((highlight) => (
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
              <ButtonLink href="/academics" variant="secondary">
                Explore Academics
              </ButtonLink>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Choose Merishaw"
            title="A premium school experience with formation at the centre."
            description="This section turns the strongest old-site messages into clear, parent-friendly reasons to enquire, visit, and apply."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseMerishaw.map((item, index) => {
              const Icon = whyChooseIcons[index] ?? ShieldCheck;
              return (
                <MotionReveal key={item.title} delay={index * 0.05}>
                  <article className="group h-full rounded-md border border-brand-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-premium">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold transition group-hover:bg-brand-ink">
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

      <ExperiencePathwaysSection />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Academics"
            title="Curriculum options shaped for excellence and future readiness."
            description="Merishaw combines national curriculum pathways with mentorship, practical skills, global competitiveness, and holistic growth."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {academicPrograms.map((program, index) => (
              <AcademicCard key={program.title} {...program} index={index} />
            ))}
          </div>
        </div>
      </section>

      <AdmissionsProcessSection />

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Six pillars"
            title="The pillars behind Merishaw's formation model."
            description="These pillars are adapted from the old website and organized for clearer storytelling across the new experience."
            tone="dark"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} {...pillar} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Admissions"
        title="Begin the admissions conversation with Merishaw School."
        description="The old site exposed application fields for parent details, student details, curriculum preference, and grade or form. The new admissions page keeps that structure and marks process details that require client confirmation."
        primaryHref="/admissions"
        primaryLabel="View Admissions"
        secondaryHref="/downloads"
        secondaryLabel="Fees & Downloads"
      />

      <PrincipalWelcomeSection />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="Leadership"
              title="A school culture guided by mentorship and accountability."
              description="Leadership content uses verified old-site material and clearly marks details that still need client confirmation."
            />
            <ButtonLink href="/leadership" variant="secondary">
              Meet Leadership
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {leaders.map((leader, index) => (
              <LeadershipCard key={leader.name} {...leader} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="Gallery"
              title="A look inside the Merishaw campus experience."
              description="Campus and student-life images have been mirrored from the old website for the new gallery."
            />
            <ButtonLink href="/gallery" variant="secondary">
              View Gallery
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <PremiumSlideshow slides={showcaseSlides} compact />
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {galleryImages.slice(0, 3).map((image, index) => (
                <MotionReveal key={image.src} delay={index * 0.05}>
                  <div className="relative overflow-hidden rounded-md border border-brand-line bg-white p-3 shadow-card">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-brand-cream">
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

      <SupportChildSection />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow="Downloads"
              title="Key school documents in one clear place."
              description="The current fee structure is mirrored locally; legacy Google Drive links remain marked for approval."
            />
            <ButtonLink href="/downloads" variant="secondary">
              All Downloads
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {downloads.map((download, index) => (
              <DownloadCard key={download.title} {...download} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-burgundy px-4 py-12 text-white sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-brand-gold">
              Latest updates
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              STEM, sports, and school stories.
            </h2>
          </div>
          <ButtonLink href="/news" variant="support">
            Read Updates
          </ButtonLink>
        </MotionReveal>
      </section>

      <FAQSection />

      <ContactSection />
    </>
  );
}
