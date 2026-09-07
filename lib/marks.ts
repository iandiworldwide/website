/*
  Every way the house writes its own name. A mark, a conjunction, the same
  mark again — i&i, I+I, i⁊i — built from the two lists the CMS edits.

  Shared by the opening flicker and by any words on the page that flicker
  through the same variations, so both draw on one set.
*/

import { introContent } from "@/lib/content";

export const markCombinations = introContent.marks.flatMap((mark) =>
  introContent.ands.map((and) => `${mark}${and}${mark}`),
);

/*
  The variations as written, with `final` at index 0. The same on the server
  as on the client, so anything that puts the whole sequence in the markup
  hydrates cleanly; shuffle it once mounted.
*/
export function orderedSequence(final: string) {
  return [final, ...markCombinations.filter((variant) => variant !== final)];
}

/*
  The same, shuffled, with `final` still held at index 0 so it opens and —
  cycling in order — lands back on the real words once each pass.
*/
export function buildSequence(final: string) {
  const [head, ...rest] = orderedSequence(final);
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]];
  }
  return [head, ...rest];
}
