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
  const openingParagraphs = isFull ? visibleParagraphs.slice(0, 2) : [];
  const closingParagraphs = isFull ? visibleParagraphs.slice(2) : visibleParagraphs;

  return (
    <section
      className={`${isFull ? "bg-brand-cream" : "bg-white"} px-4 py-16 sm:px-6 lg:px-8`}
    >
      <MotionReveal className="mx-auto max-w-6xl">
        <article className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-burgundy">
              From the Chief Principal
            </p>
            <h2 className="mx-auto mt-2 max-w-4xl font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-5xl">
              Welcome to a school built for excellence, character, and purpose.
            </h2>
          </div>

          <div className="mt-8">
            {openingParagraphs.length ? (
              <div className="mx-auto max-w-4xl space-y-4 text-base leading-8 text-brand-muted">
                {openingParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            <div
              className={`flex flex-col items-center text-center ${
                isFull
                  ? "my-8 border-y border-brand-line py-7"
                  : "mb-7 border-b border-brand-line pb-7"
              }`}
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-brand-cream bg-brand-cream shadow-card sm:h-36 sm:w-36">
                <Image
                  src={principal.image}
                  alt={`${principal.name}, ${principal.role}`}
                  fill
                  className="object-cover object-center"
                  sizes="144px"
                />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-burgundy">
                Principal&apos;s welcome
              </p>
              <h3 className="mt-2 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
                {principal.name}
              </h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-muted">
                {principal.role}
              </p>
            </div>

            <div
              className={`space-y-4 text-base leading-8 text-brand-muted ${
                isFull ? "mx-auto max-w-4xl" : ""
              }`}
            >
              {closingParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {!isFull ? (
              <p className="mt-5 border-l-4 border-brand-gold pl-4 text-sm font-semibold leading-7 text-brand-ink">
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
        </article>
      </MotionReveal>
    </section>
  );
}
