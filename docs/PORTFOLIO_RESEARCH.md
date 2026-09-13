# Portfolio Research

Research conducted before any code was changed, to establish what actually works in
engineering portfolios at the top end of the field — and specifically what an *AI
engineer's* portfolio has to do differently.

Sources are real sites that were fetched and read, not listicles. Where a marketing
article is cited it is because it reports recruiter behaviour, not design taste.

---

## 1. Executive summary

The best engineering portfolios in 2026 have converged on something that looks, at first
glance, like an anticlimax: **they are mostly text.**

Eugene Yan (Anthropic), Linus Lee, Hamel Husain, Lee Robinson and Brittany Chiang all run
sites with no gradient meshes, no particle fields, no 3D hero, no scroll-jacking. What they
have instead is a single declarative sentence above the fold, a flat four-to-six item
navigation, and a very high density of verifiable specifics.

This is not minimalism as an aesthetic preference. It is a signal. A portfolio that leans on
visual effects invites the reading *"the effects are the work."* A portfolio that leans on
specifics invites the reading *"the work is the work."* For an engineer whose actual output
is systems, the second reading is the one worth engineering for.

The craft still has to be visible — but it shows up in **interaction detail and
information design**, not decoration. Rauno Freiberg's site is the clearest case: it is
typographically plain and its reputation rests entirely on the precision of small
interactions (copy-to-clipboard feedback, focus behaviour, transition timing).

The corollary, which matters here: **a portfolio's visual restraint only reads as
confidence if the content underneath it is dense.** Restraint over thin content reads as
emptiness. The design direction therefore cannot be decided independently of how much
verifiable engineering evidence is available to show.

---

## 2. Benchmark matrix

