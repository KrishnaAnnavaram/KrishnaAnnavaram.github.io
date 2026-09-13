export const profile = {
  name: 'Krishna Annavaram',
  firstName: 'Krishna',
  role: 'Generative AI Engineer',
  headline: 'Generative AI Engineer',
  tagline: 'I build LLM systems that hold up in production.',
  location: 'Denton, Texas',
  locationShort: 'Denton, TX',
  availability: 'Open to Generative AI, Applied AI, and ML Engineering roles',

  /** One paragraph. The thing a hiring manager reads before deciding to scroll. */
  intro: `I'm a Generative AI Engineer with five years of experience taking retrieval, agent, and NLP systems from notebook to production — currently at Virtusa, previously at Ideate Technologies, Cognizant, and Lemoius, with a graduate teaching assistantship at the University of North Texas in between.`,

  /** The argument for hiring him, in his own frame. */
  positioning: `Most AI work fails at the engineering layer, not the model layer. A capable model behind a weak pipeline is still a demo — it drifts, it can't be evaluated, and nobody can tell you why it answered the way it did.

I treat generative AI as a systems problem. That means structured outputs instead of free text, retrieval you can trace back to a source, evaluation harnesses that run on every change, and cost and latency budgets that are tracked rather than discovered in production. It's less exciting than a leaderboard score, and it's the difference between something a team uses daily and something they abandon after the pilot.`,

  /**
   * What he is actually working on, as opposed to what he is interested in.
   * Each entry points at something on the site that evidences it — an entry
   * without evidence is a claim, and this section is meant to be the opposite.
   * Edit this list and the home page follows; nothing else needs touching.
   */
  currentFocus: [
    {
      title: 'Agent systems with real boundaries',
      detail:
        'Multi-agent architectures where the interesting design work is deciding what each agent is not allowed to do — which process holds a credential, which stage may write, and where a refusal is the correct output.',
      evidence: '/projects/smcp-gateway/',
      evidenceLabel: 'SMCP Gateway',
    },
    {
      title: 'Legacy modernisation that can prove what it changed',
      detail:
        'Migration and reverse-engineering harnesses for systems nobody has documentation for. The hard part is not the transformation; it is producing an evidence trail that survives review.',
      evidence: '/projects/bootshift/',
      evidenceLabel: 'Bootshift',
    },
    {
      title: 'Knowing when not to use a model',
      detail:
        'Deterministic pipelines where a language model would be the obvious choice and the wrong one — because a generative system that invents a business rule fails invisibly, and a rule-based one that misses it fails in the open.',
      evidence: '/projects/statute/',
      evidenceLabel: 'Statute',
    },
  ],

  principles: [
    {
      title: 'Structured contracts over prompt hacks',
      description:
        'A model that returns free text is an integration problem waiting to happen. I design schemas first and constrain generation to fit them, so downstream systems get something they can validate instead of something they have to parse.',
    },
    {
      title: 'Retrieval you can trace',
      description:
        'Grounding is only useful if you can show your work. I separate retrieval, reasoning, and validation into distinct stages so every answer carries its evidence — which also makes failures diagnosable instead of mysterious.',
    },
    {
      title: 'Evaluation before scale',
      description:
        'Hallucination rate, answer accuracy, and latency are engineering metrics, not vibes. I build the measurement harness before the system grows, because you cannot improve a pipeline whose behaviour you are guessing at.',
    },
    {
      title: 'Cost and latency are features',
      description:
        'Token spend and p95 response time decide whether a system is adopted or quietly switched off. I profile both from the start and treat a regression in either as a bug, not a trade-off to explain away.',
    },
  ],

  education: [
    {
      institution: 'University of North Texas',
      degree: 'Master of Science, Data Science',
      focus: 'Applied Natural Language Processing & Generative AI',
      location: 'Denton, TX',
    },
    {
      institution: 'Kalasalingam University',
      degree: 'Bachelor of Technology, Computer Science & Engineering',
      focus: 'Machine Learning & Deep Learning',
      location: 'India',
    },
  ],

  idealRoles: [
    'Generative AI Engineer',
    'LLM Engineer',
    'RAG Engineer',
    'Applied AI Engineer',
    'Machine Learning Engineer (NLP / LLMs)',
    'AI Platform Engineer',
  ],

  socials: {
    email: 'annavaramkrishna@gmail.com',
    phone: '+1 972-957-7974',
    linkedin: 'https://www.linkedin.com/in/krishna-annavaram/',
    github: 'https://github.com/KrishnaAnnavaram',
  },

  resumeUrl: '/resume/resume.pdf',
  siteUrl: 'https://krishnaannavaram.github.io',
} as const

export type Profile = typeof profile
