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
import { writeFile, mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { profile } from '../data/profile'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '../public/og.png')

/* Tokens duplicated from globals.css (dark theme) as resolved sRGB, because
   satori does not evaluate CSS custom properties or oklch(). Keep in step. */
const PAPER = '#0b0d12'
const INK = '#f2f4f7'
const INK_SOFT = '#c4cad3'
const INK_MUTED = '#a2aab6'
const RULE = '#262d38'
const ACCENT = '#43d8c8'

/* The studio portrait, inlined: satori cannot fetch a relative path. JPEG
   rather than WebP because satori does not decode WebP. */
const portrait = `data:image/jpeg;base64,${(
  await readFile(resolve(__dirname, `../public${profile.photos[0].src}.jpg`))
).toString('base64')}`

/**
 * A face and a name. An OG card is read at thumbnail size in a Slack sidebar
 * or a LinkedIn feed, where a recognisable photo does more than any sentence.
 */
const card = {
  type: 'div',
  props: {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 64,
      background: PAPER,
      padding: '64px 72px',
      fontFamily: 'sans-serif',
    },
    children: [
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            flex: 1,
          },
          children: [
            {
              type: 'div',
              props: {
                style: { display: 'flex', alignItems: 'center', gap: 16 },
                children: [
                  {
                    type: 'div',
                    props: { style: { width: 14, height: 14, borderRadius: 7, background: ACCENT } },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: 22,
                        letterSpacing: 4,
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
                style: { display: 'flex', flexDirection: 'column', gap: 22 },
                children: [
                  {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: 80,
                        lineHeight: 1.02,
                        letterSpacing: -2.5,
                        color: INK,
                        fontWeight: 700,
                      },
                      children: profile.name,
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: { fontSize: 32, lineHeight: 1.3, color: INK_SOFT, maxWidth: 640 },
                      children: 'Agentic systems that show their work — MARS, BootShift, Statute.',
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
                  gap: 30,
                  fontSize: 21,
                  color: INK_MUTED,
                  borderTop: `1px solid ${RULE}`,
                  paddingTop: 26,
                },
                children: [
                  { type: 'div', props: { style: { color: ACCENT }, children: 'krishnaannavaram.github.io' } },
                  { type: 'div', props: { children: 'Agentic AI' } },
                  { type: 'div', props: { children: 'RAG' } },
                  { type: 'div', props: { children: 'Modernisation' } },
                ],
              },
            },
          ],
        },
      },
      {
        type: 'img',
        props: {
          src: portrait,
          width: 360,
          height: 450,
          style: { borderRadius: 28, border: `2px solid ${RULE}`, objectFit: 'cover' },
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
