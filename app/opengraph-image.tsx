import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homeContent, siteConfig } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/*
  The card shown when a page of the site is shared: the logotype, the
  headline and the address, on a still of the colour field. Drawn once at
  build time. The two typefaces are fetched from Google Fonts then; if that
  fails the card is still drawn, in the default face.
*/
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const AGENT = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0";

// Google Fonts serves a plain .woff, which the renderer can read, to an
// older browser. Returns nothing rather than throwing, so the card never
// blocks a build.
async function googleFont(family: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400`,
      { headers: { "user-agent": AGENT } },
    ).then((response) => response.text());
    const url = css.match(/url\((https:\/\/[^)]+\.woff)\)/)?.[1];
    if (!url) return undefined;
    return await fetch(url).then((response) => response.arrayBuffer());
  } catch {
    return undefined;
  }
}

export default async function Image() {
  const [display, body, logo] = await Promise.all([
    googleFont("Bricolage Grotesque"),
    googleFont("Instrument Sans"),
    readFile(join(process.cwd(), "public", "logo-iandi-worldwide.png")),
  ]);

  const fonts = [
    display && { name: "Bricolage Grotesque", data: display, weight: 400 as const, style: "normal" as const },
    body && { name: "Instrument Sans", data: body, weight: 400 as const, style: "normal" as const },
  ].filter((font) => font !== undefined);

  const displayFace = display ? "Bricolage Grotesque" : "sans-serif";
  const bodyFace = body ? "Instrument Sans" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#1d1d1b",
          backgroundColor: "#c7c5ea",
          backgroundImage: [
            "radial-gradient(circle at 12% 18%, rgba(129,109,230,0.9), rgba(129,109,230,0) 46%)",
            "radial-gradient(circle at 78% 22%, rgba(166,180,93,0.85), rgba(166,180,93,0) 42%)",
            "radial-gradient(circle at 88% 82%, rgba(158,153,231,0.95), rgba(158,153,231,0) 48%)",
            "radial-gradient(circle at 30% 90%, rgba(219,228,250,0.95), rgba(219,228,250,0) 50%)",
          ].join(", "),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          alt=""
          width={556 * 0.35}
          height={68 * 0.35}
          style={{ width: 556 * 0.35, height: 68 * 0.35 }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: displayFace,
              fontSize: 60,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              maxWidth: 980,
              textWrap: "balance",
            }}
          >
            {homeContent.headline}
          </div>
          <div
            style={{
              marginTop: 36,
              fontFamily: bodyFace,
              fontSize: 26,
              color: "#30396f",
            }}
          >
            {siteUrl.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
