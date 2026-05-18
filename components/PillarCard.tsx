import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";

type PillarCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  index: number;
};

export default function PillarCard({
  title,
  description,
  image,
  imageAlt,
  index,
}: PillarCardProps) {
  return (
    <MotionReveal delay={index * 0.04}>
      <article className="group h-full overflow-hidden rounded-md border border-brand-gold/25 bg-white text-brand-ink shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-premium">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-cream">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/55 via-transparent to-transparent opacity-80" />
          <p className="absolute bottom-4 left-4 rounded-md bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-ink">
            Pillar {String(index + 1).padStart(2, "0")}
          </p>
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-brand-ink">
            {title}
          </h3>
          <p className="mt-3 text-sm font-medium leading-7 text-brand-muted">
            {description}
          </p>
        </div>
      </article>
    </MotionReveal>
  );
}
