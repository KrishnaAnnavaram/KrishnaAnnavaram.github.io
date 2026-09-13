# Audit — portfolio as it stands

Audited at commit `157c853` on branch `main`, against the live deployment at
`https://krishnaannavaram.github.io` (fetched and read, not assumed) and a local
production build.

---

## 0. A correction to the brief, up front

The brief anticipated a specific set of visual problems: *"excessive gradients, excessive
brightness, moving backgrounds, too many glowing effects, too many animated particles,
visual noise, excessive glassmorphism, animation fatigue."*

**None of that is present in the current build.** It was true of the portfolio before the
2026-09-04 rebuild (`4c7f7ae`), and the rebuild removed it. What is deployed today is a
calm, typographically-led editorial site with a single accent colour, no gradients, no
particles, no ambient motion, and an `oklch` token system with genuine light and dark
modes.

There is exactly one piece of ambient animation on the entire site — an `animate-ping` dot
next to the availability line in the hero ([Hero.tsx:13-16](../components/home/Hero.tsx#L13-L16)).

So the visual-comfort problem the brief expected to find has already been solved. Reporting
it as unsolved would be flattering the work I am about to do. The real problems are
elsewhere, and they are more serious than a background treatment.

---

## 1. Scorecard

| Category | Score | Note |
|---|---:|---|
| Visual design | 7 | Refined and disciplined — but it is a very well-executed example of a recognisable genre, not a voice |
| Visual comfort | **9** | Genuinely excellent. Calm, high-contrast, no glow, no drift |
| Typography | 8 | Instrument Serif / Inter / JetBrains Mono, fluid `clamp()` scale, `text-wrap: balance` |
| Information hierarchy | 7 | Clear, but flattens at `/work` where everything has equal weight |
| Recruiter usability | 6 | Role and specialisation land in 2 seconds. "Strongest work" does not |
| **Technical storytelling** | **4** | Architecture exists only as one prose sentence per case study. No diagram, no code, no eval |
| **Project discovery** | **3** | Three case studies. No index of real projects, no filtering, no search over work |
| Responsiveness | 8 | Fluid type and sensible grid collapse; no horizontal overflow found |
| Mobile experience | 7 | Works well. Mobile nav is a plain disclosure list — functional, unremarkable |
| Tablet experience | 7 | The `lg:` breakpoint jump leaves 768–1023px using the stacked mobile layout |
| Desktop experience | 8 | Comfortable measure, good use of the `78rem` container |
| Navigation | 8 | Flat six items plus a ⌘K palette — matches best practice from the research |
| Animation quality | 7 | Restrained, and well engineered: reveals are CSS-only, gated on `.js`, with a 3s failsafe |
| Accessibility | 7 | Semantic, `:focus-visible` ring, `prefers-reduced-motion` honoured. Unverified by tooling |
| Colour contrast | 8 | `oklch` ramp is deliberate; both themes look safe by eye, untested by tool |
| Performance | 8 | 103 kB shared JS, 121 kB home, fully static, self-hosted fonts |
| SEO | 7 | Sitemap, robots, `Person` JSON-LD. No per-work schema, no OG images |
| Content quality | 7 | Well written and notably honest. Thin in volume |
| Consistency | 8 | One spacing system, one accent, applied uniformly |
| **AI identity** | **3** | The site *says* he builds LLM systems. Nothing on the site *is* one |
| Originality | 5 | Indistinguishable at a glance from a dozen other editorial-minimal engineer sites |
| Trustworthiness | 7 | High authorial honesty, undermined by one live contradiction (below) |
| Maintainability | 8 | All copy lives in `data/` and `content/`; no strings hardcoded in components |
| **GitHub integration** | **0** | A link in the footer. That is all |
| Contact experience | 6 | `mailto:` composer — honest for a static site, but no confirmation and no alternative |
| **Résumé accessibility** | **4** | The PDF is reachable, and it contradicts the site |
| Overall professionalism | 7 | A good site that undersells a strong engineer |

**Mean: 6.5.** The distribution matters more than the mean: presentation scores cluster at
7–9, evidence scores at 0–4.

---

## 2. The central problem

The site is a well-built container with the wrong contents.

Three case studies are on the site: a UNT research assistant, Cognizant claims pipelines,
and Lemoius résumé matching ([data/work.ts](../data/work.ts)). All three are employment
work. None can be linked to code. All their metrics are approximations carried over from a
résumé — *"~88–92%"*, *"~35%"*, *"~40–45%"* — with no methodology and nothing to inspect.

Meanwhile the GitHub account holds systems of a completely different order:

| Repo | What it is | On the site? |
|---|---|---|
| `bootshift` | Multi-agent Spring Boot migration harness, Java, with an evidence/provenance model | **No** |
| `statute` | Deterministic PL/SQL → BRD reverse-engineering pipeline, explicit zero-LLM generation path | **No** |
| `semantic-mcp-data-access-gateway` | A2A agents + MCP servers over Treasury rate data | **No** |
| `adaptive-legacy-code-complexity-harness` | Four-stage complexity harness, 20 analysis skills | **No** |
| `decisionforge-ai` (private) | Multi-agent autonomous BI system | **No** |
| `virtual-professor-ai` | LangGraph multi-agent research mentoring | **No** |

This is the audit's single most important finding. **The strongest evidence this candidate
has of doing exactly the work he is positioning for is not on his portfolio.** A reviewer
evaluating him against the stated target — agentic AI, MCP, legacy modernisation, reverse
engineering — currently sees none of it, because the sections that would carry it do not
exist.

Everything else in this document is secondary to that.

---

## 3. AI identity is claimed but not demonstrated

The hero says *"I build LLM systems that hold up in production."* The four principles below
it argue for structured contracts, traceable retrieval, evaluation before scale, and cost
as a feature ([data/profile.ts](../data/profile.ts)).

They are good arguments. They are also unaccompanied by a single artefact. There is nothing
on the site a visitor can *use* that demonstrates any of them — no retrieval, no grounding,
no citations, no evaluation numbers, no traces.

For a frontend engineer, claiming craft and then shipping a well-crafted site closes the
loop. For an AI engineer, claiming grounded retrieval and then shipping a static brochure
leaves the loop open. The medium is available to carry the proof and currently does not.

---

## 4. Architecture is asserted in prose

Each case study has one optional `architecture` field, and it is a single string
([data/work.ts:63](../data/work.ts#L63)):

> "Course materials + library database records → chunking and embedding → FAISS dense index
> (PostgreSQL for metadata and provenance) → top-k retrieval with relevance threshold →
> grounded generation with citations → Redis-backed session context."

That is an arrow-chain in a paragraph. It is the right *information*, in the wrong *form* —
it cannot be scanned, the stages have no boundaries, nothing indicates which parts are
model-driven and which are deterministic, and on mobile it is a wall of text with arrows in
it.

Per the research, a rendered architecture diagram is the highest-leverage differentiator
available to an AI portfolio. The site has the content for one and renders none.

---

## 5. Trust bugs

**The résumé contradicts the site.** `public/resume/resume.pdf` lists WorkingFox and
Creative Sense — companies that appear nowhere on the site or on LinkedIn — and gives
Cognizant as *Machine Learning Consultant, Aug 2021 – Nov 2022* where the site says
*Programming Analyst, Jul 2021 – Nov 2022*. A recruiter who reads the site and then opens
the résumé sees two different work histories. This is already documented in
[CONTENT_TODO.md](../CONTENT_TODO.md) but remains live, and it is the most damaging single
defect on the site: everything else is a missed opportunity, this one actively costs trust.

**Two roles carry no substance.** Virtusa (current) and Ideate are both marked
`needsDetail: true` and rendered with generic Generative AI Engineer responsibilities and no
metrics. The current role — the first thing a recruiter checks — is the least specific
entry on the page.

**Research volume without differentiation.** `/research` lists 38 entries, 23 of them
supervised graduate projects with titles like *"Group 7 Final Report"*. Presented as a flat
list this reads closer to padding than to credential. The underlying fact (he supervised 23
graduate capstone projects) is genuinely strong; the presentation obscures it.

---

## 6. Smaller findings

- **`/work` is a list of three** with no filters, tags, sort, or search. The nav promises a
  section; the page delivers a short list.
- **No GitHub signal anywhere** — no activity, no repo metadata, no languages, no recency.
  For an engineer whose best evidence is on GitHub, the footer link is doing all the work.
- **Contact has no confirmation path.** The `mailto:` composer is a defensible choice for a
  static site and is honestly documented in the source, but if the visitor has no mail
  client configured, the flow dead-ends silently.
- **No OG images.** Links shared to LinkedIn or Slack render without a preview card.
- **No per-work structured data.** Only `Person` schema is emitted; case studies emit none.
- **Tablet gap.** Layout switches at `lg:` (1024px), so 768–1023px gets the mobile stack —
  wasteful on an iPad in landscape.
- **`animate-ping` in the hero** is the one piece of motion with no informational job.
- **No tests of any kind.** No unit, integration, or E2E tests exist. CI runs typecheck,
  lint and build only.
- **`portfolio_data/` is committed** — ~90 source PDFs and a `.docx`, duplicated into
  `public/reports/`. Nothing references it at build time.

---

## 7. What deserves to be kept

Being critical does not mean discarding what works. These are genuinely good and should
survive the rebuild:

- **The `oklch` token system and the three-way theme handling** (`:root`, guarded
  `prefers-color-scheme`, `[data-theme]`). This is more correct than most production sites.
- **The no-JavaScript-dependency reveal mechanism** — hidden only after a `.js` class lands,
  with a 3-second failsafe. Content never depends on script. That is real engineering.
- **The content/component separation.** Every string lives in `data/` or `content/`.
- **The editorial restraint itself.** The research says this is right. The problem is not
  that the site is quiet; it is that it is quiet *and* empty.
- **The authorial honesty.** `CONTENT_TODO.md` documenting removed unverifiable claims is
  the single most trustworthy artefact in the repository.

---

## 8. Priorities

Ordered by impact on a hiring decision, not by effort:

1. **Get the GitHub systems onto the site** as first-class case studies with real
   architecture, verified numbers, and repository links.
2. **Render architecture as diagrams**, derived from the actual systems.
3. **Build a project explorer** over the full body of work, with filtering that maps to the
   domains being hired for.
4. **Make the site demonstrate the AI claim** — a grounded, citing assistant that can say
   "I don't have that."
5. **Fix the résumé contradiction.**
6. **Add GitHub as a live data source**, so the site stops going stale the day it ships.
7. **Give Virtusa and Ideate real content**, or stop presenting them as the headline.
8. **Add tests**, because a portfolio arguing for evaluation harnesses that has no tests is
   arguing against itself.