| Portfolio | Hero | Navigation | Projects | Storytelling | Interactivity | Mobile | Performance | AI features | Core strength |
|---|---|---|---|---|---|---|---|---|---|
| [eugeneyan.com](https://eugeneyan.com) | One sentence of positioning + current role at Anthropic | Flat, 5 items + search | 19 prototypes, separated from 212 writing pieces | Very high — every claim links to a post | Low, deliberate | Good | Fast, static | Subject matter only | Multiple discovery paths: Latest / 50k+ reads / personal favourites |
| [thesephist.com](https://thesephist.com) | "My name is Linus." Research areas before credentials | Flat, 4 items (posts, projects, stream, RSS) | 100+ side projects, *not* exhaustively listed — categorised | High, associative — hyperlinked concepts | Low | Good | Very fast, text-only | Research framing | Associative navigation; depth signalled by delegation to sub-sites |
| [hamel.dev](https://hamel.dev) | Course banner + 20-yr credibility line | Flat, 4 items (Blog, Notes, OSS, Teaching) | OSS separated from writing | High | Low | Good | Fast | Evals as the entire brand | Trust signals stacked immediately: 5,000+ students, cited by OpenAI, Airbnb/GitHub |
| [brittanychiang.com](https://brittanychiang.com) | "I build accessible, pixel-perfect experiences for the web." | Anchor-based, sticky left rail | Cards with imagery + tech pills; separate full archive | Medium — role-scoped, not problem-scoped | Medium — spotlight cursor, active-section tracking | Excellent | Fast (Next.js) | None | The most-copied layout in the field; two-pane sticky/scroll split |
| [leerob.com](https://leerob.com) | Name + "engineer and writer" + current employer | Minimal | Notes as *conceptual* nav, not chronological | Medium | Low | Good | WebP, responsive sizing | Subject matter only | Thematic nav over chronological; one hand-painted illustration carries all the personality |
| [rauno.me](https://rauno.me) | "Rauno Freiberg is an Estonian interaction designer working with Vercel." | Flat, 5 items + year archives | Projects secondary to principles | Low prose, high craft | **Very high, micro-scale** | Excellent | Fast | None | Craft demonstrated through interaction precision, not visual weight |

### What the matrix says

- **Nobody at the top end has a decorated hero.** Six of six lead with a sentence.
- **Nobody has more than six primary navigation items.** Four is the mode.
- **Everybody separates content *types*** — writing from projects from talks. Nobody
  presents one undifferentiated grid.
- **Interactivity is either near-zero or micro-scale.** There is no middle ground of
  "moderate ambient animation," which is exactly where most mediocre portfolios sit.

---

## 3. Recurring patterns worth adopting

**One-sentence positioning above the fold.** Not a tagline, a claim. "I build accessible,
pixel-perfect experiences for the web" tells you the specialisation *and* the value
system. A recruiter who reads only that line has enough to route the candidate.

**Flat navigation.** Four to six items, no dropdowns, no mega-menu. Depth is reached by
landing on a section index, not by hovering.

**Content-type separation.** Writing, projects, talks and open source are different things
with different reader intents, and top sites never merge them into one feed.

**Multiple entry points into the same corpus.** Eugene Yan's "Latest / 50k+ reads / my
favourites" is the strongest single pattern found. It respects that a recruiter, a peer
engineer and a returning reader want different doors into the same 212 posts.

**Numbers with provenance.** "11,800+ readers," "5,000+ engineers," "212 posts," "cited by
OpenAI." Every number on these sites is one the owner can prove. None of them are rounded
marketing figures.

**Credibility stacked early, personality placed late.** Affiliations and evidence go above
the fold. The Tardis easter egg goes in the footer. The hand-painted skyline goes at the
bottom. Personality is a reward for scrolling, never the first impression.

**Delegation for depth.** Linus Lee does not try to fit 100 projects on one page — he
categorises and links out. Attempting completeness on a single surface is what produces
the endless identical-card grid.

---

## 4. Common mistakes

**The undifferentiated card grid.** Twelve projects rendered as twelve identical cards
communicates that the author cannot rank their own work. It forces the reader to do triage
the author should have done. The fix is explicit hierarchy — a small number of deep case
studies, then an index.

**Ambient motion with no informational job.** Animated gradients, drifting particles,
looping backgrounds. These cost battery, cost paint time, fight the text for attention, and
— critically — are the single strongest "template" tell. None of the six benchmark sites has
any.

**Skill bars and logo walls.** A grid of forty technology logos with no indication of depth
is negative information: it says the author measures competence by exposure. Recruiters read
"React 90%, Python 85%" as self-assessment noise.

**Claims without artefacts.** "Built a scalable RAG pipeline" with no repository, no
architecture, no evaluation numbers and no live link is indistinguishable from a tutorial
follow-along. This is the single most common failure in AI portfolios specifically.

**Text over imagery or gradients.** Guarantees a contrast failure at some viewport and
reads as amateur at every viewport.

**The blocking chat widget.** A popup that covers content on mobile to offer help nobody
asked for. If an AI feature is present it must be invited, not imposed.

**Burying contact.** Requiring a scroll to the footer of a long page to find an email
address adds friction at the exact moment the reader has decided to act.

**Rounded, unverifiable metrics.** "Improved performance by 50%" with no baseline. Careful
readers discount every other number on the page once they spot one.

---

## 5. What an AI engineer's portfolio must do differently

This is where generic software-engineer portfolio advice stops being sufficient.

The field has an oversupply problem: a very large number of candidates can produce a
Streamlit app that calls an LLM API. Reported recruiter red flags are explicit about this —
*"GPT-4 wrapper, no original work,"* *"no eval, just vibes,"* *"benchmark claims without
numbers,"* *"five copy-pasted Streamlit demos."*
([Data Expert](https://www.dataexpert.io/blog/ultimate-guide-ai-engineering-portfolios),
[Elite AI Advantage](https://eliteaiadvantage.com/blog/ai-portfolio-projects-get-hired-ai-engineer))

So the discriminating question a reviewer is really asking is: **did this person build a
system, or did they call an API?**

Six things answer that question, and a normal frontend portfolio needs none of them:

**1. Architecture, shown not asserted.** A diagram of the actual components and the actual
data flow. Where the retrieval boundary is. What is deterministic and what is model-driven.
This is the fastest possible proof that a system exists.

**2. Evaluation.** How the system was measured, against what, and what it scored. Reported
recruiter scanning explicitly looks for "eval rigor" within ~90 seconds. A portfolio with an
eval table beats one with a nicer hero, every time.

**3. Failure modes and limitations, stated by the author.** Counter-intuitively this is a
trust *multiplier*. An author who documents what their system cannot do is demonstrating
they measured it. A "Known limitations" section signals engineering maturity more strongly
than any success metric.

**4. Cost and latency.** Tokens per request, p50/p95. These are the numbers that separate
someone who has run a system in production from someone who has demoed one.

**5. The model boundary.** Which decisions the model makes, and which ones the code makes.
Any candidate who can articulate this precisely is immediately in a different tier — it is
the core architectural question in applied GenAI, and most portfolios do not even
acknowledge it exists.

**6. Determinism and reproducibility claims.** If any part of the system is deterministic,
say so and explain why that was the right call. Understanding when *not* to use a model is
a senior signal.

### What matters less than people think

Model fine-tuning trophies, leaderboard scores, and Kaggle placements. A deployed system
with documented evals reportedly outperforms a fine-tuned model with no live endpoint for
most hiring decisions.

---

## 6. Recommended direction

Synthesising the above into a direction for this specific portfolio.

**The strategic situation is unusual and it should drive everything.** The strongest
evidence this candidate has is not the résumé — it is a set of repositories containing
genuinely substantial, unusually well-documented systems work (a multi-agent Spring Boot
migration harness; a deterministic PL/SQL reverse-engineering pipeline with an explicit
zero-LLM generation path; a multi-agent MCP/A2A data gateway; an adaptive complexity
harness). Very few candidates applying for GenAI roles have artefacts of this shape.

None of it is currently on the site.

So the recommended direction is not primarily a visual one:

**Lead with the systems.** The home page's job is to get a reader from "who is this" to
"here is a real system, here is its architecture, here is the repository" in one scroll.
Case studies should be the spine of the site, not a section within it.

**Design for density, not for drama.** Because the content is dense and technical, the
visual system should be quiet and structural: strong typographic hierarchy, generous
measure, monospace for data and identifiers, one accent colour used to mean one thing. No
ambient motion. This matches all six benchmark sites and, more importantly, it is the only
treatment that lets an architecture diagram and a prose paragraph coexist on one page
without fighting.

**Make architecture a first-class content type.** Not an image dropped into a case study —
a rendered, theme-aware, readable-on-mobile diagram derived from the real system. This is
the single highest-leverage differentiator available, because it is the thing the reviewer
most wants and least often gets.

**Separate the two audiences explicitly.** A recruiter needs role, specialisation,
strongest work, résumé and contact in under 30 seconds. An engineer needs architecture,
tradeoffs, model boundaries and source code. These are different reading speeds. The
structure should serve the first on the home page and the second one click in, rather than
compromising both into a middle.

**Earn the AI claim through the site's own behaviour.** A portfolio that *says* the author
builds grounded retrieval systems, while its own assistant hallucinates, actively damages
the claim. Whatever assistant ships must be grounded, must cite, and must be able to say
"I don't have that." Building it that way is itself the demonstration — and it means the
mechanism should be visible, not hidden behind a chat bubble.

**Treat the absence of ambient motion as a deliberate, stated choice.** Given the category
is saturated with decorated templates, restraint is differentiating — but only if the
density is there to justify it. Which, per the point above, it now is.
