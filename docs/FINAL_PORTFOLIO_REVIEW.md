# Final review

The same categories scored in [`CURRENT_PORTFOLIO_AUDIT.md`](./CURRENT_PORTFOLIO_AUDIT.md),
re-scored against what now ships.

Scored honestly, which means several categories moved less than the effort spent
on them, and two moved for reasons that are not flattering — a category can rise
because a liability was removed rather than because something was built.

---

## 1. Scorecard

| Category | Before | After | Δ | Why |
|---|---:|---:|---:|---|
| Visual design | 7 | 8 | +1 | A voice now — numbered rail, spec grammar. Still restrained by choice |
| Visual comfort | 9 | 8 | **−1** | Hairlines raised for WCAG; the page is slightly busier than the quieter original |
| Typography | 8 | 8 | 0 | Newsreader is more authoritative; the 10–11px tier is still dense |
| Information hierarchy | 7 | 9 | +2 | Numbered sections, one explorer over everything, evidence before prose |
| Recruiter usability | 6 | 8 | +2 | Role, employer, résumé, contact, GitHub above the fold. Education dates still missing |
| **Technical storytelling** | **4** | **9** | **+5** | Problem → constraints → architecture → decisions → evidence → limitations, with the model boundary drawn |
| **Project discovery** | **3** | **9** | **+6** | Nine entries, faceted search over domain and language, one surface for repos and engagements |
| Responsiveness | 8 | 9 | +1 | 13 routes × 11 widths, enforced. It was 8 while the header overflowed 388px |
| Mobile experience | 7 | 8 | +1 | Real overflow fixes; tap targets still short of 24px in places |
| Tablet experience | 7 | 8 | +1 | The 640–1023px band had no navigation at all. Now it does |
| Desktop experience | 8 | 8 | 0 | Still a narrow column on a 1920px screen |
| Navigation | 8 | 8 | 0 | Six flat items plus ⌘K, as before. Now reachable at every width |
| Animation quality | 7 | 8 | +1 | Above-the-fold exempted; motion only on state change |
| **Accessibility** | 7 | 9 | +2 | AA enforced in CI, focus rings restored, focus returned, axe on ten routes in both themes |
| Colour contrast | 8 | 9 | +1 | Computed, not judged — and it caught two failing tokens |
| **Performance** | 8 | 9 | +1 | LCP 1,056 → 188ms on `/`. Offset by 24 MB of PDFs |
| SEO | 7 | 9 | +2 | OG card, per-project `SoftwareSourceCode`, `ItemList`, full sitemap |
| Content quality | 7 | 8 | +1 | Denser and better sourced — but see §3 |
| Consistency | 8 | 8 | 0 | Figures that disagreed across pages were aligned |
| **AI identity** | **3** | **8** | **+5** | The site runs a grounded retriever that cites and declines. Not 10 — it retrieves, it does not reason |
| Originality | 5 | 8 | +3 | The spec language and the model-boundary diagrams are not a template |
| **Trustworthiness** | 7 | 9 | +2 | Provenance on every figure, limitations on every case study, verification in CI. See §3 |
| Maintainability | 8 | 9 | +1 | One registry, one sync, one index, all gated |
| **GitHub integration** | **0** | **9** | **+9** | Nightly sync, committed snapshot, graceful failure, editorial control |
| Contact experience | 6 | 7 | +1 | Same mailto composer, now with a focus ring and a clearer statement of what it does |
| Résumé accessibility | 4 | 9 | +5 | New résumé installed and made the source of truth for every claim |
| Overall professionalism | 7 | 9 | +2 | |

**Mean: 6.5 → 8.5.**

### The summary table the brief asked for

| Category | Before | After | Improvement |
|---|---:|---:|---:|
| UI | 7 | 8 | +1 |
| UX | 7 | 9 | +2 |
| Mobile | 7 | 8 | +1 |
| Projects | 3 | 9 | +6 |
| AI identity | 3 | 8 | +5 |
| Performance | 8 | 9 | +1 |
| Accessibility | 7 | 9 | +2 |
| Technical depth | 4 | 9 | +5 |
| Recruiter usability | 6 | 8 | +2 |

