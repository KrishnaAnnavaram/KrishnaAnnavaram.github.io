export const profile = {
  name: 'Krishna Annavaram',
  headline: 'Generative AI Engineer | Production LLM Systems | Healthcare AI | RAG & Multi-Agent Pipelines',
  location: 'Denton, TX',
  bio: `I am a Generative AI Engineer with 5+ years building production-grade LLM systems, RAG pipelines,
and multi-agent orchestration frameworks across healthcare and enterprise domains. My work ships to
hospitals, Fortune-scale enterprises, and research institutions — and every system is measured by the
clinical and operational outcomes it moves.

Recent highlights: 91% retrieval accuracy on a hospital-deployed Graph-RAG Clinical Decision Support
System, 45% reduction in unsafe clinical recommendations, 85% automation of patient intake workflows,
and 50% reduction in physician review time through fine-tuned transformer models.

I treat Generative AI as a systems engineering discipline — not a prompt-writing exercise. That means
knowledge graph architecture over naive retrieval, FHIR-compliant EHR integration over mock data,
LangGraph multi-agent orchestration over single-step LLM calls, and zero-downtime MLOps over
prototype deployments.`,
  philosophy: `Most GenAI projects fail at the engineering layer, not the model layer. A GPT-4o call is
a commodity. What separates systems that move clinical outcomes from those that stay in demos is
the architecture around the model: knowledge graph design that captures clinical entity relationships,
hybrid retrieval that combines graph traversal with dense vector search, PEFT fine-tuning pipelines
that adapt models to medical corpora without catastrophic forgetting, and MLOps infrastructure that
sustains 99.9% uptime under hospital-grade reliability requirements. I build the full stack — and I
measure success in production metrics, not benchmark scores.`,
  principles: [
    {
      title: 'Clinical Outcomes Over Demo Metrics',
      description:
        'Every system I build for healthcare is measured against real clinical outcomes — retrieval accuracy on physician-validated datasets, reduction in unsafe recommendations, time saved in clinical workflows. If it does not move a measurable needle, it is not done.',
      icon: 'Shield',
    },
    {
      title: 'Architecture-First GenAI',
      description:
        'Graph-RAG over naive RAG. LangGraph multi-agent orchestration over monolithic chains. Hybrid dense-sparse retrieval over single-index search. The architectural decisions compound — right design choices multiply impact across every downstream metric.',
      icon: 'Network',
    },
    {
      title: 'Zero-Downtime Production Standards',
      description:
        'Hospital-grade AI runs 24/7. I build MLOps infrastructure — AKS, MLflow, Terraform, GitHub Actions CI/CD — that sustains 99.9% uptime, accelerates release cycles, and cuts deployment effort. Production reliability is not a phase 2 concern.',
      icon: 'Server',
    },
  ],
  socials: {
    email: 'annavaramkrishna@gmail.com',
    linkedin: 'https://linkedin.com/in/krishnaannavaram',
    github: 'https://github.com/KrishnaAnnavaram',
    scholar: '',
  },
  availability: 'Open to Senior Generative AI Engineer and Applied AI roles',
  resumeUrl: '/resume/resume.pdf',
  coverLetterUrl: '/resume/cover-letter.pdf',
  differentiator:
    'Most candidates say "Built a RAG chatbot." My record: 91% retrieval accuracy on a hospital-deployed Graph-RAG Clinical Decision Support System, 45% fewer unsafe clinical recommendations, and 85% automation of patient intake — all in production, all measured, all running at hospital-grade 99.9% uptime.',
  idealRoles: [
    'Generative AI Engineer',
    'Senior LLM Engineer',
    'AI Platform Engineer',
    'Applied AI Engineer (Healthcare)',
    'RAG / Graph-RAG Engineer',
    'Machine Learning Engineer (NLP/LLMs)',
  ],
}
