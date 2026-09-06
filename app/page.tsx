import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PlacementsPreview from "@/components/sections/PlacementsPreview";
import FounderSection from "@/components/sections/FounderSection";
import QuoteSection from "@/components/sections/QuoteSection";
import SubscribeSection from "@/components/sections/SubscribeSection";

/*
  Each screen is full height, and the order tells a story:
  what we stand for, what the practice is, what we do, what we have placed,
  who is behind it, then how to stay close.

  Placements, Visual Diary, Blog and Contact carry on as their own pages.
  The colour field sits behind the first and fifth screens.
*/
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PlacementsPreview />
      <FounderSection />
      <QuoteSection />
      <SubscribeSection />
    </>
  );
}
