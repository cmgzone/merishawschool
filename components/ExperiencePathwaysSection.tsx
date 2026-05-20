import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import SectionTitle from "@/components/SectionTitle";
import { experiencePathways } from "@/data/home";

export default function ExperiencePathwaysSection() {
  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle
            eyebrow="Explore Merishaw"
            title="Clear pathways for every parent journey."
            description="This gives the homepage the guided feeling of a premium school site: parents can move quickly into academics, boarding life, leadership, admissions, or CSR."
          />
          <MotionReveal delay={0.08}>
            <p className="max-w-sm rounded-md border border-brand-gold/50 bg-white p-4 text-sm font-semibold leading-7 text-brand-ink shadow-card">
              Choose the path that matters most to your family and move quickly
              into the information you need.
            </p>
          </MotionReveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {experiencePathways.map((item, index) => (
            <MotionReveal key={item.title} delay={index * 0.05}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-premium focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-brand-cream">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover brightness-105 transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
                  <p className="absolute left-4 top-4 rounded-md bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-ink">
                    {item.eyebrow}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-2xl font-semibold text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-brand-muted">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-burgundy">
                    {item.cta}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
