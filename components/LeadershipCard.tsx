import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";

type LeadershipCardProps = {
  name: string;
  role: string;
  image: string;
  description: string;
  index?: number;
};

export default function LeadershipCard({
  name,
  role,
  image,
  description,
  index = 0,
}: LeadershipCardProps) {
  return (
    <MotionReveal delay={index * 0.06}>
      <article className="h-full overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
        <div className="relative aspect-[4/3] bg-brand-cream">
          <Image
            src={image}
            alt={`${name} - ${role}`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-brand-ink">
            {name}
          </h3>
          <p className="mt-1 text-sm font-bold uppercase text-brand-burgundy">
            {role}
          </p>
          <p className="mt-4 text-sm leading-7 text-brand-muted">{description}</p>
        </div>
      </article>
    </MotionReveal>
  );
}
