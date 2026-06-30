# Design handoff — Veronica Agudelo personal site

This is a working Next.js personal site. It is **content-complete and the visual
identity is set.** I am handing it to you for one purpose only: to **add hand-drawn
sketches and tasteful dynamic/interactive touches, and to suggest better layouts**
for placing them. Please read the constraints carefully — there is a lot you should
**not** touch.

---

## 1. What this site is

A personal site for Veronica Agudelo — junior at Columbia, early-stage investor,
writer, and builder. It is intentionally quiet, editorial, and warm, modeled on
the feel of **[Atlas Discovery](https://atlasdiscovery.bio/)**: a clean, centered
reading column, generous whitespace, a single serif typeface, hairline dividers,
and almost no chrome.

The signature motifs are:
- A small **Voyager Golden Record** image that **spins slowly** in the top-left of
  the nav (it links home).
- A warm off-white "parchment-adjacent" palette with near-black ink and sepia accents.
- A love of **da Vinci and Jean Cocteau line drawings** (provided as image assets),
  which Veronica wants woven back into the site.

---

## 2. Tech & where everything lives

- **Framework:** Next.js (App Router) + TypeScript. Plain CSS (no Tailwind).
- **Run it:** `npm install` then `npm run dev` (localhost:3000). `npm run build` to verify.
- **All design tokens / global CSS:** `src/app/globals.css`
- **All copy/config:** `src/content/site.ts` (nav, hero bio, "Now"/"Elsewhere"
  rows, experience entries, etc.)
- **Long-form text (Markdown):** `content/about.md`, `content/readings.md`,
  `content/whel.md`, and `content/posts/*.md` (essay preview metadata).
- **Components:** `src/components/` (Nav, Article, GoldenRecord, LocalMaximaSketch,
  MountainGallery, Reveal, Sketch, SideSketch, Sparkle, Starfield).
- **Image assets:** `public/` — `golden-record.png` (nav), `sketches/` (the five
  line drawings, see §6), `mountains/` (1–4.jpg, About page photos).

---

## 3. The pages (paste screenshots under each)

> I could not auto-capture screenshots from my environment. Veronica: please paste
> a screenshot of each page in the spots marked below so the layouts are visible.

**Home — `/`** — `[ paste screenshot ]`
Centered: name, a short bio paragraph (left-aligned in a centered column), then two
hairline "labeled rows" — **Now** (current roles) and **Elsewhere** (LinkedIn ·
Substack · Email). Navigation lives in the top menu.

**Experience — `/experience`** — `[ paste screenshot ]`
Centered title + intro paragraph, then a vertical timeline (left rule with dots):
year, role, organization, short description per entry.

**Projects — `/projects`** — `[ paste screenshot ]`
A single project, **Whel**. Title + links to whel.bio and GitHub, then prose
sections (how it emerged, what it does, technical architecture, building in public,
where it's going).

**Writings — `/writings`** — `[ paste screenshot ]`
Titled **Local Maxima**. Intro + a hand-drawn local/global-maxima graph sketch
(`LocalMaximaSketch`), then category filter chips and preview cards that link out
to Substack.

**Readings — `/readings`** — `[ paste screenshot ]`
A long annotated list (essays, books, music, newsletters, projects, etc.) with two
embedded images. Italics are intentionally enabled **only here and on About** for
work titles.

**About — `/about`** — `[ paste screenshot ]`
Personal bio, the Tintin image + caption, a "natural world" paragraph, a single
justified row of four mountain photos, and a Contact line at the bottom.

---

## 4. Design language (do not change — match it)

- **Typeface:** Times New Roman throughout (`--font-serif` and `--font-mono` both
  map to it). Do not introduce new fonts.
- **Color tokens (in `globals.css` — DO NOT change any of these):**
  - `--bg: #f7f4ec` (warm off-white background)
  - `--bg-warm: #fcfaf4`
  - `--ink: #15110d`, `--ink-2: #2c261f`, `--ink-3: #3a342b`
  - `--sepia: #6b6155`, `--sepia-2: #9a9082`, `--sepia-3: #a89d8c`, `--faint: #c0b5a1`
  - hairlines: `rgba(21,17,13,0.12–0.14)`
- **Layout:** centered reading column, lots of whitespace, hairline dividers,
  small uppercase mono-style labels (Times, tracked, sepia).
- **Inspirations:** Atlas Discovery (structure/whitespace), da Vinci + Jean Cocteau
  line art (the sketches), the Voyager Golden Record (the spinning nav mark).

---

## 5. What I want you to do

1. **Place the sketches I will paste in.** Veronica will provide da Vinci / Cocteau
   line drawings (some already exist in `public/sketches/`, see §6). Weave them into
   the pages in a way that feels intentional and unforced — in the side margins,
   beside section headers, as subtle accents. They should sit **to the side of
   content, never on top of text**, and stay faint (low opacity, `mix-blend-mode:
   multiply` works well on this background). A starting component exists:
   `src/components/SideSketch.tsx` (currently unused).
2. **Add tasteful dynamic / interactive touches** consistent with the slow-spinning
   record: gentle reveal-on-scroll, subtle hover states, light parallax or float on
   the sketches, etc. Keep it quiet — nothing flashy. Respect
   `prefers-reduced-motion` (there is already a global rule for this).
3. **Suggest layouts / reordering** where it makes the site more intuitive. Propose
   options; favor the Atlas-style centered, hairline-divided structure already here.

---

## 6. Existing sketch assets (reuse these)

In `public/sketches/`:
- `hero.png` — da Vinci gear / machine study
- `about.png` — da Vinci Vitruvian Man
- `trajectory.png` — Jean Cocteau standing figure ("dandy")
- `interests.png` — Jean Cocteau lyre player
- `contact.png` — Jean Cocteau two diners

Veronica will paste any additional sketches she wants used.

---

## 7. HARD CONSTRAINTS — do NOT do any of these

- **Do not change any of the writing / copy.** Every word is final. Do not reword,
  trim, or rewrite anything in `src/content/site.ts` or the `.md` files.
- **Do not add italics** anywhere except where they already exist (work titles on
  the Readings and About pages). No new italic styling.
- **Do not touch the color scheme.** Do not change, add, or "improve" any color
  token or background. The warm off-white + ink + sepia palette is final.
- **Do not change or replace any photos** (`public/mountains/`, `public/sketches/`,
  `golden-record.png`) — only reposition/resize the sketches as layout requires.
- **Do not add, remove, or rename pages.** The page set (Home, Experience, Projects,
  Writings, Readings, About) is final.
- **Do not change the typeface** (Times New Roman stays).
- **Do not "redesign."** This is an additive pass: sketches, motion, and layout
  suggestions only.

If something seems like it needs a copy, color, or structural change to work,
**leave it and flag it for Veronica instead of changing it.**

---

## 8. Summary

Add the sketches and a little life (motion, hover, reveal), and propose smarter
layouts for them — within the existing pages, typeface, palette, photos, and exact
copy. Nothing else.
