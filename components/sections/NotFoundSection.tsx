import Link from "next/link";
import MarkFlicker from "@/components/MarkFlicker";
import { notFoundContent, notFoundSong } from "@/lib/content";

// Break a line around the words that flicker, so they can be picked out.
function around(text: string, highlight: string) {
  const at = text.indexOf(highlight);
  if (at < 0) return null;
  return { before: text.slice(0, at), after: text.slice(at + highlight.length) };
}

/*
  What a wrong address gets: Bob Marley taking the news well, and the usual
  apology beneath him. "I and I" in the answering line flickers through the
  same variations as the opening screen, since it is the house name turning
  up in the song.
*/
export default function NotFoundSection() {
  return (
    <section id="not-found" className="section-full px-xs md:px-md">
      {/* Stacked on a phone, song then apology; side by side from tablet up. */}
      <div data-reveal className="grid gap-lg md:grid-cols-2 md:items-start">
        <blockquote>
          {notFoundSong.lines.map((line, index) => {
            const parts = line.highlight ? around(line.text, line.highlight) : null;
            return (
              <p key={index} className="lyric-line">
                {parts && line.highlight ? (
                  <>
                    {parts.before}
                    <MarkFlicker>{line.highlight}</MarkFlicker>
                    {parts.after}
                  </>
                ) : (
                  line.text
                )}
              </p>
            );
          })}
          <footer className="mt-lg text-caption">{notFoundSong.credit}</footer>
        </blockquote>

        {/* The apology: after the song on a phone, beside it on a desktop. */}
        <div>
          <p className="text-caption">{notFoundContent.code}</p>
          <h1 className="mt-sm">{notFoundContent.title}</h1>
          <p className="mt-md max-w-[40ch]">{notFoundContent.lede}</p>
          <p className="mt-md">
            <Link href="/" className="link-sweep">
              {notFoundContent.homeLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
