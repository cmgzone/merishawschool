import type { Metadata } from "next";
import { ClipboardList, FileText, PhoneCall } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Start an admissions enquiry for Merishaw School and review application fields, fee downloads, and client-confirmation notes.",
};

const applicationFields = [
  "Parent's full name",
  "Student's full name",
  "Parent's phone number",
  "Parent's email",
  "Curriculum preference: 8.4.4 or CBE",
  "8.4.4 options: Form 3 or Form 4",
  "CBE options: Grade 8, Grade 9, or Grade 10",
];

const placeholderSteps = [
  {
    title: "Submit enquiry",
    description:
      "Use the contact page or admissions CTA to begin the conversation with the school.",
    icon: PhoneCall,
  },
  {
    title: "Share student details",
    description:
      "Provide parent details, student details, curriculum preference, and grade or form.",
    icon: ClipboardList,
  },
  {
    title: "Confirm requirements",
    description:
      "Admission process steps, documents, interview requirements, and deadlines need client confirmation.",
    icon: FileText,
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Begin your son's Merishaw journey."
        description="The admissions page keeps verified old-form fields and clearly marks missing process details for client confirmation."
        image="/images/gallery-parade-grounds.png"
      />

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionTitle
            eyebrow="Application enquiry"
            title="Admissions content verified from the old website."
            description="The old application form captured parent details, student details, curriculum, and grade or form preference. The application-process page itself did not include detailed process copy."
          />
          <MotionReveal>
            <div className="rounded-md border border-brand-line bg-brand-cream p-6">
              <h2 className="font-serif text-2xl font-semibold text-brand-ink">
                Application fields to retain
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {applicationFields.map((field) => (
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

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Process"
            title="Admissions process placeholder pending client approval."
            description="These steps are intentionally conservative because the old application-process page was empty."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {placeholderSteps.map((step, index) => (
              <MotionReveal key={step.title} delay={index * 0.05}>
                <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {step.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
          <MotionReveal className="mt-8 rounded-md border border-brand-gold/70 bg-white p-5 text-sm leading-7 text-brand-muted">
            Client approval needed: current intake dates, interview steps,
            required documents, scholarship rules, and official application
            submission workflow.
          </MotionReveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <MotionReveal className="mx-auto flex max-w-7xl flex-col justify-between gap-6 rounded-md border border-brand-gold/40 bg-brand-burgundy p-8 text-white md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-brand-gold">
              Fees and forms
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Review the current fee structure.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/downloads" variant="support">
              Downloads
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Ask a Question
            </ButtonLink>
          </div>
        </MotionReveal>
      </section>

      <CTASection
        eyebrow="Visit or enquire"
        title="Admissions conversations are handled directly by the school."
        description="Use the contact page to reach Merishaw School by phone, email, or enquiry form."
        primaryHref="/contact"
        primaryLabel="Contact Admissions"
        secondaryHref="/academics"
        secondaryLabel="View Academics"
      />
    </>
  );
}
