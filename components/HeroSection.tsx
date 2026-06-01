import { Award, ShieldCheck, Sparkles } from "lucide-react";
import ButtonLink from "@/components/ButtonLink";
import MotionReveal from "@/components/MotionReveal";
import PremiumSlideshow, { type PremiumSlide } from "@/components/PremiumSlideshow";
import { heroSlides } from "@/data/gallery";
import { stats } from "@/data/site";

type HeroStat = {
  value: string;
  label: string;
};

type HeroSectionProps = {
  slides?: PremiumSlide[];
  statsItems?: HeroStat[];
};

export default function HeroSection({
  slides = heroSlides,
  statsItems = stats,
}: HeroSectionProps) {
  return (
    <section className="bg-white">
      <PremiumSlideshow
        slides={slides}
        imagePriority
        headingLevel={1}
        contentAlign="center"
        showArrows={false}
        heightClassName="h-[56.25vw] min-h-[max(560px,calc(100svh-5rem))] min-[520px]:min-h-[420px] lg:min-h-[560px] max-h-[620px]"
        className="rounded-none shadow-none"
      >
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/admissions" size="sm">Start Admissions</ButtonLink>
            <ButtonLink href="/support-a-child" variant="support" size="sm">
              Sponsor a Child
            </ButtonLink>
        </div>
      </PremiumSlideshow>

      <MotionReveal className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-3 py-5 sm:gap-4 sm:px-6 sm:py-7 lg:px-8">
        {statsItems.map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-brand-line bg-brand-cream p-2 text-center shadow-card sm:p-5"
          >
            <p className="font-serif text-xl font-semibold leading-tight text-brand-ink sm:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase leading-4 text-brand-muted sm:mt-2 sm:text-xs sm:leading-5">
              {item.label}
            </p>
          </div>
        ))}
      </MotionReveal>

      <MotionReveal className="mx-auto grid max-w-7xl gap-4 px-4 pb-8 sm:px-6 md:grid-cols-3 lg:px-8">
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
            className="flex gap-4 rounded-md border border-brand-line bg-white p-4 text-brand-ink shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-gold text-brand-ink">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">{item.label}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-brand-muted">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </MotionReveal>
    </section>
  );
}
