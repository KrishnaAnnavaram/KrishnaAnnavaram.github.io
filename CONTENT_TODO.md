# Content that needs your input

Updated after the résumé at `public/resume/resume.pdf` replaced the previous one
and became the source of truth for every claim on the site.

Nothing here blocks the site — it builds and deploys as-is.

---

## Resolved by the new résumé

These were open and no longer are:

- **Virtusa and Ideate now have real detail.** Both roles previously carried
  generic responsibilities with no metrics, marked `needsDetail`. They now carry
  the actual work and the actual figures, and the flag is gone.
- **The résumé no longer contradicts the site.** The old PDF listed WorkingFox
  and Creative Sense and gave a different Cognizant title and date range. The
  current one matches what the site says, because the site is now written from it.
- **Two case studies were factually wrong and are corrected.** The Cognizant
  study described healthcare claims, SAP ICM and Workday; the work was incentive
  compensation for a medical-device sales organisation, using S3, Lambda,
  SageMaker Batch Transform, NLTK and XGBoost. The Lemoius study described BERT
  and sentence embeddings; the work used TF-IDF and cosine similarity.
- **Azure AI-102 is back.** It was removed earlier because no source document
  listed it. The current résumé does.
- **A new case study was added** for the Graph-RAG clinical decision support
  system at Ideate, which was not represented anywhere before.

---

## 1. Rotate a leaked API key — do this today

`WeatherTSR-Net` has a **live OpenWeatherMap API key committed in plaintext** in
`Final Project_Code.ipynb` (and in its byte-identical duplicate notebook), in all
three commits of a public repository.

Deleting the file does not help — the value is in git history. **Rotate the key.**
The repo is hidden from the portfolio until this is done.

## 2. Remove a dataset of named individuals

`profalign-ai` commits `info_data_final.xlsx`: 6,726 rows of named, identifiable
faculty with a derived "Course Difficulty Index" and Hard/Easy labels.

Publishing difficulty ratings of named academics is a privacy and reputational
liability. The repo is hidden from the portfolio until the dataset is removed
from the working tree and from history.

## 3. Repositories that are hidden, and what each needs

Set `status` in `data/projects.ts` to un-hide any of these once fixed. The
reasoning for each is recorded in that file.

| Repo | What it needs |
|---|---|
| `ResumeForge-AI` | A README and a test suite. The architecture is genuinely good — LangGraph with Postgres checkpointing and human-in-the-loop gates — but a visitor arriving from here finds an unexplained repository. Also: the internal classes named "MCP" are not the Model Context Protocol, and describing them that way to a technical reader is a claim the code does not support. |
| `virtual-professor-ai` | The README describes a multi-agent LangGraph system with Redis memory, hybrid retrieval and a library API, and reports evaluation figures. The graph has one node, Redis appears nowhere in the source, only FAISS is wired, the library integration returns mock data, and nothing in the repo produces the figures. Correct the README to describe the working FAISS retrieval chatbot it actually is. It also names three collaborators while the README claims sole authorship. |
| `springboard` | Three things: the default branch is `claude/springboard-job-automation-PthuG`, which is the public face of the repo; `audit_report.md` is committed and stale, advertising six "critical" bugs that a later commit already fixed; and it automates LinkedIn Easy Apply with credentialed login, which is a User Agreement problem on a job-seeking portfolio. |
| `medxpert` | The README lists MarianMT, spaCy, FastAPI, MLflow, Docker, Power BI, GitHub Actions, Azure and GCP — none appear in the code. `database/` is gitignored and was never committed, so the app cannot start from a fresh clone. `qdrant-client` and `pytesseract` are imported but missing from requirements, and the pinned `openai==0.28.1` is incompatible with the API the code calls. |
| `pick-n-play` | 4,122 of 4,130 tracked files are a committed virtualenv. The actual app is 109 lines. `git rm -r --cached playenv/`. |
| `eda-strategies` | Three files: a PowerPoint, a licence and a README that names a different filename than the one committed. Nothing to fix — consider deleting. |
| `web-Scraping` | Zero commits, zero bytes. Delete it; an empty public repo is a small unforced credibility hit. |

## 4. DecisionForge has a credential in its history

`decisionforge-ai` is private and is presented on the site **without a repository
link** for that reason. Before it could ever be made public: a hardcoded password
string sits in `.devcontainer/devcontainer.json` and `setup.sh`, present in 44 of
its 51 commits. History would need rewriting, not just a deletion commit.

Its own documentation also overstates several things the code does not do —
Stage 5 and Stage 7 make no model calls, no embedding is ever computed despite
the vector columns, and there is no QLoRA. The case study on this site follows
the code and omits the unmeasured cost and latency figures entirely.

## 5. Two gaps in the timeline

Nothing between **Nov 2022 and Aug 2024** (presumably the move to the US and the
start of the MS) or between **May 2025 and Mar 2026**. The site does not draw
attention to either, but an interviewer will notice. Worth having an answer
ready, or adding the roles if they exist.

## 6. Headshot

`public/images/profile/portrait.jpg` is your original photo cropped to portrait
framing — which also removed the generative-AI watermark that was in the
bottom-right corner of the source file. A real photograph would serve you better.

## 7. The CWE remediation harness has no public artefact

The résumé describes a 7-agent, 9-stage CWE vulnerability detection and
auto-remediation harness. It appears in your Virtusa experience on the site, but
there is no repository for it, so it gets no case study. If a public or shareable
version exists, it is the one remaining piece of Virtusa work that could carry a
full write-up.

## 8. Writing

The three essays carried over from the previous site.
`healthcare-llm-production.mdx` was originally written in the first person as
though you had deployed clinical LLM systems. At the time that was unsupported;
the current résumé does describe a hospital-deployed Graph-RAG system at Ideate,
so the first-person framing is now defensible and could be restored. Read it over
and make sure it sounds like you.
