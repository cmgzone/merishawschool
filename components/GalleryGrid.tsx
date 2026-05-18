import Image from "next/image";
import MotionReveal from "@/components/MotionReveal";

type GalleryImage = {
  src: string;
  alt: string;
  category: string;
};

type GalleryGridProps = {
  images: GalleryImage[];
  limit?: number;
};

export default function GalleryGrid({ images, limit }: GalleryGridProps) {
  const visibleImages = limit ? images.slice(0, limit) : images;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {visibleImages.map((image, index) => (
        <MotionReveal key={image.src} delay={index * 0.035}>
          <figure className="group relative aspect-[4/3] overflow-hidden rounded-md bg-brand-cream shadow-card">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-md bg-white/95 px-3 py-2 text-xs font-bold uppercase text-brand-ink shadow-sm">
              {image.category}
            </figcaption>
          </figure>
        </MotionReveal>
      ))}
    </div>
  );
}
