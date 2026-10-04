import FounderMention from "@/components/FounderMention";
import { aboutContent } from "@/lib/content";

/*
  A screen of its own on white. The colour that ran behind the founder screen
  now runs through the type itself.

  It runs the full width of the screen, held off the edges by the same
  padding every other section uses, so it lines up with them.
*/
export default function QuoteSection() {
  return (
    <section id="quote" className="section-full px-xs md:px-md">
      <blockquote data-reveal>
        <p className="quote-flow text-hero">
          {"“"}
          {aboutContent.founderQuote}
          {"”"}
        </p>
        <footer className="mt-lg text-caption">
          <FounderMention>{aboutContent.founderName}</FounderMention>
        </footer>
      </blockquote>
    </section>
  );
}
