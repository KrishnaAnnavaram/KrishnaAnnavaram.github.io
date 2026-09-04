# krishnaannavaram.github.io

Personal site for Krishna Annavaram — Generative AI Engineer. Static Next.js export, deployed to
GitHub Pages.

**Read [`CONTENT_TODO.md`](./CONTENT_TODO.md) first** — it lists the content that still needs real
detail and the claims that were removed from the previous version.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, `output: 'export'`) |
| UI | React 19 |
| Styling | Tailwind CSS v4 — CSS-first `@theme`, no config file |
| Content | TypeScript data modules + MDX for essays |
| Icons | lucide-react |
| Hosting | GitHub Pages via Actions |

No animation library, no 3D, no charting library, no client-side AI. First Load JS is ~103 kB
shared, 106–120 kB per route.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
npm run typecheck
npm run lint
```

## Where the content lives

Everything the site renders comes from `data/` and `content/`. No copy is hardcoded in components.

```
data/profile.ts          name, intro, positioning, principles, education, socials
data/experience.ts       roles — the LinkedIn record is the source of truth
data/work.ts             case studies (problem → approach → outcome)
data/publications.ts     research, each entry backed by a PDF in public/reports/
data/skills.ts           grouped technical inventory
data/certifications.ts   credentials, with Credly verify links
data/nav.ts              navigation and the command-palette hints
content/writing/*.mdx    essays; frontmatter drives the index
```

Adding a case study to `data/work.ts` with `featured: true` puts it on the home page, in `/work`,
in the sitemap, and in the ⌘K palette — no other edits needed. Same for an MDX file dropped into
`content/writing/`.

## Design system

Defined entirely in `app/globals.css`. Light and dark are both first-class: colours are authored
as `oklch` tokens on `:root`, redefined under `prefers-color-scheme: dark` (guarded so an explicit
light choice wins) and again under `[data-theme='dark']` so the toggle overrides in both
directions.

Type is Instrument Serif for display, Inter for text, JetBrains Mono for labels and data, all
self-hosted at build time through `next/font`.

Scroll reveals are CSS transitions armed by a `.js` class that the boot script adds before first
paint. Without JavaScript nothing is hidden, and a three-second fallback timer reveals anything
still hidden if hydration never lands — **content never depends on script**.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install → typecheck → lint → build →
publish `out/` to Pages. A type error or lint warning fails the build before anything deploys.

To host under a subpath, set `NEXT_PUBLIC_BASE_PATH` in the workflow environment.
