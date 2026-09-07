"use client";

import { useEffect, useRef, useState } from "react";
import { aboutContent } from "@/lib/content";
import { findArtwork, toTerm, type Artwork } from "@/lib/artworkSearch";

// Split on whitespace but keep it, so the quote reflows exactly as written.
const TOKENS = aboutContent.founderQuote.split(/(\s+)/);

// Break a title around the word that matched, so it can be picked out.
function around(title: string, match: string) {
  const at = title.toLowerCase().indexOf(match.toLowerCase());
  if (at < 0) return { before: title, hit: "", after: "" };
  return {
    before: title.slice(0, at),
    hit: title.slice(at, at + match.length),
    after: title.slice(at + match.length),
  };
}

/*
  A screen of its own on white. The colour that ran behind the founder screen
  now runs through the type itself.

  Hovering a word brings up a work from the Cleveland Museum of Art with that
  word in its title, behind the text. A different one each time, since it
  picks at random from everything that matched. The credit names the work and
  picks the shared word out in colour, and the hovered word becomes a link to
  the work at the museum.
*/
export default function QuoteSection() {
  const [found, setFound] = useState<{ art: Artwork; token: number } | null>(null);
  const request = useRef<AbortController | null>(null);
  const latest = useRef(0);

  // Drop any request still in flight when the screen goes away.
  useEffect(() => () => request.current?.abort(), []);

  const show = (word: string, token: number) => {
    const term = toTerm(word);
    if (!term) return;

    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const ticket = ++latest.current;

    findArtwork(term, controller.signal).then((art) => {
      // Ignore anything that comes back after a newer hover.
      if (ticket === latest.current && art) setFound({ art, token });
    });
  };

  const clear = () => {
    request.current?.abort();
    latest.current++;
    setFound(null);
  };

  const art = found?.art;
  const credit = art ? around(art.title, art.match) : null;

  return (
    <section id="quote" className="section-full px-xs md:px-md">
      <div
        aria-hidden="true"
        className="quote-art"
        data-on={art ? "" : undefined}
        style={art ? { backgroundImage: `url("${art.image}")` } : undefined}
      />

      {/* Runs the full width of the screen, held off the edges by the same
          padding every other section uses, so it lines up with them. */}
      <blockquote data-reveal className="relative z-10" onMouseLeave={clear}>
        <p className="quote-flow text-hero">
          {"“"}
          {TOKENS.map((token, index) =>
            toTerm(token) ? (
              // Always an anchor so the element never swaps type mid-hover;
              // it only gains an address once a work is showing for it.
              <a
                key={index}
                className="quote-word"
                href={found?.token === index && art?.url ? art.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => show(token, index)}
              >
                {token}
              </a>
            ) : (
              token
            ),
          )}
          {"”"}
        </p>
        <footer className="mt-lg text-caption">{aboutContent.founderName}</footer>
      </blockquote>

      {/* Credit for whatever is showing, as the collection asks. */}
      <p className="quote-credit text-caption" data-on={art ? "" : undefined}>
        {art && credit ? (
          <a href={art.url} target="_blank" rel="noopener noreferrer">
            {credit.before}
            <span className="credit-hit">{credit.hit}</span>
            {credit.after}
            {" — "}
            {art.artist}
          </a>
        ) : (
          ""
        )}
      </p>
    </section>
  );
}
