import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AcademicExperiencePage from "@/components/AcademicExperiencePage";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent, type EditableContent } from "@/data/admin-content";
import { contentNeededPages, type ContentNeededSlug } from "@/data/content-needed";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const gmaxGalleryImages = [
  {
    src: "/images/gmax-facility.jpeg",
    alt: "GMAX facility at Merishaw School with seating, stage, and sports-themed entrance",
    title: "GMAX facility view",
  },
  {
    src: "/images/gmax-stage.jpeg",
    alt: "GMAX stage, screen, and seating area at Merishaw School",
    title: "GMAX stage and seating",
  },
];

function getDefaultPage(slug: string) {
  if (slug in contentNeededPages) {
    const page = contentNeededPages[slug as ContentNeededSlug];

    return {
      ...page,
      slug,
      image:
        slug === "gmax"
          ? "/images/gmax-facility.jpeg"
          : "/images/resource-centre.jpeg",
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

function getAcademicExperiencePage(slug: string, content: EditableContent) {
  return content.academicExperiences[slug] ?? null;
}

function ContentNeededCard({ needed }: { needed: string }) {
  return (
    <>
      <p className="text-sm font-bold uppercase text-brand-burgundy">
        Content needed
      </p>
      <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-brand-ink">
        This page needs approved content.
      </h2>
      <p className="mt-5 text-base leading-8 text-brand-muted">{needed}</p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/contact">Contact School</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back Home
        </ButtonLink>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return Object.keys(contentNeededPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getEditableContent();
  const academicExperiencePage = getAcademicExperiencePage(slug, content);

  if (academicExperiencePage) {
    return {
      title: academicExperiencePage.title,
      description: academicExperiencePage.description,
    };
  }

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
  const academicExperiencePage = getAcademicExperiencePage(slug, content);

  if (academicExperiencePage) {
    return <AcademicExperiencePage page={academicExperiencePage} />;
  }

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
        {slug === "gmax" ? (
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {gmaxGalleryImages.map((image, index) => (
                <MotionReveal key={image.src} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-3 shadow-card">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-brand-ink">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 100vw"
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold uppercase text-brand-burgundy">
                      {image.title}
                    </p>
                  </article>
                </MotionReveal>
              ))}
            </div>
          </div>
        ) : (
          <MotionReveal className="mx-auto max-w-3xl rounded-md border border-brand-gold/60 bg-white p-7 shadow-card">
            <ContentNeededCard needed={page.needed} />
          </MotionReveal>
        )}
      </section>
    </>
  );
}
