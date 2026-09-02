import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import NewsArticleView from "@/components/NewsArticleView";
import PageHeader from "@/components/PageHeader";
import { getEditableContent } from "@/data/admin-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getEditableContent();
  return content.news.items
    .filter((item) => item.slug)
    .map((item) => ({ slug: item.slug! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getEditableContent();
  const item = content.news.items.find((entry) => entry.slug === slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getEditableContent();
  const item = content.news.items.find(
    (entry) => entry.slug === slug && entry.article,
  );

  if (!item?.article) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow="News & Events"
        title={item.article.hero.title}
        description={item.excerpt}
        image={item.image}
        imagePosition="center"
      />
      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <NewsArticleView article={item.article} showHero={false} />
      </section>
      <section className="bg-brand-cream px-4 pb-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto flex max-w-4xl flex-col justify-between gap-6 rounded-md border border-brand-line bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-brand-ink">
              More news and events
            </h2>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              Browse the rest of the stories, updates, and announcements from
              the school community.
            </p>
          </div>
          <ButtonLink href="/news" variant="secondary">
            Back to News &amp; Events
          </ButtonLink>
        </MotionReveal>
      </section>
    </>
  );
}
