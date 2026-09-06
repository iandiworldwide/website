import { homeContent } from "@/lib/content";

// The landing statement: an eyebrow, a headline, two sentences. Nothing else.
export default function HeroSection() {
  return (
    <section id="top" className="section-first px-xs md:px-md">
      <p className="text-caption">{homeContent.eyebrow}</p>
      <h1 className="mt-sm max-w-[18ch]">{homeContent.headline}</h1>
      <p className="mt-md max-w-[58ch]">{homeContent.lede}</p>
    </section>
  );
}
