import DiaryGlimpsePicture, { type SizedEntry } from "@/components/DiaryGlimpsePicture";
import { diaryEntries } from "@/lib/content";
import { getImageSize } from "@/lib/imageSize";

/*
  One picture from the Visual Diary, sitting across the top edge of its
  section, centred on the page, with the middle of the picture on the line
  where the section above ends. Its caption hangs beneath, and it links
  through to the diary. See .glimpse-seam and .seam-top in globals.css. It
  must be the section's own child.

  Here, on the server, each entry's picture is measured, so the browser can
  show it at its own proportions; which one is shown is drawn in the
  browser (DiaryGlimpsePicture).

  The section leaves room beneath for the tallest picture in the diary,
  whichever is drawn, so the copy never moves once the page has loaded:
  give it seamRoom() as its style.
*/

const entries: SizedEntry[] = diaryEntries.flatMap((entry) => {
  const size = entry.image ? getImageSize(entry.image) : undefined;
  return size ? [{ ...entry, ...size }] : [];
});

// Height over width of the tallest picture.
const tallest = Math.max(1, ...entries.map((entry) => entry.height / entry.width));

export function seamRoom() {
  return { "--seam-ratio": tallest.toFixed(3) } as React.CSSProperties;
}

export default function DiaryGlimpse() {
  if (entries.length === 0) return null;
  return <DiaryGlimpsePicture entries={entries} />;
}
