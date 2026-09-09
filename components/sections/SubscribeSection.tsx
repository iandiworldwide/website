"use client";

import Script from "next/script";
import { useState } from "react";
import { subscribeContent } from "@/lib/content";

/*
  A screen of its own: the invitation on the left, the live Substack feeds on
  the right, and a link out. The feeds, Latest and Most read, sit under a row
  of tabs; the chosen one is underlined and its feed shows beneath. The feeds
  are drawn by Supascribe, which loads after the page is interactive so it
  never holds up the first paint. Both feeds are in the page from the start,
  so switching is immediate.
*/
export default function SubscribeSection() {
  const [selected, setSelected] = useState(0);

  return (
    <section
      id="subscribe"
      aria-labelledby="subscribe-heading"
      className="section-full fold-screen px-xs md:px-md"
    >
      <div className="grid gap-lg md:grid-cols-2 md:gap-md">
        <div data-reveal className="max-w-[34ch]">
          <p className="text-caption">{subscribeContent.eyebrow}</p>
          <h2 id="subscribe-heading" className="mt-sm text-hero-sm">
            {subscribeContent.headline}
          </h2>
          <p className="mt-md">{subscribeContent.lede}</p>
          <p className="mt-lg">
            <a
              href={subscribeContent.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta"
            >
              {subscribeContent.cta}
            </a>
          </p>
        </div>

        <div data-reveal>
          <div role="tablist" aria-label={subscribeContent.eyebrow} className="flex flex-wrap gap-md">
            {subscribeContent.feeds.map((feed, index) => (
              <button
                key={feed.embedId}
                type="button"
                role="tab"
                id={`feed-tab-${index}`}
                aria-selected={selected === index}
                aria-controls={`feed-${index}`}
                onClick={() => setSelected(index)}
                className="link-sweep"
              >
                {feed.label}
              </button>
            ))}
          </div>

          {subscribeContent.feeds.map((feed, index) => (
            <div
              key={feed.embedId}
              role="tabpanel"
              id={`feed-${index}`}
              aria-labelledby={`feed-tab-${index}`}
              hidden={selected !== index}
              className="mt-md"
              data-supascribe-embed-id={feed.embedId}
              data-supascribe-feed=""
            />
          ))}
        </div>
      </div>

      <Script src={subscribeContent.feedScript} strategy="lazyOnload" />
    </section>
  );
}
