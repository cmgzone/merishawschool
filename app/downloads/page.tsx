import type { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { downloads } from "@/data/downloads";

export const metadata: Metadata = {
  title: "Fees Structure and Downloads",
  description:
    "Download Merishaw School fee structure, brochure, circulars, and legacy documents from one organized page.",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Downloads"
        title="Fees structure and school downloads."
        description="Current and legacy documents from the old downloads pages, organized for parents and guardians."
        image="/images/merishaw-bg.jpeg"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Documents"
            title="Important school files."
            description="The current fee structure is hosted locally. Google Drive links are retained from the old website and marked where client approval is needed."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {downloads.map((download, index) => (
              <DownloadCard key={download.title} {...download} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-md border border-brand-gold/70 bg-white p-6 text-sm leading-7 text-brand-muted">
          Client approval needed: confirm whether legacy Google Drive documents
          should remain public, be replaced with new PDFs, or be removed before
          production launch.
        </div>
      </section>
    </>
  );
}

