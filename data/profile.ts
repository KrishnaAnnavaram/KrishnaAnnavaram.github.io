/**
 * How long each hero portrait stays up before the next one takes over.
 * Seven minutes sits inside the five-to-ten-minute window asked for: long
 * enough that nobody sees it change mid-read, short enough that a returning
 * visitor usually gets a different frame.
 */
export const PHOTO_ROTATION_MS = 7 * 60 * 1000

export interface Photo {
  /** Path without extension; .webp and .jpg both exist at 800×1000. */
  src: string
  alt: string
  /** Shown under the frame, so the rotation reads as intentional. */
  caption: string
}

export const profile = {
  name: 'Krishna Annavaram',
  firstName: 'Krishna',
  role: 'Generative AI Engineer',
  headline: 'Generative AI Engineer — Agentic AI, RAG & Enterprise Modernisation',
  tagline: 'I build systems that can show their work.',

  /**
   * The hero rotates through these by wall-clock slot. The first is the
   * default everywhere a single image is needed — social cards, structured
   * data, and the no-JavaScript render.
   */
  photos: [
    {
      src: '/images/profile/portrait-studio',
      alt: 'Krishna Annavaram in a navy suit and red tie, studio portrait on a grey background',
      caption: 'Studio',
    },
    {
      src: '/images/profile/portrait-skyline',
      alt: 'Krishna Annavaram in a navy suit at night, a lit city skyline and waterfront behind him',
      caption: 'Skyline',
    },
    {
      src: '/images/profile/portrait-evening',
      alt: 'Krishna Annavaram smiling, leaning on a car in a rain-wet car park at night',
      caption: 'Evening',
    },
  ] as Photo[],
  location: 'Denton, Texas',
  locationShort: 'Denton, TX',
  availability: 'Open to Generative AI, Agentic AI, and Applied AI Engineering roles',

  /** One paragraph. The thing a hiring manager reads before deciding to scroll. */
  intro: `I'm a Generative AI Engineer at Virtusa. I build agentic harnesses for work that cannot afford to be wrong quietly — legacy reverse engineering, Spring Boot migration, and vulnerability remediation — on one pattern: deterministic analysis first, governed model reasoning second, full traceability, and a human approval gate before anything ships. Five years in machine learning and NLP; the last two on production LLM systems across enterprise modernisation, financial risk and healthcare.`,

  /** The argument for hiring him, in his own frame. */
  positioning: `Most AI work fails at the engineering layer, not the model layer. A capable model behind a weak pipeline is still a demo — it drifts, it can't be evaluated, and nobody can tell you why it answered the way it did.

Everything I have shipped recently runs on the same pattern: deterministic analysis first, governed model reasoning second, full traceability throughout, and a human approval gate before anything lands. That ordering is the whole argument. It means a result can be explained after the fact, a wrong answer is attributable to a stage rather than to the system as a whole, and the parts that do not need a model do not get one.

It is less exciting than a leaderboard score, and it is the difference between something a team uses daily and something they abandon after the pilot.`,

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
        'Multi-agent pipelines where the interesting design work is deciding what each agent is not allowed to do — which stage may write, which verdict only a script may issue, and where a human has to sign before anything moves.',
      evidence: '/projects/mars/',
      evidenceLabel: 'MARS',
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
      degree: 'M.S., Data Science',
      focus: 'Applied NLP & Generative AI',
      location: 'Denton, TX',
    },
    {
      institution: 'Kalasalingam University',
      degree: 'B.Tech., Computer Science & Engineering',
      focus: 'Machine Learning & Deep Learning',
      location: 'India',
    },
  ],

  /* Three, not six. The earlier list named every near-synonym of the same job
     and read as keyword stuffing rather than as a preference. */
  idealRoles: ['Generative AI Engineer', 'Agentic AI Engineer', 'Applied AI Engineer'],

  /*
   * No phone number here.
   *
   * It was defined and never rendered — but `profile` is imported by client
   * components, so it was bundled into the layout chunk and shipped on every
   * page: invisible to a reader, trivially scrapable by anyone reading the
   * JavaScript. It is still in the résumé PDF, which is a deliberate
   * publication; this was not. A unit test now scans the built output for it.
   */
  socials: {
    email: 'annavaramkrishna@gmail.com',
    linkedin: 'https://www.linkedin.com/in/krishna-annavaram/',
    github: 'https://github.com/KrishnaAnnavaram',
  },

  resumeUrl: '/resume/resume.pdf',
  siteUrl: 'https://krishnaannavaram.github.io',
} as const

export type Profile = typeof profile
