# Independent critique

Three reviewers were run against the built site with no knowledge of who built
it and no stake in the outcome, each briefed to find problems rather than to
reassure:

1. **Technical recruiter + hiring manager** — the 30-second screen, then the
   decision to spend 45 minutes on a call.
2. **Senior AI engineer + staff engineer** — does this person build systems or
   call APIs, and does the engineering hold up in review.
3. **UI/UX designer + accessibility specialist + performance engineer** — with
   a browser, at every breakpoint, in both themes.

The third took 564 screenshots and measured everything it reported. The second
read the source and ran the shipped retriever against adversarial queries. Both
found defects the test suite had passed straight over.

This document records what they found and what was done about it. Findings that
were *not* acted on are listed too, with the reason.

---

## 1. The disqualifying finding

> *"The `/research/` page lists 23 'Supervised' graduate projects whose titles do
> not match the PDFs they link to. I opened ten. Ten out of ten were a different
> paper."* — hiring manager

Verified independently before acting. Extracted the text of every linked PDF and
checked two things per entry: does the author's surname appear, and does the
title match the document's own title.

| | Surname present | Title matches |
|---|---|---|
| Co-authored (15) | **15/15** | **15/15** |
| Supervised (23) | **1/23** | **2/23** |

"Graph Neural Network for Molecular Property Prediction" pointed at *Automatic
Detection of Social Bias in Text*. "Deep Learning for Credit Card Fraud
Detection" pointed at *AI Driven Multilingual QA system*. The titles and
abstracts were inventions attached to real coursework about other subjects.

**Done:** all 23 entries removed, along with 65 report PDFs that nothing
referenced — other students' coursework carrying their names and university
email addresses. The 15 co-authored entries stayed because they check out, and
were relabelled from `Conference` to `Graduate Research`: they are coursework in
an IEEE template, not peer-reviewed papers, and the page now says so.

`scripts/verify-publications.mjs` re-runs both checks and gates CI, so this
class of defect cannot return silently.

The reviewer's assessment of the stakes was correct:

> *"A site whose entire pitch is 'I build systems that can show their work' has a
> page where the evidence links point at the wrong evidence. That is the end of
> the evaluation for me."*

---

## 2. Claims that did not survive checking

**"Five years building production LLM systems."** Checkable against the dates
page two clicks away, which totals roughly 3 years 9 months of employment with
LLM-era work starting in 2024. → Now *"five years in machine learning and NLP,
the last two of them on production LLM systems."*

**Employment percentages with no method.** `Outcome` had no field for one, so
the provenance rule that gates repo-backed figures could not reach the pages
carrying `91%`, `45% fewer unsafe clinical recommendations` and `99.9% uptime`.
→ `CaseStudy` now requires a `provenance` note, rendered under the figures,
stating plainly that these come from the résumé and cannot be recomputed by a
reader. A unit test fails the build if one is missing.

**Figures that disagreed across pages.** Bootshift was 191 tests on one page and
190 on another; Statute was "414 assertions" on one and "414 automated checks"
on another; the SMCP handoff reduction read as though it described a full
request when it described the short path. → All aligned, and the SMCP line now
distinguishes the two paths explicitly.

**Stale copy.** The experience page still said *"Two current roles are listed
without metrics — the detailed write-ups are still being put together"*, directly
above two roles dense with metrics. An essay and the about page still carried the
Cognizant framing that `CONTENT_TODO.md` records as retracted. → Fixed.

**An essay's opening claim.** *"After building RAG systems that handle real
business workloads"*, dated October 2024, two months into a teaching
assistantship. → Rewritten to say what it actually is, and to point at the
project pages where the ideas were tested.

---

## 3. The assistant's claim was overreach

> *"The literal claim is true… The stronger claim — 'it can't invent an answer' —
> is not honest."* — senior AI engineer

The reviewer ran the shipped retriever and produced counterexamples:

- *"Who is the CEO of Microsoft?"* → returned the Certifications passage under
  *"here is what it says"*.
- *"Tell me about his time at Google"* → returned the Virtusa role, because its
  summary contains "Google Cloud".
- *"Does he know Kubernetes?"* → **grounded** confidence against a 120-item
  technology list with nothing behind it.

They also found a real retrieval defect: the stemmer was **not idempotent**, so
the corpus's commonest technical nouns lived in two posting lists —
`pipeline`(26) and `pipelin`(14), `stage`(10) and `stag`(12). The test that
claimed to cover this asserted the property on `agents`/`agent`, the one input
where the bug did not show.

**Done:**

- Stemmer rewritten to handle plurals only, and to be idempotent. Gerund
  stripping removed entirely — losing the "building"/"build" link costs far less
  than splitting the nouns the corpus is about. Tested across twelve word pairs
  plus an idempotence check.
- The relevance floor was an **unnormalised BM25 sum**, so a longer question
  cleared it by being longer, and the same arithmetic decided the "grounded"
  label. Now per-term, and calibrated against 12 answerable and 10 unanswerable
  questions. Their ranges **overlap** — no threshold separates them, because a
  lexical retriever genuinely does match "Microsoft" in a certifications list.
  That is documented in the code rather than papered over.
- A weak match now says so: *"Nothing here answers that directly. The closest
  passages by wording are below — they may not be relevant."*
