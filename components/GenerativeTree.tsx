"use client";

import { useEffect, useRef } from "react";

/*
  Based on "Generative Tree Animation" (CodePen). A tree grows until it
  bears fruit, drops its fruit, shrinks back, and repeats. Ported to React
  and drawn in the site's accent colours on a small fixed canvas.
*/

// Site accents: indigo branches, ash grey fruit.
const BRANCH_COLOUR = "#30396f";
const FRUIT_COLOUR = "#aec0a1";
const LOGICAL = 800; // the original draws in an 800 x 800 space
const MAX_GENERATIONS = 10;
const FLOOR_Y = 685;
const GRAVITY = 0.098;
const LOOP_DELAY = 500;

interface Branch {
  angle: number;
  angleInc: number;
  decaySpeed: number;
  diameter: number;
  distance: number;
  distanceFade: number;
  generation: number;
  growthSpeed: number;
  hadBranches: boolean;
  progress: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Fruit {
  decayFrames: number;
  decayTime: number;
  progress: number;
  speed: number;
  timeUntilFall: number;
  x: number;
  y: number;
  r: number;
  restitution: number;
  yVelocity: number;
}

const randomInt = (min: number, max: number) => min + Math.round(Math.random() * (max - min));
const endPointX = (deg: number, d: number) => Math.sin((deg * Math.PI) / 180) * d;
const endPointY = (deg: number, d: number) => Math.cos((deg * Math.PI) / 180) * d;

const trunk = (): Branch => ({
  angle: 0,
  angleInc: 20,
  decaySpeed: 0.0625,
  diameter: 10,
  distance: 120,
  distanceFade: 0.2,
  generation: 1,
  growthSpeed: 0.04,
  hadBranches: false,
  progress: 0,
  x1: 400,
  y1: 680,
  x2: 400,
  y2: 560,
});

interface GenerativeTreeProps {
  /** Rendered size in CSS pixels. */
  size?: number;
}

export default function GenerativeTree({ size = 120 }: GenerativeTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = LOGICAL * ratio;
    canvas.height = LOGICAL * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = FRUIT_COLOUR;
    ctx.strokeStyle = BRANCH_COLOUR;

    let branches: Branch[] = [];
    let fruit: Fruit[] = [];
    let decaying = false;
    let loopEnd = Date.now();
    let frame = 0;

    const allBranchesComplete = () =>
      branches.some((b) => b.progress >= 1 && b.generation === MAX_GENERATIONS);
    const allFruitComplete = () => fruit.length > 0 && fruit.every((f) => f.progress === 1);
    const allFruitFalling = () => fruit.length > 0 && fruit.every((f) => f.timeUntilFall <= 0);
    const lastGeneration = () => Math.max(...branches.map((b) => b.generation));

    const draw = () => {
      ctx.clearRect(0, 0, LOGICAL, LOGICAL);
      for (const b of branches) {
        ctx.lineWidth = b.diameter;
        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(b.x1 + (b.x2 - b.x1) * b.progress, b.y1 + (b.y2 - b.y1) * b.progress);
        ctx.stroke();
      }
      for (const f of fruit) {
        ctx.globalAlpha = f.decayTime < f.decayFrames ? f.decayTime / f.decayFrames : 1;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * f.progress, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const grow = () => {
      if (!branches.length && Date.now() - loopEnd > LOOP_DELAY) branches.push(trunk());

      if (!allBranchesComplete()) {
        const next: Branch[] = [];
        for (const b of branches) {
          if (b.progress < 1) {
            b.progress += b.growthSpeed;
            if (b.progress > 1) {
              b.progress = 1;
              if (b.generation === MAX_GENERATIONS) {
                fruit.push({
                  decayFrames: 18,
                  decayTime: 150,
                  progress: 0,
                  speed: 0.04,
                  timeUntilFall: randomInt(0, 300),
                  x: b.x2,
                  y: b.y2,
                  r: randomInt(4, 6),
                  restitution: 0.2 * (1 - b.y2 / FLOOR_Y),
                  yVelocity: 0,
                });
              }
            }
          } else if (!b.hadBranches && b.generation < MAX_GENERATIONS) {
            b.hadBranches = true;
            const lean = 5;
            const angleLeft = b.angle - (b.angleInc + randomInt(-lean, lean));
            const angleRight = b.angle + (b.angleInc + randomInt(-lean, lean));
            const distance = b.distance * (1 - b.distanceFade);
            const child = {
              angleInc: b.angleInc,
              decaySpeed: b.decaySpeed,
              diameter: Math.floor(b.diameter * 0.9),
              distance,
              distanceFade: b.distanceFade,
              generation: b.generation + 1,
              growthSpeed: b.growthSpeed,
              hadBranches: false,
              progress: 0,
              x1: b.x2,
              y1: b.y2,
            };
            next.push(
              {
                ...child,
                angle: angleLeft,
                x2: b.x2 + endPointX(angleLeft, distance),
                y2: b.y2 - endPointY(angleLeft, distance),
              },
              {
                ...child,
                angle: angleRight,
                x2: b.x2 + endPointX(angleRight, distance),
                y2: b.y2 - endPointY(angleRight, distance),
              },
            );
          }
        }
        branches.push(...next);
      }

      if (!allFruitComplete()) {
        for (const f of fruit) {
          if (f.progress < 1) f.progress = Math.min(1, f.progress + f.speed);
        }
      }

      if (allBranchesComplete() && allFruitComplete()) decaying = true;
    };

    const decay = () => {
      if (fruit.length) {
        fruit = fruit.filter((f) => f.decayTime > 0);
        for (const f of fruit) {
          if (f.timeUntilFall <= 0) {
            f.y += f.yVelocity;
            f.yVelocity += GRAVITY;
            const bottom = FLOOR_Y - f.r;
            if (f.y >= bottom) {
              f.y = bottom;
              f.yVelocity *= -f.restitution;
            }
            f.decayTime--;
          } else {
            f.timeUntilFall--;
          }
        }
      }
      if (allFruitFalling() || !fruit.length) {
        branches = branches.filter((b) => b.progress > 0);
        if (branches.length) {
          const last = lastGeneration();
          for (const b of branches) {
            if (b.generation === last) b.progress -= b.decaySpeed;
          }
        }
      }
      if (!branches.length && !fruit.length) {
        decaying = false;
        loopEnd = Date.now();
      }
    };

    const run = () => {
      draw();
      if (decaying) decay();
      else grow();
      frame = requestAnimationFrame(run);
    };
    run();

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="A small tree growing, bearing fruit, dropping it, and shrinking back, on repeat"
      style={{ width: size, height: size, bottom: "var(--header-height)" }}
      className="pointer-events-none fixed right-xs z-30 md:right-md"
    />
  );
}
