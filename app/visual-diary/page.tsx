import { visualDiaryContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import DiarySection from "@/components/sections/DiarySection";

// The search engine description is its own field in the CMS, and falls back
// to the sentence beneath the heading.
export const metadata = pageMetadata({
  title: visualDiaryContent.metaTitle,
  description: visualDiaryContent.metaDescription || visualDiaryContent.intro,
  path: "/visual-diary",
});

export default function VisualDiaryPage() {
  return (
    <div>
      <DiarySection />
    </div>
  );
}
