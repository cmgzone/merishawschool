import ButtonLink from "@/components/ButtonLink";
import PremiumSlideshow, { type PremiumSlide } from "@/components/PremiumSlideshow";
import { heroSlides } from "@/data/gallery";

type HeroSectionProps = {
  slides?: PremiumSlide[];
};

export default function HeroSection({ slides = heroSlides }: HeroSectionProps) {
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
    </section>
  );
}
