import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Build system prompt from real data
function buildSystemPrompt(): string {
  const experienceSummary = experience
    .map((e) => `- ${e.title} at ${e.company} (${e.startDate} – ${e.endDate ?? 'Present'}): ${e.summary}`)
    .join('\n')

  const projectSummary = projects
    .map((p) => `- ${p.title}: ${p.tagline}`)
    .join('\n')

  const skillGroups = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s.name)
    return acc
  }, {})

  const skillSummary = Object.entries(skillGroups)
    .map(([cat, items]) => `${cat}: ${items.join(', ')}`)
    .join('\n')

  return `You are an AI assistant for Krishna Annavaram's portfolio website. You help recruiters, engineers, and potential collaborators learn about Krishna's work and experience.

ABOUT KRISHNA:
Name: ${profile.name}
Role: ${profile.headline}
Location: ${profile.location}
Availability: ${profile.availability}

BIO: ${profile.bio}

EXPERIENCE:
${experienceSummary}

PROJECTS:
${projectSummary}

SKILLS:
${skillSummary}

EDUCATION:
- Master of Science in Data Science — University of North Texas
- Bachelor of Technology in Computer Science & Engineering — Kalasalingam University

CERTIFICATIONS:
- AWS Certified AI Practitioner (Jul 2025, expires Jul 2028)
- SAP Certified Development Associate — ABAP

CONTACT:
- Email: ${profile.socials.email}
- LinkedIn: ${profile.socials.linkedin}
- GitHub: ${profile.socials.github}

GUIDELINES:
1. Only answer based on the information above. Do not fabricate details.
2. If asked about something not in the data, say "I don't have that specific information — you can reach Krishna directly at ${profile.socials.email}"
3. Keep responses concise and helpful (2-4 sentences usually sufficient).
4. For scheduling, direct users to reach out via email or LinkedIn.
5. Be professional but warm. This is a portfolio assistant, not a chatbot.
6. Never make compliance claims (HIPAA, regulatory audits passed, etc).
7. Conversations are not stored or logged.`
}

const SESSION_STORAGE_KEY = 'concierge_message_count'
const MAX_MESSAGES_PER_SESSION = 10

export function getRemainingMessages(): number {
  if (typeof window === 'undefined') return MAX_MESSAGES_PER_SESSION
  const count = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEY) ?? '0', 10)
  return Math.max(0, MAX_MESSAGES_PER_SESSION - count)
}

export function incrementMessageCount(): void {
  if (typeof window === 'undefined') return
  const count = parseInt(sessionStorage.getItem(SESSION_STORAGE_KEY) ?? '0', 10)
  sessionStorage.setItem(SESSION_STORAGE_KEY, String(count + 1))
}

export async function streamConciergeResponse(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  onComplete: () => void,
  onError: (error: string) => void
): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT

  if (!endpoint) {
    // Graceful fallback without API
    const fallbackResponses: Record<string, string> = {
      default:
        "I'm Krishna's portfolio assistant. Unfortunately, the AI service isn't configured right now. For questions about Krishna's work and experience, please reach out directly at annavaramkrishna@gmail.com or connect on LinkedIn.",
    }

    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() ?? ''
    let response = fallbackResponses.default

    if (lastMessage.includes('rag') || lastMessage.includes('graph') || lastMessage.includes('retrieval')) {
      response =
        'Krishna is an expert in Graph-RAG and production RAG systems — Neo4j knowledge graphs, FAISS vector search, hybrid dense-sparse retrieval, and LangGraph multi-agent orchestration. Currently shipping at Ideate Technologies. Email: annavaramkrishna@gmail.com'
    } else if (lastMessage.includes('skill') || lastMessage.includes('tech') || lastMessage.includes('llm')) {
      response =
        'Krishna\'s core GenAI stack: Azure OpenAI (GPT-4o), LangGraph, LangChain, Neo4j, FAISS, Pinecone, LoRA/PEFT fine-tuning, FHIR/EHR integration, AKS, MLflow, Terraform. 5+ years across pharma, enterprise, and research. Email: annavaramkrishna@gmail.com'
    } else if (lastMessage.includes('industr') || lastMessage.includes('domain') || lastMessage.includes('experience')) {
      response =
        'Krishna has shipped production AI across 5 industries: clinical tech (Graph-RAG, voice intake), pharma (BioBERT drug NER on GCP), enterprise financial services (AWS incentive compensation ML), academic research (UNT RAG assistant), and HR tech (job recommendation engine). Email: annavaramkrishna@gmail.com'
    } else if (lastMessage.includes('available') || lastMessage.includes('hire') || lastMessage.includes('role')) {
      response =
        'Krishna is open to Senior GenAI Engineer, LLM Platform Engineer, and Applied AI roles. Best to reach out at annavaramkrishna@gmail.com or via LinkedIn at linkedin.com/in/krishna-annavaram/'
    }

    // Simulate streaming
    const words = response.split(' ')
    for (const word of words) {
      onChunk(word + ' ')
      await new Promise((r) => setTimeout(r, 30))
    }
    onComplete()
    return
  }

  try {
    const systemPrompt = buildSystemPrompt()

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        system: systemPrompt,
        model: 'claude-sonnet-4-6',
        max_tokens: 512,
        stream: true,
      }),
    })

    if (!response.ok) {
      onError('Connection failed. Please try again or email annavaramkrishna@gmail.com')
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      onError('Stream unavailable. Please email annavaramkrishna@gmail.com')
      return
    }

    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const text = decoder.decode(value)
      const lines = text.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') {
            onComplete()
            return
          }
          try {
            const parsed = JSON.parse(data) as {
              type?: string
              delta?: { type?: string; text?: string }
            }
            if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
              onChunk(parsed.delta.text ?? '')
            }
          } catch {
            // Ignore parse errors for SSE
          }
        }
      }
    }
    onComplete()
  } catch {
    onError('Network error. Please email annavaramkrishna@gmail.com directly.')
  }
}
