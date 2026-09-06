// A slow, fluid field of colour that drifts behind a full-height section.
// Pure CSS: six blurred radial blooms on a lavender ground, each drifting on
// its own long loop, so no two moments look alike. It holds still under
// prefers-reduced-motion, and it is decorative so it is hidden from readers.
export default function FluidBackground() {
  return (
    <div aria-hidden="true" className="fluid">
      <span className="fluid-bloom fluid-bloom-1" />
      <span className="fluid-bloom fluid-bloom-2" />
      <span className="fluid-bloom fluid-bloom-3" />
      <span className="fluid-bloom fluid-bloom-4" />
      <span className="fluid-bloom fluid-bloom-5" />
    </div>
  );
}
