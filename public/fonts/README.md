# Fonts

Both faces used by this site are licensed from ABC Dinamo and are not
committed here. Until they are, the site falls back to a free stand-in,
self-hosted by `next/font`, and needs no action.

The stylesheet deliberately declares no `@font-face` for them while the
files are missing, because a declaration pointing at a file that is not
there costs a failed request on every page load. When a file arrives, drop
it in as named below and add its declaration to the top of
`app/globals.css`:

    @font-face {
      font-family: "ABC Camera";
      src: url("/fonts/ABCCamera-Regular.woff2") format("woff2");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

## ABC Camera (headings)

Buy a webfont licence, then drop the file in as:

    public/fonts/ABCCamera-Regular.woff2

Until then, headings and the wordmark fall back to Bricolage Grotesque.

## ABC Favorit (body copy)

Buy a webfont licence, then drop the file in as:

    public/fonts/ABCFavorit-Regular.woff2

The declaration is the same as above with `"ABC Favorit"` and the Favorit
file. Until then, body copy, navigation and captions fall back to
Instrument Sans.
