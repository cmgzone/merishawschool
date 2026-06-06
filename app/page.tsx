import HeroSection from "@/components/HeroSection";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { getEditableContent } from "@/data/admin-content";

export default async function Home() {
  const content = await getEditableContent();

  return (
    <>
      <HeroSection slides={content.home.heroSlides} />
      <WelcomeVideoSection
        eyebrow={content.homeVideo.eyebrow}
        title={content.homeVideo.title}
        description={content.homeVideo.description}
        embedUrl={content.homeVideo.embedUrl}
        videoTitle={content.homeVideo.videoTitle}
        primaryHref={content.homeVideo.primaryAction.href}
        primaryLabel={content.homeVideo.primaryAction.label}
        secondaryHref={content.homeVideo.secondaryAction.href}
        secondaryLabel={content.homeVideo.secondaryAction.label}
        tone="cream"
      />
    </>
  );
}
