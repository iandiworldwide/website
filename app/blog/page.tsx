import type { Metadata } from "next";
import BlogSection from "@/components/sections/BlogSection";

export const metadata: Metadata = { title: "Blog — I&I Worldwide" };

export default function BlogPage() {
  return (
    <div className="pt-header">
      <BlogSection />
    </div>
  );
}