- The skills inventory was boosted above neutral and outranked passages about
  real work. Demoted below neutral, and reframed in the index as an inventory
  rather than a claim of depth.
- The UI copy now states the real failure mode instead of denying one exists.

A genuine hallucination vector was also found in the index builder: a hardcoded
clause asserting every publication was backed by a report, which nothing
validated. → Now counted from the data.

---

## 4. Layout and accessibility defects the test suite missed

The design reviewer measured every route at every breakpoint. The suite had been
checking four routes at two widths.

**No navigation at all between 640 and 719px.** The desktop nav was hidden below
`md`, and the hamburger rendered at x=685–710 — outside the viewport. Neither
was reachable. → Both flex children lacked `min-w-0`, so the control cluster
pushed itself off-screen instead of shrinking. Fixed, breakpoint moved to `lg`,
and the brand truncates.

**388px of clipped overflow at 768px**, 148px at 1024, on every route. Invisible
because `body { overflow-x: hidden }` suppresses the scrollbar — the content is
gone and nothing indicates it.

**Bootshift's entire Evidence section clipped off every phone** — +180px at
320px. A 62-character artefact filename has a 597px min-content width, which
stretched the grid track to 482px inside a 320px viewport. Tailwind's
`break-words` was *not* the fix: `overflow-wrap: break-word` wraps the rendered
text but does not reduce min-content width. Needed `anywhere`, plus `min-w-0` on
the grid item.

**Three inputs removed the focus ring and replaced it with a ~1.2:1 border
change**, against the 3:1 WCAG 1.4.11 requires.

**Focus management was wrong in all three overlays.** The assistant trapped focus
correctly but dumped it on `BODY` when closed; the mobile menu had no trap and no
Escape, so Tab walked into scroll-locked content behind it.

**LCP was 836–1,056ms on loopback** because the hero was `opacity: 0` until an
IntersectionObserver ran post-hydration — a static page hiding its own first
screen behind 448 kB of JavaScript, with FCP at ~180ms.

**Hairlines at 1.28:1** carrying the entire structural weight of the design.

**Done:** all of the above. And `tests/e2e/responsive.spec.ts` now covers 13
routes × 11 widths for overflow, navigation reachability at every width (visible
*and* inside the viewport), focus restoration on every overlay, and a focus ring
on every input. `tests/e2e/perf-probe.spec.ts` reports LCP and flags it when the
LCP element sits inside a reveal.

Measured after: **LCP equals FCP on every route, 84–188ms.**

---

## 5. Acted on more cautiously

**The technology inventory (~120 items, six vector databases).** Both reviewers
called it keyword stuffing that contradicts the site's own thesis. It is also
verbatim from the résumé, and the résumé is the owner's document.

→ Not deleted. Instead the assistant's index now frames it as an inventory —
*"tools used or worked with, not a claim of depth in each"* — and it no longer
outranks passages describing real work. A test enforces the ranking.
`CONTENT_TODO.md` flags trimming it as the owner's call.

**Certifications.** Nine entries, seven of them undergraduate-era, one (SAP
ABAP) telling a different career story. → Trimmed to the two the résumé lists,
with the reasoning recorded in the file.

**`/writing/` — three essays, all Oct–Dec 2024.** The recruiter recommended
deleting the section outright as the strongest AI-generated signal on the site.

→ Not deleted. The factual contradictions in two of them were fixed. Deleting an
author's writing is their decision, not a reviewer's, and it is flagged in
`CONTENT_TODO.md` as the largest open content question.

---

## 6. Not fixed, and why

**Education has no dates.** The recruiter called this non-negotiable — every
other entry on the page is dated. The résumé does not give them, and inventing
dates on an education record is exactly the failure this whole document is
about. Flagged as the top content item.

**Two timeline gaps** (Nov 2022 – Aug 2024, May 2025 – Mar 2026) and two roles
in six months. Both were noticed immediately by the recruiter. Neither can be
explained without the owner.

**No evaluation results anywhere.** The strongest single criticism:

> *"There is not a single evaluation result on a site that positions evaluation
> as its core competence. The SMCP grid publishes zero scores; the method reads
> 'Read from the harness.'"*

Correct, and not fixable by editing the site — the harness exists, and the run
has not been done. It is the highest-value remaining item and is recorded as
such.

**DecisionForge is private and unverifiable.** Also the only featured project
with a model in a live answer path, which inverts the argument. The page says so
plainly; making the repository public needs a history rewrite first.

**RSC prefetch — 467 kB on `/projects/`.** Real, and the fix (disabling Next's
`<Link>` prefetch) trades measured bytes for a slower perceived navigation. Left
alone deliberately, recorded here.

---

## 7. What the reviewers said was working

Kept brief on purpose — the point of the exercise was the other list.

- The SMCP Gateway case study: *"a real engineer describing real design
  decisions with real trade-offs… This page alone would get a 45-minute call."*
- The correction discipline is real and visible: Statute's disowned F1, the
  Bootshift test count corrected against its own README.
- The two-layer GitHub design, with the asymmetry documented and enforced by
  tests: *"real data-modelling judgement."*
- `SystemDiagram` as typed data with an explicit model boundary: *"best idea on
  the site."*
- The contrast tooling: *"someone who actually debugged the problem rather than
  trusting a calculator."*
- Zero WCAG AA text-contrast failures in either theme, no keyboard traps, and
  correct focus order on all eight routes.
