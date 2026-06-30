# Veronica Agudelo — personal site

A Next.js (App Router) site built to match the Cloud Design direction: parchment
palette, Newsreader + IBM Plex Mono type, a generative starfield, da Vinci /
Voyager Golden Record line art, and a numbered editorial layout. Deploys to Vercel.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (what Vercel runs)
```

Requires Node 18+.

## Where everything lives

```
src/
  app/
    layout.tsx              # fonts, nav, footer, starfield wrapper
    page.tsx                # HOME — the long-scroll page (7 numbered sections)
    writings/page.tsx       # "Local Maxima" landing + category filter
    writings/[slug]/page.tsx# a single essay, full text
    projects/page.tsx       # projects list
    projects/[slug]/page.tsx# a single project + related essays
    globals.css             # ALL styling / design tokens / animations
  components/               # Nav, Footer, Starfield, Sparkle, Sketch, Reveal, Article, WritingsList
  content/site.ts           # >>> EDIT THIS to change wording across the whole site <<<
  lib/posts.ts              # reads the Markdown essays
content/posts/*.md          # your essays (imported from Substack), one file each
public/sketches/*.png       # the 5 sketch images
```

## Editing the words (this is the part for you)

**All site copy lives in `src/content/site.ts`.** It's seeded with your real facts
and some of your own About-page phrasing as a starting point — rewrite any of it.
You don't need to touch any component to change wording. In there you control:

- the hero line, eyebrow, affiliations
- the About paragraphs
- the "Now" list, Trajectory/experience, education, certifications
- the Shelf (books — currently placeholders), Curiosities (interest tags)
- Contact links (your email is **not** published yet — add it when ready)
- the "why Local Maxima" intro and the writing categories
- the Projects (Whel is seeded; the long writeup is a placeholder to expand)

## Editing the writings (they link out to Substack)

The Writings page shows a **preview card** for each essay — thumbnail, date,
excerpt — and clicking it opens the full piece on your Substack. Nothing is
hosted on the site. Each card is driven by one Markdown file in `content/posts/`;
only the frontmatter and the first image are used:

```markdown
---
title: "On Nontechnical Building"
subtitle: "All men by nature desire to know. — Aristotle"   # optional
date: "2026-03-29"
category: "philosophy"        # emerging-tech | philosophy | projects | academic
excerpt: "One or two sentences shown on the preview card."
substackUrl: "https://veronicaagudelo.substack.com/p/..."   # where the card links
cover: "https://...optional-image-url"                        # optional thumbnail
---
```

- The **thumbnail** is the `cover:` URL if set, otherwise the first image in the
  body. (The body text itself is no longer displayed anywhere.)
- To **add a writing**: drop a new `.md` file in `content/posts/` with that
  frontmatter and a valid `substackUrl`. It appears automatically, newest first.
- To **add an academic piece**: set `category: "academic"` — the filter tab shows
  up once at least one post uses it.
- Categories and their labels live in `src/content/site.ts` (`categories`).
- Old per-post URLs like `/writings/<slug>` now 307-redirect to the Substack post,
  so any links you previously shared keep working.

## Deploying to Vercel

1. Push this folder to a new GitHub repo.
2. In Vercel: **New Project → import the repo**. Framework auto-detects as Next.js.
3. No environment variables needed. Click **Deploy**.
4. Add your custom domain in the Vercel project settings when ready.

That's it — every push to `main` redeploys.

## Notes

- Fully static (no database). Fast, cheap, nothing to maintain.
- Respects `prefers-reduced-motion` (starfield + reveals stop animating).
- Mobile nav collapses into a MENU toggle.
- The build prints a harmless `font override values for Newsreader` warning in
  some sandboxes; it resolves on Vercel and doesn't affect the result.
```
