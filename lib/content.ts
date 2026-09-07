/*
  Every piece of copy on the site comes from the JSON files in /content.
  Those are what the CMS edits; this file only gives them names and types
  so the rest of the app can use them without knowing where they came from.

  To change wording, use the CMS, or edit the JSON directly.
*/

import site from "@/content/site.json";
import home from "@/content/home.json";
import about from "@/content/about.json";
import services from "@/content/services.json";
import placementsData from "@/content/placements.json";
import diary from "@/content/visual-diary.json";
import notes from "@/content/notes.json";
import contact from "@/content/contact.json";
import notFound from "@/content/not-found.json";

/* ------------------------------------------------------------------ */
/* Site-wide                                                           */
/* ------------------------------------------------------------------ */

export const siteConfig = site.siteConfig;

// Two kinds of entry. An href starting with "#" scrolls to a section on the
// home page and its id must match that section. An href starting with "/" is
// its own page. The first three sit centre in the header, the rest right.
export const navigation = site.navigation;

export const footerContent = site.footer;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const homeContent = home.home;

// The opening flicker runs through every combination of a mark and a
// conjunction, then lands on `final`.
export const introContent = home.intro;

export const subscribeContent = home.subscribe;

export interface Testimonial {
  text: string;
  author: string;
}

// Shown one at a time after the placements, sliding across as the page scrolls.
export const testimonials = home.testimonials as Testimonial[];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const aboutContent = about;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const servicesContent = services;

/* ------------------------------------------------------------------ */
/* Placements                                                          */
/* ------------------------------------------------------------------ */

export type PlacementCategory =
  | "painting"
  | "sculpture"
  | "works-on-paper"
  | "textile"
  | "mixed-media";

export interface Placement {
  artist: string;
  title: string;
  year: number;
  medium: string;
  category: PlacementCategory;
  /** Path under /public, e.g. "/placements/artist-title.jpg". */
  image?: string;
}

export const placementsContent = placementsData.page;

export const placementCategories = placementsData.categories as {
  value: PlacementCategory | "all";
  label: string;
}[];

// The home page shows the first few that have an image, set by previewCount.
// Order here is the order on the page. Image files live in public/placements/.
export const placements = placementsData.works as Placement[];

/* ------------------------------------------------------------------ */
/* Visual Diary                                                        */
/* ------------------------------------------------------------------ */

export interface DiaryEntry {
  /** Path under /public, e.g. "/visual-diary/photo.jpg". */
  image: string;
  /** Short description for screen readers. Not shown on the page. */
  alt: string;
  /** Optional. Shown beneath the image when present. */
  caption?: string;
  /** Optional. Makes the image a link. External links open in a new tab. */
  link?: string;
  /** Optional. Overrides the automatic size. */
  size?: "small" | "medium" | "large";
}

export const visualDiaryContent = diary.page;

export const diaryEntries = diary.entries as DiaryEntry[];

/* ------------------------------------------------------------------ */
/* Notes                                                               */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author?: string;
  /** Optional Substack link. With it, the title becomes a link. */
  url?: string;
}

export const blogContent = notes.page;

export const blogPosts = notes.posts as BlogPost[];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contactContent = contact;

/* ------------------------------------------------------------------ */
/* Not found                                                           */
/* ------------------------------------------------------------------ */

export interface LyricLine {
  text: string;
  /** Words within `text` that flicker through the marks. Must appear in it. */
  highlight?: string;
}

export const notFoundContent = notFound.page;

export const notFoundSong = {
  ...notFound.song,
  lines: notFound.song.lines as LyricLine[],
};
