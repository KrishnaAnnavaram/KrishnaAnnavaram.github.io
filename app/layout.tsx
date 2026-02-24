import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileNav } from '@/components/layout/MobileNav'
import { ChatWidget } from '@/components/ai/ChatWidget'

export const metadata: Metadata = {
  title: {
    default: 'Krishna Annavaram — GenAI Engineer & Healthcare AI Specialist',
    template: '%s | Krishna Annavaram',
  },
  description:
    'GenAI Engineer with 5+ years building production LLM systems, RAG pipelines, and agentic AI workflows for healthcare and enterprise. Open to Senior GenAI roles.',
  keywords: [
    'GenAI Engineer',
    'LLM Engineer',
    'RAG Systems',
    'Healthcare AI',
    'Machine Learning',
    'Production AI',
    'Retrieval Augmented Generation',
    'Agentic AI',
    'Krishna Annavaram',
  ],
  authors: [{ name: 'Krishna Annavaram' }],
  creator: 'Krishna Annavaram',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://krishnaannavaram.github.io',
    title: 'Krishna Annavaram — GenAI Engineer & Healthcare AI Specialist',
    description: 'GenAI Engineer specializing in production LLM systems, RAG pipelines, and healthcare AI.',
    siteName: 'Krishna Annavaram Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna Annavaram — GenAI Engineer',
    description: 'GenAI Engineer specializing in production LLM systems, RAG pipelines, and healthcare AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#6366f1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts for runtime loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-primary text-text-primary noise-overlay">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileNav />
        <ChatWidget />
      </body>
    </html>
  )
}
