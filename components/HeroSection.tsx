import { Award, ShieldCheck, Sparkles } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PremiumSlideshow from "@/components/PremiumSlideshow";
import { heroSlides } from "@/data/gallery";
import { stats } from "@/data/site";

export default function HeroSection() {
  return (
    <section className="bg-brand-burgundy px-3 py-3 sm:px-5 sm:py-5 lg:px-6">
      <PremiumSlideshow
        slides={heroSlides}
        imagePriority
        headingLevel={1}
        className="min-h-[calc(100vh-132px)] rounded-md"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/admissions">Start Admissions</ButtonLink>
            <ButtonLink href="/support-a-child" variant="support">
              Sponsor a Child
            </ButtonLink>
          </div>

          <div className="hidden gap-3 sm:grid sm:grid-cols-3 lg:min-w-[520px]">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-brand-gold/50 bg-brand-burgundy/55 p-4 text-white shadow-lg shadow-brand-ink/20 backdrop-blur-md"
              >
                <p className="font-serif text-2xl font-semibold">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase text-white/90">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PremiumSlideshow>

      <MotionReveal className="mx-auto grid max-w-7xl gap-4 px-1 py-5 md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            label: "Values-led formation",
            text: "Christian foundation, accountability, and purposeful leadership.",
          },
          {
            icon: Sparkles,
            label: "Premium campus experience",
            text: "Learning, boarding, sport, arts, and mentorship in one place.",
          },
          {
            icon: Award,
            label: "Future-ready pathways",
            text: "8.4.4 and CBE pathways for Junior and Senior Secondary.",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex gap-4 rounded-md border border-brand-gold/35 bg-white/10 p-4 text-white shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold text-brand-ink">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{item.label}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-white/90">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </MotionReveal>
    </section>
  );
}
