"use client";

import Image from "next/image";
import { useState } from "react";
import type { SubstackPost } from "@/lib/substack";

/*
  The Substack feeds as a row of tabs, the chosen one underlined and its
  posts listed beneath. The posts arrive from the server already fetched,
  so switching is immediate and nothing loads on the client. Arrow keys
  move between tabs, as a tab list expects.
*/

export interface Feed {
  label: string;
  posts: SubstackPost[];
}

interface Props {
  label: string;
  feeds: Feed[];
  fallbackHref: string;
  fallbackLabel: string;
}

export default function SubstackFeeds({ label, feeds, fallbackHref, fallbackLabel }: Props) {
  const [selected, setSelected] = useState(0);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (selected + step + feeds.length) % feeds.length;
    setSelected(next);
    (event.currentTarget.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <>
      <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="flex flex-wrap gap-md">
        {feeds.map((feed, index) => (
          <button
            key={feed.label}
            type="button"
            role="tab"
            id={`feed-tab-${index}`}
            aria-selected={selected === index}
            aria-controls={`feed-${index}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            className="link-sweep"
          >
            {feed.label}
          </button>
        ))}
      </div>

      {feeds.map((feed, index) => (
        <div
          key={feed.label}
          role="tabpanel"
          id={`feed-${index}`}
          aria-labelledby={`feed-tab-${index}`}
          hidden={selected !== index}
          className="mt-md"
        >
          {feed.posts.length === 0 ? (
            <p>
              <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="link-sweep">
                {fallbackLabel}
              </a>
            </p>
          ) : (
            <ul className="space-y-md">
              {feed.posts.map((post) => (
                <li key={post.url} className="grid grid-cols-[5.5rem_1fr] items-start gap-sm">
                  {post.cover ? (
                    <Image
                      src={post.cover}
                      alt=""
                      width={176}
                      height={132}
                      sizes="88px"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  ) : (
                    <span aria-hidden="true" className="block aspect-[4/3] w-full bg-[var(--alice)]" />
                  )}
                  <div>
                    <h3>
                      <a href={post.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
                        {post.title}
                      </a>
                    </h3>
                    {post.date && <p className="mt-xs text-caption">{post.date}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}
