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

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [
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
]

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
