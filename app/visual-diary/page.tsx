import type { Metadata } from "next";
import DiarySection from "@/components/sections/DiarySection";

export const metadata: Metadata = { title: "Visual Diary — I&I Worldwide" };

export default function VisualDiaryPage() {
  return (
    <div>
      <DiarySection />
    </div>
  );
}
