import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import type { NewsArticle, NewsArticleBlock } from "@/data/news";
import { cn } from "@/lib/utils";

function ListBlock({
  block,
}: {
  block: Extract<NewsArticleBlock, { type: "list" }>;
}) {
  if (block.columns) {
    return (
      <ul
        className={cn(
          "mt-6 grid gap-3",
          block.columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {block.items.map((item, index) => (
          <li
            key={index}
            className="rounded-md border border-brand-line bg-brand-cream px-4 py-3 text-sm font-semibold leading-6 text-brand-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 text-brand-ink">
      {block.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function ArticleBlock({ block }: { block: NewsArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <div className="mt-14 border-t border-brand-line pt-8">
          <h3 className="font-serif text-2xl font-semibold text-brand-ink">
            {block.text}
          </h3>
        </div>
      );
    case "subheading":
      return (
        <p className="mt-2 text-sm font-bold uppercase tracking-wide text-brand-burgundy">
          {block.text}
        </p>
      );
    case "paragraph":
      return (
        <p className="mt-5 text-base leading-8 text-brand-muted">{block.text}</p>
      );
    case "list":
      return <ListBlock block={block} />;
    case "image":
      return (
        <figure className="mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-brand-line bg-brand-cream shadow-card">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 51.2vw, 100vw"
            />
          </div>
        </figure>
      );
    case "cta":
      return (
        <div className="mt-14 rounded-md bg-brand-burgundy p-6 text-white shadow-card sm:p-8">
          <p className="font-serif text-2xl font-semibold">{block.title}</p>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/90">
            {block.text}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="tel:+254721303303" variant="secondary" size="sm">
              Call or WhatsApp Us
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="sm">
              Admissions Enquiry
            </ButtonLink>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function NewsArticleView({
  article,
  showHero = true,
}: {
  article: NewsArticle;
  showHero?: boolean;
}) {
  return (
    <MotionReveal className="mx-auto max-w-4xl rounded-md border border-brand-line bg-white p-6 shadow-card sm:p-10 lg:p-14">
      {showHero ? (
        <>
          <p className="text-sm font-bold uppercase text-brand-burgundy">
            {article.hero.eyebrow}
          </p>
          <h2 className="premium-heading mt-3 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
            {article.hero.title}
          </h2>
        </>
      ) : null}
      <div className={cn(showHero ? "mt-8 border-t border-brand-line pt-8" : "")}>
        {article.blocks.map((block, index) => (
          <ArticleBlock key={index} block={block} />
        ))}
      </div>
    </MotionReveal>
  );
}
