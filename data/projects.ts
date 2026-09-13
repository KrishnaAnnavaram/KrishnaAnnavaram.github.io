import type { SystemDiagram } from '@/lib/architecture'

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT REGISTRY — the editorial layer.

   GitHub is the source of truth for *what exists*: names, languages, commit
   recency, stars, READMEs. That comes from `data/generated/github.json`, which
   a scheduled workflow refreshes.

   This file is the source of truth for *what is said about it*: which projects
   are featured, in what order, under which domains, and with which narrative.
   Repository metadata changes on its own; the argument for a project does not.

   PROVENANCE RULE
   Every number in an `evidence` block was computed against a clone of the
   repository at the stated commit, not copied from a README. Where a README
   claims something the code does not support, this file follows the code.
   `method` records how each figure was obtained so a reader can re-run it.
   ═══════════════════════════════════════════════════════════════════════════ */

export const DOMAINS = {
  'agentic-ai': 'Agentic AI',
  'multi-agent': 'Multi-agent',
  rag: 'RAG',
  mcp: 'MCP',
  'legacy-modernisation': 'Legacy modernisation',
  'reverse-engineering': 'Reverse engineering',
  migration: 'Migration',
  evaluation: 'Evaluation',
  nlp: 'NLP',
  'machine-learning': 'Machine learning',
  'data-engineering': 'Data engineering',
  'cloud-mlops': 'Cloud & MLOps',
} as const

export type DomainId = keyof typeof DOMAINS

export interface Evidence {
  value: string
  label: string
  /** How the figure was obtained. A number without a method is an assertion. */
  method?: string
}

export interface Decision {
  title: string
  body: string
}

export type ProjectKind = 'system' | 'engagement'
export type ProjectStatus = 'featured' | 'listed' | 'hidden'

export interface Project {
  slug: string
  name: string
  /** One line. What it does, in the plainest available words. */
  tagline: string
  kind: ProjectKind
  /** Employer or institution, for engagement work. */
  org?: string
  year: string
  status: ProjectStatus
  /** Lower sorts first within a status band. */
  order: number
  domains: DomainId[]
  stack: string[]
  /** Repo name as it appears in the GitHub snapshot. Links the two layers. */
  repo?: string
  demo?: string

  /* ── Case-study body. Omit to render as an index entry only. ───────────── */
  problem?: string
  constraints?: string[]
  approach?: string[]
  diagram?: SystemDiagram
  decisions?: Decision[]
  evidence?: Evidence[]
  limitations?: string[]
  /** Shown verbatim in the case study. States what was checked and how. */
  provenance?: string
}

/* ═══════════════════════════════════════════════════════════════════════════
   DIAGRAMS
   ═══════════════════════════════════════════════════════════════════════════ */

const bootshiftDiagram: SystemDiagram = {
  id: 'bootshift-pipeline',
  title: 'Bootshift — twenty stages, one writer',
  caption:
    'The pipeline condensed to its three phases. Eleven analysis stages read but never write; six stages repeat per migration edge and are the only ones permitted to change source; three finalise. Every write in the middle band passes through a single gateway.',
  groups: [
    {
      label: 'Analysis — read-only (11 stages)',
      nodes: [
        {
          id: 'bs-inventory',
          label: 'Inventory & build resolution',
          summary: 'Reads the repository and resolves what the build actually declares.',
          kind: 'deterministic',
          detail: {
            inputs: ['Source repository', 'Maven/Gradle build files'],
            outputs: ['inventory_artifact.json', 'Resolved build model'],
            tech: ['JGit', 'JavaParser', 'Jackson'],
          },
        },
        {
          id: 'bs-graph',
          label: 'Application graph',
          summary: 'Builds the static structure: types, beans, configuration, dependencies.',
          kind: 'deterministic',
          detail: {
            outputs: ['Static application graph'],
            note: 'Static and runtime graphs are kept in separate layers and never merged, so a runtime observation cannot silently overwrite a static fact, or vice versa (ADR-003).',
          },
        },
        {
          id: 'bs-baseline',
          label: 'Baseline capture & seal',
          summary: 'Records pre-migration behaviour, then seals it. No stage may write before this.',
          kind: 'deterministic',
          detail: {
            outputs: ['Sealed baseline'],
            note: 'The seal is a precondition checked by the mutation gateway. Without it the run refuses to proceed rather than migrating against an unrecorded starting point.',
          },
        },
        {
          id: 'bs-impact',
          label: 'Impact & characterization',
          summary: 'Predicts what the upgrade touches and captures current behaviour as tests.',
          kind: 'deterministic',
          detail: {
            outputs: ['Impact set', 'Characterization tests'],
            note: 'Anything reached only through reflection, dynamic proxies or SpEL is capped at POSSIBLY_AFFECTED rather than being claimed as resolved.',
          },
        },
        {
          id: 'bs-plan',
          label: 'Migration plan — frozen',
          summary: 'Fixes the edge sequence and each edge’s validation depth before any write.',
          kind: 'deterministic',
          detail: {
            outputs: ['edge-plan.json'],
            note: 'Freezing the plan before mutation means the harness cannot quietly lower its own validation bar once a migration gets difficult.',
          },
        },
      ],
    },
    {
      label: 'Per migration edge — the only stages that write (6 stages, repeated)',
      nodes: [
        {
          id: 'bs-transform',
          label: 'Transformation',
          summary: 'Applies one recipe per batch, each computed against the current file hash.',
          kind: 'deterministic',
          detail: {
            tech: ['OpenRewrite 8.90.4', 'JavaParser'],
            note: 'One recipe at a time, because batching two recipes against the same pom.xml let the second write discard the first while the ledger recorded both as applied (ADR-007).',
          },
        },
        {
          id: 'bs-gateway',
          label: 'FileMutationGateway',
          summary: 'The single chokepoint every source write passes through.',
          kind: 'deterministic',
          detail: {
            inputs: ['Proposed change + base hash'],
            outputs: ['Hash-chained change ledger entry', 'Patch artifact'],
            note: 'A stale base hash is rejected rather than applied. Rejections are appended to the ledger too — a refused change is still a fact about the run.',
          },
        },
        {
          id: 'bs-validate',
          label: 'Build, test & runtime validation',
          summary: 'Rebuilds, reruns tests, and starts the services to observe real behaviour.',
          kind: 'deterministic',
          detail: {
            outputs: ['Rebuilt graph', 'Test results', 'Runtime observations'],
            note: 'The graph is rebuilt in full every edge. Incremental update is faster and is the classic source of silent drift (ADR-005).',
          },
        },
        {
          id: 'bs-differential',
          label: 'Differential validation',
          summary: 'Compares old against new on pre-declared dimensions.',
          kind: 'deterministic',
          detail: {
            outputs: ['Per-dimension verdict'],
            note: 'A dimension that could not be compared is reported NOT_COMPARED, never as passed. This is the stage that halted the reference run.',
          },
        },
      ],
    },
    {
      label: 'Finalization (3 stages)',
      nodes: [
        {
          id: 'bs-approval',
          label: 'Approval',
          summary: 'Decides between completion, a policy block, and escalation to a human.',
          kind: 'deterministic',
          detail: {
            outputs: ['Exit code: SUCCESS, STRUCTURED_REFUSAL, POLICY_BLOCK, HUMAN_DECISION_REQUIRED'],
          },
        },
        {
          id: 'bs-evidence',
          label: 'Evidence & provenance',
          summary: 'Seals the report, the SBOM and the provenance graph.',
          kind: 'output',
          detail: {
            outputs: ['Evidence bundle', 'CycloneDX 1.5 SBOM', 'Provenance graph'],
          },
        },
      ],
    },
  ],
  footnote:
    'No stage in this diagram is a model call. Bootshift ships an optional AI provider that is off by default and restricted to a loopback address; it can suggest, never authorise. The whole pipeline runs with it disabled.',
}

