import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { buildPaletteIndex } from '@/lib/palette'
import { profile } from '@/data/profile'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
})

const description =
  'Generative AI Engineer with five years building retrieval, agent, and NLP systems that run in production. Currently at Virtusa. Case studies, research, and writing.'

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Generative AI Engineer`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    'Generative AI Engineer',
    'LLM Engineer',
    'RAG',
    'Retrieval-Augmented Generation',
    'Agentic AI',
    'Machine Learning Engineer',
    'NLP',
    'Krishna Annavaram',
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    siteName: `${profile.name} — Generative AI Engineer`,
    title: `${profile.name} — Generative AI Engineer`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Generative AI Engineer`,
    description,
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#101014' },
  ],
}

/**
 * Runs before first paint, so a stored theme choice never flashes the wrong
 * palette. No stored value means system preference, which the CSS handles.
 *
 * The `js` class is what arms the scroll-reveal transition — without it every
 * [data-reveal] element renders visible, so a reader with JavaScript disabled
 * gets the whole page. The timer is the matching safety net for the case where
 * JavaScript is on but hydration never lands: after three seconds anything
 * still hidden is shown unconditionally. Content must never depend on script.
 */
const bootScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}setTimeout(function(){document.querySelectorAll('[data-reveal=""]').forEach(function(el){el.setAttribute('data-reveal','shown')})},3000)`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteItems = buildPaletteIndex()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Header paletteItems={paletteItems} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
