import { ChevronDown } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import SectionTitle from "@/components/SectionTitle";
import { faqs } from "@/data/home";

export default function FAQSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionTitle
          eyebrow="FAQ"
          title="Questions parents ask first."
          description="Quick answers to help families understand admissions, academics, location, fees, and sponsorship."
          align="center"
        />

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <MotionReveal key={faq.question} delay={index * 0.035}>
              <details className="group rounded-md border border-brand-line bg-brand-cream p-5 shadow-card open:border-brand-gold open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-serif text-xl font-semibold text-brand-ink">
                  <span>{faq.question}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-brand-burgundy transition group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-sm leading-7 text-brand-muted">
                  {faq.answer}
                </p>
              </details>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
