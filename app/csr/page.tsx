import type { Metadata } from "next";
import { BookOpenCheck, HeartHandshake, UsersRound } from "lucide-react";
import CTASection from "@/components/CTASection";
import MotionReveal from "@/components/MotionReveal";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import { getEditableContent } from "@/data/admin-content";

const coreCommunityServiceInitiatives = [
  {
    title: "Outreach Programs",
    description:
      "Students and the Merishaw community regularly volunteer at local centers, spreading joy and donations to organizations such as the Kajiado Children's Home.",
    icon: UsersRound,
  },
  {
    title: "Values & Integrity",
    description:
      "The school's spiritual and counseling teams guide the boys to cultivate a spirit of empathy, humility, and compassion through community service.",
    icon: HeartHandshake,
  },
  {
    title: "Life Skills",
    description:
      "The Community Service Learning program, featured in the Competency-Based Curriculum, equips learners with practical life skills, including citizenship, entrepreneurship, and civic responsibility.",
    icon: BookOpenCheck,
  },
];

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

      <section className="bg-brand-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Community Service Learning"
            title="Core Community Service Initiatives"
            description="Merishaw gives boys practical opportunities to serve, reflect, and grow into responsible citizens."
            align="center"
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {coreCommunityServiceInitiatives.map((initiative, index) => {
              const Icon = initiative.icon;

              return (
                <MotionReveal key={initiative.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-brand-line bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-burgundy text-brand-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-brand-ink">
                      {initiative.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-brand-muted">
                      {initiative.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
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