const complexityDiagram: SystemDiagram = {
  id: 'complexity-harness',
  title: 'Adaptive complexity harness — four stages, one contract',
  caption:
    'Three agents drive three deterministic scripts; a fourth stage runs only when a target migration language is named. The gate before stage 3 is the design’s whole point: an analyzer missing its declared inputs returns “insufficient_input”, never a zero.',
  groups: [
    {
      nodes: [
        {
          id: 'ch-inventory',
          label: 'Stage 1 — Inventory',
          summary: 'Declaration-only scan. Never enters a method body.',
          kind: 'agent',
          detail: {
            outputs: ['inventory_artifact.json'],
            note: 'Kept deliberately shallow so that stage 2 owns all body-level parsing and the two cannot disagree.',
          },
        },
        {
          id: 'ch-parser',
          label: 'Stage 2 — Parser',
          summary: 'Hand-written tokenizer builds the language-neutral Normalized Tree.',
          kind: 'agent',
          detail: {
            outputs: ['normalized_tree.json', 'Control-flow, call and dependency graphs'],
            tech: ['Python standard library only'],
          },
        },
        {
          id: 'ch-gate',
          label: 'The input gate',
          summary: 'Checks each analyzer’s declared inputs before it is allowed to run.',
          kind: 'deterministic',
          detail: {
            outputs: ['insufficient_input, naming the missing field'],
            note: 'Centralised rather than left to each analyzer author, because enforcement left to twenty authors is enforcement that will be forgotten (AD-02).',
          },
        },
        {
          id: 'ch-complexity',
          label: 'Stage 3 — Complexity',
          summary: 'Discovers, orders, gates, runs and merges twenty analyzers.',
          kind: 'agent',
          detail: {
            inputs: ['Normalized Tree'],
            outputs: ['complexity_artifact.json', 'One report per skill'],
            note: 'Analyzers are found by filename glob. Nothing holds a list of the twenty, so adding a twenty-first requires no edit anywhere else.',
          },
        },
        {
          id: 'ch-target',
          label: 'Stage 4 — Target fit',
          summary: 'Projects the tree onto a target language and re-runs the same analyzers.',
          kind: 'deterministic',
          detail: {
            inputs: ['Normalized Tree', 'Target language descriptor'],
            outputs: ['target/<lang>/complexity_artifact.json'],
            note: 'Runs only when a target language is named, and calls stage 3’s own functions rather than a second implementation.',
          },
        },
      ],
    },
  ],
  footnote:
    'There is no model anywhere in this pipeline, and no third-party Python package either — the harness runs on the standard library, because the clients it was designed for are frequently air-gapped.',
}

const decisionForgeDiagram: SystemDiagram = {
  id: 'decisionforge-pipeline',
  title: 'DecisionForge — nine stages, three of them deterministic',
  caption:
    'A question in English becomes a chart and a written finding. The stages shaded as model calls are the only ones that reach an LLM; chart selection, aggregation and response assembly are plain code, which is why they cost nothing and behave identically on every run.',
  groups: [
    {
      label: 'Synchronous — the user is waiting',
      nodes: [
        {
          id: 'df-pre',
          label: 'Pre-classifier',
          summary: 'Decides whether the message is a data question at all. No model call.',
          kind: 'deterministic',
          detail: {
            note: 'Runs before anything else so greetings and small talk never reach a paid model. The cheapest request is the one that is never made.',
          },
        },
        {
          id: 'df-guard',
          label: 'Guardrail',
          summary: 'PII redaction, rate limiting, and a safety decision.',
          kind: 'model',
          detail: {
            tech: ['Presidio', 'Redis', 'GPT-5-mini'],
            note: 'This stage fails closed — an exception produces a block, not a pass. Every other stage fails open, because a missing chart is recoverable and an unscreened query is not.',
          },
        },
        {
          id: 'df-intent',
          label: 'Intent & clarification',
          summary: 'Classifies what is being asked; asks at most one clarifying question.',
          kind: 'model',
          detail: { tech: ['GPT-5.2'] },
        },
        {
          id: 'df-sql',
          label: 'SQL generation',
          summary: 'Discovers the live schema, plans a query, validates and executes it.',
          kind: 'model',
          detail: {
            inputs: ['Runtime schema', 'Intent'],
            outputs: ['Result set'],
            tech: ['GPT-5.2', 'asyncpg', 'Redis cache'],
            note: 'Schema is read from whatever database is connected rather than hardcoded. When generation fails, a 378-line deterministic builder assembles valid GROUP BY SQL from the schema alone, so the user gets a result instead of an error.',
          },
        },
        {
          id: 'df-viz',
          label: 'Visualization',
          summary: 'Profiles the fields, scores candidate charts, builds the figure.',
          kind: 'deterministic',
          detail: {
            outputs: ['Plotly figure'],
            note: 'Chart choice is a constraint-and-scoring problem, not a language problem. Doing it in code makes it explainable and free.',
          },
        },
        {
          id: 'df-insight',
          label: 'Insight detection & narrative',
          summary: 'Detects statistical findings deterministically, then writes them up.',
          kind: 'model',
          detail: {
            note: 'The split matters: the findings are computed, and the model only phrases them. A model asked to both find and describe a pattern will find one either way.',
          },
        },
        {
          id: 'df-compose',
          label: 'Composer',
          summary: 'Assembles the reply. No model call.',
          kind: 'output',
        },
      ],
    },
    {
      label: 'Background — after the reply is sent',
      nodes: [
        {
          id: 'df-memory',
          label: 'Memory',
          summary: 'Extracts durable context for later sessions.',
          kind: 'model',
          detail: { tech: ['Claude Haiku 4.5'] },
        },
        {
          id: 'df-eval',
          label: 'Quality scoring',
          summary: 'Scores the turn with a rule-based and LLM hybrid.',
          kind: 'model',
          detail: {
            note: 'Runs on a daemon thread with its own event loop, so evaluation never adds latency to the answer it is grading.',
          },
        },
      ],
    },
  ],
  footnote:
    'Three models are routed by stage rather than one model used everywhere: the expensive one for SQL and intent, a small one for guardrails and scoring, and Haiku for memory extraction.',
}

