import type { MetadataRoute } from "next";
import { diaryEntries, placements } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

// The four pages, with the pictures each carries so they can be found in
// image search too. Dated at build time, which is when the content last
// changed, since every edit redeploys.
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: built, changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/placements"),
      lastModified: built,
      changeFrequency: "monthly",
      priority: 0.8,
      images: placements.flatMap((work) => (work.image ? [absoluteUrl(work.image)] : [])),
    },
    {
      url: absoluteUrl("/visual-diary"),
      lastModified: built,
      changeFrequency: "monthly",
      priority: 0.6,
      images: diaryEntries.flatMap((entry) => (entry.image ? [absoluteUrl(entry.image)] : [])),
    },
    { url: absoluteUrl("/blog"), lastModified: built, changeFrequency: "weekly", priority: 0.8 },
  ];
}
