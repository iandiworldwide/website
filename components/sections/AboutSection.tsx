import DiaryGlimpse from "@/components/DiaryGlimpse";
import { aboutContent } from "@/lib/content";

// The practice. Deliberately sparse: a heading in one column and the copy
// in a narrow measure beside it, and a picture from the diary sitting
// across the top edge. The rest of the screen is left empty.
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-full seam-top px-xs md:px-md">
      <DiaryGlimpse />
      <div data-reveal className="grid gap-md md:grid-cols-4">
        <h2 id="about-heading">{aboutContent.title}</h2>
        <div className="space-y-md md:col-span-2 max-w-[52ch]">
          <p>{aboutContent.intro}</p>
          <p>{aboutContent.approach}</p>
          <p>{aboutContent.closing}</p>
        </div>
      </div>
    </section>
  );
}
