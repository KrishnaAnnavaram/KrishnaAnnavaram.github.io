# The writing standard: ASD-STE100 Simplified Technical English

Use these rules for every README and for `docs/ste-style-guide.md` in each repository. Copy this file
into the repository as `docs/ste-style-guide.md` and add a **project vocabulary** section (Section 3)
with the technical names and technical verbs of that project.

## 1. The writing rules

### Words

1. Use one word for one meaning, and one meaning for one word. Do not use synonyms for variety.
2. Use a word only as one part of speech. For example, `test` is a noun or a verb, `check` is a verb.
3. Do not use phrasal verbs (`set up`, `carry out`, `find out`, `pick up`, `look up`, `come up with`).
   Use one verb: `prepare`, `do`, `find`, `get`, `make`.
4. Do not use an `-ing` form as a noun or an adjective (`the running job`, `after indexing`).
   Exception: a technical name, a file name, a command or a status value.
5. Do not use contractions (`don't`, `it's`, `can't`). Do not use slang or idioms
   (`out of the box`, `under the hood`, `at a glance`, `gotcha`, `bells and whistles`).
6. Do not use `and/or`. Write `A, B or both`.
7. Do not use `should`, `could`, `would` or `may` for instructions. Use `must` for a rule, the
   imperative for a step and `can` for a possibility.
8. Keep the articles `a`, `an` and `the` in sentences.
9. Do not make a noun cluster of more than three words. A technical name is one word.

### Sentences

1. A procedural sentence (an instruction) has a maximum of **20 words**.
2. A descriptive sentence has a maximum of **25 words**.
3. Write one instruction in one sentence.
4. Use the imperative for an instruction: `Run the tests.` Not `The tests should be run.`
5. Use the active voice. Use the passive voice only when the agent of the action is not important.
6. Use only the simple present, the simple past and the simple future.
7. Put a condition before the instruction: `If the index is stale, build it again.`
8. Do not use semicolons in sentences. Write two sentences.

### Paragraphs, notes and warnings

1. A paragraph has one topic and a maximum of **6 sentences**. Start with the topic sentence.
2. A warning or a caution starts with a clear command. Then it gives the reason.
3. A note gives information. It does not give an instruction.
4. Use a vertical list for a sequence or a set of conditions. Each item of a numbered procedure is one step.

### Tables, headings and diagrams

1. A table cell can be a short phrase. If a cell has a sentence, the sentence obeys the rules.
2. A heading is a noun phrase (`The cost model`) or an imperative (`Run the demo`).
   Do not start a heading with an `-ing` form.
3. A diagram label is a short phrase. Use the same terms as the text.

### What STE does not change

Code, commands, file names, paths, field names, environment variables, status values, enum values,
product names and URLs stay exactly as they are. They are technical names. Put them in backticks.

## 2. General words to replace

| Do not use | Use |
|---|---|
| utilize, leverage | use |
| in order to | to |
| set up | prepare, install, configure |
| carry out, perform | do |
| make sure, ensure | make sure (allowed), or `check that` |
| a lot of, lots of | many, much |
| e.g., i.e. | for example, that is |
| should (instruction) | must (rule) / imperative (step) |
| might, may (possibility) | can |
| very, really, just, simply, easily | (delete) |
| seamless, robust, powerful, blazing | (delete or give a measured fact) |

## 3. Project vocabulary

This section gives the technical names and the technical verbs of KrishnaAnnavaram.github.io, the
personal portfolio site of Krishna Annavaram. The README uses each term with only this meaning.

### 3.1 Technical names (nouns)

| Term | Meaning | Do not use |
|---|---|---|
| **site** | The static Next.js export that GitHub Pages serves at `https://krishnaannavaram.github.io` | app, web app, portal |
| **page** | One HTML file in `out/` that a route makes | screen, view |
| **route** | One folder under `app/` that makes one or more pages | endpoint, URL path |
| **flagship system** | One of the 6 projects in `data/projects.ts` with `status: 'featured'` | hero project, main project |
| **project case study** | The page of one flagship system at `/projects/<slug>/` | write-up, project page |
| **employment case study** | One entry of `data/work.ts`, shown at `/work/<slug>/` | job story, work sample |
| **role** | One entry of `data/experience.ts` | job, position |
| **archive** | The 75 earlier repositories in `data/archive.json` | old projects, backlog |
| **registry** | `data/projects.ts`: what the site says about each project, and which projects it shows | catalogue, config |
| **snapshot** | `data/generated/github.json`: what GitHub says exists, committed | cache, dump |
| **sync** (noun) | One run of `scripts/sync-github.mjs` | refresh, crawl |
| **knowledge index** | `public/ai/knowledge.json`: the passages that the assistant can retrieve | vector store, corpus file |
| **passage** | One chunk of the knowledge index, with a heading, a text and a source | document, snippet |
| **assistant** | The "Ask" dialog that retrieves passages and cites them | chatbot, AI, bot |
| **relevance floor** | The minimum score (`SCORE_FLOOR`) that a passage needs before the assistant shows it | threshold, cut-off |
| **citation** | The source link that the assistant shows with each passage | reference, footnote |
| **architecture diagram** | A `SystemDiagram` object that the site renders as accessible HTML | image, chart |
| **node kind** | The `kind` of one diagram node: `source`, `deterministic`, `model`, `agent`, `human`, `store` or `output` | node type, category |
| **model boundary** | The line between the deterministic stages and the model or agent stages of a system | AI layer |
| **composition bar** | The bar that shows how many stages of a system are script, model or agent, human gate, or data | stack bar, mix |
| **design token** | A CSS custom property in `app/globals.css`, for example `ink-muted` | colour variable |
| **résumé** | `public/resume/resume.pdf`, the source of truth for each claim on the site | CV |
| **verify job** | The `verify` job of `deploy.yml` | checks, pipeline |

### 3.2 Technical verbs

| Verb | Meaning |
|---|---|
| **sync** | Fetch repository metadata from the GitHub API and write the snapshot |
| **build** | Run `npm run build`: rebuild the knowledge index and the Open Graph card, then export the pages |
| **export** | Write the static pages to `out/` (`output: 'export'`) |
| **index** | Make the knowledge index from the data modules and the essays |
| **retrieve** | Score the passages for a question and select the best passages |
| **cite** | Show the source link of a passage |
| **decline** | Show no passage, because no passage reaches the relevance floor |
| **render** | Make HTML from typed data |
| **verify** | Run the typecheck, lint, contrast check, unit tests, build and E2E tests |
| **deploy** | Publish `out/` to GitHub Pages |
