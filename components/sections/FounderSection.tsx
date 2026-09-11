import FluidBackground from "@/components/FluidBackground";
import FounderMention from "@/components/FounderMention";
import { aboutContent } from "@/lib/content";

// The founder. The colour field returns here, tying the screen back to the
// opening, with the quote given room of its own on the next screen.
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
          <h2 id="founder-heading">{aboutContent.founderTitle}</h2>
          <div className="space-y-md md:col-span-2 max-w-[52ch]">
            <p>
              <FounderMention>{aboutContent.founderBio}</FounderMention>
            </p>
            <p>
              <FounderMention>{aboutContent.founderClosure}</FounderMention>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
