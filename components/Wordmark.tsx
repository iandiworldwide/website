import Link from "next/link";
import { siteConfig } from "@/lib/content";

// The logotype. Pinned top left inside the sticky header, so it stays in
// the corner on every page. Set in the display face and the only element
// that uses a weight other than 400 — it is artwork, not UI text.
export default function Wordmark() {
  return (
    <Link href="/" aria-label={siteConfig.name} className="wordmark">
      {siteConfig.logo}
    </Link>
  );
}
