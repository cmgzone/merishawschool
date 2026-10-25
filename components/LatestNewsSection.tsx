import Image from "next/image";
import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import SectionTitle from "@/components/SectionTitle";
import type { EditableNewsItem } from "@/data/admin-content";

type LatestNewsSectionProps = {
  items: EditableNewsItem[];
};

export default function LatestNewsSection({ items }: LatestNewsSectionProps) {
  const latestItems = items.filter((item) => item.slug).slice(0, 3);

  if (latestItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="Latest news"
            title="Stories from the Merishaw community."
            description="Discover the moments, milestones, and experiences shaping life at Merishaw School."
          />
          <Link
            href="/news"
            className="shrink-0 text-sm font-bold uppercase tracking-[0.16em] text-brand-burgundy underline decoration-brand-gold decoration-2 underline-offset-8 transition-colors hover:text-brand-ink"
          >
            View all news
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestItems.map((item, index) => (
            <MotionReveal key={item.slug} delay={index * 0.05}>
              <Link
                href={`/news/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-md border border-brand-line bg-white shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-cream">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.08em]">
                    <span className="rounded-md bg-brand-burgundy px-3 py-1 text-white">
                      {item.category}
                    </span>
                    <span className="rounded-md bg-brand-cream px-3 py-1 text-brand-muted">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink transition-colors group-hover:text-brand-burgundy">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-brand-muted">
                    {item.excerpt}
                  </p>
                  <span className="mt-auto pt-5 text-sm font-bold text-brand-burgundy">
                    Read full story <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
