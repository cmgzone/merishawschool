import MotionReveal from "@/components/MotionReveal";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionTitleProps) {
  return (
    <MotionReveal
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-bold uppercase",
            tone === "dark" ? "text-brand-gold" : "text-brand-burgundy",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "premium-heading font-serif text-4xl font-semibold leading-tight sm:text-5xl",
          tone === "dark" ? "text-white" : "text-brand-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-8 sm:text-lg",
            tone === "dark" ? "text-white/85" : "text-brand-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </MotionReveal>
  );
}
