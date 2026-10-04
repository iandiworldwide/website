"use client";

import { Fragment } from "react";

/*
  The founder's full name in a run of copy, marked and underlined. Pressing
  it brings her portrait, held faint behind the copy, fully forward: solid,
  clear of grain and above the words. Pressing it again, or the portrait,
  or scrolling the section away, sends it back.

  The two talk through an attribute on the section they share, data-clear,
  which the styles for .portrait read. See FounderPortrait.
*/

const MENTION = /\b(Talia Pockhai)\b/g;

export default function FounderName({ children }: { children: string }) {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const section = e.currentTarget.closest("section");
    if (!section) return;
    const clear = section.toggleAttribute("data-clear");
    e.currentTarget.setAttribute("aria-pressed", String(clear));
  };

  return children.split(MENTION).map((part, index) =>
    // split() with a capture group puts the matches at the odd indexes.
    index % 2 === 1 ? (
      <button key={index} type="button" aria-pressed="false" className="mention" onClick={toggle}>
        {part}
      </button>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
