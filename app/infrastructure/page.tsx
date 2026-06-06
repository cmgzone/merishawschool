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
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Explore Merishaw School's architectural concept, site location, sustainability strategies, Maasai-inspired master planning, and campus facilities.",
};

const statIcons = [UsersRound, MapPin, Route, Trees];
const inspirationIcons = [Wind, Leaf, ShieldCheck];
const sustainabilityIcons = [Sun, Wind, Trees, Leaf, Droplets, Droplets, Droplets];
const layerIcons = [Route, Building2, Home, Layers3, Trees, UsersRound];

export default async function InfrastructurePage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.infrastructure.eyebrow}
        title={content.pages.infrastructure.title}
        description={content.pages.infrastructure.description}
        image={content.pages.infrastructure.image}
        imagePosition={content.pages.infrastructure.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.infrastructure.concept.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.infrastructure.concept.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {content.infrastructure.concept.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {content.infrastructure.concept.primaryAction ? (
                <ButtonLink href={content.infrastructure.concept.primaryAction.href}>
                  {content.infrastructure.concept.primaryAction.label}
                </ButtonLink>
              ) : null}
              {content.infrastructure.concept.secondaryAction ? (
                <ButtonLink
                  href={content.infrastructure.concept.secondaryAction.href}
                  variant="secondary"
                >
                  {content.infrastructure.concept.secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </MotionReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {content.infrastructure.stats.map((stat, index) => {
              const Icon = statIcons[index] ?? Building2;

              return (
                <MotionReveal key={`${stat.label}-${index}`} delay={index * 0.04}>
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
                src={content.infrastructure.siteLocation.image ?? ""}
                alt={content.infrastructure.siteLocation.imageAlt ?? ""}
                fill
                className="object-cover"
                style={{
                  objectPosition: content.infrastructure.siteLocation.imagePosition,
                }}
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              {content.infrastructure.siteLocation.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.infrastructure.siteLocation.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {content.infrastructure.siteLocation.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.infrastructure.architecturalIntro.eyebrow}
            title={content.infrastructure.architecturalIntro.title}
            description={content.infrastructure.architecturalIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {content.infrastructure.architecturalInspirations.map((item, index) => {
              const Icon = inspirationIcons[index] ?? Building2;

              return (
                <MotionReveal key={`${item.title}-${index}`} delay={index * 0.05}>
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
            eyebrow={content.infrastructure.sustainabilityIntro.eyebrow}
            title={content.infrastructure.sustainabilityIntro.title}
            description={content.infrastructure.sustainabilityIntro.description}
            tone="dark"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {content.infrastructure.sustainabilityStrategies.map((strategy, index) => {
              const Icon = sustainabilityIcons[index] ?? Leaf;

              return (
                <MotionReveal key={`${strategy}-${index}`} delay={index * 0.035}>
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
              {content.infrastructure.maasai.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.infrastructure.maasai.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-brand-muted">
              {content.infrastructure.maasai.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-premium">
              <Image
                src={content.infrastructure.maasai.image ?? ""}
                alt={content.infrastructure.maasai.imageAlt ?? ""}
                fill
                className="object-cover"
                style={{ objectPosition: content.infrastructure.maasai.imagePosition }}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.infrastructure.masterPlanIntro.eyebrow}
            title={content.infrastructure.masterPlanIntro.title}
            description={content.infrastructure.masterPlanIntro.description}
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.infrastructure.masterPlanLayers.map((layer, index) => {
              const Icon = layerIcons[index] ?? Layers3;

              return (
                <MotionReveal key={`${layer.title}-${index}`} delay={index * 0.04}>
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
              {content.infrastructure.visitCta.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              {content.infrastructure.visitCta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-brand-muted">
              {content.infrastructure.visitCta.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <ButtonLink href={content.infrastructure.visitCta.primaryHref}>
              {content.infrastructure.visitCta.primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={content.infrastructure.visitCta.secondaryHref}
              variant="secondary"
            >
              {content.infrastructure.visitCta.secondaryLabel}
            </ButtonLink>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
