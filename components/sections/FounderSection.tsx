import FluidBackground from "@/components/FluidBackground";
import { aboutContent } from "@/lib/content";

// The founder. The colour field returns here, tying the screen back to the
// opening, with the quote given room of its own.
export default function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="section-full overflow-hidden"
    >
      <FluidBackground />
      <div className="fluid-over px-xs md:px-md">
        <div data-reveal className="grid gap-md md:grid-cols-4">
          <h2 id="founder-heading">
            {aboutContent.founderTitle}
            <br />
            {aboutContent.founderName}
          </h2>
          <div className="space-y-md md:col-span-2 max-w-[52ch]">
            <p>{aboutContent.founderBio}</p>
            <p>{aboutContent.founderApproach}</p>
            <p>{aboutContent.founderClosure}</p>
          </div>
        </div>

        <blockquote data-reveal className="mt-lg max-w-[38ch] md:ml-[25%]">
          <p className="text-hero-sm">“{aboutContent.founderQuote}”</p>
        </blockquote>
      </div>
    </section>
  );
}
