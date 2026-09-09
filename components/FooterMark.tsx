"use client";

import { useEffect, useRef } from "react";

/*
  The mark at the foot of every page, and what the pointer does to it.

  The mark is already a wobbled shape. Resting the pointer on it pushes that
  wobble further: an SVG displacement filter bends the mark along a field of
  noise, and the noise slides with the pointer, so the bends follow the hand.
  Moving quickly bends it more; holding still lets it settle to a gentle
  ripple; leaving lets it ease back to its own shape. Everything is eased
  frame by frame so it never snaps. The filter is only attached while it is
  doing something, so the mark costs nothing at rest.

  The mark is drawn as inline SVG: a rectangle of the current colour, cut to
  the shape of the mark by its picture, with the filter on the group around
  it. A CSS-masked element under a CSS filter is rasterised coarsely by the
  browser and comes out blurred even before it bends; SVG's own mask and
  filter stay sharp. Colour comes from the CSS `color`, so the drift through
  the palette is the same as the logotype's.

  Mouse only: a touch has no hover. Nothing happens under
  prefers-reduced-motion, or in a browser without SVG filters, where the
  mark simply stays as it is.
*/

const FILTER_ID = "footer-mark-wobble";
const SHAPE_ID = "footer-mark-shape";

// The picture's own size; every filter value below is in these units, so
// the bends scale with the mark however large it is drawn.
const WIDTH = 1088;
const HEIGHT = 947;

// How far the mark bends at rest under the pointer, and at most, in screen
// pixels. Small: the shape should read as itself, gently pushed.
const REST_BEND = 7;
const MAX_BEND = 15;
// How far the noise slides, in screen pixels, for each pixel the pointer is
// off centre.
const FOLLOW = 0.7;
// Easing per frame. Smaller is smoother and slower.
const EASE = 0.085;
const SETTLED = 0.05;

export default function FooterMark() {
  const frame = useRef<HTMLDivElement>(null);
  const group = useRef<SVGGElement>(null);
  const offset = useRef<SVGFEOffsetElement>(null);
  const displace = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    const el = frame.current;
    const bent = group.current;
    const shift = offset.current;
    const map = displace.current;
    if (!el || !bent || !shift || !map) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Where we are and where the pointer says we should be, in screen pixels.
    const target = { bend: 0, x: 0, y: 0, tiltX: 0, tiltY: 0 };
    const shown = { bend: 0, x: 0, y: 0, tiltX: 0, tiltY: 0 };
    let raf = 0;
    let last = { x: 0, y: 0, at: 0 };
    let over = false;
    // Picture units per screen pixel, read when the pointer arrives.
    let unit = 1;

    const paint = () => {
      const active = shown.bend > SETTLED;
      if (active) bent.setAttribute("filter", `url(#${FILTER_ID})`);
      else bent.removeAttribute("filter");
      el.style.transform = active
        ? `translate(${shown.tiltX.toFixed(2)}px, ${shown.tiltY.toFixed(2)}px) rotate(${(shown.tiltX * 0.5).toFixed(2)}deg)`
        : "";
      map.setAttribute("scale", (shown.bend * unit).toFixed(1));
      shift.setAttribute("dx", (shown.x * unit).toFixed(0));
      shift.setAttribute("dy", (shown.y * unit).toFixed(0));
    };

    const tick = () => {
      let moving = false;
      for (const key of Object.keys(shown) as (keyof typeof shown)[]) {
        shown[key] += (target[key] - shown[key]) * EASE;
        if (Math.abs(target[key] - shown[key]) > SETTLED) moving = true;
        else shown[key] = target[key];
      }
      paint();
      // A held pointer eases the bend back to its resting ripple.
      if (over && target.bend > REST_BEND) {
        target.bend += (REST_BEND - target.bend) * 0.04;
        moving = true;
      }
      raf = moving ? window.requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      unit = WIDTH / rect.width;
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      const now = event.timeStamp;
      const dt = Math.max(1, now - last.at);
      const speed = Math.hypot(x - last.x, y - last.y) / dt; // px per ms
      last = { x, y, at: now };

      over = true;
      target.x = x * FOLLOW;
      target.y = y * FOLLOW;
      target.tiltX = x * 0.035;
      target.tiltY = y * 0.035;
      // Quick movement bends it more, up to a limit; never less than the rest.
      target.bend = Math.min(MAX_BEND, Math.max(REST_BEND, target.bend + speed * 6));
      wake();
    };

    const onLeave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      over = false;
      target.bend = 0;
      target.tiltX = 0;
      target.tiltY = 0;
      wake();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      bent.removeAttribute("filter");
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={frame} aria-hidden="true" className="footer-mark-frame">
      <svg className="footer-mark" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} focusable="false">
        <defs>
          {/* The picture cuts the shape: where it has ink, the colour shows. */}
          <mask
            id={SHAPE_ID}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={WIDTH}
            height={HEIGHT}
            style={{ maskType: "alpha" }}
          >
            <image href="/logo-mark.png" width={WIDTH} height={HEIGHT} />
          </mask>

          {/* The field the mark bends along. It fills a region twice the
              mark's size, so the noise can slide a long way without running
              out. One low octave, so the bends are long and smooth like
              something liquid rather than crinkled. The noise is made fully
              opaque first: its own alpha varies too, and a displacement map
              reads through that, which turns a gentle field into a violent
              one. After the bend, a touch of blur and a firm alpha curve
              smooth the stepped edge the bend leaves behind. */}
          <filter
            id={FILTER_ID}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves="1" seed="7" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 1"
              result="opaque"
            />
            <feGaussianBlur in="opaque" stdDeviation="8" result="soft" />
            <feOffset ref={offset} in="soft" dx="0" dy="0" result="field" />
            <feDisplacementMap
              ref={displace}
              in="SourceGraphic"
              in2="field"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="bent"
            />
            <feGaussianBlur in="bent" stdDeviation="2.2" result="eased" />
            <feComponentTransfer in="eased">
              <feFuncA type="linear" slope="2.6" intercept="-0.8" />
            </feComponentTransfer>
          </filter>
        </defs>

        <g ref={group}>
          <rect width={WIDTH} height={HEIGHT} fill="currentColor" mask={`url(#${SHAPE_ID})`} />
        </g>
      </svg>
    </div>
  );
}
