# I&I Worldwide

The website of I&I Worldwide, an independent art advisory. One scrolling home
page, with Placements, Visual Diary and Notes as pages of their own, and a
contact form at the foot of every page.

Live at https://iandi-gamma.vercel.app

## Editing the site

Every word and every image is editable without touching code.

1. Sign in at https://app.pagescms.org with GitHub.
2. Open the repository **iandiworldwide/website**.
3. Edit, then press Save.

Each save is a commit to the `main` branch. Vercel watches the branch and
deploys every commit, so a change is live about a minute after saving.

The forms are described in `.pages.yml`. The words live as JSON in `content/`
and the images under `public/`. Both can also be edited directly in the
repository if you prefer.

## The asset generator

`/asset-generator.html` makes social, email and presentation assets on the
site's own colour field, with the logotype and mark, as stills or short
videos. It is unlisted: nothing on the site links to it.

## Search engines

Every page carries a title, a description, a canonical address and a social
card; `/robots.txt` and `/sitemap.xml` are generated from the content, and
structured data describes the practice, the founder, the Notes and the
placed works. The card image is `app/opengraph-image.tsx`, drawn at build
time on the colour field.

All absolute addresses come from `lib/site-url.ts`: the "Site address" in
the CMS if set, otherwise the domain Vercel serves production from. The
custom domain, iandiworldwide.org, currently points at an older Netlify
site. Once it is attached to this Vercel project every address updates by
itself; nothing needs editing.

## Fonts

The two licensed faces, ABC Camera and ABC Favorit, are not in the
repository. See `public/fonts/README.md` for where to put the files once
licensed. Until then the site uses free stand-ins.

## Working on the code

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The site is Next.js with Tailwind, and the
design system is described in `DESIGN.md`.

To publish, push to `main`. Vercel builds and deploys it.
