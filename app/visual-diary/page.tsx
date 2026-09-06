import DiaryFlow from "@/components/DiaryFlow";
import { diaryEntries, visualDiaryContent } from "@/lib/content";

export default function VisualDiary() {
  return (
    <article className="px-xs py-lg md:px-md">
      <section className="grid gap-md md:grid-cols-4">
        <h1>{visualDiaryContent.title}</h1>
        <p className="md:col-span-2">{visualDiaryContent.intro}</p>
      </section>

      {/* A loose, continuous scatter of images: no grid, no captions unless added. */}
      <section className="mt-lg">
        <DiaryFlow
          entries={diaryEntries}
          label={visualDiaryContent.feedLabel}
          seed={visualDiaryContent.seed}
          shuffle={visualDiaryContent.shuffle}
        />
      </section>
    </article>
  );
}
