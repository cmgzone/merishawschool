import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { signatureFacts } from "@/data/home";

export default function SignatureExperienceSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-md border border-brand-line bg-brand-ink shadow-premium lg:grid-cols-[1.05fr_0.95fr]">
        <MotionReveal className="relative min-h-[420px]">
          <Image
            src="/images/gallery-campus-view.jpg"
            alt="Merishaw School campus view"
            fill
            className="object-cover brightness-110"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/75 via-brand-ink/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 max-w-md text-white">
            <p className="text-sm font-bold uppercase text-brand-gold">
              Merishaw identity
            </p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-tight">
              Home of the Boy Child.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="flex h-full flex-col justify-center p-7 text-white sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase text-brand-gold">
              A clearer school promise
            </p>
            <h2 className="premium-heading mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              All boys. Residential. Purpose-led.
            </h2>
            <p className="mt-6 text-base font-medium leading-8 text-white/86">
              Merishaw&apos;s promise is easy for parents to understand: a
              focused boys&apos; environment where academics, boarding, faith,
              leadership, sport, talent, and service work together.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {signatureFacts.map((fact) => (
                <div
                  key={fact.value}
                  className="rounded-md border border-brand-gold/30 bg-white/[0.08] p-4"
                >
                  <p className="font-serif text-2xl font-semibold text-brand-gold">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase leading-5 text-white/82">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/about" variant="support">
                Discover Merishaw
              </ButtonLink>
              <ButtonLink href="/admissions" variant="ghost" className="bg-white/10 text-white hover:bg-white hover:text-brand-ink">
                Start Admissions
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
