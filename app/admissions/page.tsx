import type { Metadata } from "next";
import AdmissionsProcessSection from "@/components/AdmissionsProcessSection";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Start an admissions enquiry for Merishaw School and review application fields, fee downloads, and next steps.",
};

export default async function AdmissionsPage() {
  const content = await getEditableContent();

  return (
    <>
      <PageHeader
        eyebrow={content.pages.admissions.eyebrow}
        title={content.pages.admissions.title}
        description={content.pages.admissions.description}
        image={content.pages.admissions.image}
        imagePosition={content.pages.admissions.imagePosition}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionTitle
            eyebrow={content.admissions.applicationIntro.eyebrow}
            title={content.admissions.applicationIntro.title}
            description={content.admissions.applicationIntro.description}
          />
          <MotionReveal>
            <div className="rounded-md border border-brand-line bg-brand-cream p-6">
              <h2 className="font-serif text-2xl font-semibold text-brand-ink">
                Information requested during enquiry
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.admissions.applicationFields.map((field) => (
                  <li
                    key={field}
                    className="rounded-md border border-brand-line bg-white p-4 text-sm font-semibold leading-6 text-brand-ink"
                  >
                    {field}
                  </li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </div>
      </section>

      <AdmissionsProcessSection
        eyebrow={content.admissions.processIntro.eyebrow}
        title={content.admissions.processIntro.title}
        description={content.admissions.processIntro.description}
        introCardTitle={content.admissions.processPrepTitle}
        introCardDescription={content.admissions.processPrepDescription}
        processItems={content.admissions.process}
        showActions={false}
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-md border border-brand-gold/40 bg-brand-burgundy p-8 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-brand-gold">
              {content.admissions.feesEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              {content.admissions.feesTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={content.admissions.feesPrimaryAction.href}
              variant="support"
            >
              {content.admissions.feesPrimaryAction.label}
            </ButtonLink>
            <ButtonLink
              href={content.admissions.feesSecondaryAction.href}
              variant="secondary"
            >
              {content.admissions.feesSecondaryAction.label}
            </ButtonLink>
          </div>
        </MotionReveal>
      </section>

      <CTASection
        eyebrow={content.admissions.cta.eyebrow}
        title={content.admissions.cta.title}
        description={content.admissions.cta.description}
        primaryHref={content.admissions.cta.primaryHref}
        primaryLabel={content.admissions.cta.primaryLabel}
        secondaryHref={content.admissions.cta.secondaryHref}
        secondaryLabel={content.admissions.cta.secondaryLabel}
      />
    </>
  );
}
