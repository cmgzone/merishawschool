import type { Metadata } from "next";
import { HeartHandshake, ShieldCheck } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import SupportChildSection from "@/components/SupportChildSection";
import { csrInitiatives, supportContent } from "@/data/support";

export const metadata: Metadata = {
  title: "Support a Boy's Education",
  description:
    "Support a Boy's Education sponsorship page structure for Merishaw School, prepared from CSR themes without payment integration.",
};

const sponsorshipAreas = [
  "Tuition and learning support",
  "Boarding and student-life needs",
  "Uniforms, books, and essential supplies",
  "Mentorship, wellness, and holistic development",
];

export default function SupportAChildPage() {
  return (
    <>
      <PageHeader
        eyebrow="CSR / Support"
        title="Support a deserving boy's education journey."
        description="A professional sponsorship pathway for partners who want to help a learner access Merishaw's values-led residential education."
        image="/images/campus-life.jpg"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <MotionReveal>
            <p className="text-sm font-bold uppercase text-brand-burgundy">
              Sponsorship pathway
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
              A clear structure now, payment integration later if requested.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              {supportContent.description}
            </p>
            <p className="mt-4 rounded-md border border-brand-gold/70 bg-brand-cream p-4 text-sm leading-7 text-brand-muted">
              {supportContent.note}
            </p>
          </MotionReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {sponsorshipAreas.map((area, index) => (
              <MotionReveal key={area} delay={index * 0.05}>
                <div className="h-full rounded-md border border-brand-line bg-brand-cream p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-7 text-brand-ink">
                    {area}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <SupportChildSection />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="CSR foundation"
            title="Existing social responsibility themes from the old website."
            description="The dedicated sponsorship page is new, so this section grounds it in audited CSR material."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {csrInitiatives.map((initiative, index) => (
              <MotionReveal key={initiative} delay={index * 0.04}>
                <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                  <HeartHandshake className="h-6 w-6 text-brand-burgundy" />
                  <p className="mt-4 text-sm font-semibold leading-7 text-brand-ink">
                    {initiative}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Contact CTA"
        title="Discuss sponsorship directly with Merishaw School."
        description="No payment gateway is included in this phase. The next step is a direct conversation with the school so sponsorship details can be handled properly."
        primaryHref="/contact"
        primaryLabel="Contact the School"
        secondaryHref={`mailto:enquiries@merishawschools.sc.ke`}
        secondaryLabel="Email Enquiries"
      />
    </>
  );
}
