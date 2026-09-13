# Test report

What was tested, what it found, and what is not covered.

---

## 1. Summary

| Suite | Count | Command |
|---|---:|---|
| Unit (Vitest) | **77** | `npm test` |
| End-to-end + accessibility (Playwright) | **262** across 5 profiles | `npm run build && npm run test:e2e` |
| Colour contrast (WCAG AA over the tokens) | 36 pairs | `node scripts/check-contrast.mjs` |
| Publication verification (against the linked PDFs) | 15 entries × 2 checks | `node scripts/verify-publications.mjs` |
| Typecheck | — | `npm run typecheck` |
| Lint | — | `npm run lint` |

All pass. Everything in this table gates the deploy.

### Browsers and devices

| Profile | Engine | Viewport |
|---|---|---|
| chromium | Blink | 1280 × 720 |
| firefox | Gecko | 1280 × 720 |
| webkit | WebKit | 1280 × 720 |
| mobile-safari | WebKit | iPhone 13, 390 × 664 |
| mobile-chrome | Blink | Pixel 7, 412 × 892 |

CI runs Chromium and WebKit — the two engines that matter most for this
audience. The full five-profile matrix runs locally before a release.

### Viewport sweep

Overflow and navigation reachability are checked at **320, 375, 390, 430, 640,
700, 768, 1024, 1280, 1440 and 1920px** across **13 routes**. 640 and 700 are
there because that is where the header broke.

---

## 2. What the tests actually assert

### Unit — `tests/unit/`

**Retrieval (`retrieval.test.ts`)**

- Tokenisation: stop words, diacritics (`résumé` → `resume`), technical tokens
  that punctuation would otherwise split (`c++`, `gpt-4`, `node.js`).
- **Stemmer idempotence** across twelve word pairs — `stem(stem(w)) === stem(w)`
  — plus an assertion that the corpus's own nouns stem to themselves.
- Grounding: every indexed passage has a source; every internal `href` is a real
  route; passages are returned verbatim, byte-identical to the index.
- Refusal: nine out-of-scope questions return nothing and say so.
- **Lexical coincidence**: questions about Microsoft, Google and Netflix must
  never be labelled `grounded`, and when partial must carry the "may not be
  relevant" lead.
- The lead sentence matches one of three fixed templates and introduces no fact.
- Every question the UI advertises returns something.
- The skills inventory never outranks a passage about real work.
- Determinism: the same query twice gives the same passages.
- The index stays under 400 kB and contains no phone number.

**Registry and provenance (`projects.test.ts`)**

- A repo with no registry entry is never shown — GitHub cannot publish itself.
- A project whose repo is missing still renders (DecisionForge is private).
- Every case study states what the system cannot do.
- Every published figure records how it was obtained.
- Every employment case study names where its figures come from.
- The contaminated F1 figure Statute disowns is not published; the blind one is.
- Statute's checks are described as assertions, not tests.
- Bootshift uses the counted figure, not the README's.
- Publications are never typed `Conference`, and every one has a linked report.
- Diagram integrity: unique node ids, known kinds, and **every diagram marks
  something deterministic** — the model boundary is the point of the component.

### End-to-end — `tests/e2e/`

**`portfolio.spec.ts`** — the visitor flows: arrival, navigation, filtering,
search, empty state, case-study structure, architecture node inspection, résumé
(fetched, asserting a 200 and a PDF content-type), GitHub links, the assistant
answering and declining, the index failing to load, contact composition, mobile
navigation, theme persistence across reload, keyboard and skip link, GitHub
unreachable, **JavaScript disabled**, and zero console errors.

**`responsive.spec.ts`** — the regression net for what the first suite missed:
overflow across 13 routes × 11 widths with the offending element named;
navigation reachable at every width (visible *and* inside the viewport); Escape
and focus restoration on the mobile menu and the assistant; a visible focus ring
on every input on every route.

