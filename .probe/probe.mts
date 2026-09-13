import { readFileSync } from 'node:fs'
import { Retriever, tokenize } from '../lib/assistant/retrieval'
const idx = JSON.parse(readFileSync('E:/KrishnaAnnavaram.github.io/out/ai/knowledge.json','utf8'))
console.log('chunks:', idx.chunks.length, 'builtAt:', idx.builtAt)
const r = new Retriever(idx)
const qs = [
 'How many pipeline stages does Bootshift have?',
 'What stage writes files?',
 'Does he have production experience with embeddings?',
 'What is his salary expectation?',
 'Is he authorized to work in the US?',
 'Has he ever shipped anything to real users?',
 'What went wrong in a project?',
 'Where did he go to school?',
 'Does he know Kubernetes?',
 'What did he do at Cognizant?',
 'latency',
 'How does he evaluate LLM systems?',
 'what is the hallucination rate',
 'Who is the CEO of Microsoft?',
 'Tell me about his time at Google',
 'Does Statute use an LLM?',
 'is bootshift in production',
]
for (const q of qs) {
  const a = r.answer(q, 3)
  console.log('\n──── Q:', q)
  console.log('   tokens:', tokenize(q).join(','))
  console.log('   confidence:', a.confidence, '| lead:', a.lead.slice(0,110))
  for (const p of a.passages) console.log(`   [${p.score.toFixed(2)}] ${p.chunk.heading}  <${p.chunk.source.href}>  matched=${p.matched.join('/')}`)
}
