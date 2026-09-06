import HeroSection from "@/components/sections/HeroSection";
import PlacementsPreview from "@/components/sections/PlacementsPreview";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import FounderSection from "@/components/sections/FounderSection";
import SubscribeSection from "@/components/sections/SubscribeSection";

// Each screen is full height. Placements, Visual Diary, Blog and Contact
// carry on as pages of their own, linked from the nav.
export default function Home() {
  return (
    <>
      <HeroSection />
      <PlacementsPreview />
      <ServicesSection />
      <AboutSection />
      <FounderSection />
      <SubscribeSection />
    </>
  );
}
