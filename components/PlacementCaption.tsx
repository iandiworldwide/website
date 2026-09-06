import type { Placement } from "@/lib/content";

// Catalogue caption: artist / title, year / medium.
export default function PlacementCaption({ work }: { work: Placement }) {
  return (
    <>
      {work.artist}
      <br />
      {work.title}, {work.year}
      <br />
      <span className="text-slate">{work.medium}</span>
    </>
  );
}
