import { blogContent } from "@/lib/content";
import { blogGraph, jsonLd, pageMetadata } from "@/lib/seo";
import BlogSection from "@/components/sections/BlogSection";

// The search engine description is its own field in the CMS, and falls back
// to the sentence beneath the heading.
const description = blogContent.metaDescription || blogContent.intro;

export const metadata = pageMetadata({
  title: blogContent.metaTitle,
  description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(blogGraph({ title: blogContent.title, description })),
        }}
      />
      <BlogSection />
    </div>
  );
}
