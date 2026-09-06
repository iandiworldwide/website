import { aboutContent } from "@/lib/content";

// A screen of its own on white. The colour that ran behind the founder screen
// now runs through the type itself, drifting slowly across the words.
export default function QuoteSection() {
  return (
    <section id="quote" className="section-full px-xs md:px-md">
      <blockquote data-reveal className="mx-auto max-w-[26ch] md:max-w-[30ch]">
        <p className="quote-flow text-hero">“{aboutContent.founderQuote}”</p>
        <footer className="mt-lg text-caption">{aboutContent.founderName}</footer>
      </blockquote>
    </section>
  );
}
