import FluidBackground from "@/components/FluidBackground";
import { homeContent } from "@/lib/content";

// The opening screen. Full height, the colour field moving behind it,
// and only three lines of type sitting low and left in all that air.
export default function HeroSection() {
  return (
    <section id="top" className="section-full overflow-hidden">
      <FluidBackground />
      <div className="fluid-over px-xs md:px-md">
        <p className="text-caption">{homeContent.eyebrow}</p>
        <h1 className="mt-sm max-w-[22ch] text-hero">{homeContent.headline}</h1>
        <p className="mt-md max-w-[46ch]">{homeContent.lede}</p>
      </div>
    </section>
  );
}
