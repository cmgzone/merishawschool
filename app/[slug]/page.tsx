import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent, type EditableContent } from "@/data/admin-content";
import { contentNeededPages, type ContentNeededSlug } from "@/data/content-needed";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getDefaultPage(slug: string) {
  if (slug in contentNeededPages) {
    const page = contentNeededPages[slug as ContentNeededSlug];

    return {
      ...page,
      slug,
      image: "/images/resource-centre.jpeg",
    };
  }

  return null;
}

function getPage(slug: string, content: EditableContent) {
  return (
    content.pages.comingSoon.find((page) => page.slug === slug) ??
    getDefaultPage(slug)
  );
}

export function generateStaticParams() {
  return Object.keys(contentNeededPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getEditableContent();
  const page = getPage(slug, content);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function ContentNeededPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getEditableContent();
  const page = getPage(slug, content);

  if (!page) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={page.image}
      />
      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto max-w-3xl rounded-md border border-brand-gold/60 bg-white p-7 shadow-card">
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            Content needed
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-brand-ink">
            This page needs approved content.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            {page.needed}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Contact School</ButtonLink>
            <ButtonLink href="/" variant="secondary">
              Back Home
            </ButtonLink>
          </div>
        </MotionReveal>
      </section>
    </>
  );
}
