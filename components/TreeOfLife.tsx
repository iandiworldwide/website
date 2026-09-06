"use client";

import { useEffect, useRef } from "react";

/*
  "infinite tree of life" by Lucian, https://codepen.io/Codemyjam/pen/GQoLLQ
  MIT License, Copyright (c) 2026 Lucian. Ported to React and recoloured.

  Draws a recursive, slowly wandering tree on a fixed full-screen canvas
  behind the page content. Follows the mouse on desktop; drifts on its own
  otherwise. Respects prefers-reduced-motion by not animating at all.

  The canvas sits at z-index 0, so wrap the page content in an element
  with `relative z-10` to keep it above the drawing.
*/

// Palette: the site accents, drawn translucent so the white ground still
// dominates. Branches are pale slate, fading toward alice blue with depth;
// leaves cycle through ash grey, twilight indigo and alice blue.
const BRANCH_RGB = "167, 168, 179"; // pale slate
const BRANCH_ALPHA_NEAR = 0.55;
const BRANCH_ALPHA_FAR = 0.12;
const LEAF_RGB = ["174, 192, 161", "48, 57, 111", "226, 239, 254"]; // ash, indigo, alice
const LEAF_ALPHA = 0.26;
const CANVAS_OPACITY = 1;

// Tree shape, from the original.
const MAX_LEVELS = 6;
const BRANCH_LENGTH = 16;
const LEAF_SIZE = 14;
const GROW_SPEED = 2;
const MAX_ANGLE = 1.2;
const FREQ = 0.3;

class Point {
  scale = 0;
  xp = 0;
  yp = 0;
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}
  project(width: number, height: number) {
    this.scale = 265 / (265 + this.z);
    this.xp = (this.x - width * 0.5) * this.scale;
    this.yp = (this.y - height * 0.5) * this.scale;
  }
}

class Branch {
  branches: Branch[] = [];
  p0: Point;
  p1: Point;
  life = 0;
  angle = 0;
  vx = 0;
  vy = 0;
  constructor(
    public parent: Branch | null,
    public level: number,
    public hue: number,
    x: number,
    y: number,
    isRootChild: boolean,
  ) {
    this.p0 = parent ? parent.p1 : new Point(x, y, 0);
    const z = parent && !isRootChild ? parent.p1.z + (level ? Math.random() * 10 - 5 : 0) : 0;
    this.p1 = new Point(x, y, z);
  }
}

export default function TreeOfLife() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let scale = 1;
    let root: Branch | null = null;
    let hue = 0;
    let automove = true;
    let angleX = 0;
    let angleY = 0;
    let frame = 0;

    const pointer = { x: 0, y: 0, px: 0, py: 0, moveDistance: 0 };

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      centerX = width * 0.5;
      centerY = height * 0.5;
      scale = Math.max(width, height) / 1440;
    };

    const newBranch = (parent: Branch): Branch => {
      const branch = new Branch(parent, parent.level - 1, hue, parent.p1.x, parent.p1.y, false);
      branch.angle =
        Math.atan2(parent.p1.y - parent.p0.y, parent.p1.x - parent.p0.x) +
        (branch.level ? Math.random() * MAX_ANGLE - MAX_ANGLE * 0.5 : 0);
      branch.vx = Math.cos(branch.angle) * GROW_SPEED;
      branch.vy = Math.sin(branch.angle) * GROW_SPEED;
      branch.life = branch.level
        ? Math.round(scale * Math.random() * branch.level * BRANCH_LENGTH) + 1
        : 2;
      return branch;
    };

    const draw = (b: Branch) => {
      const w = b.level === 1 ? 1 : (b.level + 1) * (b.level + 1) * 0.5 * b.p1.scale * scale;
      const depth = Math.min(1, Math.abs(b.p0.z) / 250);
      const alpha = BRANCH_ALPHA_NEAR + (BRANCH_ALPHA_FAR - BRANCH_ALPHA_NEAR) * depth;
      const leaf = LEAF_RGB[Math.floor(b.hue / 40) % LEAF_RGB.length];
      ctx.lineWidth = b.level ? w : w * LEAF_SIZE;
      ctx.strokeStyle = b.level
        ? `rgba(${BRANCH_RGB}, ${alpha.toFixed(3)})`
        : `rgba(${leaf}, ${LEAF_ALPHA})`;
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.moveTo(centerX + b.p0.xp, centerY + b.p0.yp);
      ctx.lineTo(centerX + b.p1.xp, centerY + b.p1.yp);
      ctx.stroke();
    };

    const grow = (b: Branch) => {
      b.p1.z--;
      b.p1.project(width, height);
      for (const child of b.branches) {
        grow(child);
        draw(child);
      }
      if (b.life-- > 1) {
        b.p1.x += b.vx;
        b.p1.y += b.vy;
      }
      if (b.life === 1 && b.level > 0) {
        b.branches.push(newBranch(b));
        b.branches.push(newBranch(b));
        if (Math.random() <= FREQ) b.branches.push(newBranch(b));
        b.life--;
      }
      if (b.p0.z <= -250) b.parent = null;
    };

    const tree = () => {
      ctx.clearRect(0, 0, width, height);
      if (root && pointer.moveDistance > 20) {
        pointer.moveDistance = 0;
        const branch = new Branch(root, root.level, hue, root.p1.x, root.p1.y, true);
        if (Math.random() <= FREQ) root.branches.push(newBranch(root));
        root = branch;
        root.p1.x = pointer.x;
        root.p1.y = pointer.y;
      }
      hue++;
      let trunk: Branch | null = root;
      while (trunk) {
        grow(trunk);
        draw(trunk);
        trunk = trunk.parent;
      }
    };

    const distance = () => {
      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      pointer.moveDistance += Math.sqrt(dx * dx + dy * dy);
      if (!automove && pointer.moveDistance > 40) {
        pointer.x = pointer.px + dx * 0.1;
        pointer.y = pointer.py + dy * 0.1;
      }
      pointer.px = pointer.x;
      pointer.py = pointer.y;
    };

    const onMove = (e: MouseEvent) => {
      automove = false;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      distance();
      frame = requestAnimationFrame(tree);
    };

    const auto = () => {
      if (automove) frame = requestAnimationFrame(auto);
      pointer.x = centerX + centerX * Math.cos((angleX += 0.02)) * 0.2;
      pointer.y = centerY + centerY * Math.sin((angleY += 0.04)) * 0.25;
      distance();
      if (!root) {
        root = new Branch(null, MAX_LEVELS, hue, pointer.x, pointer.y, false);
        root.p0 = root.p1;
        root.p0.project(width, height);
      }
      tree();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    auto();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ opacity: CANVAS_OPACITY }}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
