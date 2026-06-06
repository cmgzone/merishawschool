import type { Metadata } from "next";
import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Read Merishaw School news, events, and updates from the school community.",
};

export default async function NewsPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.news.eyebrow}
        title={content.pages.news.title}
        description={content.pages.news.description}
        image={content.pages.news.image}
        imagePosition={content.pages.news.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Updates"
            title="Stories from the school community."
            description="A focused archive for key school stories and announcements."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {content.news.items.map((item, index) => (
              <MotionReveal key={item.title} delay={index * 0.05}>
                <article className="h-full overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
                  <div className="relative aspect-[16/10] bg-brand-cream">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-md bg-brand-burgundy px-3 py-1 text-xs font-bold uppercase text-white">
                        {item.category}
                      </span>
                      <span className="rounded-md bg-brand-cream px-3 py-1 text-xs font-semibold text-brand-muted">
                        {item.date}
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {item.excerpt}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-12 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-md border border-brand-line bg-white p-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-brand-ink">
              More updates coming soon
            </h2>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              Recent stories, event updates, and school announcements will be
              added here as they become available.
            </p>
          </div>
          <ButtonLink href="/contact" variant="secondary">
            Contact the School
          </ButtonLink>
        </MotionReveal>
      </section>
    </>
  );
}
