export const profile = {
  name: 'Krishna Annavaram',
  headline: 'Generative AI Engineer | Production LLM Systems · Graph-RAG · Multi-Agent AI · Fine-Tuning',
  location: 'Denton, TX',
  bio: `I'm a Generative AI Engineer with 5+ years of experience taking AI systems from whiteboard to
production — across clinical tech, pharma, enterprise financial services, academic research, and HR tech.
I don't build demos. I build the Graph-RAG pipeline that hits 91% retrieval accuracy in a live
deployment, the voice intake system that automates 85% of data capture end-to-end, and the NLP
pipeline that processes thousands of pharma documents daily and writes clean structured records to
BigQuery without human intervention.

My edge is the architecture layer. Anyone can call an API. The hard part is designing knowledge graphs
that capture entity relationships LLMs can't hallucinate around, tuning FAISS indexes for sub-second
recall at scale, orchestrating LangGraph multi-agent workflows that hold up under production load, and
wrapping it all in MLOps infrastructure that sustains 99.9% uptime. That's what I've built — five
times, across five industries — and every system ships with measurable outcomes attached.`,
  philosophy: `A GPT-4o call is a commodity. The moat is everything around it: knowledge graph
design that structures domain relationships before retrieval ever happens, hybrid dense-sparse search
that fuses BM25 precision with embedding-based semantic depth, PEFT fine-tuning pipelines that adapt
transformer models to specialized corpora without catastrophic forgetting, and zero-downtime MLOps
infrastructure that makes the difference between a prototype and a system your team depends on daily.
I've built all of it — across pharma, enterprise financial services, and research environments — and I
measure every delivery in production outcomes, not benchmark scores.`,
  principles: [
    {
      title: 'Outcomes Over Accuracy Scores',
      description:
        "I track what actually moves: retrieval accuracy against real query sets, automation percentages measured against baseline workflows, latency under concurrent production load. If a metric isn't measured in a live deployment, it doesn't count.",
      icon: 'Shield',
    },
    {
      title: 'Architecture Before Implementation',
      description:
        'Graph-RAG instead of naive retrieval. LangGraph orchestration instead of monolithic chains. Hybrid dense-sparse search instead of single-index. Every architectural decision I make compounds — the right design at the start multiplies impact across every downstream metric.',
      icon: 'Network',
    },
    {
      title: 'Production Is the Only Standard',
      description:
        "I've shipped AI into live environments where failure means missed SLAs, bad outputs reach real users, and engineering debt compounds fast. That pressure shaped how I build: every system includes monitoring, fallback logic, and MLOps infrastructure that runs reliably around the clock.",
      icon: 'Server',
    },
  ],
  socials: {
    email: 'annavaramkrishna@gmail.com',
    linkedin: 'https://www.linkedin.com/in/krishna-annavaram/',
    github: 'https://github.com/KrishnaAnnavaram',
    scholar: '',
  },
  availability: 'Open to Senior GenAI Engineer · Applied AI · LLM Platform roles',
  resumeUrl: '/resume/resume.pdf',
  coverLetterUrl: '/resume/cover-letter.pdf',
  differentiator:
    'Most candidates say "Built a RAG pipeline." My record: 91% retrieval accuracy on a live enterprise Graph-RAG deployment, 85% process automation on a voice AI platform, 60% elimination of manual data entry via a production NER pipeline — 5 industries, all measured, all shipped.',
  idealRoles: [
    'Senior Generative AI Engineer',
    'LLM Platform Engineer',
    'Applied AI Engineer',
    'RAG / Graph-RAG Engineer',
    'ML Engineer (NLP / LLMs)',
    'AI Infrastructure Engineer',
  ],
}
