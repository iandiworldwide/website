// A fluid field of colour that moves behind a full-height screen.
// Pure CSS: seven blurred radial blooms on a lavender ground, each travelling
// its own closed loop, all of them carried round by a slow counter-swirl so
// the field never settles. It holds still under prefers-reduced-motion, and
// it is decorative so it is hidden from screen readers.
export default function FluidBackground() {
  return (
    <div aria-hidden="true" className="fluid">
      <div className="fluid-swirl">
        <span className="fluid-bloom fluid-bloom-1" />
        <span className="fluid-bloom fluid-bloom-2" />
        <span className="fluid-bloom fluid-bloom-3" />
        <span className="fluid-bloom fluid-bloom-4" />
        <span className="fluid-bloom fluid-bloom-5" />
        <span className="fluid-bloom fluid-bloom-6" />
        <span className="fluid-bloom fluid-bloom-7" />
      </div>
    </div>
  );
}