---

## 2. What actually changed the outcome

Not the redesign. The redesign was necessary and is not what moved the numbers.

**Getting the systems onto the site.** The audit's central finding was that the
strongest evidence — Bootshift, Statute, the MCP gateway, the complexity harness
— appeared nowhere. Five case studies now carry figures computed against clones,
with methods stated and limitations listed. That is the +6 and the +5.

**Removing 23 fabricated research entries.** Found by an independent reviewer,
confirmed mechanically: of 23 supervised entries, one named the author and two
matched the document they linked to. Nothing else on the site would have
mattered while that page was live.

**Making the site behave like the thing it claims to build.** A grounded
retriever that quotes verbatim, cites, and declines below a floor — with the
floor calibrated against questions it cannot answer, and the overlap between
answerable and unanswerable documented rather than hidden.

---

## 3. Where the scores are generous

**Trustworthiness at 9** is the hardest number here to defend, on a site that
until this week published 23 fabricated entries. The 9 reflects the machinery
now in place — per-figure methods, provenance notes, limitations sections, and
two verification scripts in CI — not a track record. A reviewer who knows the
history would be right to discount it.

**Content quality at 8** carries three unresolved problems: the technology
inventory still lists ~120 items including six vector databases on a site whose
thesis is "chosen per access pattern, not per fashion"; the three essays are
still dated 2024 and are the most generic writing on the site; and the
employment case studies still rest on résumé percentages that no reader can
check.

**AI identity at 8, not 10.** The assistant cannot compose a sentence, so it
cannot state something the site does not say. It also cannot synthesise, compare
or rephrase, and it will hand you a passage about "Google Cloud" if you ask
about Google. That is a real system with a real limitation, honestly labelled —
which is worth 8, not 10.

**Visual comfort went down.** Raising the hairlines to clear WCAG made the page
marginally busier. The original was more comfortable and less accessible; this
is the right trade and it is still a cost.

---

## 4. The largest remaining gap

Stated by the engineering reviewer and not fixable by editing the site:

> *"There is not a single evaluation result anywhere on a site that positions
> evaluation as its core competence."*

The SMCP Gateway has a 13 × 11 evaluation grid with graders named
`rows_are_grounded`, `no_ungrounded_numbers` and `impossible_fields_refused`.
The site publishes the grid's *shape* and none of its *results*, because the run
has not been done. A table of pass rates plus three failure cases with root
causes would be the highest-value addition available, and it is a day's work
against a harness that already exists.

Second: **DecisionForge is the only featured project with a model in a live
answer path, and the only one nobody can verify.** That inverts the argument the
site is making. It needs a history rewrite (a credential sits in 44 of its 51
commits) before it could be made public.

---

## 5. Open items

Tracked in [`CONTENT_TODO.md`](../CONTENT_TODO.md). The ones that matter:

1. **Rotate the leaked OpenWeatherMap key** in `WeatherTSR-Net` — live, public,
   in git history.
2. **Remove `info_data_final.xlsx`** from `profalign-ai` — 6,726 named faculty
   with derived difficulty ratings.
3. **Add education dates.** The only undated entries on a page of dated ones.
4. **Publish the SMCP evaluation results.**
5. Decide on the essays, and on trimming the technology inventory.
6. Add CI to the four repositories that lack it — the portfolio has a stricter
   pipeline than the work it showcases.

---

## 6. Honest position

Against AI-engineer portfolios generally: **top 5% on evidence and disclosure,
top 10% on craft.**

The discriminating feature is not the design. It is that five case studies end
with a section titled "What it cannot do", that every figure states how it was
obtained, that the assistant says when it does not know, and that the reasoning
for hiding nine repositories is written down in the source rather than left
implicit.

The remaining weakness is the mirror image of that strength: a great deal of
carefully-sourced description of systems, and almost no measurement of how well
any of them work.
