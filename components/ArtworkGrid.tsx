import Image from "next/image";

export interface ArtworkGridItem {
  id: string | number;
  image?: string;
  alt?: string;
  caption: React.ReactNode;
}

interface ArtworkGridProps {
  items: ArtworkGridItem[];
  /** Accessible name for the grid region. */
  label: string;
}

// Edge-to-edge image grid: four columns on desktop, two on mobile.
// Column count, not a max-width container, is the responsive lever.
// Artworks are never cropped: each sits whole inside a 4:5 cell on the white
// ground. Cells rise into view as they are scrolled to, staggered across a row.
export default function ArtworkGrid({ items, label }: ArtworkGridProps) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-md md:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.id}
          data-reveal
          style={{ "--reveal-delay": `${(index % 4) * 90}ms` } as React.CSSProperties}
          className="group"
        >
          <figure className="lift">
            {/* Placeholder ground is alice blue until artwork is supplied. */}
            <div className={`relative aspect-[4/5] ${item.image ? "" : "bg-alice"}`}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-contain"
                />
              )}
            </div>
            <figcaption className="mt-xs px-xs text-caption">{item.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
