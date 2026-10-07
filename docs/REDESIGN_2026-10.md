# October 2026 redesign

The September rebuild made the site credible: evidence-first case studies,
provenance on every figure, a grounded assistant. Its own review named what it
was not — *"still a narrow column on a 1920px screen"*, visual comfort traded for
density, and nothing a visitor could do but read. This pass keeps the evidence
model and changes how the evidence is experienced.

## 1. Research

**What premium engineering portfolios do.** brittanychiang.com, rauno.me,
paco.me, leerob.com, emilkowal.ski, karpathy.ai, huyenchip.com and eugeneyan.com
look expensive because they are restrained, and feel engaging because of one or
two very well-made interactions. None stacks effects. The patterns worth
borrowing: a cursor spotlight on cards, one bento section (not a bento site), a
command palette, a filterable archive with URL state, and — specific to AI
engineers — a replay of a real agent trace.

**What reads as junior or generated.** Badge walls, 100-item skill lists,
violet "AI" gradients, typewriter taglines, unsourced percentages, and metrics
from synthetic data presented as results.

**Hiring-manager signal.** Baselines, evaluation, failure analysis, cost, and
working links. A recorded refusal is more convincing than a claimed success.

**The MARS Mission Control dashboard** — the owner's reference — is an
operations console: IBM Plex, cool slate surfaces, one blue accent, a status
channel where every colour is paired with a glyph, a trust strip, a "Now"
panel, an activity feed and a stage board. The site borrows the *idea* (a
console for evidence) and the glyph discipline, and changes the type (Geist),
the accent (teal), the layout and every component.

## 2. Inventory

| Source | Finding | Decision |
|---|---|---|
| MARS | 7 agents, 18 skills, ~24k lines, human approval gate, script-decided gates; 4 committed runs, all Blocked | **Lead flagship**, plus a replay of its recorded runs on the home page |
| BootShift, Statute, SMCP, complexity harness | Unchanged on `main` since their case studies were written | Kept, re-ordered behind MARS |
| DecisionForge | Private | Kept, no repository link |
| spring-modernization-remediation-harness | Two-line README and a licence; no code | Not shown until there is code |
| CredPilot | Team hackathon build: a teammate's commit and the employer's internal brief in the repository | **Not shown** — the site presents sole work only |
| 76 repositories created 6–7 Oct | Each with tests and CI; nearly all validate on synthetic data; several READMEs name models whose numbers they decline to report | **Archive**, below the flagships, with no model metrics |
| `/research/` | Fifteen group reports listing other students as co-authors | **Removed**, with its PDFs and the 70 report PDFs in `portfolio_data/` |
| New photos | Studio, skyline, evening; the evening shot shows a readable licence plate | Cropped to 4:5, plate pixelated, originals git-ignored |

## 3. Plan

1. Hero: human first — portrait, name, one sentence, three exits.
2. Trust strip: only figures computed from the site's own data.
3. Flagship bento, each tile carrying a fingerprint of where its model boundary falls.
4. MARS replay, from committed evidence.
5. Experience as an expandable run log.
6. Earlier work: category counts and six entries, then the full archive.
7. Principles and contact.

## 4. Critique of the plan, and what it changed

| Objection | Change |
|---|---|
| A dashboard aesthetic reads cold to a recruiter | The first screen has no console material at all |
| A photo that swaps on a timer is a WCAG 2.2.2 issue and a second LCP candidate | Slot chosen before first paint; a 7-minute crossfade, not motion; Pause and Next controls; instant under reduced motion; the studio frame everywhere a single image is needed |
| A trace replay looks staged | Every verdict transcribed from `docs/agent_output` at `007b0a2`; the replay states that the recorded approvals were programmatic; no durations shown |
| Seventy-five archive entries drown six flagships | Archive placed after experience, visually quieter, entered through category counts |
| Archive metrics would publish synthetic results as findings | No metric field exists on an archive entry; a unit test fails the build if one appears in its notes |
| A rewrite risks regressions | Token names kept, so every existing component re-themed without edits; data model, diagrams, assistant and palette reused |

## 5. Shipped

- Design system "Console": Geist / Geist Mono / Instrument Serif, teal accent,
  new `model` and `human` status tokens. Every foreground clears 4.5:1 in both
  themes (computed by `scripts/check-contrast.mjs`).
- `human` added as a diagram node kind, so approval gates render as gates.
- Home: hero with rotating portrait, trust strip, flagship bento, MARS replay,
  run history, earlier work, principles, contact.
- `/projects/`: the existing explorer, then the archive with search, category
  and LLM filters, synced to the URL.
- `/about/`: the three portraits as a stack that fans out on hover.
- Open Graph card rebuilt around the studio portrait.
- The GitHub sync is paginated (the account passed 100 repositories) and keeps
  README bodies only for repositories the site presents.
- 89 unit tests, 345 E2E across five browser profiles, all passing. First-load
  JS on `/` unchanged at 127 kB.

## 6. Not done, and why

See `CONTENT_TODO.md` §00. In short: a third party's database credential is
committed in the MARS repository; student reports remain in this repository's
git history until it is rewritten; and the replay would be stronger with one
run that *clears*.
