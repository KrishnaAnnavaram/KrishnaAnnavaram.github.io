# Design system

Everything lives in `app/globals.css` as Tailwind v4 `@theme` tokens. There is no
config file and no component library.

The governing idea: **the site reads as a typeset engineering specification.**
Numbered sections, a metadata rail, hairline rules that delineate structure,
monospace for every identifier and measurement, and a serif reserved for
argument. That choice follows from the content — dense technical prose sitting
next to architecture diagrams and tables of measured figures — rather than from
a visual preference.

---

## 1. Colour

Authored in `oklch`, because it is perceptually uniform: stepping lightness by a
fixed amount produces a visually even ramp, which the same step in HSL does not.

### The ramp

| Token | Light | Dark | Used for |
|---|---|---|---|
| `paper` | `oklch(0.988 0.0015 265)` | `oklch(0.158 0.006 265)` | Page ground |
| `surface` | `oklch(1 0 0)` | `oklch(0.192 0.007 265)` | Raised plates, cards |
| `sunken` | `oklch(0.967 0.003 265)` | `oklch(0.132 0.005 265)` | Diagram grounds, code |
| `ink` | `oklch(0.17 0.008 265)` | `oklch(0.955 0.002 265)` | Headings, primary text |
| `ink-soft` | `oklch(0.40 0.009 265)` | `oklch(0.755 0.007 265)` | Body prose |
| `ink-muted` | `oklch(0.48 0.009 265)` | `oklch(0.68 0.008 265)` | Secondary text, labels |
| `ink-faint` | `oklch(0.545 0.009 265)` | `oklch(0.60 0.008 265)` | Metadata, timestamps |
| `rule` | `oklch(0.905 0.004 265)` | `oklch(0.275 0.008 265)` | Hairlines |
| `rule-strong` | `oklch(0.83 0.006 265)` | `oklch(0.375 0.009 265)` | Emphasised borders |

Neutrals carry a slight cool cast (hue 265) so the warm accent stays distinct
from them rather than muddying into the greys.

### The two meaningful colours

Everything else on the site is a neutral. Exactly two colours carry meaning:

**`accent` — vermilion.** `oklch(0.545 0.185 32)` light, `oklch(0.735 0.155 40)`
dark. The author's own voice: links, current state, emphasis, the one-per-view
primary action. Warm on purpose — the AI-portfolio field is saturated with blue
and violet, and warmth reads as human rather than machine.

**`verify` — teal.** `oklch(0.50 0.085 185)` light, `oklch(0.755 0.095 185)`
dark. Used **only** where something was measured or is deterministic: the
deterministic node type in architecture diagrams, and the provenance note under
an evidence block. Never decorative. If it appears, it means "this was checked."

A reader who notices nothing else will still absorb that the teal stages in a
diagram are the ones that do not involve a model.

### Contrast is computed, not judged

`oklch` lightness gives no indication of WCAG compliance, and two colours with
the same `L` can differ by more than a full ratio point against the same ground.
So the palette is verified rather than eyeballed:

```bash
node scripts/check-contrast.mjs
```

It converts every token to sRGB, computes real relative luminance, and fails if
any foreground falls below **4.5:1** against `paper`, `surface` or `sunken` in
either theme. Every foreground is held to the 4.5:1 normal-text threshold rather
than the 3:1 large-text one, because the monospace labels are 10–11px.

This is wired into CI. It caught `ink-muted` and `ink-faint` failing at 3.25:1
and 2.78:1 in the first draft of this palette.

`tests/e2e/contrast-probe.spec.ts` cross-checks the same tokens as the *browser*
renders them, which matters because a JS colour conversion clamps out-of-gamut
values where the browser gamut-maps them.

### Theme resolution

Three-way, and the order matters:

1. `:root` — light, authored as the default state.
2. `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme='light'])`
   — system preference wins unless the visitor chose light explicitly.
3. `:root[data-theme='dark']` — an explicit choice overrides in both directions.

A boot script in `app/layout.tsx` applies any stored choice before first paint,
so the wrong palette never flashes.

---

## 2. Typography

| Role | Family | Why |
|---|---|---|
| Display + prose | **Newsreader** | An optical-size text serif. The same family carries a 60px headline and a 20px lead without either looking wrong — display serifs break down at body size, and this one does not. |
| UI + body | **Inter** | Dense interface text, tables, chips. |
| Data + labels | **JetBrains Mono** | Every identifier, measurement, date, section number, repository name and filter chip. |

All three are self-hosted at build time via `next/font`. No CDN request, no FOUT
from a third party, no privacy question.

The serif/mono pairing is the voice: literary prose next to machine-readable
identifiers. It is what makes the page read as a specification rather than a blog.

### Scale

A 1.2 minor third, interpolated across the viewport with `clamp()`:

```
3xs 10px   ·  2xs 11px   ·  xs 12px   ·  sm 13px
base  15 → 17px     lg  17 → 20px     xl  19 → 23px
2xl 23 → 31px       3xl 28 → 42px     4xl 34 → 60px     5xl 40 → 88px
```

`3xs` and `2xs` are uppercase monospace with wide tracking, which raises their
apparent size and legibility well above what the pixel value suggests.

### Measure and rhythm

- `--container-prose: 66ch` — long-form prose. Comfortable reading measure.
- `--container-text: 44rem` — lead paragraphs and intro text.
- `--container-page: 80rem` — the outer page frame.
- `text-wrap: balance` on headings, `pretty` on paragraphs and list items.
- `font-variant-numeric: tabular-nums` on every table, `<dl>`, `<time>` and
  anything tagged `.tabular` — so figures compared against each other line up.

