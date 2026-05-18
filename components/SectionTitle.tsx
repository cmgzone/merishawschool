import MotionReveal from "@/components/MotionReveal";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <MotionReveal
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase text-brand-burgundy">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="premium-heading font-serif text-4xl font-semibold leading-tight text-brand-ink sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-brand-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </MotionReveal>
  );
}
