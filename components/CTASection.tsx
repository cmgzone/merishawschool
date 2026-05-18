import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CTASection({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <section className="bg-brand-burgundy px-4 py-16 text-white sm:px-6 lg:px-8">
      <MotionReveal className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-bold uppercase text-brand-gold">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base font-medium leading-8 text-white/90">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <ButtonLink href={primaryHref} variant="support">
            {primaryLabel}
          </ButtonLink>
          {secondaryHref && secondaryLabel ? (
            <ButtonLink href={secondaryHref} variant="secondary">
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </MotionReveal>
    </section>
  );
}
