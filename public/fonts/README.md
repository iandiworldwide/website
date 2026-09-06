# Fonts

Both display faces used by this site are licensed and are not committed here.

## ABC Camera (headings)

Buy a webfont licence from ABC Dinamo, then drop the file in as:

    public/fonts/ABCCamera-Regular.woff2

It is picked up automatically. Until then, headings and the wordmark fall back to
Bricolage Grotesque, which is self-hosted by `next/font` and needs no action.

## Editorial New (body copy)

The body face is handled the same way, but is not yet wired up. Once
licensed, add the woff2 here and add a matching `@font-face` block to
`app/globals.css` alongside the ABC Camera one. Body copy currently
falls back to Fraunces.
