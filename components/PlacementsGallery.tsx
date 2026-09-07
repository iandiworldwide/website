"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface GalleryWork {
  id: number;
  image: string;
  artist: string;
  title: string;
  year: number;
  /** True pixel size, so nothing is stretched. */
  width: number;
  height: number;
}

const CAMERA_Z = 30;
const FOV = 45;
const HALF_TAN = Math.tan(((FOV / 2) * Math.PI) / 180);
const WALL_ANGLE = -0.25; // radians the wall turns away from the viewer
const GROUND = "#ffffff";
const EASE = 0.08;
const NARROW = 768;
const PER_VIEW_WIDE = 4;
const PER_VIEW_NARROW = 2.5;
// How much of its slot a work fills across, and the most of the screen's
// height it may take before it is reined in.
const FILL = 0.8;
const TALLEST = 0.85;
// The shadow each work casts, as a fraction of its own height.
const SHADOW_OFFSET = 0.045;
const SHADOW_Z = -0.5;
const SHADOW_OPACITY = 0.15;

function canUseWebGL() {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

/*
  The works hang along a wall that turns away from you, and scrolling walks
  the camera down it. The page keeps scrolling normally: the screen sticks
  while its extra height is used up, so nothing is hijacked.

  How many works are in view is the fixed thing — four on a wide screen, two
  and a half on a narrow one — and the spacing between them follows from that
  and the size of the screen, so the wall reads the same anywhere.

  Where WebGL is unavailable, or motion is unwanted, the same works fall back
  to a plain sideways row. The list is always in the document for readers,
  whichever is showing.
*/
export default function PlacementsGallery({
  works,
  title,
  intro,
  label,
  cta,
  ctaLink,
}: {
  works: GalleryWork[];
  title: string;
  intro: string;
  label: string;
  cta: string;
  ctaLink: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"row" | "wall">("row");
  const [current, setCurrent] = useState(0);

  // The row is what renders on the server. Once mounted we check whether this
  // browser can and should draw the wall, and upgrade if so. A timeout rather
  // than an animation frame, so it still runs in a tab that is not painting.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const wants =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches && canUseWebGL();
      if (wants) setMode("wall");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode !== "wall" || !stage.current || !works.length) return;

    const host = stage.current;
    let disposed = false;
    let stop = () => {};

    import("three")
      .then((THREE) => {
        if (disposed) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(GROUND);
        scene.fog = new THREE.Fog(GROUND, 20, 130);

        const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 1000);
        camera.position.set(0, 0, CAMERA_Z);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        host.appendChild(renderer.domElement);

        const wall = new THREE.Group();
        wall.rotation.y = WALL_ANGLE;
        scene.add(wall);

        // Everything is built at unit size and scaled into place, so the wall
        // can be laid out again on resize without rebuilding any geometry.
        const unit = new THREE.PlaneGeometry(1, 1);
        const unitEdges = new THREE.EdgesGeometry(unit);
        const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x1d1d1b });
        const shadowMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: SHADOW_OPACITY,
        });

        const loader = new THREE.TextureLoader();
        const disposables: { dispose: () => void }[] = [
          unit,
          unitEdges,
          outlineMaterial,
          shadowMaterial,
        ];

        const pieces = works.map((work) => {
          const texture = loader.load(work.image);
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(unit, material);
          const outline = new THREE.LineSegments(unitEdges, outlineMaterial);
          const shadow = new THREE.Mesh(unit, shadowMaterial);
          wall.add(shadow, mesh, outline);
          disposables.push(material, texture);
          return { mesh, outline, shadow, ratio: work.width / work.height };
        });

        // The two hairlines running the length of the wall, above and below.
        const railGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 1, -1),
          new THREE.Vector3(1, 1, -1),
          new THREE.Vector3(0, -1, -1),
          new THREE.Vector3(1, -1, -1),
        ]);
        const railMaterial = new THREE.LineBasicMaterial({ color: 0xdddddd });
        const rails = new THREE.LineSegments(railGeometry, railMaterial);
        wall.add(rails);
        disposables.push(railGeometry, railMaterial);

        const last = works.length - 1;

        let spacing = 1;
        let along = 0; // where the camera is along the wall
        let target = 0;
        const pointer = { x: 0, y: 0 };

        const readScroll = () => {
          const outer = sectionRef.current;
          if (!outer) return;
          const runway = outer.offsetHeight - window.innerHeight;
          if (runway <= 0) return;
          const travelled = -outer.getBoundingClientRect().top;
          const progress = Math.min(1, Math.max(0, travelled / runway));
          target = progress * last * spacing;
        };

        const layout = () => {
          const { clientWidth, clientHeight } = host;
          if (!clientWidth || !clientHeight) return;

          const aspect = clientWidth / clientHeight;
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
          renderer.setSize(clientWidth, clientHeight, false);

          // Hold the number of works in view steady; the spacing follows.
          const perView = clientWidth < NARROW ? PER_VIEW_NARROW : PER_VIEW_WIDE;
          const visibleHeight = 2 * CAMERA_Z * HALF_TAN;
          const visibleWidth = visibleHeight * aspect;
          const wasFraction = spacing > 1 ? along / spacing : 0;
          spacing = visibleWidth / perView;

          // Every work fills the width of its slot, and its own proportions
          // set how tall it stands. A very tall one is reined in to fit.
          const slot = spacing * FILL;
          const ceiling = visibleHeight * TALLEST;
          let tallest = 0;

          pieces.forEach((piece, index) => {
            let high = slot / piece.ratio;
            let wide = slot;
            if (high > ceiling) {
              high = ceiling;
              wide = ceiling * piece.ratio;
            }
            tallest = Math.max(tallest, high);

            const x = index * spacing;
            piece.mesh.scale.set(wide, high, 1);
            piece.mesh.position.set(x, 0, 0);
            piece.outline.scale.set(wide, high, 1);
            piece.outline.position.set(x, 0, 0);
            piece.shadow.scale.set(wide, high, 1);
            piece.shadow.position.set(x + high * SHADOW_OFFSET, -high * SHADOW_OFFSET, SHADOW_Z);
          });

          // A picture rail above and below, clear of the tallest work.
          rails.scale.set(works.length * spacing + spacing, tallest * 0.68, 1);
          rails.position.set(-spacing, 0, 0);

          // Sit the first work near the left edge, so the whole width is used
          // rather than starting from the middle of the screen.
          wall.position.x = -visibleWidth / 2 + spacing / 2;

          // Hold the same place on the wall across a resize.
          along = wasFraction * spacing;
          readScroll();
        };

        const onPointer = (event: MouseEvent) => {
          pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        let frame = 0;
        const tick = () => {
          frame = requestAnimationFrame(tick);
          along += (target - along) * EASE;

          camera.position.x = along * Math.cos(WALL_ANGLE);
          camera.position.z = CAMERA_Z - along * Math.sin(WALL_ANGLE);
          camera.rotation.x = pointer.y * 0.04;
          camera.rotation.y = -pointer.x * 0.04;

          const index = Math.min(last, Math.max(0, Math.round(along / spacing)));
          setCurrent((shown) => (shown === index ? shown : index));

          renderer.render(scene, camera);
        };

        const observer = new ResizeObserver(layout);
        observer.observe(host);
        layout();
        along = target;
        tick();

        window.addEventListener("scroll", readScroll, { passive: true });
        window.addEventListener("resize", readScroll, { passive: true });
        window.addEventListener("mousemove", onPointer, { passive: true });

        stop = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          window.removeEventListener("scroll", readScroll);
          window.removeEventListener("resize", readScroll);
          window.removeEventListener("mousemove", onPointer);
          disposables.forEach((item) => item.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => setMode("row"));

    return () => {
      disposed = true;
      stop();
    };
  }, [mode, works]);

  const shown = works[current];

  const wall = (
    <>
      <div ref={stage} className="gallery-stage mt-md" aria-hidden="true" />
      <p className="mt-xs px-xs text-caption md:px-md" aria-hidden="true">
        {shown ? `${shown.artist}, ${shown.title}, ${shown.year}` : ""}
      </p>
      {/* The works stay in the document for anyone who cannot see the wall. */}
      <ul aria-label={label} className="sr-only">
        {works.map((work) => (
          <li key={work.id}>{`${work.artist}, ${work.title}, ${work.year}`}</li>
        ))}
      </ul>
    </>
  );

  const row = (
    <div className="row-view mt-lg px-xs md:px-md">
      <ul aria-label={label} className="row-track">
        {works.map((work) => (
          <li key={work.id} className="group">
            <figure className="lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src={work.image}
                  alt={`${work.title} by ${work.artist}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 40vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-xs text-caption">
                {work.artist}, {work.title}, {work.year}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="placements"
      aria-labelledby="placements-preview-heading"
      className="section-track"
    >
      <div className="section-track-inner">
        <div data-reveal className="grid gap-md px-xs md:grid-cols-4 md:px-md">
          <h2 id="placements-preview-heading">{title}</h2>
          <p className="md:col-span-2">{intro}</p>
        </div>

        {mode === "wall" ? wall : row}

        <p className="mt-lg px-xs text-caption md:px-md">
          <Link href={ctaLink} className="cta">
            {cta}
          </Link>
        </p>
      </div>
    </section>
  );
}
