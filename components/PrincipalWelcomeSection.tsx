import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { leaders } from "@/data/leadership";

const principal = leaders[0];

export default function PrincipalWelcomeSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-premium lg:grid-cols-[0.9fr_1.1fr]">
        <MotionReveal className="bg-white">
          <div className="flex h-full flex-col">
            <div className="relative flex min-h-[420px] flex-1 items-end justify-center overflow-hidden bg-gradient-to-b from-[#f7f4ee] via-white to-brand-cream p-4 sm:min-h-[460px] sm:p-6 lg:min-h-[680px]">
              <div className="absolute inset-0 brand-sheen opacity-70" />
              <Image
                src={principal.image}
                alt={`${principal.name}, ${principal.role}`}
                width={696}
                height={969}
                className="relative z-10 h-auto max-h-[390px] w-auto max-w-full object-contain drop-shadow-2xl sm:max-h-[420px] lg:max-h-[640px]"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </div>
            <div className="border-t border-brand-line bg-brand-ink p-6 text-white">
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
              Parents meet the school&apos;s direction early, before moving into
              Admissions, Academics, or sponsorship conversations.
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
