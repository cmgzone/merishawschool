import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "CSR — Corporate Social Responsibility",
  description:
    "Learn about Merishaw School's CSR programs focused on community development, education, health, water, and nutrition.",
};

export default async function CSRPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow="Community Impact"
        title="CSR"
        description="Corporate Social Responsibility at Merishaw School."
        image="/images/gallery-unicaf-partnership.jpeg"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <MotionReveal>
            <h2 className="font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              CSR
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-brand-muted">
              <p>
                Merishaw School CSR is focused on implementing community programs in areas that
                surround the school and are faced with limited access to quality education, health
                services and access to water and nutrition.
              </p>
              <p>
                We work with partner organizations to implement programs in collaboration with
                stakeholders.
              </p>
              <p>
                All our CSR programs and activities are guided by the commitment to make lasting
                change in community defined in the Sustainable Development Goals.
              </p>
              <p>
                Our CSR program is structured to provide an objectively measured impact.
              </p>
              <p>
                We engage local and national government as necessary throughout the strategy
                development process as an enabler of systems-level change.
              </p>
              <p>
                We are a visionary organization that is designed and committed to advance boy child
                education and to support young men in the region to be holistically equipped to
                access dignified and fulfilling work.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <CTASection
        eyebrow="Get Involved"
        title="Partner with Merishaw School."
        description="Speak with our team to learn how you can support our community programs."
        primaryHref="/contact"
        primaryLabel="Contact the School"
        secondaryHref={`mailto:${content.site.contact.email}`}
        secondaryLabel="Email Enquiries"
      />
    </>
  );
}
