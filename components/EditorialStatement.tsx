import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";

export default function EditorialStatement() {
  return (
    <section className="brand-sheen bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <MotionReveal className="relative min-h-56 overflow-hidden rounded-md border border-brand-gold/40 bg-white p-8 shadow-card">
          <p className="gold-outline-text absolute -left-3 top-0 font-serif text-[12rem] font-bold leading-none opacity-40 sm:text-[15rem]">
            M
          </p>
          <div className="relative z-10 ml-auto max-w-md">
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Brand promise
            </p>
            <p className="mt-4 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
              Not simply a school. A formation ground for young men.
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            The Merishaw difference
          </p>
          <h2 className="premium-heading mt-3 font-serif text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
            Academic strength with a{" "}
            <span className="brand-script-line text-brand-burgundy">
              sharper sense of purpose.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted">
            Merishaw&apos;s work is both academic and formative: to nurture boys who
            think critically, communicate effectively, act with integrity, and
            grow into compassionate leaders with purpose.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/academics">Explore Academics</ButtonLink>
            <ButtonLink href="/about" variant="secondary">
              About the School
            </ButtonLink>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
