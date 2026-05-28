import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import { principal as defaultPrincipal } from "@/data/leadership";

type Principal = typeof defaultPrincipal;

type PrincipalWelcomeSectionProps = {
  principal?: Principal;
  variant?: "preview" | "full";
};

export default function PrincipalWelcomeSection({
  principal = defaultPrincipal,
  variant = "preview",
}: PrincipalWelcomeSectionProps) {
  const paragraphs = principal.description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const isFull = variant === "full";
  const visibleParagraphs = isFull ? paragraphs : paragraphs.slice(0, 2);

  return (
    <section
      className={`${isFull ? "bg-brand-cream" : "bg-white"} px-4 py-16 sm:px-6 lg:px-8`}
    >
      <div
        className={`mx-auto grid max-w-7xl gap-8 lg:items-center ${
          isFull ? "lg:grid-cols-[0.74fr_1.26fr]" : "lg:grid-cols-[0.78fr_1.22fr]"
        }`}
      >
        <MotionReveal>
          <article className="overflow-hidden rounded-md border border-brand-line bg-brand-ink text-white shadow-premium">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream sm:aspect-[16/11] lg:aspect-[4/3]">
              <Image
                src={principal.image}
                alt={`${principal.name}, ${principal.role}`}
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 34vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-brand-ink/70 to-transparent" />
            </div>
            <div className="p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-gold">
                Principal&apos;s welcome
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                {principal.name}
              </h2>
              <p className="mt-1 text-sm font-semibold text-white/85">
                {principal.role}
              </p>
            </div>
          </article>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <div className="flex flex-col justify-center rounded-md border border-brand-line bg-white p-7 shadow-card sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-burgundy">
              From the Chief Principal
            </p>
            <h3 className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Welcome to a school built for excellence, character, and purpose.
            </h3>
            <div
              className={`mt-6 space-y-4 text-brand-muted ${
                isFull
                  ? "text-base leading-8 lg:columns-2 lg:gap-10"
                  : "text-base leading-8"
              }`}
            >
              {visibleParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {!isFull ? (
              <p className="mt-4 border-l-4 border-brand-gold pl-4 text-sm font-semibold leading-7 text-brand-ink">
                Read the full welcome note for the complete message on
                Merishaw&apos;s values, facilities, mentorship, and partnerships.
              </p>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {!isFull ? (
                <ButtonLink href="/leadership">Read Full Welcome</ButtonLink>
              ) : null}
              <ButtonLink href="/contact" variant={isFull ? "primary" : "secondary"}>
                Contact the School
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
