import site from "@/content/site.json";

/*
  The public address of the site, with no trailing slash. Every absolute
  address a search engine or a social card needs is built on it: canonical
  links, the sitemap, the Open Graph card, the structured data.

  It is the address set in the CMS if there is one; otherwise the domain
  Vercel serves production from, which becomes the custom domain the moment
  one is attached to the project; otherwise a local address for development.

  Server-only: the Vercel variable is not available in the browser.
*/
const configured = (site.siteConfig as { url?: string }).url?.trim();
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = configured
  ? configured.replace(/\/+$/, "")
  : vercel
    ? `https://${vercel}`
    : "http://localhost:3000";

/** An absolute address for a path on the site, e.g. absoluteUrl("/blog"). */
export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString().replace(/(?<=.)\/$/, "");
}
