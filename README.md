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

## Editing the words 
**All site copy lives in `src/content/site.ts`.** It's seeded with your real facts
and some of your own About-page phrasing as a starting point — rewrite any of it.
You don't need to touch any component to change wording. In there you control:

- the hero line, eyebrow, affiliations
- the About paragraphs
- the "Now" list, Trajectory/experience, education, certifications
- the Shelf (books — currently placeholders), Curiosities (interest tags)
- Contact links (your email is **not** published yet — add it when ready)
- the "why Local Maxima" intro
- the Projects (Whel is seeded; the long writeup is a placeholder to expand)

## Editing the writings

The Writings page lists pieces newest first, with a date and optional thumbnail
and subtitle. Each piece is a Markdown file in `content/posts/`:

```markdown
---
title: "On Nontechnical Building"
subtitle: "All men by nature desire to know. — Aristotle"   # optional
date: "2026-03-29"
full: true                     # optional; host the article on this site
substackUrl: "https://veronicaagudelo.substack.com/p/..."   # for external articles
cover: "https://...optional-image-url"                        # optional thumbnail
---
```

- The **thumbnail** is the `cover:` URL if set, otherwise the first image in the
  body.
- Set `full: true` to show the Markdown body at `/writings/<slug>`. Otherwise,
  provide a `substackUrl`: the card links there and `/writings/<slug>` redirects there.

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
