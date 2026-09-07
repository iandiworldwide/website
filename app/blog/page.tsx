import type { Metadata } from "next";
import { blogContent } from "@/lib/content";
import BlogSection from "@/components/sections/BlogSection";

export const metadata: Metadata = { title: blogContent.metaTitle };

export default function BlogPage() {
  return (
    <div>
      <BlogSection />
    </div>
  );
}
