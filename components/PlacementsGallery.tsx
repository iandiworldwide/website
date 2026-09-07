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

// The wall, in world units.
const SPACING = 45; // between works
const HEIGHT = 18; // tall side of every work
const CAMERA_Z = 30;
const WALL_ANGLE = -0.25; // radians the wall turns away from the viewer
const GROUND = "#ffffff";
const EASE = 0.08;
// The shadow each work casts on the wall: down and to the right, just behind.
const SHADOW_X = 0.8;
const SHADOW_Y = -0.8;
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

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.set(0, 0, CAMERA_Z);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        host.appendChild(renderer.domElement);

        const wall = new THREE.Group();
        wall.rotation.y = WALL_ANGLE;
        scene.add(wall);

        const loader = new THREE.TextureLoader();
        const disposables: { dispose: () => void }[] = [];

        works.forEach((work, index) => {
          // Keep every work the same height and let its own proportions set
          // the width, so nothing is cropped or stretched.
          const wide = HEIGHT * (work.width / work.height);
          const geometry = new THREE.PlaneGeometry(wide, HEIGHT);

          // A shadow on the wall behind, so each work sits off it rather than
          // printed on it. Part of the scene, not the interface.
          const shadowGeometry = new THREE.PlaneGeometry(wide, HEIGHT);
          const shadowMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: SHADOW_OPACITY,
          });
          const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
          shadow.position.set(index * SPACING + SHADOW_X, SHADOW_Y, SHADOW_Z);

          const texture = loader.load(work.image);
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.MeshBasicMaterial({ map: texture });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(index * SPACING, 0, 0);

          const edges = new THREE.EdgesGeometry(geometry);
          const outline = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0x1d1d1b }),
          );
          outline.position.copy(mesh.position);

          wall.add(shadow, mesh, outline);
          disposables.push(geometry, material, texture, edges, shadowGeometry, shadowMaterial);
        });

        // The two hairlines that run the length of the wall, above and below.
        const run = works.length * SPACING;
        const railGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-SPACING, HEIGHT, -1),
          new THREE.Vector3(run, HEIGHT, -1),
          new THREE.Vector3(-SPACING, -HEIGHT, -1),
          new THREE.Vector3(run, -HEIGHT, -1),
        ]);
        const railMaterial = new THREE.LineBasicMaterial({ color: 0xdddddd });
        wall.add(new THREE.LineSegments(railGeometry, railMaterial));
        disposables.push(railGeometry, railMaterial);

        let along = 0; // where the camera is along the wall
        let target = 0;
        const pointer = { x: 0, y: 0 };
        const last = works.length - 1;

        const resize = () => {
          const { clientWidth, clientHeight } = host;
          if (!clientWidth || !clientHeight) return;
          camera.aspect = clientWidth / clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(clientWidth, clientHeight, false);
        };

        const readScroll = () => {
          const outer = sectionRef.current;
          if (!outer) return;
          const runway = outer.offsetHeight - window.innerHeight;
          if (runway <= 0) return;
          const travelled = -outer.getBoundingClientRect().top;
          const progress = Math.min(1, Math.max(0, travelled / runway));
          target = progress * last * SPACING;
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

          const index = Math.min(last, Math.max(0, Math.round(along / SPACING)));
          setCurrent((shown) => (shown === index ? shown : index));

          renderer.render(scene, camera);
        };

        const observer = new ResizeObserver(resize);
        observer.observe(host);
        resize();
        readScroll();
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
                    sizes="(min-width: 768px) 25vw, 50vw"
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
