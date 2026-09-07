import type { Metadata } from "next";
import { visualDiaryContent } from "@/lib/content";
import DiarySection from "@/components/sections/DiarySection";

export const metadata: Metadata = { title: visualDiaryContent.metaTitle };

export default function VisualDiaryPage() {
  return (
    <div>
      <DiarySection />
    </div>
  );
}