const smcpDiagram: SystemDiagram = {
  id: 'smcp-gateway',
  title: 'SMCP Gateway — three agents, and a credential that never reaches the reasoning layer',
  caption:
    'A risk question is answered in four movements: a free pre-flight gate, a grounded derivation of what data is actually needed, a bounded negotiation with the layer that knows what is retrievable, and execution behind two MCP servers. The agents reason; only the data server holds a database role, and it is read-only.',
  groups: [
    {
      label: 'Understand — before anything is retrieved',
      nodes: [
        {
          id: 'smcp-preflight',
          label: 'Pre-flight gate',
          summary: 'Regex and lexicon decide whether the question is answerable at all.',
          kind: 'deterministic',
          detail: {
            outputs: ['Completeness verdict'],
            note: 'Sub-millisecond, no model call and no vector search. An unanswerable question is stopped before it costs anything.',
          },
        },
        {
          id: 'smcp-orchestrator',
          label: 'Orchestrator',
          summary: 'Classifies the turn into an eight-field structured contract.',
          kind: 'agent',
          detail: {
            note: 'It never imports the other two agents. It addresses them by id over A2A, and a test asserts the import is absent — so either specialist could move to another host without changing this file.',
          },
        },
        {
          id: 'smcp-retrieval',
          label: 'Grounded retrieval',
          summary: 'Two Qdrant collections behind an exact-key Redis lookup.',
          kind: 'store',
          detail: {
            tech: ['Qdrant', 'Redis'],
            outputs: ['Methodology passages with citations'],
            note: 'Methodology questions are answered from a risk corpus rather than model recall, because a parameter recalled from training is unfalsifiable.',
          },
        },
        {
          id: 'smcp-derive',
          label: 'Domain Expert — derive',
          summary: 'Proposes a data requirement, then checks its own figures against the source.',
          kind: 'model',
          detail: {
            note: 'Every number in the proposal must appear verbatim in a retrieved passage. A figure the model produced but cannot point at fails the grounding check.',
          },
        },
      ],
    },
    {
      label: 'Negotiate — bounded, and allowed to fail',
      nodes: [
        {
          id: 'smcp-capabilities',
          label: 'MCP Agent — capabilities',
          summary: 'Advertises 34 capabilities, narrowed from 56 underlying tools.',
          kind: 'agent',
          detail: {
            outputs: ['Tool catalogue: 30 executable, 4 informational'],
            note: 'Deliberately fewer than exist. A planner choosing under uncertainty gets worse, not better, with every near-duplicate option added.',
          },
        },
        {
          id: 'smcp-loop',
          label: 'Bounded negotiation',
          summary: 'At most five rounds, and at most two that change nothing.',
          kind: 'model',
          detail: {
            outputs: ['AGREED requirement, or a refusal'],
            note: 'A par yield curve has no instrument identifiers, so a method needing them is unanswerable. The loop terminates with a refusal rather than a plausible substitute.',
          },
        },
      ],
    },
    {
      label: 'Execute — across the privilege boundary',
      nodes: [
        {
          id: 'smcp-data',
          label: 'Data MCP server',
          summary: '14 tools over Postgres, holding a read-only role.',
          kind: 'deterministic',
          detail: {
            tech: ['MCP over stdio', 'PostgreSQL'],
            note: 'Bulk numeric data returns out of band rather than through model context — a 250-day matrix is 1,250 values, and truncating one midway would corrupt a result silently.',
          },
        },
        {
          id: 'smcp-risk',
          label: 'Risk engine MCP server',
          summary: '42 tools. No database credential, no model, no network.',
          kind: 'deterministic',
          detail: {
            outputs: ['VaR, stress results, sensitivities, the parameters actually used'],
            note: 'Launched with a sanitised environment, and a test asserts no module in it imports a database driver. The engine must return the same number every time.',
          },
        },
        {
          id: 'smcp-validate',
          label: 'Validate & answer',
          summary: 'Checks the result, strips identifiers, assembles a cited reply.',
          kind: 'agent',
        },
      ],
    },
  ],
  footnote:
    'The split into two servers is the product, not an implementation detail: when a number looks wrong there are exactly two causes — bad input or bad arithmetic — and separating them makes each checkable in isolation.',
}

