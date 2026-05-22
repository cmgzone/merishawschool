import type { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Fees Structure and Downloads",
  description:
    "Download Merishaw School fee structure, brochure, circulars, and school documents from one organized page.",
};

export default async function DownloadsPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.downloads.eyebrow}
        title={content.pages.downloads.title}
        description={content.pages.downloads.description}
        image={content.pages.downloads.image}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={content.downloads.sectionIntro.eyebrow}
            title={content.downloads.sectionIntro.title}
            description={content.downloads.sectionIntro.description}
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {content.downloads.items.map((download, index) => (
              <DownloadCard key={download.title} {...download} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-brand-gold/70 bg-white p-6 text-sm leading-7 text-brand-muted">
          {content.downloads.note}
        </div>
      </section>
    </>
  );
}
