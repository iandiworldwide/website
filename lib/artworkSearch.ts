/*
  Finds an artwork whose title carries a word, through this site's own
  /api/artwork route. That route talks to the Cleveland Museum of Art, which
  sends no CORS headers of its own, and matches strictly on title.

  Results are cached per word for the life of the page, so hovering the same
  word again costs nothing and simply picks a different work from the set.
*/

export interface Artwork {
  image: string;
  title: string;
  /** The word inside the title that matched. */
  match: string;
  artist: string;
  url: string;
}

// Words too short or too ordinary to be worth a lookup.
const SKIP = new Set([
  "that", "with", "from", "this", "have", "were", "been", "into", "they",
  "them", "then", "than", "what", "when", "your", "which", "their", "there",
  "would", "could", "should", "does", "each", "here", "over", "such", "very",
  "only", "just", "also", "some", "more", "most", "many", "much", "took",
]);

const cache = new Map<string, Artwork[]>();

/** The lookup key for a word as it appears in running text, or null to skip it. */
export function toTerm(word: string): string | null {
  const term = word.toLowerCase().replace(/[^a-z']/g, "");
  if (term.length < 4 || SKIP.has(term)) return null;
  return term;
}

/** One artwork for this word, chosen at random, or null if there is none. */
export async function findArtwork(term: string, signal?: AbortSignal): Promise<Artwork | null> {
  let matches = cache.get(term);

  if (!matches) {
    try {
      const response = await fetch(`/api/artwork?q=${encodeURIComponent(term)}`, { signal });
      if (!response.ok) return null;
      const payload = (await response.json()) as { artworks?: Artwork[] };
      matches = payload.artworks ?? [];
    } catch {
      // A failed lookup simply shows nothing. Never let it reach the page.
      return null;
    }
    cache.set(term, matches);
  }

  if (!matches.length) return null;
  return matches[Math.floor(Math.random() * matches.length)];
}
