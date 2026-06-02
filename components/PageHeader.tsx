import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  cinematic?: boolean;
  eyebrow?: string;
  title: string;
  description: string;
  image?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  showImage?: boolean;
};

export default function PageHeader({
  cinematic = false,
  eyebrow,
  title,
  description,
  image = "/images/resource-centre.jpeg",
  imageFit = "cover",
  imagePosition = "center",
  showImage = true,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-brand-burgundy text-white">
      {showImage ? (
        <Image
          src={image}
          alt=""
          fill
          className={cn(
            "opacity-[0.34] brightness-110 contrast-105",
            cinematic &&
              (imageFit === "contain"
                ? "page-header-cinematic-contain-image"
                : "page-header-cinematic-image"),
          )}
          style={{ objectFit: imageFit, objectPosition: imagePosition }}
          preload
          loading="eager"
          sizes="100vw"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/72 via-brand-burgundy/45 to-brand-gold/16" />
      <MotionReveal className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-sm font-bold uppercase text-brand-gold">{eyebrow}</p>
        ) : null}
        <h1 className="premium-heading mt-3 max-w-4xl font-serif text-5xl font-semibold leading-tight sm:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-white/90">
          {description}
        </p>
      </MotionReveal>
    </section>
  );
}
