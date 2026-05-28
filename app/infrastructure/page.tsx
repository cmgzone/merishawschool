import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Droplets,
  Home,
  Layers3,
  Leaf,
  MapPin,
  Route,
  ShieldCheck,
  Sun,
  Trees,
  UsersRound,
  Wind,
} from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import {
  architecturalInspirations,
  conceptIntro,
  infrastructureHero,
  infrastructureStats,
  maasaiContext,
  masterPlanLayers,
  siteLocation,
  sustainabilityStrategies,
} from "@/data/infrastructure";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Explore Merishaw School's architectural concept, site location, sustainability strategies, Maasai-inspired master planning, and campus facilities.",
};

const statIcons = [UsersRound, MapPin, Route, Trees];
const inspirationIcons = [Wind, Leaf, ShieldCheck];
const sustainabilityIcons = [Sun, Wind, Trees, Leaf, Droplets, Droplets, Droplets];
const layerIcons = [Route, Building2, Home, Layers3, Trees, UsersRound];

export default function InfrastructurePage() {
  return (
    <>
      <PageHeader
        eyebrow={infrastructureHero.eyebrow}
        title={infrastructureHero.title}
        description={infrastructureHero.description}
        image={infrastructureHero.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Campus concept
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              A community designed to form conquerors.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {conceptIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/gallery">View Campus Gallery</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Plan a Visit
              </ButtonLink>
            </div>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {infrastructureStats.map((stat, index) => {
              const Icon = statIcons[index] ?? Building2;

              return (
                <MotionReveal key={stat.label} delay={index * 0.04}>
                  <article className="h-full rounded-md border border-brand-line bg-brand-cream p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 font-serif text-4xl font-semibold text-brand-ink">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm font-semibold uppercase leading-6 text-brand-muted">
                      {stat.label}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <MotionReveal>
            <div className="relative aspect-[16/11] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/gallery-campus-view.jpg"
                alt="Merishaw School campus in its Kajiado setting"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Site location
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Isinya&apos;s open savannah becomes part of the school experience.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {siteLocation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Architectural inspirations"
            title="The campus draws from physical openness, sustainable systems, and Maasai social structure."
            description="Each design choice connects the school to its environment while supporting safety, creativity, movement, and whole-boy formation."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {architecturalInspirations.map((item, index) => {
              const Icon = inspirationIcons[index] ?? Building2;

              return (
                <MotionReveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-brand-cream p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
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

      <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <SectionTitle
            eyebrow="Sustainability"
            title="Designed to reduce waste, harvest natural resources, and regulate microclimate."
            description="Passive design strategies and campus systems work together to reduce energy demand and support daily comfort."
            tone="dark"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {sustainabilityStrategies.map((strategy, index) => {
              const Icon = sustainabilityIcons[index] ?? Leaf;

              return (
                <MotionReveal key={strategy} delay={index * 0.035}>
                  <article className="flex gap-4 rounded-md border border-white/15 bg-white/8 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold text-brand-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium leading-7 text-white/90">
                      {strategy}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Social setting
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              A master plan inspired by the Maasai Emanyatta.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {maasaiContext.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src="/images/gallery-aerial-campus.jpg"
                alt="Aerial view of Merishaw School campus master plan"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Movement, zoning and master planning"
            title="A clear axis organizes daily student life from gate to boarding community."
            description="The school master plan follows the logical flow of student activities, with courtyards, buffers, and layers of care shaping the campus."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {masterPlanLayers.map((layer, index) => {
              const Icon = layerIcons[index] ?? Layers3;

              return (
                <MotionReveal key={layer.title} delay={index * 0.04}>
                  <article className="h-full rounded-md border border-brand-line bg-brand-cream p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="font-serif text-4xl font-semibold text-brand-gold">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {layer.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {layer.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto grid max-w-7xl gap-8 rounded-md border border-brand-gold/50 bg-white p-7 shadow-premium lg:grid-cols-[1fr_0.8fr] lg:items-center lg:p-10">
          <div>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Experience the campus
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              See how the architectural concept supports daily life.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              Visit Merishaw to see the arrival boulevard, courtyards, learning
              spaces, boarding community, sports grounds, and the wider campus
              environment.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href="/contact">Book a Visit</ButtonLink>
            <ButtonLink href="/gallery" variant="secondary">
              View Gallery
            </ButtonLink>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
