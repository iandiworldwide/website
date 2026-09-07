import Image from "next/image";
import Link from "next/link";
import type { DiaryEntry } from "@/lib/content";
import { getImageSize } from "@/lib/imageSize";

interface DiaryFlowProps {
  entries: DiaryEntry[];
  label: string;
  seed: number;
  shuffle: boolean;
}

// Small seeded generator so the arrangement is stable across server and
// client renders, and only changes when the editor changes the seed.
function makeRandom(seed: number) {
  let state = (seed * 1_000_003) >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE_RANGES = {
  small: [24, 34],
  medium: [34, 50],
  large: [50, 68],
} as const;

interface Placed {
  entry: DiaryEntry;
  style: Record<string, string>;
}

// Groups entries into rows of one or two, then gives each a width and a
// horizontal offset. Every value is a percentage of the page width so the
// layout scales; mobile gets its own, larger set of values.
function place(entries: DiaryEntry[], seed: number, shuffle: boolean): Placed[][] {
  const random = makeRandom(seed);
  const list = [...entries];
  if (shuffle) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
  }

  const between = (min: number, max: number) => min + random() * (max - min);
  const gaps = ["var(--space-md)", "var(--space-lg)", "calc(var(--space-lg) * 2)", "calc(var(--space-lg) * 3)"];
  const pick = <T,>(options: readonly T[]) => options[Math.floor(random() * options.length)];

  const widthFor = (entry: DiaryEntry, fallback: keyof typeof SIZE_RANGES) => {
    const [min, max] = SIZE_RANGES[entry.size ?? fallback];
    return between(min, max);
  };

  const rows: Placed[][] = [];
  let i = 0;
  while (i < list.length) {
    const pair = i + 1 < list.length && random() < 0.45;
    if (pair) {
      const a = list[i];
      const b = list[i + 1];
      const wa = widthFor(a, "small");
      const wb = widthFor(b, "small");
      rows.push([
        {
          entry: a,
          style: {
            "--w": `${wa}%`,
            "--x": `${between(0, 8)}%`,
            "--wm": `${between(40, 48)}%`,
            "--xm": "0%",
            "--gap": pick(gaps),
            "--stagger": "0px",
          },
        },
        {
          entry: b,
          style: {
            "--w": `${wb}%`,
            "--x": `${between(0, 8)}%`,
            "--wm": `${between(40, 48)}%`,
            "--xm": "0%",
            "--gap": "0px",
            "--stagger": `calc(var(--space-lg) * ${between(0.5, 3).toFixed(2)})`,
          },
        },
      ]);
      i += 2;
    } else {
      const entry = list[i];
      const w = widthFor(entry, random() < 0.35 ? "large" : "medium");
      const wm = between(64, 100);
      rows.push([
        {
          entry,
          style: {
            "--w": `${w}%`,
            "--x": `${between(0, 100 - w)}%`,
            "--wm": `${wm}%`,
            "--xm": `${between(0, 100 - wm)}%`,
            "--gap": pick(gaps),
            "--stagger": "0px",
          },
        },
      ]);
      i += 1;
    }
  }
  return rows;
}

function DiaryImage({ entry }: { entry: DiaryEntry }) {
  const size = getImageSize(entry.image);
  const picture = size ? (
    <Image
      src={entry.image}
      alt={entry.alt}
      width={size.width}
      height={size.height}
      sizes="(min-width: 768px) 60vw, 100vw"
      className="h-auto w-full"
    />
  ) : (
    <div className="relative aspect-[4/5] bg-alice">
      <Image src={entry.image} alt={entry.alt} fill sizes="60vw" className="object-contain" />
    </div>
  );

  const body = (
    <figure className="dim">
      {picture}
      {entry.caption && <figcaption className="mt-xs">{entry.caption}</figcaption>}
    </figure>
  );

  if (!entry.link) return body;
  const external = /^https?:\/\//.test(entry.link);
  return external ? (
    <a href={entry.link} target="_blank" rel="noopener noreferrer" className="block">
      {body}
    </a>
  ) : (
    <Link href={entry.link} className="block">
      {body}
    </Link>
  );
}

export default function DiaryFlow({ entries, label, seed, shuffle }: DiaryFlowProps) {
  const rows = place(entries, seed, shuffle);

  return (
    <ul aria-label={label}>
      {rows.map((row, index) => (
        <li
          key={index}
          data-reveal
          style={row[0].style as React.CSSProperties}
          className={`mt-(--gap) ${row.length === 2 ? "flex items-start justify-between" : ""}`}
        >
          {row.length === 1 ? (
            <div className="w-(--wm) ml-(--xm) md:w-(--w) md:ml-(--x)">
              <DiaryImage entry={row[0].entry} />
            </div>
          ) : (
            row.map((item, position) => (
              <div
                key={item.entry.image}
                style={item.style as React.CSSProperties}
                className={`w-(--wm) md:w-(--w) md:mt-(--stagger) ${position === 0 ? "md:ml-(--x)" : "md:mr-(--x)"}`}
              >
                <DiaryImage entry={item.entry} />
              </div>
            ))
          )}
        </li>
      ))}
    </ul>
  );
}
