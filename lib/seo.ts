import type { Metadata } from "next";
import {
  aboutContent,
  contactContent,
  footerContent,
  placements,
  siteConfig,
} from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/* ------------------------------------------------------------------ */
/* Page metadata                                                       */
/* ------------------------------------------------------------------ */

interface PageSeo {
  /** The full browser tab title, used as written. */
  title: string;
  description: string;
  /** The page's path, e.g. "/placements". Becomes the canonical address. */
  path: string;
}

/*
  What every page of its own declares: a title, a description, a canonical
  address, and the same three again for the social card. A page's openGraph
  replaces the root's wholesale, so the card image drawn by
  app/opengraph-image.tsx is named here again or it would be lost.
*/
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;
const websiteId = `${siteUrl}/#website`;

// Serialised for a <script type="application/ld+json">. A "<" in any of the
// copy is escaped so it can never close the tag early.
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/*
  Who the site belongs to, on every page: the practice, its founder and the
  site itself, each with a stable id so the pages can refer back to them.
  Read by Google for the knowledge panel and by assistants describing the
  practice.
*/
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": organizationId,
        name: siteConfig.name,
        legalName: footerContent.company,
        alternateName: "I and I Worldwide",
        description: siteConfig.metaDescription,
        url: siteUrl,
        logo: absoluteUrl("/logo-mark.png"),
        image: absoluteUrl("/opengraph-image"),
        email: contactContent.email,
        founder: { "@id": founderId },
        areaServed: ["London", "Miami"],
        knowsAbout: [
          "Art advisory",
          "Contemporary art",
          "Art collecting",
          "Emerging artists",
          "Mid-career artists",
        ],
        sameAs: footerContent.socials.map((social) => social.url),
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: aboutContent.founderName,
        jobTitle: "Art advisor",
        description: aboutContent.founderBio,
        worksFor: { "@id": organizationId },
        url: absoluteUrl("/#founder"),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: siteUrl,
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
    ],
  };
}

/* The Placements page: the works, each with its artist, year and medium. */
export function placementsGraph({ title, description }: { title: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl("/placements"),
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: placements.map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VisualArtwork",
          name: work.title,
          creator: { "@type": "Person", name: work.artist },
          dateCreated: String(work.year),
          artMedium: work.medium,
          ...(work.image ? { image: absoluteUrl(work.image) } : {}),
        },
      })),
    },
  };
}
