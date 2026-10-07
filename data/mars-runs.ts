/* ═══════════════════════════════════════════════════════════════════════════
   MARS — four recorded runs, replayed on the home page.

   Every verdict below is transcribed from the evidence MARS commits for each
   issue under docs/agent_output/ (00-issues … 07-ship), read at commit
   007b0a2 (2026-10-03). Nothing is simulated except the pacing: the replay
   steps at a fixed interval, and the site claims no durations.

   All four runs end Blocked. That is the point of showing them — the pipeline
   declined to ship four drafted fixes, including two that a re-scan, a
   red-team pass and a behaviour guard had all cleared, because the build and
   QA gate failed.
   ═══════════════════════════════════════════════════════════════════════════ */

export const MARS_EVIDENCE_COMMIT = '007b0a2'
export const MARS_REPO = 'https://github.com/KrishnaAnnavaram/MARS'

export type StepKind = 'deterministic' | 'model' | 'human'
export type Tone = 'pass' | 'fail' | 'warn' | 'info'

export interface TraceStep {
  /** The pipeline agent or gate, as MARS names it. */
  agent: string
  /** What the stage does, in one line. */
  action: string
  kind: StepKind
  /** The artefact MARS wrote, relative to docs/agent_output/. */
  artefact: string
  /** The recorded result. */
  result: string
  tone: Tone
  /** The replay waits here for the reader to approve, as MARS waits for a person. */
  gate?: boolean
}

export interface MarsRun {
  id: string
  title: string
  severity: 'Critical' | 'High' | 'Medium'
  cwe: string
  cweName: string
  score: number
  threshold: number
  decision: 'Blocked' | 'Cleared'
  hardGates: string[]
  steps: TraceStep[]
}

interface Verdicts {
  rescan: 'FIXED' | 'STILL_VULNERABLE'
  redteam: 'NO_BYPASS_FOUND' | 'BYPASS_FOUND'
  behavior: 'BEHAVIOR_PRESERVED' | 'BEHAVIOR_CHANGED'
}

/** The stage sequence is fixed by the pipeline contract; only verdicts vary. */
function steps(id: string, cwe: string, v: Verdicts, score: number, threshold: number, gates: string[]): TraceStep[] {
  return [
    {
      agent: '00 · Issue register',
      action: 'Read the reported issue from the register',
      kind: 'deterministic',
      artefact: '00-issues/issue-register.xlsx',
      result: id,
      tone: 'info',
    },
    {
      agent: '01 · Architect',
      action: 'Parse the workspace, build the knowledge graph, document the architecture',
      kind: 'model',
      artefact: '01-architecture/architecture.md',
      result: 'graph loaded',
      tone: 'info',
    },
    {
      agent: '02 · Root-cause analyst',
      action: 'Correlate the report with the call graph and the code',
      kind: 'model',
      artefact: `02-root-cause/root_cause_${id}.md`,
      result: cwe,
      tone: 'info',
    },
    {
      agent: '03 · Blast-radius analyst',
      action: 'Trace affected services, endpoints and jobs',
      kind: 'model',
      artefact: `03-blast-radius/blast_radius_${id}.md`,
      result: 'mapped',
      tone: 'info',
    },
    {
      agent: '04 · Fix generator — plan',
      action: 'Propose a CWE-aligned remediation plan. Never a diff',
      kind: 'model',
      artefact: `04-remediation/fix_plan_${id}.md`,
      result: 'Proposed',
      tone: 'info',
    },
    {
      agent: 'Human approval',
      action: 'A person reviews the plan. No code is drafted until it is marked Approved',
      kind: 'human',
      artefact: `04-remediation/fix_plan_${id}.md`,
      result: 'Approved',
      tone: 'pass',
      gate: true,
    },
    {
      agent: '04 · Fix generator — diff',
      action: 'Draft the smallest diff; compile it in a throwaway git worktree',
      kind: 'model',
      artefact: `04-remediation/fix_${id}.diff`,
      result: 'Compile Failed',
      tone: 'fail',
    },
    {
      agent: '05 · Re-scan',
      action: 'Does the original finding still trigger against the patch?',
      kind: 'model',
      artefact: `05-verify/rescan_${id}.md`,
      result: v.rescan,
      tone: v.rescan === 'FIXED' ? 'pass' : 'fail',
    },
    {
      agent: '05 · Red-team',
      action: 'Can the patch be bypassed?',
      kind: 'model',
      artefact: `05-verify/redteam_${id}.md`,
      result: v.redteam,
      tone: v.redteam === 'NO_BYPASS_FOUND' ? 'pass' : 'fail',
    },
    {
      agent: '05 · Behaviour guard',
      action: 'Did behaviour change beyond what the plan intended?',
      kind: 'model',
      artefact: `05-verify/behavior_${id}.md`,
      result: v.behavior,
      tone: v.behavior === 'BEHAVIOR_PRESERVED' ? 'pass' : 'warn',
    },
    {
      agent: '06 · Test & build gate',
      action: 'Run a new regression test and mvn verify — script-decided, never agent-judged',
      kind: 'deterministic',
      artefact: `06-test-gate/qa_${id}.md`,
      result: 'QA gate Failed',
      tone: 'fail',
    },
    {
      agent: '07 · Merge arbiter',
      action: `Score the evidence against the severity threshold; apply hard gates (${gates.join(', ')})`,
      kind: 'deterministic',
      artefact: `07-ship/verdict_${id}.md`,
      result: `${score}/100 < ${threshold} — Blocked`,
      tone: 'fail',
    },
  ]
}