---

## 3. Layout

### The spec grid

The signature layout. A metadata rail carrying a numbered section label, then the
content:

```
┌──────────────┬────────────────────────────────────────┐
│ 01           │  Selected systems                      │
│ Selected     │  ────────────────────────────────────  │
│ systems      │  Bootshift                             │
│ (sticky)     │  A Spring Boot migration harness…      │
└──────────────┴────────────────────────────────────────┘
   11rem                    1fr
```

`@utility spec-grid` — a single column below `lg` (1024px), where the rail
becomes a header above the content. The label is `position: sticky` on desktop,
so a reader deep in a long case study always knows which section they are in.

### Spacing

`--spacing-gutter: clamp(1.125rem, 4.5vw, 2.75rem)` — one side padding value for
the entire site, applied through `@utility page-x`. Nothing sets its own
horizontal page padding, which is why the gutter is consistent everywhere and
why there is no horizontal overflow at any width.

### Breakpoints

Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

Two rules that matter:

- **Navigation** collapses at `md`. Above it, six flat links; below, a disclosure
  menu whose items carry a one-line hint the desktop nav does not show.
- **Diagrams** go horizontal at `lg` and vertical below. This is a reflow, not a
  shrink — the connector rules rotate, the nodes stack, and the diagram stays
  readable at 320px instead of becoming a picture to pinch-zoom.

---

## 4. Motion

**There is no ambient motion anywhere on this site.** No animated gradients, no
drifting particles, no looping background, no parallax, no scroll-jacking. This
is the single clearest finding from the research in `PORTFOLIO_RESEARCH.md`:
none of the six benchmark portfolios has any, and it is the strongest "template"
tell in the category.

Motion is attached to state changes only:

| Duration | Token | Used for |
|---|---|---|
| 140ms | `--duration-fast` | Hover, filter chips — feedback that must feel instant |
| 240ms | `--duration-base` | Button and border transitions |
| 560ms | `--duration-slow` | Scroll reveal |

Easing is `--ease-out-quint` (`cubic-bezier(0.22, 1, 0.36, 1)`) for entrances.

### The reveal, and why it cannot hide content

Scroll reveals are CSS transitions armed by a `.js` class that the boot script
adds before first paint. Three properties follow:

1. Without JavaScript, nothing is ever hidden — the class is never added, so
   `[data-reveal]` has no opacity rule and the whole page renders.
2. Before hydration, the same.
3. If hydration never lands, a three-second timer reveals anything still hidden.

**Content never depends on script.** This is asserted by an E2E test that loads
a case study with JavaScript disabled.

`prefers-reduced-motion: reduce` collapses every duration to 0.01ms and forces
all revealed content visible immediately.

---

## 5. Components

### Plates

`@utility plate` — 1px `rule` border, 3px radius, `surface` background. The
single container treatment, used for figures, diagrams, the repository strip,
the assistant dialog and the explorer controls. One treatment rather than five
is what keeps a dense page from looking like a dashboard.

Radii are deliberately small (3px). A large radius reads friendly and consumer;
a hairline radius reads technical, which is the register the content is in.

### Architecture diagrams

Typed data in `lib/architecture.ts`, rendered to real DOM by
`components/architecture/SystemDiagram.tsx`. Not an image, not Mermaid, not
React Flow. Four things follow:

- **Theme-aware** — the same diagram is legible in light and dark.
- **Accessible** — every node is real text in an ordered list, so a screen reader
  gets the pipeline in sequence rather than "image".
- **Reflows** — horizontal on desktop, vertical on a phone.
- **Free** — no diagram library ships to the client.

The `NodeKind` on each node is the point of the whole component. It marks the
**model boundary**:

| Kind | Tone | Means |
|---|---|---|
| `source` | faint | Input the system reads but does not control |
| `deterministic` | **verify** | Plain code — same input, same output, every run |
| `model` | **accent** | A language-model call — the non-deterministic part |
| `agent` | accent | Decides when and how to act, then reports what it did |
| `store` | neutral | Persistent state |
| `output` | neutral | What the system produces |

A legend renders only the kinds a given diagram actually uses.

### Figures and evidence

Every measured figure renders as a large serif number with a small caption and,
beneath it, the **method** in monospace — how the number was obtained. A number
without a method is an assertion, and `tests/unit/projects.test.ts` fails the
build if any published figure lacks one.

---

## 6. Photography

Currently one image: the portrait in the hero, at `public/images/profile/portrait.jpg`.

The deliberate position is that a systems portfolio does not need photography and
is weakened by decorative stock imagery. If more images are added later, they
belong in a central media map rather than hardcoded into components — see
`CONTENT_TODO.md` §6 on replacing the current headshot.

Rules for any image added:
- Real alt text describing content, never "photo of Krishna".
- `next/image` with explicit `width`/`height` to reserve layout space.
- Never text over an image.

---

## 7. Accessibility commitments

- Every foreground/background pair clears **4.5:1** in both themes, verified by
  `scripts/check-contrast.mjs` in CI.
- `:focus-visible` ring: 2px `accent`, 3px offset, on everything focusable.
- A skip link is the first focusable element on every page.
- Headings descend without skipping a level — asserted across all ten routes.
- The assistant dialog traps focus, closes on Escape, and returns nothing to a
  screen reader that a sighted reader does not also get.
- `prefers-reduced-motion` is honoured.
- Every image has alt text — asserted by a test.
- axe runs over all ten routes, in both themes, in CI.

---

## 8. Print

A recruiter who prints a case study gets something usable: header and footer are
dropped, colours go to black on white, external link destinations are appended in
parentheses, and plates avoid breaking across pages.