**`accessibility.spec.ts`** — axe (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`)
on all ten routes; dark mode via *both* system preference and explicit toggle;
the assistant dialog once open; alt text on every image; heading levels that
never skip; reduced motion leaving nothing hidden.

**Probes** — `contrast-probe.spec.ts` and `perf-probe.spec.ts` report rather
than assert. They exist because a threshold on a loopback connection measures
the CI machine, not the site.

---

## 3. What testing found

Every item here was a real defect, found by writing the test or by the
independent review, and fixed.

### Accessibility

| Defect | Measured | Fix |
|---|---|---|
| `ink-muted` failed WCAG AA | 3.25:1 | Tokens recomputed against rendered sRGB |
| `ink-faint` failed WCAG AA | 2.78:1 | Same |
| Research tab counts used `opacity-60` | 2.62:1 | Real token |
| Structural hairlines | 1.28:1 | Raised to a visible level |
| Three inputs had no focus indicator | ~1.2:1 border change | Inherit the site's ring |
| Two `role="dialog"` elements existed at once | — | One provider owns the dialog |
| Home page jumped h1 → h3 | — | Section labels are real `h2`s |
| `/research/` jumped h1 → h3 | — | Added a heading |
| Assistant dropped focus to `BODY` on close | — | Restores to the opener |
| Mobile menu had no Escape and no focus trap | — | Both added |

### Layout

| Defect | Measured | Fix |
|---|---|---|
| **No navigation at all, 640–719px** | hamburger at x=685 in a 640px viewport | `min-w-0`, breakpoint moved to `lg` |
| Header overflow at 768px | +388px | Same |
| Header overflow at 1024px | +148px | Same |
| Bootshift Evidence clipped on every phone | +180px at 320px | `overflow-wrap: anywhere` + `min-w-0` |
| "Ask the site" wrapped to two lines in a single-line header | — | `whitespace-nowrap` |
| Diagram legend rows misaligned | labels 15px apart | Grid instead of flex-wrap |

`body { overflow-x: hidden }` hid every one of these: the viewport scrolls
programmatically with no scrollbar, so clipped content is simply gone.

### Performance

The reveal mechanism hid above-the-fold content until an IntersectionObserver
ran post-hydration, making the hero paragraph the LCP element.

| Route | LCP before | LCP after |
|---|---:|---:|
| `/` | 1,056 ms | **188 ms** |
| `/about/` | 860 ms | **84 ms** |
| `/experience/` | 836 ms | **88 ms** |
| `/projects/` | — | **132 ms** |
| `/projects/smcp-gateway/` | — | **104 ms** |

LCP now equals FCP on every route — nothing above the fold waits for
JavaScript. Measured on loopback in Chromium; treat as a floor, not field data.

### Correctness

- **The stemmer was not idempotent**, splitting `pipeline`(26 chunks) from
  `pipelin`(14), `stage`(10) from `stag`(12). The test that claimed to cover it
  asserted the one input where the bug did not show.
- **The relevance floor was an unnormalised BM25 sum**, so longer questions
  cleared it by being longer — and the same arithmetic set the "grounded" label.
- **The assistant's input was `disabled` while the index loaded**, so autofocus
  landed on a disabled field. Chromium only passed because its fetch beat the
  40 ms timer.
- **CI ran unit tests against the committed index, then shipped a regenerated
  one** — what shipped was never what was tested.
- **23 publication entries linked to documents about other subjects.** Caught by
  the review, confirmed mechanically, and now gated by
  `scripts/verify-publications.mjs`.

---

## 4. Page weight

| Route | First Load JS | Page |
|---|---:|---:|
| `/` | 127 kB | 606 B |
| `/projects/` | 118 kB | 3.0 kB |
| `/projects/[slug]` | 117 kB | 2.4 kB |
| `/about/` | 121 kB | 682 B |
| `/contact/` | 115 kB | 4.1 kB |

103 kB of that is the shared React/Next runtime. The assistant index (92 kB,
~25 kB gzipped) is fetched **only on first open** — a visitor who never opens it
pays nothing.

Export is 28 MB, of which **24 MB is the 15 research report PDFs**. They are
linked from `/research/` and are intentional; none is optimised. That is the
single largest remaining weight item.

---

## 5. Not covered

Stated rather than implied.

- **No component tests.** `@testing-library/react` is installed and unused;
  coverage of `Assistant` and `ProjectExplorer` comes from E2E instead. Either
  add them or remove the dependency.
- **No visual regression testing.** A layout change that looks wrong but does
  not overflow or fail axe will pass everything here.
- **No real-device testing.** Playwright's iPhone and Pixel profiles emulate
  viewport, user agent and touch — not Safari's actual rendering on hardware.
- **No field performance data.** Every number here is loopback in Chromium.
  Real LCP over 4G behind 117 kB of JavaScript will be materially worse.
- **axe catches roughly a third of accessibility problems.** It cannot judge
  whether alt text is *good*, whether reading order makes sense, or whether a
  label describes what a control does. The manual findings in
  `PORTFOLIO_CRITIQUE.md` §4 cover what it missed here.
- **Tap targets.** The review measured 11–49 sub-24px targets per route at
  390px, against WCAG 2.5.8. Most are text links in flowing prose, which the
  spec exempts; the standalone controls (`+ Detail`, `+ Abstract`, sort toggles)
  are not exempt and are not yet fixed.
- **No load testing.** The site is static files on a CDN; there is nothing to
  load-test.
- **Firefox and WebKit are not in the mobile matrix.** Mobile Safari is covered
  by the `mobile-safari` profile at desktop WebKit parity only.

---

## 6. Reproducing

```bash
npm ci
npm run build                 # prebuild rebuilds the knowledge index and OG card
npm test                      # 77 unit
npm run test:e2e              # 262 E2E, all five profiles
node scripts/check-contrast.mjs
node scripts/verify-publications.mjs

# Diagnostics
npx playwright test tests/e2e/perf-probe.spec.ts --project=chromium
npx playwright test tests/e2e/contrast-probe.spec.ts --project=chromium
```

E2E runs against `out/`, so **build first** — a stale export fails immediately.
