---
version: alpha
name: CO,MA
description: A minimal, editorial art-and-design studio site built on a stark black-and-white canvas, letting a single serif-leaning display face carry all typographic weight while a sticky, borderless header and fixed footer keep navigation quiet and out of the way of the work.
colors:
  primary: "#1D1D1B"
  surface: "#FFFFFF"
typography:
  body:
    fontFamily: Editorial New Regular
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: normal
  nav-link:
    fontFamily: Editorial New Regular
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: normal
  heading:
    fontFamily: Editorial New Regular
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: normal
spacing:
  xs: 14.4px
  sm: 18.72px
  md: 28.8px
  lg: 43.2px
  header-height: 63px
components:
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    height: 63px
    borderColor: "{colors.primary}"
    borderWidth: 0px
    position: sticky
  footer:
    textColor: "{colors.primary}"
    height: 63px
    borderColor: "{colors.primary}"
    borderWidth: 0px
    position: fixed
    columns: "2"
  nav-link:
    textColor: "{colors.primary}"
    typography: "{typography.nav-link}"
  link:
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  heading:
    textColor: "{colors.primary}"
    typography: "{typography.heading}"
---

# CO,MA

## Overview

CO,MA is the digital front for a curatorial/art-studio practice, and the site is built like an exhibition catalogue rather than a conventional web app: a stark white canvas, a single oversized hand-lettered wordmark, and an edge-to-edge photo grid do almost all of the communicating. There is no chrome to speak of — no shadows, no borders, no rounded corners, no secondary color — so every ounce of visual hierarchy comes from scale contrast (the giant script logotype versus small-caps serif captions) and from the photography itself, whose gallery-lit gradients supply the only sense of depth on the page.

Density is deliberately loose at the macro level (a four-column grid with generous top/bottom whitespace) but tight at the micro level: body text, navigation labels, and headings all share one 14.4px / 400-weight typographic setting, so the system carries no internal type scale. This is a one-voice interface — it doesn't differentiate UI text by size or weight, only by position and context (nav bar vs. caption vs. footer link).

Structurally, the header is sticky and the footer is fixed, both pinned at an identical 63px ({spacing.header-height}), bookending the scrolling image grid without ever interrupting it with a rule, shadow, or background change.

