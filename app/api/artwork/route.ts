import { NextRequest, NextResponse } from "next/server";

/*
  Looks up open-access works whose title carries a word, from the Cleveland
  Museum of Art. Their API sends no CORS headers, so the browser cannot call
  it directly; this passes the request through and hands back only the few
  fields the page needs.

  Answers are cached for a day, so a word is fetched from Cleveland once.
*/

const ENDPOINT = "https://openaccess-api.clevelandart.org/api/artworks/";
const CREDIT = "Cleveland Museum of Art";
const DAY = 60 * 60 * 24;

export interface Artwork {
  image: string;
  title: string;
  artist: string;
}

interface Record {
  title?: string;
  creation_date?: string | null;
  creators?: { description?: string; use_in_caption?: boolean }[];
  images?: { web?: { url?: string } };
}

// "Fujimaro (Japanese, d. 1830)" reads better as "Fujimaro".
function artistOf(record: Record): string {
  const creator = record.creators?.find((entry) => entry.use_in_caption) ?? record.creators?.[0];
  const name = creator?.description?.split("(")[0].trim();
  return name ? `${name}, ${CREDIT}` : CREDIT;
}

export async function GET(request: NextRequest) {
  const term = (request.nextUrl.searchParams.get("q") ?? "")
    .toLowerCase()
    .replace(/[^a-z']/g, "");

  if (term.length < 4) return NextResponse.json({ artworks: [] });

  const url = new URL(ENDPOINT);
  url.searchParams.set("q", term);
  url.searchParams.set("has_image", "1");
  url.searchParams.set("limit", "50");
  url.searchParams.set("fields", "title,creators,images,creation_date");

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

  const usable = records.filter((record) => record.images?.web?.url && record.title);
  // The word in the title is what was asked for. Where nothing matches, the
  // rest of the search still returns work the word turned up.
  const onTitle = usable.filter((record) => record.title?.toLowerCase().includes(term));

  const artworks: Artwork[] = (onTitle.length ? onTitle : usable).slice(0, 20).map((record) => ({
    image: record.images!.web!.url!,
    title: record.creation_date ? `${record.title}, ${record.creation_date}` : record.title!,
    artist: artistOf(record),
  }));

  return NextResponse.json(
    { artworks },
    { headers: { "Cache-Control": `public, s-maxage=${DAY}, stale-while-revalidate=${DAY}` } },
  );
}