export const marsRuns: MarsRun[] = [
  {
    id: 'ISSUE-002',
    title: 'Employee PII and payroll data exposed to unauthenticated callers and written to logs',
    severity: 'Critical',
    cwe: 'CWE-306',
    cweName: 'Missing Authentication for Critical Function',
    score: 0,
    threshold: 90,
    decision: 'Blocked',
    hardGates: ['re-scanner', 'build-gatekeeper'],
    steps: steps('ISSUE-002', 'CWE-306', { rescan: 'STILL_VULNERABLE', redteam: 'BYPASS_FOUND', behavior: 'BEHAVIOR_CHANGED' }, 0, 90, ['re-scanner', 'build-gatekeeper']),
  },
  {
    id: 'ISSUE-003',
    title: 'NoSQL injection in the employee search endpoint via a string-concatenated query',
    severity: 'Critical',
    cwe: 'CWE-943',
    cweName: 'Improper Neutralization of Special Elements in Data Query Logic',
    score: 60,
    threshold: 90,
    decision: 'Blocked',
    hardGates: ['build-gatekeeper'],
    steps: steps('ISSUE-003', 'CWE-943', { rescan: 'FIXED', redteam: 'NO_BYPASS_FOUND', behavior: 'BEHAVIOR_PRESERVED' }, 60, 90, ['build-gatekeeper']),
  },
  {
    id: 'ISSUE-001',
    title: 'Unbounded repository findAll() reads whole collections into memory across services',
    severity: 'High',
    cwe: 'CWE-770',
    cweName: 'Allocation of Resources Without Limits or Throttling',
    score: 30,
    threshold: 85,
    decision: 'Blocked',
    hardGates: ['build-gatekeeper'],
    steps: steps('ISSUE-001', 'CWE-770', { rescan: 'FIXED', redteam: 'NO_BYPASS_FOUND', behavior: 'BEHAVIOR_CHANGED' }, 30, 85, ['build-gatekeeper']),
  },
  {
    id: 'ISSUE-004',
    title: 'Outdated Apache POI dependency exposes the Excel-upload endpoint to a known OOXML parsing flaw',
    severity: 'Medium',
    cwe: 'CWE-1104',
    cweName: 'Use of Unmaintained Third Party Components',
    score: 60,
    threshold: 75,
    decision: 'Blocked',
    hardGates: ['build-gatekeeper'],
    steps: steps('ISSUE-004', 'CWE-1104', { rescan: 'FIXED', redteam: 'NO_BYPASS_FOUND', behavior: 'BEHAVIOR_PRESERVED' }, 60, 75, ['build-gatekeeper']),
  },
]