**Key Characteristics:**
- Two-color system only: {colors.primary} (#1D1D1B) for all text/ink, {colors.surface} (#FFFFFF) for all ground — no accent, no gradients.
- Single font family, single weight: Editorial New Regular at 400 used for body, nav-link, and heading tokens alike.
- Zero elevation: no shadow or border tokens exist anywhere in the system.
- Zero border-radius tokens: every rectangle is hard-edged; the only curvilinear shape is the hand-lettered logo artwork.
- Header and footer are both exactly {spacing.header-height} (63px) tall, borderless, and non-opaque/backdrop-free.
- Spacing scale is a tight arithmetic progression off a ~14.4px base ({spacing.xs} → {spacing.lg}).
- Hierarchy is carried entirely by layout scale (logo size, grid density, whitespace) rather than by typographic or chromatic variation.

## Colors

The palette is intentionally binary — one ink, one ground, no accent color and no gradients anywhere in the captured evidence.

### Ink & Surface
- **Ink Black** ({colors.primary} — #1D1D1B): the only text/foreground color in the system. Applied to body copy, nav links, headings, footer text, and all border-color fields (even though those borders render at 0px width — see Elevation).
- **Gallery White** ({colors.surface} — #FFFFFF): the only surface color. Used as the page background and the navbar background; the footer renders with a transparent background (`rgba(0,0,0,0)`), letting the page's white ground show through rather than defining its own surface token.

### Accents (I&I addition)
Four accent colours sit alongside the ink and surface. They are used lightly and never for body copy:

| Token | Hex | Use |
|---|---|---|
| Twilight Indigo | #30396F | Link and button hover, current-page and active-filter rule, focus rings, corner tree branches |
| Ash Grey | #AEC0A1 | Tree leaves and fruit |
| Pale Slate | #A7A8B3 | Input hairlines, placeholder text, secondary caption lines |
| Alice Blue | #E2EFFE | Placeholder image grounds, text selection |

### Gradients
None. No gradient values were observed anywhere on the page — all color transitions visible in the screenshots belong to the photographic content, not to UI treatment.

### Dark Mode
No dark-mode block exists in the tokens, and no evidence of a theme toggle or `prefers-color-scheme` override was captured. Treat this as a single, permanently light system — do not introduce a dark surface variant without new evidence.

## Typography

### Font Family
- **Editorial New Regular** — the sole typeface in the system, carrying body copy, navigation labels, and headings alike ({typography.body}, {typography.nav-link}, {typography.heading}). It is a serif-leaning editorial display face, used here in small-caps-style navigation and caption-sized running text, which reads as art-catalogue typesetting rather than app UI.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| {typography.body} | 14.4px | 400 | 1.4 | normal | Captions, running copy, footer text |
| {typography.nav-link} | 14.4px | 400 | 1.4 | normal | Header navigation labels |
| {typography.heading} | 14.4px | 400 | 1.4 | normal | Section/heading text (h3/h4-level) |

### Heading face (I&I addition)
Headings use **ABC Camera** (ABC Dinamo, licensed) at 400, one step up from the body size, in Ink Black. Body copy, nav links and captions stay at 14.4px in the body serif. Two heading sizes only:

| Role | Size |
|---|---|
| h1 | clamp(1.625rem, 3vw, 2.25rem) |
| h2 | clamp(1rem, 1.3vw, 1.25rem) |
| h3–h6, body, nav, captions | 14.4px |
| Wordmark | clamp(1.25rem, 1.8vw, 1.5rem) at 700 |

The wordmark is pinned top left inside the sticky header on every page, and is the one place a weight other than 400 is used, because a logotype is artwork rather than UI text.

Until ABC Camera is licensed, headings and the wordmark fall back to **Bricolage Grotesque**, a free grotesque with ink traps that echo ABC Camera's light traps. See `public/fonts/README.md`.

### Motion (I&I addition)
Motion is slow, small and optional. Sections and grid cells rise 14px into place as they enter the viewport, staggered across a row. Nav links and filters draw an indigo rule in from the left on hover. Calls to action carry an arrow that steps forward. Artwork lifts 5px under the pointer, with no shadow and no crop. Every animation is disabled under `prefers-reduced-motion`, and nothing is hidden without JavaScript.

### Principles
- **One size, one weight, everywhere.** All three typographic roles resolve to the identical 14.4px/400/1.4 setting — this system does not use size or weight to build hierarchy; that job is delegated entirely to the oversized logo artwork and the image grid's layout scale.
- **Weight 400 is the only cut in use.** No 500, 600, or 700 weights appear in the evidence; do not introduce bold or semibold text into this system.
- **Letter-spacing is left at `normal` across the board** — the small-caps/condensed feel of the nav comes from the typeface's native design, not from applied tracking. Don't add manual letter-spacing to simulate it.
- **Line-height is uniformly tight** at 1.4, consistent with caption-style editorial setting rather than long-form reading copy.

### Note on Font Substitutes
Editorial New is a commercial/proprietary typeface. For open-source rebuilds, pair it with **Fraunces** or **Canela**-style alternatives set at a light-to-regular weight, or fall back to **PT Serif**/**Noto Serif** tuned with slightly tightened line-height (~1.3–1.4) to approximate the compact, catalogue-like rhythm.

## Layout

### Spacing System
The scale is built off a ~14.4px base unit: {spacing.xs} (14.4px), {spacing.sm} (18.72px), {spacing.md} (28.8px), {spacing.lg} (43.2px), and a distinct {spacing.header-height} (63px) reserved specifically for the header/footer bars. {spacing.md} (28.8px, exactly 2× the base) is the dominant rhythm value observed across the page — use it as the default gap between grid cells and content blocks; reserve {spacing.lg} (43.2px, 3× base) for section-level separation and {spacing.xs}/{spacing.sm} for tight caption spacing.

### Grid & Container
Desktop renders a four-column, edge-to-edge image grid with no visible container gutters — images run flush to the viewport edge, and the navbar spans full width with labels justified left / center / right. Captions (artist, title, year) sit directly beneath the lead image in {typography.body}-sized serif type. Mobile collapses this to a two-column grid, so the column count — not a max-width container — is the primary responsive lever in this system.

### Whitespace Philosophy
Whitespace is generous at the macro scale (large top/bottom margins framing the grid, no visual clutter around the header/footer) but compact at the micro scale (14.4px line-height and caption spacing). The effect is deliberate: whitespace frames the artwork like gallery matting, while the UI itself stays visually silent.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border, no background differentiation | Entire interface — navbar, footer, grid, captions |

**Shadow philosophy.** CO,MA has no elevation system at all — no shadow tokens, no border-width tokens beyond 0px, and no layered surfaces were captured anywhere on the page. Depth reads exclusively from the photographic content (the moody, low-lit gallery shots that fade to black or white at their edges), never from UI chrome. Don't add drop shadows, card borders, or hover-elevation effects; any perceived depth must come from the imagery, not the interface.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| — | none observed | No border-radius tokens exist in this system |

Geometry throughout is hard-edged: the image grid is composed of strict rectangles with square corners, and the navbar/footer bars carry no rounding. The single curvilinear element on the page is the hand-lettered **CO,MA** logotype itself — a script-style artwork/image asset, not a UI shape — so it should be treated as content, not as evidence for rounded UI geometry. There is no pill or circular component usage anywhere in the captured evidence; buttons, links, and containers all remain rectangular.

## Components

### Navigation
- **`navbar`** — full-width bar, {components.navbar.height} (63px) tall, background {components.navbar.backgroundColor} (#FFFFFF), text {components.navbar.textColor} (#1D1D1B), `position: sticky`, `border-width: 0px` (no hairline rule at all), no backdrop blur. It holds 5 nav links total, justified left/center/right per the layout evidence, and carries no CTA button — navigation here is pure text, no button-styled entry point.
- **`nav-link`** — set in {typography.nav-link} (Editorial New Regular, 14.4px/400/1.4), color {components.nav-link.textColor} (#1D1D1B). On mobile the same 5 links reflow into a top pair plus a bottom row rather than collapsing into a hamburger menu, preserving the borderless, all-text nav pattern at both breakpoints.

### Footer
- **`footer`** — {components.footer.height} (63px) tall, `position: fixed` to the viewport, background is transparent (`rgba(0,0,0,0)`) rather than {colors.surface}, text {components.footer.textColor} (#1D1D1B), `border-width: 0px`. Laid out in {components.footer.columns} (2) columns holding 2 links total — a minimal legal/utility footer rather than a multi-column sitemap. No CTA button, no background fill of its own; it visually merges with the page ground beneath the fixed image grid.

### Text & Content Components
- **`heading`** — {typography.heading}, color {components.heading.textColor} (#1D1D1B). Despite the name, it shares the exact same 14.4px/400 setting as body and nav text — headings in this system are distinguished by placement (e.g., above captions) rather than by size or weight.
- **`link`** — inline text links use {typography.body} at {components.link.textColor} (#1D1D1B), matching running copy exactly; there is no distinct visited/hover color captured in the evidence.

No card, table, badge, chip, or form-input components appear in the token set or evidence — the site's UI surface is limited to navigation chrome, footer chrome, and typographic content laid over the image grid.

## Do's and Don'ts

### Do
- Do set all text — body, nav, and headings — in **Editorial New Regular** at {typography.body}'s 400 weight; it is the only family and only weight in the system.
- Do keep {colors.primary} (#1D1D1B) as the sole ink color and {colors.surface} (#FFFFFF) as the sole ground; don't introduce a third color.
- Do keep the header and footer at exactly {spacing.header-height} (63px), matching the measured `navbar.height` and `footer.height`.
- Do leave `border-width` at 0px on the navbar and footer — the flat, hairline-free chrome is the point, not an omission.
- Do build spacing off the {spacing.xs}–{spacing.lg} scale (14.4px–43.2px), favoring {spacing.md} (28.8px) as the default rhythm.
- Do let the image grid carry visual depth; keep the header/footer visually silent against it.

### Don't
- Don't add drop shadows or elevation layers anywhere — no shadow tokens exist, and none should be introduced.
- Don't add a second typeface or a heavier/lighter weight than the observed 400 — no 500, 600, or 700 cuts appear in the evidence.
- Don't round any corners on grid images, buttons, or containers; the system has zero border-radius tokens.
- Don't give the navbar or footer a background other than {colors.surface} (or transparent, for the footer) — don't add a filled or tinted bar.
- Don't add a CTA button to the header; `hasCtaButton` is false and none appears in the evidence.
- Don't apply letter-spacing tricks to fake small-caps in the nav — the typeface's `letterSpacing: normal` is intentional.

## Responsive Behavior

This analysis is based on two captured viewports (desktop and mobile) and describes only what those two states show. On desktop, the image grid runs four columns wide, edge-to-edge, with the navbar's five links justified across the full width (left/center/right groupings) and captions sitting under the lead image. On mobile, the grid collapses to two columns and the same five nav links reflow into a top pair plus a bottom row rather than hiding behind a hamburger — the header remains borderless and un-backgrounded at both sizes, and the logo shrinks to fit the narrower viewport while whitespace above/below stays generous.

No intermediate breakpoints (tablet, etc.) were captured, so behavior between the two observed viewports cannot be verified — treat the two-column/four-column split as the only confirmed responsive rule. Touch-target sizing cannot be independently assessed since no explicit tap-target dimensions were captured beyond the 63px header/footer bar height, which comfortably exceeds standard minimum touch targets.

## Iteration Guide

1. Never introduce a second color — every new surface must resolve to {colors.primary} or {colors.surface}; if a new state (hover, active) is needed, express it through opacity or layout shift, not a new hex value.
2. Never introduce a new font family or weight — all new text components must reference {typography.body}, {typography.nav-link}, or {typography.heading}, all of which resolve to Editorial New Regular at 400.
3. Do not add shadow or border-radius tokens to satisfy a component's need for depth or softness — this system's identity is its flatness and hard edges; route depth needs into photographic content instead.
4. Keep {components.navbar} and {components.footer} at the fixed {spacing.header-height} (63px) and borderless (`border-width: 0px`) — any redesign that adds a hairline or shadow to these bars breaks the system's core

## Known Gaps

- Only one page (the homepage) was captured; interior/gallery-detail pages, if they exist, were not analyzed and may introduce components (e.g., project detail layouts, forms) not represented in these tokens.
- No hover, focus, or active states were captured for nav links, footer links, or the image grid — all interactive-state styling is unverified.
- No border-radius or shadow values were found at all; this is reported as the flat/hard-edged strategy, but it cannot be fully ruled out that an untested state (e.g., a modal or lightbox on image click) introduces elevation.
- The footer's transparent background (`rgba(0,0,0,0)`) versus the navbar's explicit white background is a real discrepancy in the evidence — it's reported as-is, but the intent (transparent by design vs. an unset value) could not be confirmed.
- No animation, transition, or scroll-triggered behavior could be assessed from static screenshots.
- Only two viewports (desktop and mobile) were captured, so tablet-range and fine-grained breakpoint behavior is unverified.
- No form, table, or badge components appear anywhere in the evidence — it's unclear whether such components exist elsewhere on the site (e.g., a contact form) and simply weren't captured, or whether they don't exist at all.
