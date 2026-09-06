import Link from "next/link";
import { siteConfig } from "@/lib/content";

/*
  The logotype, pinned top left on every page. It is drawn as a mask over a
  colour, so the artwork can pick up the palette; where masks are unsupported
  the same file falls back to a plain black background image. The link
  carries the name for screen readers.
*/
export default function Wordmark() {
  return (
    <Link href="/" aria-label={siteConfig.name} className="wordmark">
      <span className="wordmark-mark" />
    </Link>
  );
}
