import DiaryFlow from "@/components/DiaryFlow";
import { diaryEntries, visualDiaryContent } from "@/lib/content";

export default function DiarySection() {
  return (
    <section id="visual-diary" aria-labelledby="diary-heading" className="section">
      <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
        <h2 id="diary-heading">{visualDiaryContent.title}</h2>
        <p className="md:col-span-2">{visualDiaryContent.intro}</p>
      </div>

      {/* A loose, non-grid scatter of images. Captions only where added. */}
      <div className="mt-lg">
        <DiaryFlow
          entries={diaryEntries}
          label={visualDiaryContent.feedLabel}
          seed={visualDiaryContent.seed}
          shuffle={visualDiaryContent.shuffle}
        />
      </div>
    </section>
  );
}
