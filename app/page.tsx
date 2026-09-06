import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PlacementsSection from "@/components/sections/PlacementsSection";
import DiarySection from "@/components/sections/DiarySection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

// The whole site is this one page. Each section carries the id its nav
// anchor points at, and sections fade into one another as you scroll.
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PlacementsSection />
      <DiarySection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