const statuteDiagram: SystemDiagram = {
  id: 'statute-pipeline',
  title: 'Statute — eight stages, and no model in any of them',
  caption:
    'Oracle PL/SQL becomes a business requirements document, diagrams and a knowledge graph. Every stage is an independent CLI program chained by versioned JSON on disk; the structure comes from a formal grammar and every sentence is assembled by rule.',
  groups: [
    {
      nodes: [
        {
          id: 'st-inventory',
          label: '1 · Inventory',
          summary: 'Classifies the source files and assigns each a stable identifier.',
          kind: 'deterministic',
          detail: {
            note: 'The identifier hashes the path rather than the contents, so editing a file preserves its identity across runs.',
          },
        },
        {
          id: 'st-parser',
          label: '2 · Parser',
          summary: 'A formal PL/SQL grammar produces statements and a control-flow graph.',
          kind: 'deterministic',
          detail: {
            tech: ['ANTLR4', 'sqlglot'],
            note: 'A grammar rather than regular expressions, because regex cannot survive nested blocks, string literals containing keywords, or CASE inside CASE.',
          },
        },
        {
          id: 'st-data',
          label: '3 · Data',
          summary: 'Turns DDL into a schema model, its enforcement state, and an ERD.',
          kind: 'deterministic',
          detail: {
            note: 'A disabled constraint is recorded as not being enforced. Presenting it as an active business rule would be the easiest possible way to produce a confident, wrong document.',
          },
        },
        {
          id: 'st-logic',
          label: '4 · Logic',
          summary: 'Pseudocode, two complexity metrics, and program slices.',
          kind: 'deterministic',
          detail: {
            note: 'McCabe for testability and Cognitive Complexity for understandability. The Maintainability Index was rejected: averaging hides the outliers where the risk actually is.',
          },
        },
        {
          id: 'st-rules',
          label: '5 · Rules',
          summary: 'Extracts business rules from nine distinct kinds of source evidence.',
          kind: 'deterministic',
          detail: {
            outputs: ['41 rules on the reference corpus, each graded by confidence'],
          },
        },
        {
          id: 'st-diagram',
          label: '6 · Diagram',
          summary: 'Builds a diagram model, then renders it — two separate steps.',
          kind: 'deterministic',
          detail: {
            note: 'The previous version formatted diagram strings inline while walking the graph, which meant there was nothing to count and nothing to assert on. Separating the model from the renderer took the test suite from 7 checks to 52.',
          },
        },
        {
          id: 'st-synthesis',
          label: '7 · Synthesis',
          summary: 'Assembles the document, marking each requirement’s modality.',
          kind: 'output',
          detail: {
            outputs: ['2,549-line BRD', 'Traceability index', 'Register of 21 gaps'],
            note: 'A constraint the database enforces is stated as necessary; a guard in code is stated as obligatory. The distinction is what makes the document usable by a builder rather than only a reader.',
          },
        },
        {
          id: 'st-graph',
          label: '8 · Graph',
          summary: 'Emits a loadable knowledge graph for querying the result.',
          kind: 'output',
          detail: { tech: ['Neo4j (optional consumer)'] },
        },
      ],
    },
  ],
  footnote:
    'No language model generates, summarises, judges or rewrites any output — verified by searching every module for LLM SDK imports and finding none. Hallucination is not reduced here; it is structurally unavailable, which is what lets every claim in the document cite a file and a line.',
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [
  {
    slug: 'smcp-gateway',
    name: 'Semantic MCP Data Access Gateway',
    // Delivered at Virtusa as "Smart Quant"; the repository keeps the
    // descriptive name. Both refer to the same system.
    tagline:
      'Three agents negotiate what data a risk question actually needs — and the layer that reasons never holds a database credential.',
    kind: 'system',
    year: '2026',
    status: 'featured',
    order: 0,
    domains: ['agentic-ai', 'multi-agent', 'mcp', 'rag', 'evaluation'],
    stack: [
      'Python',
      'MCP',
      'A2A',
      'FastAPI',
      'PostgreSQL',
      'Qdrant',
      'Redis',
      'React',
      'TypeScript',
      'LangSmith',
    ],
    repo: 'semantic-mcp-data-access-gateway',
    problem:
      '"What is the 10-day 99% VaR on this book?" is three questions wearing one coat. One is methodological and its answer lives in a risk corpus, not a database. One is a capability question — a par yield curve carries no instrument identifiers, so any method needing them is simply unanswerable against this data. Only the third is retrieval and arithmetic. The obvious architecture, user to model to unrestricted SQL to a dump of rows, fails all three at once: it loses the quoting basis, recalls parameters from training that nobody can falsify, returns nine thousand dates when asked for a curve, has no way to refuse, and runs with a credential that is one bug away from writing to the source of record.',
    constraints: [
      'The process doing the reasoning could not be allowed to hold a writable database credential.',
      'A risk figure had to be reproducible — the same inputs must produce the same number on every run.',
      'The system had to be able to say a question was unanswerable, rather than answering a nearby one.',
    ],
    approach: [
      'Split the work across three agents addressed over A2A — an orchestrator, a domain expert, and an agent that owns tool access — each advertising its skills on a card, with requests refused if they name a skill the card does not carry.',
      'Put a free pre-flight gate in front of everything: regular expressions and a lexicon decide in under a millisecond whether the question is complete enough to be worth a model call.',
      'Grounded methodology in two retrieved corpora, then required every figure in the derived plan to appear verbatim in a retrieved passage — a number the model produced but cannot point at fails the check.',
      'Made the domain expert and the tool agent negotiate the data requirement over at most five rounds, terminating early if two rounds change nothing, and allowed the outcome to be a refusal.',
      'Narrowed 56 underlying MCP tools down to 34 advertised capabilities, because a planner choosing under uncertainty gets worse with every near-duplicate option it is offered.',
      'Split data access from computation into two MCP servers: the data server holds a read-only Postgres role; the risk engine holds no credential, no model and no network, and a test asserts that no module inside it imports a database driver.',
      'Returned bulk numeric data out of band rather than through model context — a 250-day matrix is 1,250 values, and a truncation partway through would corrupt a result silently rather than loudly.',
    ],
    diagram: smcpDiagram,
    decisions: [
      {
        title: 'Two MCP servers, split by failure attribution',
        body: 'When a VaR number looks wrong there are exactly two possible causes: bad input, or bad arithmetic. With the split, each is checkable on its own — replay the same payload through the engine, or query the data server for provenance. Combined into one server, you are guessing. This is the boundary the product is built on rather than an implementation detail.',
      },
      {
        title: 'The reasoning layer holds no credential',
        body: 'The risk engine is launched with a sanitised environment containing no connection string, and its own module documentation lists what is deliberately absent: any database driver, any language model, any network access. It has to return the same number every time, and a model anywhere in that path would make the claim untrue.',
      },
      {
        title: 'Documentation drift is treated as a failing test',
        body: 'When a document claims five risk tools and the server registers forty-two, the count is not merely stale — it is evidence nobody reconciled the two. So the authoritative inventory is derived from the registered tools at test time and the documents are checked against it, never the reverse.',
      },
      {
        title: 'Strict validation because a silent wrong answer is the worst outcome',
        body: 'A renamed field parses cleanly and turns into a null three layers downstream, where it is indistinguishable from a legitimate absence. Structured output is validated against its schema strictly and loudly, on the principle that a loud failure costs a retry and a quiet one costs trust in every number the system has ever produced.',
      },
    ],
    evidence: [
      {
        value: '1,839',
        label: 'tests, collected and counted rather than estimated',
        method: 'pytest --collect-only against a clone, with the dependency floors the project actually pins',
      },
      {
        value: '267,517',
        label: 'rate observations across 52 series, 1990 to 2026',
        method: 'Recounted directly from the committed source CSVs without a database, and matched to the documented figure exactly',
      },
      {
        value: '56',
        label: 'MCP tools registered — 14 data, 42 risk — narrowed to 34 advertised',
        method: 'Both servers booted locally and list_tools() called; counts are what the servers actually return',
      },
      {
        value: '13 × 11',
        label: 'evaluation grid: cases scored against graders including groundedness and refusal',
        method: 'Read from the harness — graders include rows_are_grounded, no_ungrounded_numbers and impossible_fields_refused',
      },
      {
        value: '~53,900',
        label: 'lines of Python across 175 files, plus 6,488 of TypeScript',
        method: 'Counted by directory; the figure excludes nothing and includes the 13,383 lines of tests',
      },
    ],
    limitations: [
      'The container build is broken. It copies a path that a refactor moved, so it fails on the first instruction — and even repaired, it installs three of the five distributions. There is no working containerised deployment today.',
      'One of the two model backends cannot plan a data request at all. Its schema caps are lower than the planning contract requires, and no arrangement of the parameters satisfies both. This is recorded as a strict expected-failure so that it will fail loudly if it is ever silently "fixed".',
      'A fully negotiated turn takes between 110 and 370 seconds and makes six to thirteen model calls. This is a reasoning system, not an interactive one.',
      'Session memory is an in-process dictionary. A restart loses every conversation.',
      'There is no authentication. Allow-lists authorise against caller-supplied metadata, which is not a security boundary.',
      'The demonstration portfolio is a single synthetic five-position book, labelled as synthetic end to end. The VaR figures are an analytical demonstration, not a regulatory calculation.',
      'No CI. The test suite is substantial and nothing runs it automatically.',
    ],
    provenance:
      'Every published figure here was recomputed against a clone: the tests were collected, both MCP servers were booted and asked for their tool lists, and the dataset was recounted from the raw CSVs. Where the repository’s own documentation and its code disagree, this page follows the code.',
  },

  {
    slug: 'bootshift',
    name: 'Bootshift',
    tagline: 'A Spring Boot migration harness that refuses to claim more than it verified.',
    kind: 'system',
    year: '2026',
    status: 'featured',
    order: 1,
    domains: ['agentic-ai', 'multi-agent', 'legacy-modernisation', 'migration', 'evaluation'],
    stack: ['Java 21', 'Maven', 'OpenRewrite', 'JavaParser', 'JGit', 'ArchUnit', 'Jackson', 'Picocli'],
    repo: 'bootshift',
    problem:
      'A Spring Boot major upgrade is not a version bump. It changes the namespace from javax to jakarta, the security configuration model, the Java baseline, the auto-configuration mechanism, hundreds of property names and the whole transitive dependency graph — at once. The tools that exist answer "it compiles." The question a team actually has is "does it still do the same thing?" Nothing answers that, so the work falls back on manual review of a diff nobody can hold in their head.',
    constraints: [
      'Enterprise clients are frequently air-gapped, so the transformation path cannot depend on a hosted service.',
      'A migration tool that is wrong silently is worse than no tool, because it transfers confidence it has not earned.',
      'Source-available Spring migration recipes could not be depended on, and recreating them was not affordable either.',
    ],
    approach: [
      'Split the pipeline into twenty stages across three phases, with eleven read-only analysis stages that must complete before anything is permitted to write.',
      'Routed every source modification through one FileMutationGateway, and enforced that with an ArchUnit rule that walks bytecode for direct filesystem calls from the transformation packages — so "only the gateway writes" is a property the build checks, not a convention.',
      'Made every change append to a hash-chained ledger, including rejected ones, so the record of a run covers what was refused as well as what was applied.',
      'Froze the migration plan — edge order and per-edge validation depth — before the first write, so the harness cannot lower its own bar once an edge gets hard.',
      'Declared the old-versus-new comparison as a contract up front: each dimension is MUST_MATCH, EXPECTED_TO_DIFFER or UNCONSTRAINED, and a dimension that could not be compared is reported NOT_COMPARED rather than passed.',
      'Kept the optional AI provider restricted to a loopback address and off by default, with seven tests asserting the boundary. It can suggest a repair; it cannot authorise one.',
    ],
    diagram: bootshiftDiagram,
    decisions: [
      {
        title: 'File identity is allocated, not derived',
        body: 'Path identity breaks the moment SecurityConfig.java is renamed; content-hash identity breaks on the first edit. A migration is precisely the operation that changes both, so each file gets an allocated ID that survives rename, split and merge — which is what makes the change ledger traceable across the whole run.',
      },
      {
        title: 'Validated artifacts outrank the state machine',
        body: 'The run state says where the pipeline is; versioned artifacts say what is true. When they disagree, state is reconstructed from the artifacts and never the other way round. Writes advance a `latest.json` pointer only after schema validation passes, so a half-written artifact is never the one a later stage reads.',
      },
      {
        title: 'The graph is rebuilt in full every edge',
        body: 'Incremental update is much faster and is the classic source of silent drift — and the failure is invisible precisely because the mechanism that would detect it is the thing that broke. Reversing this decision is gated on a test asserting the incremental graph equals the full rebuild.',
      },
      {
        title: 'One recipe per batch, each pinned to a base hash',
        body: 'An earlier version batched recipes. Two of them targeting the same pom.xml were both computed from the pre-edge file, so the second write silently discarded the first — and the ledger recorded both as applied. Now a stale base hash is rejected outright.',
      },
    ],
    evidence: [
      {
        value: '35,928',
        label: 'lines of harness code across 140 files',
        method: 'git ls-files on the six Maven modules; excludes the sample Spring Boot application the harness analyses',
      },
      {
        value: '191',
        label: 'test methods across 21 test classes',
        method: 'Static count of @Test at HEAD. The README says 143; the README undercounts two suites and omits five classes entirely',
      },
      {
        value: '20',
        label: 'pipeline stages — 11 analysis, 6 per-edge, 3 finalization',
        method: 'Read from PipelineOrchestrator, not from the documentation',
      },
      {
        value: '542',
        label: 'property-migration rules, generated rather than hand-written',
        method: 'rule_count in migration-rules/generated-properties/property-migration-rules.json',
      },
      {
        value: '1 of 8',
        label: 'migration edges completed on the reference run before it halted',
        method: 'reports/BOOTSHIFT_FINAL_IMPLEMENTATION_AND_PIPELINE_REPORT.json',
      },
    ],
    limitations: [
      'No migration has been carried through end to end. On the reference corpus the run completed one of eight planned edges and then halted on a policy block: one configuration property appeared only in the new build and the cause could not be verified. That is the designed outcome — the harness will not manufacture an explanation — but it means the system is demonstrated, not proven in production.',
      'Stages 18 to 20 are written and wired but have never been executed by a completed run, so they are unverified in practice.',
      'Runtime validation can only characterise what it can start. On the reference corpus one of six modules never starts, and that gap is emitted as a named blind spot rather than hidden.',
      'There is no CI in the repository. The test suite is real and runs locally; nothing runs it automatically.',
      'No kernel-level sandbox — a malicious Maven plugin the repository already trusts would run with the harness’s privileges.',
    ],
    provenance:
      'Figures here were computed against a clone at HEAD (merge of #1, 10 Sep 2026), not taken from the README. Where the two disagree — notably the test count — this page follows the code.',
  },

  {
    slug: 'statute',
    name: 'Statute',
    tagline:
      'Reverse-engineers an undocumented Oracle PL/SQL system into a requirements document — with no language model anywhere in the generation path.',
    kind: 'system',
    year: '2026',
    status: 'featured',
    order: 2,
    domains: ['reverse-engineering', 'legacy-modernisation', 'evaluation'],
    stack: ['Python 3.11', 'ANTLR4', 'sqlglot', 'Mermaid', 'Neo4j (optional)'],
    repo: 'statute',
    problem:
      'An organisation runs a working system whose documentation is missing and whose authors have left. Before it can be modernised, replaced or audited, somebody has to answer what it does and which rules it enforces — and the only remaining authority on that is the source. The tempting approach is to point a language model at the code and ask. The reason not to is specific: a deterministic extractor that misses a rule fails visibly, and a generative one that invents a rule fails invisibly. In a document that will be used to rebuild a system, an invented rule is worse than a missing one, because nothing downstream will question it.',
    constraints: [
      'The output is consumed by builders, not only readers, so every statement had to be traceable to a file and a line.',
      'Published evidence puts specification extraction near 90% precision while end-to-end code generation lands near 9% — so the pipeline had to stop where the evidence stops.',
      'Nested blocks, keywords inside string literals and CASE within CASE rule out regular expressions as a parsing strategy.',
    ],
    approach: [
      'Built eight independent CLI programs chained by versioned JSON artefacts on disk — no orchestrator, no shared state, no service, so any stage can be rerun and inspected on its own.',
      'Parsed with a formal Oracle PL/SQL grammar and decomposed SQL with a dedicated library, so structure is derived rather than guessed.',
      'Assembled every sentence of the document by rule from the resulting parse trees, which is what makes the same source produce the same document every run.',
      'Extracted business rules from nine distinct kinds of evidence — conditional branches, named and predefined exceptions, CASE branches, variable derivations, check constraints, cursor eligibility, failure isolation and error contracts — and graded each by confidence.',
      'Recorded a disabled database constraint as not enforced, rather than presenting it as an active business rule.',
      'Marked each requirement’s modality: a constraint the database enforces is necessary; a guard in application code is obligatory.',
      'Separated the diagram model from the diagram renderer after the previous inline version proved untestable — which took that stage’s checks from 7 to 52.',
    ],
    diagram: statuteDiagram,
    decisions: [
      {
        title: 'No model call anywhere, as the central thesis',
        body: 'This is the decision the project exists to test. Because nothing generates text, hallucination is not reduced — it is structurally unavailable, which is what makes it safe for every claim in the output to cite a source line. The recorded cost is stated just as plainly: prose quality is bounded by the quality of the templates, and the naming heuristics took substantial iteration to get right.',
      },
      {
        title: 'Two complexity metrics, and one deliberately rejected',
        body: 'McCabe measures testability and Cognitive Complexity measures understandability; they answer different questions and both are reported. The Maintainability Index was rejected because its volume term has no consensual definition, and because averaging complexity hides exactly the power-law outliers where the real risk lives.',
      },
      {
        title: 'Identity hashes the path, not the contents',
        body: 'A file identifier derived from contents changes on the first edit, which breaks traceability precisely when a document is being maintained. Hashing the path keeps identity stable across edits, which is what lets a requirement still point at its source after the code moves on.',
      },
    ],
    evidence: [
      {
        value: '414',
        label: 'assertions across eight suites, all passing',
        method: 'All eight suites run locally and PASS lines counted. These are assertions, not test functions — the suites use a custom check harness',
      },
      {
        value: 'Zero',
        label: 'language-model imports anywhere in the repository',
        method: 'Searched every module for every major LLM SDK. No matches — and no network, environment or database imports in the pipeline either',
      },
      {
        value: '41',
        label: 'business rules and 21 recorded gaps extracted from the reference corpus',
        method: 'Read from the generated artefact, alongside a 2,549-line requirements document',
      },
      {
        value: '0.588',
        label: 'rule-extraction F1 on blind measurement, with 0.400 recall',
        method: 'The tuned figure is 1.000 and the project disowns it — ground truth was used to fix the extractor, so only the blind numbers are reported here',
      },
    ],
    limitations: [
      'The extraction F1 the harness prints is contaminated: the ground truth was used to fix the extractor. Only the blind figures — 0.588 F1 and 0.400 recall — are defensible, and they are the ones published above.',
      'It has only ever been run against a single banking corpus of five objects and fifteen tables. It has never been pointed at unfamiliar PL/SQL.',
      'Coverage metrics demonstrate completeness, not usefulness. A document can cover every branch and still fail to explain the business.',
      'Concepts cannot be recovered from code. What the pipeline produces are solution and functional requirements; genuine business requirements are not recoverable from an implementation.',
      'One relationship type is computed by the diagram stage and never emitted by the graph stage — the loop that would write it is empty.',
      'There is no dependency manifest, no CI, no container and no logging framework.',
    ],
    provenance:
      'All eight test suites were run and their assertions counted; the zero-model claim was verified by searching the whole repository for LLM SDK imports; the rule and gap counts come from the generated artefacts. The README badge says "414 tests" — they are 414 assertions across 50 test functions, and that is how they are described here.',
  },

  {
    slug: 'adaptive-legacy-complexity-harness',
    name: 'Adaptive Legacy Complexity Harness',
    tagline:
      'Scores legacy code on twenty complexity dimensions, and refuses to return a number when it is missing the inputs.',
    kind: 'system',
    year: '2026',
    status: 'featured',
    order: 3,
    domains: ['agentic-ai', 'legacy-modernisation', 'migration', 'evaluation'],
    stack: ['Python 3.11', 'Standard library only', 'unittest'],
    repo: 'adaptive-legacy-code-complexity-harness',
    problem:
      'The project began with a defect that did not raise an error. Feeding one analyzer a tree built in another analyzer’s format produced "units seen: 0" and a clean-looking result. Worse, several analyzers ignored their file argument entirely and printed complete reports from hardcoded demo data — confirmed by handing one a file declaring an invented language and getting a report about Java back. Running the full suite would have produced seven genuine results and thirteen fabricated ones, with nothing on the page distinguishing them.',
    constraints: [
      'Target clients are frequently air-gapped, where installing a package can take weeks — so no third-party dependency was available.',
      'A complexity threshold that is right for Java is meaningless for COBOL, where the same score is unremarkable.',
      'Twenty analyzers written over time will not all remember to validate their own inputs.',
    ],
    approach: [
      'Defined one language-neutral Normalized Tree and made every analyzer read only that, never source text — so an analyzer cannot be fed a format it does not understand.',
      'Moved input validation into a single gate that runs before any analyzer function is called. An analyzer starved of its declared inputs returns insufficient_input naming the gap, and physically cannot return a zero instead.',
      'Made analyzer discovery a filename glob over the skills directory, so nothing anywhere holds a list of the twenty and adding a twenty-first requires no edit elsewhere.',
      'Banded results L1–L5 against language-aware thresholds rather than reporting raw scores, because the same cyclomatic number means different things in different languages.',
      'Required corroboration before flagging a hotspot: a unit is only a hotspot when two or more independent analyzers band it L4 or L5, since a unit flagged by one analyzer is usually that analyzer’s bias.',
      'Built an adversarial judge with ten checks, and a deliberately defective canary analyzer that the judge must flag as critical or the self-test fails.',
    ],
    diagram: complexityDiagram,
    decisions: [
      {
        title: 'Absence of measurement and absence of complexity are different facts',
        body: 'This is the rule the whole harness rests on. A zero is a claim about the code; insufficient_input is a claim about the harness. Conflating them is what made the original defect invisible, so the distinction is enforced centrally rather than documented as guidance.',
      },
      {
        title: 'The auditor has to be capable of failing',
        body: 'The judge passed all twenty analyzers on its first run, which is equally consistent with a judge that cannot detect anything. So a canary analyzer with five planted defects was added. It caught four and missed one — and the miss is what produced a tenth check, which then immediately found two real defects in shipped analyzers that read line counts they never declared.',
      },
      {
        title: 'Unreviewed language descriptors are penalised numerically',
        body: 'A drafted target-language profile scores 0.6 against a reviewed one’s 1.0. All five shipped descriptors are currently marked unreviewed, so the project applies the penalty to itself rather than exempting its own defaults.',
      },
    ],
    evidence: [
      {
        value: '20 / 20',
        label: 'dimensions measured on the reference tree; 18 of 20 on the committed Java runs',
        method: 'Reproduced locally: run_pipeline.py against samples/cobol_payroll.tree.json. The two unmeasured dimensions on the Java runs are named and explained rather than scored',
      },
      {
        value: '21',
        label: 'unit tests, all passing in 0.11s',
        method: 'python -m unittest discover — run, not counted. They cover stage 4 only; the analyzers are verified by the judge instead',
      },
      {
        value: '0',
        label: 'third-party Python dependencies',
        method: 'Every top-level import across all 37 .py files enumerated; all are standard library',
      },
      {
        value: '4 of 5',
        label: 'planted defects caught by the judge’s self-test',
        method: 'tools/judge.py --self-test reproduced locally: 20 pass, 1 critical, canary correctly flagged',
      },
    ],
    limitations: [
      'Band calibration is judgement, not measurement. The thresholds reflect published practice and field experience, not a statistical study of a corpus.',
      'A tree is only as good as its parser — an insufficient_input result often indicates a parser gap rather than clean code.',
      'Stage 4 has no adversarial judge yet. It is covered by the twenty-one unit tests and nothing more.',
      'Only three fields of the target-language descriptor actually drive projection. Richer fields are read by the written report but carry no score impact, so a codebase relying on fixed-point arithmetic gets no penalty for that risk yet.',
      'There is no CI. The checks are manual, and they are the only thing between a defect and main.',
    ],
    provenance:
      'The test suite, the judge self-test and the reference pipeline run were all reproduced locally against a clone. Counts of agents and skills were read from the directories, not the README — whose summary line is stale on both.',
  },

  {
    slug: 'decisionforge',
    name: 'DecisionForge',
    tagline:
      'Natural-language business intelligence over any PostgreSQL database, with the model boundary drawn deliberately.',
    kind: 'system',
    year: '2026',
    status: 'featured',
    order: 4,
    domains: ['agentic-ai', 'multi-agent', 'evaluation', 'data-engineering'],
    stack: [
      'Python',
      'Streamlit',
      'PostgreSQL',
      'asyncpg',
      'Redis',
      'Plotly',
      'Presidio',
      'GPT-5.2',
      'Claude Haiku 4.5',
    ],
    // Private repository — deliberately no `repo` link. See limitations.
    problem:
      'Ad-hoc business questions queue behind whoever can write SQL. The obvious fix — put an LLM in front of the database — fails in a specific way: it works against the schema it was demonstrated on, and breaks against the next one. It also tends to be built as one model call doing everything, which makes the output impossible to explain when a stakeholder asks why a particular chart was chosen or where a number came from.',
    constraints: [
      'The system had to work against a database it had never seen, with no schema hardcoded anywhere in the query path.',
      'A failure in any single stage could not be allowed to lose the user’s turn.',
      'Queries carry personal data, so identifiers had to be screened before anything left the process.',
    ],
    approach: [
      'Split the turn into nine stages with a typed contract between each, so a failure in one degrades the response instead of ending it.',
      'Put a zero-cost classifier in front of every model call, so greetings and non-data messages never reach a paid API.',
      'Discovered the schema at runtime through a single tool boundary over asyncpg, which is what lets the same deployment answer questions about an unfamiliar database.',
      'Wrote a deterministic SQL builder that assembles a valid aggregate query from the schema alone, used whenever generation fails — a rate limit produces a narrower answer rather than an error message.',
      'Kept chart selection, aggregation and response assembly entirely in code: field profiling, candidate generation, a constraint engine and a scoring pass. Those stages make no model call at all.',
      'Separated statistical detection from narration — findings are computed, and the model is only asked to phrase them, because a model asked to find a pattern will report one whether or not it is there.',
      'Made the guardrail fail closed and every other stage fail open, then cached generated SQL in Redis against a fingerprint of the schema so a schema change invalidates it automatically.',
    ],
    diagram: decisionForgeDiagram,
    decisions: [
      {
        title: 'Two stages that look like model work are not',
        body: 'Chart selection and response assembly are the stages most systems hand to an LLM. Both are deterministic here. Choosing a chart is a constraint satisfaction problem over field types and cardinality — code does it more cheaply, more consistently, and can explain the choice afterwards.',
      },
      {
        title: 'One fail-closed stage, the rest fail open',
        body: 'The guardrail is the only stage where an exception produces a refusal. Everywhere else an exception produces an empty typed object and the turn continues, because a missing insight panel is a degraded answer while an unscreened query is a different category of problem.',
      },
      {
        title: 'Evaluation runs after the user has their answer',
        body: 'Memory extraction and quality scoring are offloaded to a daemon thread with its own event loop. Scoring a response is genuinely useful and genuinely slow; making the user wait for it would trade the thing they asked for against the thing they did not.',
      },
    ],
    evidence: [
      {
        value: '95 / 110',
        label: 'tests passing with no database, cache or API key present',
        method: 'pytest run locally against a clone; the remaining failures need live PostgreSQL and Redis, except one genuine logic defect in the volatility detector',
      },
      {
        value: '78',
        label: 'source modules, 15,619 lines excluding tests',
        method: 'Counted across the repository, tests excluded and reported separately',
      },
      {
        value: '3',
        label: 'of nine stages reach a model; the rest are deterministic',
        method: 'Traced from the orchestrator through every reachable call site',
      },
    ],
    limitations: [
      'The repository is private, so nothing on this page can be independently verified by a reader. The figures above were computed against a clone, and that is the only assurance available here.',
      'Per-stage cost and latency figures exist in the project’s own design notes but were never measured — no benchmark was run and no results were recorded, so none of them are reproduced here.',
      'PII redaction fails open: if Presidio is unavailable the text passes through unchanged. That is the wrong default for a production deployment and is a known gap rather than a decision.',
      'One statistical detector does not fire on its own test input. The test is correct and currently fails.',
      'Vector columns are declared in the schema but no embedding is ever computed, so there is no semantic memory despite the table supporting it.',
    ],
    provenance:
      'Verified by reading the orchestrator and every stage it reaches, then running the test suite. Where the project’s own notes and its code disagree — on which stages call a model, and on cost — this page follows the code and omits the unmeasured figures.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   DELIBERATELY NOT PUBLISHED

   These repositories exist and are public, and are omitted on purpose. The
   reasoning is recorded here rather than left implicit, because "why is this
   not on the site" is a question worth being able to answer.

   virtual-professor-ai   The code is a working FAISS retrieval chatbot. Its
                          README describes a multi-agent LangGraph system with
                          Redis memory, hybrid retrieval and a library API, and
                          reports evaluation figures. The graph has one node,
                          Redis appears nowhere in the source, only FAISS is
                          wired, and nothing in the repo produces the figures.
                          Linking it would invite a reviewer to check.

   ResumeForge-AI         Genuinely well-architected — a LangGraph workflow with
                          Postgres checkpointing and human-in-the-loop gates.
                          It has no README and no tests, so a visitor arriving
                          from here would find an unexplained repository.

   springboard            The largest codebase and the only one with a real test
                          suite, but it automates LinkedIn Easy Apply with
                          credentialed login and detection-avoidance pacing.
                          Publishing it on a job-seeking portfolio is a poor
                          trade whatever its engineering quality.

   WeatherTSR-Net         Contains a live API key in committed notebooks.
   profalign-ai           Contains 6,726 rows of named faculty with derived
                          difficulty ratings.
   medxpert               The README describes a stack the code does not
                          contain, and the app cannot start from a fresh clone.
   pick-n-play            A 109-line app inside a committed virtualenv.
   eda-strategies         A PowerPoint and a licence file.
   web-Scraping           Empty — zero commits.

   Several of these become publishable with modest work. CONTENT_TODO.md lists
   what each one needs.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   Selectors
   ═══════════════════════════════════════════════════════════════════════════ */

const byOrder = (a: Project, b: Project) => a.order - b.order

export const visibleProjects = projects.filter((p) => p.status !== 'hidden').sort(byOrder)

export const featuredProjects = projects.filter((p) => p.status === 'featured').sort(byOrder)

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** Projects with enough body to render a case-study page. */
export const caseStudyProjects = visibleProjects.filter((p) => Boolean(p.problem))

/** Domains actually used by at least one visible project, in taxonomy order. */
export function activeDomains(): { id: DomainId; label: string; count: number }[] {
  const counts = new Map<DomainId, number>()
  for (const p of visibleProjects) {
    for (const d of p.domains) counts.set(d, (counts.get(d) ?? 0) + 1)
  }
  return (Object.keys(DOMAINS) as DomainId[])
    .filter((id) => counts.has(id))
    .map((id) => ({ id, label: DOMAINS[id], count: counts.get(id)! }))
}
