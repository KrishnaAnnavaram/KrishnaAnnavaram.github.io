import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AssistantProvider } from '@/components/assistant/AssistantProvider'
import { Spotlight } from '@/components/ui/Spotlight'
import { buildPaletteIndex } from '@/lib/palette'
import { profile, PHOTO_ROTATION_MS } from '@/data/profile'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

/** Display serif, italic only, for two or three accent words. Never body copy. */
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const description =
  'Generative AI Engineer building evidence-first agentic harnesses for legacy modernisation and security remediation — MARS, BootShift, Statute. Currently at Virtusa.'

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
    // Explicit, and pointing at the .png copy the postbuild step makes:
    // Pages serves the extensionless file Next emits as octet-stream, which
    // crawlers reject.
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} — Generative AI Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Generative AI Engineer`,
    description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0d12' },
  ],
}

/**
 * Runs before first paint, so a stored theme choice never flashes the wrong
 * palette. No stored value means system preference, which the CSS handles.
 *
 * It also chooses the hero portrait. The photo is a function of wall-clock
 * time — one slot every few minutes — so every visitor in the same window sees
 * the same frame, and choosing it here means the right image is the first one
 * painted rather than a swap after hydration.
 *
 * The `js` class arms the scroll-reveal transition — without it every
 * [data-reveal] element renders visible. The timer is the safety net for
 * JavaScript that runs but never hydrates. Content never depends on script.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')d.setAttribute('data-theme',t)}catch(e){}d.setAttribute('data-photo',String(Math.floor(Date.now()/${PHOTO_ROTATION_MS})%${profile.photos.length}));setTimeout(function(){document.querySelectorAll('[data-reveal=""]').forEach(function(el){el.setAttribute('data-reveal','shown')})},3000)})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteItems = buildPaletteIndex()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
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
        <AssistantProvider>
          <Header paletteItems={paletteItems} />
          <main id="main">{children}</main>
          <Footer />
          <Spotlight />
        </AssistantProvider>
      </body>
    </html>
  )
}
