/*
  Posts from the Substack, read on the server from its public archive
  endpoint and kept for an hour, so the subscribe screen can list the latest
  and most-read posts without loading a third-party script or full-size
  cover images in the visitor's browser. A failed read gives an empty list;
  the screen still links out.
*/

import { subscribeContent } from "@/lib/content";

export type FeedSort = "new" | "top";

export interface SubstackPost {
  title: string;
  subtitle: string;
  url: string;
  /** Publication date, formatted for display. */
  date: string;
  /** Cover image address, or null when the post has none. */
  cover: string | null;
}

interface ArchivePost {
  title?: string;
  subtitle?: string;
  canonical_url?: string;
  post_date?: string;
  cover_image?: string | null;
}

const formatDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function getSubstackPosts(sort: FeedSort, limit = 3): Promise<SubstackPost[]> {
  const base = subscribeContent.ctaLink.replace(/\/$/, "");
  try {
    const response = await fetch(`${base}/api/v1/archive?sort=${sort}&limit=${limit}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    const posts = (await response.json()) as ArchivePost[];
    return posts
      .filter((post) => post.title && post.canonical_url)
      .map((post) => ({
        title: post.title as string,
        subtitle: post.subtitle ?? "",
        url: post.canonical_url as string,
        date: post.post_date ? formatDate.format(new Date(post.post_date)) : "",
        cover: post.cover_image || null,
      }));
  } catch (error) {
    console.error("Substack feed failed", error);
    return [];
  }
}
