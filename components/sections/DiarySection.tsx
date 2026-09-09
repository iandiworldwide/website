import DiaryFlow from "@/components/DiaryFlow";
import { diaryEntries, visualDiaryContent } from "@/lib/content";

export default function DiarySection() {
  return (
    <section id="visual-diary" aria-labelledby="diary-heading" className="section">
      <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
        {/* The page's own title, so it is the first heading a search engine reads. */}
        <h1 id="diary-heading" className="page-title">
          {visualDiaryContent.title}
        </h1>
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
