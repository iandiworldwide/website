import { NextRequest, NextResponse } from "next/server";

/*
  Finds open-access works from the Cleveland Museum of Art whose *title*
  carries a word. Their API sends no CORS headers, so the browser cannot call
  it directly; this passes the request through and hands back only the few
  fields the page needs.

  The match is strict: the word has to be in the title. It is stemmed first,
  so "collecting" reaches Collector and Collected, and "decades" reaches
  Decade. Where nothing matches, nothing is returned.

  Answers are cached for a day, so a word is fetched from Cleveland once.
*/

const ENDPOINT = "https://openaccess-api.clevelandart.org/api/artworks/";
const CREDIT = "Cleveland Museum of Art";
const DAY = 60 * 60 * 24;

export interface Artwork {
  image: string;
  title: string;
  /** The word inside the title that matched, so the page can pick it out. */
  match: string;
  artist: string;
  url: string;
}

interface Record {
  title?: string;
  url?: string;
  creation_date?: string | null;
  creators?: { description?: string; use_in_caption?: boolean }[];
  images?: { web?: { url?: string } };
}

/*
  Trim one ending so a word reaches its relatives. Only the first rule that
  fits is applied, so nothing is over-trimmed.
    collecting → collect      reflected → reflect
    directly   → direct       artists   → artist
*/
function stem(word: string): string {
  if (word.length >= 6 && word.endsWith("ing")) return word.slice(0, -3);
  if (word.length >= 5 && word.endsWith("ed")) return word.slice(0, -2);
  if (word.length >= 5 && word.endsWith("ly")) return word.slice(0, -2);
  if (word.length >= 5 && word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

// "Fujimaro (Japanese, d. 1830)" reads better as "Fujimaro".
function artistOf(record: Record): string {
  const creator = record.creators?.find((entry) => entry.use_in_caption) ?? record.creators?.[0];
  const name = creator?.description?.split("(")[0].trim();
  return name ? `${name}, ${CREDIT}` : CREDIT;
}

// The whole word in the title that carries the stem, for picking out later.
function matchedWord(title: string, root: string): string | null {
  const found = title.match(new RegExp(`[\\p{L}\\p{N}'’-]*${root}[\\p{L}\\p{N}'’-]*`, "iu"));
  return found ? found[0] : null;
}

export async function GET(request: NextRequest) {
  const word = (request.nextUrl.searchParams.get("q") ?? "").toLowerCase().replace(/[^a-z']/g, "");
  if (word.length < 4) return NextResponse.json({ artworks: [] });

  const root = stem(word);
  if (root.length < 4) return NextResponse.json({ artworks: [] });

  const url = new URL(ENDPOINT);
  url.searchParams.set("title", root);
  url.searchParams.set("has_image", "1");
  url.searchParams.set("limit", "50");
  url.searchParams.set("fields", "title,url,creators,images,creation_date");

  let records: Record[] = [];
  try {
    const response = await fetch(url, { next: { revalidate: DAY } });
    if (!response.ok) return NextResponse.json({ artworks: [] });
    const payload = (await response.json()) as { data?: Record[] };
    records = payload.data ?? [];
  } catch {
    // A failed lookup simply shows nothing on the page.
    return NextResponse.json({ artworks: [] });
  }

  const artworks: Artwork[] = [];
  for (const record of records) {
    const image = record.images?.web?.url;
    const title = record.title;
    if (!image || !title) continue;
    // Strict: the stem has to actually be in the title.
    const match = matchedWord(title, root);
    if (!match) continue;

    artworks.push({
      image,
      title: record.creation_date ? `${title}, ${record.creation_date}` : title,
      match,
      artist: artistOf(record),
      url: record.url ?? "",
    });
    if (artworks.length === 20) break;
  }

  return NextResponse.json(
    { artworks },
    { headers: { "Cache-Control": `public, s-maxage=${DAY}, stale-while-revalidate=${DAY}` } },
  );
}
