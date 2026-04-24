'use client'

import { motion } from 'framer-motion'
import { Server, Target, Users, Zap } from 'lucide-react'

const metrics = [
  {
    icon: Server,
    value: '5+',
    label: 'Years Shipping Production AI',
    description: 'Healthcare · Financial Services · Telecom',
    color: '#6366f1',
  },
  {
    icon: Target,
    value: '91%',
    label: 'RAG Retrieval Accuracy',
    description: 'Graph-RAG system live at CVS Health pharmacy',
    color: '#ef4444',
  },
  {
    icon: Users,
    value: '350K+',
    label: 'Financial Docs Indexed',
    description: 'RAG pipeline at Morgan Stanley — 60% retrieval efficiency gain',
    color: '#f59e0b',
  },
  {
    icon: Zap,
    value: '3',
    label: 'Industries in Production',
    description: 'Healthcare · Financial Services · Telecommunications',
    color: '#06b6d4',
  },
]

export function CredibilityBar() {
  return (
    <section className="py-16 px-4" aria-label="Key metrics">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass p-6 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 mx-auto transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: metric.color + '20' }}
                  aria-hidden="true"
                >
                  <Icon size={20} style={{ color: metric.color }} />
                </div>
                <p
                  className="font-display font-bold text-2xl mb-1"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </p>
                <p className="text-text-primary text-sm font-semibold mb-1">{metric.label}</p>
                <p className="text-text-muted text-xs">{metric.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
