/**
 * Architecture diagrams as structured data.
 *
 * Diagrams are not images and not Mermaid. They are typed objects rendered to
 * real DOM, which buys four things an image or a client-side diagram library
 * cannot:
 *
 *   1. They are theme-aware — the same diagram is legible in light and dark.
 *   2. They are accessible — every node is real text in a real list, so a
 *      screen reader gets the pipeline in order rather than "image".
 *   3. They reflow — a horizontal pipeline on a desktop becomes a vertical one
 *      on a phone without becoming a pinch-to-zoom picture.
 *   4. They cost nothing — no Mermaid, no React Flow, no runtime rendering.
 *
 * The `kind` on each node is the important part. It marks where the model
 * boundary falls: which stages are deterministic code and which are model
 * calls. That distinction is the single most discriminating thing an AI
 * engineer can show, and almost no portfolio shows it.
 */

export type NodeKind =
  /** External input the system does not control. */
  | 'source'
  /** Deterministic code. Same input, same output, no model involved. */
  | 'deterministic'
  /** A model call — the non-deterministic part of the system. */
  | 'model'
  /** An autonomous agent: decides *when* and *how* to act. */
  | 'agent'
  /** Persistent state — a database, index, cache or ledger. */
  | 'store'
  /** What the system hands back. */
  | 'output'

export interface DiagramNode {
  id: string
  label: string
  /** One line, shown always. Say what this stage does, not what it is. */
  summary: string
  kind: NodeKind
  /** Revealed on hover/focus. Keep each entry short. */
  detail?: {
    inputs?: string[]
    outputs?: string[]
    tech?: string[]
    /** A decision or tradeoff worth defending. */
    note?: string
  }
}

export interface DiagramGroup {
  /** Optional band label, e.g. "Analysis plane". */
  label?: string
  /**
   * A line drawn before this band, marking a boundary the system enforces —
   * a privilege change, a seal, a point of no return.
   *
   * Added because the diagrams described boundaries in prose while drawing
   * none of them: the single structural fact most worth a figure was the one
   * the figure omitted.
   */
  boundary?: string
  nodes: DiagramNode[]
}

export interface SystemDiagram {
  id: string
  title: string
  /** Figure caption. Explains what the reader is looking at. */
  caption: string
  groups: DiagramGroup[]
  /** Rendered under the figure. Only include what the diagram actually shows. */
  footnote?: string
}

export const NODE_KIND_META: Record<
  NodeKind,
  { label: string; description: string; tone: 'neutral' | 'accent' | 'verify' | 'faint' }
> = {
  source: {
    label: 'Source',
    description: 'Input the system reads but does not control',
    tone: 'faint',
  },
  deterministic: {
    label: 'Deterministic',
    description: 'Plain code — same input produces the same output, every run',
    tone: 'verify',
  },
  model: {
    label: 'Model',
    description: 'A language-model call — the non-deterministic part',
    tone: 'accent',
  },
  agent: {
    label: 'Agent',
    description: 'Decides when and how to act, then reports what it did',
    tone: 'accent',
  },
  store: {
    label: 'Store',
    description: 'Persistent state: index, database, cache or ledger',
    tone: 'neutral',
  },
  output: {
    label: 'Output',
    description: 'What the system produces',
    tone: 'neutral',
  },
}

/** Flattens a diagram to ordered nodes — used by the assistant's index. */
export function diagramNodes(diagram: SystemDiagram): DiagramNode[] {
  return diagram.groups.flatMap((g) => g.nodes)
}

/**
 * Prose rendering of a diagram, for the text-only contexts that need one:
 * the retrieval index, and the `<figcaption>` fallback.
 */
export function diagramToProse(diagram: SystemDiagram): string {
  return diagram.groups
    .map((g) => {
      const chain = g.nodes.map((n) => `${n.label} (${n.summary})`).join(' → ')
      return g.label ? `${g.label}: ${chain}` : chain
    })
    .join('. ')
}
