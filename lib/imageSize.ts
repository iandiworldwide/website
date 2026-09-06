import fs from "node:fs";
import path from "node:path";

export interface ImageSize {
  width: number;
  height: number;
}

// Reads the pixel dimensions of a JPEG or PNG under /public at render time,
// so images can be laid out at their true aspect ratio with no layout shift.
// Server-only: never import this from a client component.
export function getImageSize(publicPath: string): ImageSize | undefined {
  try {
    const buffer = fs.readFileSync(path.join(process.cwd(), "public", publicPath));
    return readPng(buffer) ?? readJpeg(buffer);
  } catch {
    return undefined;
  }
}

function readPng(b: Buffer): ImageSize | undefined {
  if (b.length < 24 || b.toString("ascii", 1, 4) !== "PNG") return undefined;
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

function readJpeg(b: Buffer): ImageSize | undefined {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return undefined;
  let offset = 2;
  while (offset + 9 < b.length) {
    if (b[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = b[offset + 1];
    // Start-of-frame markers carry the dimensions (C0–CF, excluding C4, C8, CC).
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) {
      return { height: b.readUInt16BE(offset + 5), width: b.readUInt16BE(offset + 7) };
    }
    const length = b.readUInt16BE(offset + 2);
    offset += 2 + length;
  }
  return undefined;
}
