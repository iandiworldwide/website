import type { Placement } from "@/lib/content";

// Deliberately discreet: one line, small, artist and title and year only.
// The medium is held in the data but not shown.
export default function PlacementCaption({ work }: { work: Placement }) {
  return (
    <>
      {work.artist}, {work.title}, {work.year}
    </>
  );
}
