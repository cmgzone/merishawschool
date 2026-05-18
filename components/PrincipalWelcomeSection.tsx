import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { leaders } from "@/data/leadership";

const principal = leaders[0];

export default function PrincipalWelcomeSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium lg:grid-cols-[0.9fr_1.1fr]">
        <MotionReveal className="relative min-h-[360px]">
          <Image
            src={principal.image}
            alt={`${principal.name}, ${principal.role}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-ink/85 to-transparent p-6 text-white">
            <p className="text-sm font-bold uppercase text-brand-gold">
              Principal&apos;s Welcome
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              {principal.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-white/85">
              {principal.role}
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Leadership voice
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
              A personal welcome gives families confidence in the culture.
            </h3>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              The principal&apos;s welcome note presents Merishaw as a school
              where boys are mentored into confident, purposeful young men
              through strong academics, discipline, values, and holistic
              formation.
            </p>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              This section brings that leadership voice closer to the homepage,
              so parents meet the school&apos;s direction before moving into
              Admissions, Academics, or Support a Child.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/leadership">Read Leadership Notes</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact the School
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
