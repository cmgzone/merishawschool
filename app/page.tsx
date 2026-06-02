import HeroSection from "@/components/HeroSection";
import WelcomeVideoSection from "@/components/WelcomeVideoSection";
import { getEditableContent } from "@/data/admin-content";

export default async function Home() {
  const content = await getEditableContent();

  return (
    <>
      <HeroSection slides={content.home.heroSlides} />
      <WelcomeVideoSection tone="cream" />
    </>
  );
}
