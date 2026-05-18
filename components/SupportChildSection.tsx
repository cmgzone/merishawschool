import { HeartHandshake, UsersRound } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { csrInitiatives, supportContent } from "@/data/support";

export default function SupportChildSection() {
  return (
    <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <MotionReveal>
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            CSR / Support
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
            {supportContent.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            {supportContent.description}
          </p>
          <p className="mt-4 rounded-md border border-brand-gold/60 bg-white p-4 text-sm leading-7 text-brand-muted">
            {supportContent.note}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/support-a-child" variant="primary">
              Explore Sponsorship
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Talk to Admissions
            </ButtonLink>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            {csrInitiatives.map((initiative) => (
              <div
                key={initiative}
                className="rounded-md border border-brand-line bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                  {initiative.includes("Community") ? (
                    <UsersRound className="h-5 w-5" />
                  ) : (
                    <HeartHandshake className="h-5 w-5" />
                  )}
                </div>
                <p className="text-sm font-semibold leading-7 text-brand-ink">
                  {initiative}
                </p>
              </div>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
