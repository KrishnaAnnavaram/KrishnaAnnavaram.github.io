/**
 * Renders the Open Graph card to `public/og.png` at build time.
 *
 * Next's `opengraph-image.tsx` file convention would be the idiomatic way to do
 * this, and it does produce a correct PNG — but it emits it at a route with no
 * file extension, and GitHub Pages serves extensionless files as
 * `application/octet-stream`, which link-preview crawlers reject. The file
 * convention also takes precedence over explicit `openGraph.images` metadata,
 * so it cannot simply be pointed elsewhere.
 *
 * Rendering it here instead puts a real `.png` at a real path, and leaves the
 * metadata in `app/layout.tsx` in charge of what the tag says.
 *
 *   npx tsx scripts/build-og-image.mts
 */

import { ImageResponse } from 'next/og'
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { profile } from '../data/profile'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/og.png')

/* Tokens duplicated from globals.css as resolved sRGB, because satori does not
   evaluate CSS custom properties or oklch(). Keep in step with the palette. */
const INK = '#0e0f13'
const INK_SOFT = '#45484d'
const INK_MUTED = '#5b5e63'
const PAPER = '#fbfbfa'
const RULE = '#e3e4e7'
const ACCENT = '#c5341c'

/**
 * Deliberately typographic. An OG card is read at thumbnail size in a Slack
 * sidebar or a LinkedIn feed, where anything intricate becomes noise.
 */
const card = {
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: PAPER,
      padding: '72px 80px',
      fontFamily: 'sans-serif',
    },
    children: [
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', gap: 18 },
          children: [
            { type: 'div', props: { style: { width: 44, height: 3, background: ACCENT } } },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: 24,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                  color: INK_MUTED,
                },
                children: profile.role,
              },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: 26 },
          children: [
            {
              type: 'div',
              props: {
                style: { fontSize: 92, lineHeight: 1.02, letterSpacing: -2, color: INK },
                children: profile.name,
              },
            },
            {
              type: 'div',
              props: {
                style: { fontSize: 36, lineHeight: 1.3, color: INK_SOFT, maxWidth: 920 },
                children: profile.tagline,
              },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            gap: 38,
            fontSize: 23,
            color: INK_MUTED,
            borderTop: `1px solid ${RULE}`,
            paddingTop: 30,
          },
          children: [
            { type: 'div', props: { children: 'krishnaannavaram.github.io' } },
            { type: 'div', props: { children: 'Agentic AI' } },
            { type: 'div', props: { children: 'RAG' } },
            { type: 'div', props: { children: 'Legacy modernisation' } },
          ],
        },
      },
    ],
  },
}

const response = new ImageResponse(card as never, { width: 1200, height: 630 })
const buffer = Buffer.from(await response.arrayBuffer())

await mkdir(dirname(OUT), { recursive: true })
await writeFile(OUT, buffer)

console.log(`✓ og card — ${(buffer.length / 1024).toFixed(1)} kB → public/og.png`)
