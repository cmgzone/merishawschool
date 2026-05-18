import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Merishaw School by phone, email, enquiry form, or location map.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact Merishaw School."
        description="Reach the school for admissions, visits, downloads, support enquiries, or general questions."
        image="/images/resource-centre.jpeg"
      />
      <ContactSection />
      <section className="bg-brand-cream px-4 pb-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto max-w-7xl overflow-hidden rounded-md border border-brand-line bg-white shadow-card">
          <div className="p-6">
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Location
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-ink">
              Isinya Namanga Road
            </h2>
            <p className="mt-2 text-sm leading-7 text-brand-muted">
              {siteConfig.contact.address}, {siteConfig.contact.postal}
            </p>
          </div>
          <div className="aspect-[16/9] min-h-[320px]">
            <iframe
              src={siteConfig.mapEmbed}
              title="Merishaw School location map"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </MotionReveal>
      </section>
    </>
  );
}

