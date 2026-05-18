import { BookOpenCheck } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";

type AcademicCardProps = {
  title: string;
  eyebrow?: string;
  description: string;
  index?: number;
};

export default function AcademicCard({
  title,
  eyebrow,
  description,
  index = 0,
}: AcademicCardProps) {
  return (
    <MotionReveal delay={index * 0.05}>
      <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand-gold">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-cream text-brand-burgundy">
          <BookOpenCheck className="h-5 w-5" />
        </div>
        {eyebrow ? (
          <p className="mt-5 text-xs font-bold uppercase text-brand-burgundy">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="mt-2 font-serif text-2xl font-semibold text-brand-ink">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-brand-muted">{description}</p>
      </article>
    </MotionReveal>
  );
}

