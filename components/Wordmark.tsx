import Link from "next/link";
import { siteConfig } from "@/lib/content";

const LETTERS = Array.from(siteConfig.name);

/*
  The logotype, written out in full and pinned top left on every page.
  Each letter runs the same colour cycle offset from its neighbour, so a
  band of colour travels through the word. The link carries the name for
  screen readers and the letters are hidden from them, so it is never read
  out one character at a time.
*/
export default function Wordmark() {
  return (
    <Link href="/" aria-label={siteConfig.name} className="wordmark">
      {LETTERS.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          aria-hidden="true"
          style={{ "--i": index } as React.CSSProperties}
        >
          {letter === " " ? " " : letter}
        </span>
      ))}
    </Link>
  );
}
