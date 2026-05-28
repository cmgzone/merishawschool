import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import { cn } from "@/lib/utils";

type LeadershipCardProps = {
  name: string;
  role: string;
  image: string;
  description: string;
  index?: number;
  variant?: "default" | "featured";
};

export default function LeadershipCard({
  name,
  role,
  image,
  description,
  index = 0,
  variant = "default",
}: LeadershipCardProps) {
  const featured = variant === "featured";
  const paragraphs = description
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <MotionReveal delay={index * 0.06}>
      <article
        className={cn(
          "h-full rounded-md border border-brand-line bg-white p-6 text-center shadow-card",
          featured && "mx-auto max-w-4xl p-7 sm:p-9 lg:grid lg:grid-cols-[260px_1fr] lg:items-center lg:gap-8 lg:text-left",
        )}
      >
        <div
          className={cn(
            "relative mx-auto aspect-square overflow-hidden rounded-full border-4 border-brand-cream bg-brand-cream shadow-sm",
            featured ? "w-44 sm:w-56 lg:w-64" : "w-32 sm:w-36",
          )}
        >
          <Image
            src={image}
            alt={`${name} - ${role}`}
            fill
            className="object-cover"
            sizes={featured ? "256px" : "144px"}
          />
        </div>
        <div className={cn(featured ? "mt-6 lg:mt-0" : "mt-5")}>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-burgundy">
            {role}
          </p>
          <h3
            className={cn(
              "mt-2 font-serif font-semibold text-brand-ink",
              featured ? "text-3xl sm:text-4xl" : "text-2xl",
            )}
          >
            {name}
          </h3>
          <div
            className={cn(
              "mt-4 space-y-3 leading-7 text-brand-muted",
              featured ? "text-base sm:text-lg sm:leading-8" : "text-sm",
            )}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </MotionReveal>
  );
}
