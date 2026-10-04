import DiaryGlimpse from "@/components/DiaryGlimpse";
import { aboutContent } from "@/lib/content";

/*
  A screen of its own on white. The colour that ran behind the founder screen
  now runs through the type itself.

  It runs the full width of the screen, held off the edges by the same
  padding every other section uses, so it lines up with them. A picture from
  the diary sits in the space to the right of the name, its top level with it.
*/
export default function QuoteSection() {
  return (
    <section id="quote" className="section-full overflow-clip px-xs md:px-md">
      <blockquote data-reveal>
        <p className="quote-flow text-hero">
          {"“"}
          {aboutContent.founderQuote}
          {"”"}
        </p>
        <footer className="mt-lg text-caption">{aboutContent.founderName}</footer>
      </blockquote>
      {/* Pulled up one caption line, so its top meets the name's. */}
      <DiaryGlimpse className="ml-auto mt-md w-1/2 text-caption md:-mt-[1lh] md:w-[13vw]" />
    </section>
  );
}
