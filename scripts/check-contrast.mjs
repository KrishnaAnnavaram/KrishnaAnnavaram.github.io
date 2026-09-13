#!/usr/bin/env node
/**
 * WCAG contrast check for the design tokens.
 *
 * The palette is authored in oklch, which is perceptually uniform and
 * therefore pleasant to design with — and gives no indication whatsoever of
 * whether a pair passes WCAG, because WCAG is defined on sRGB relative
 * luminance. So the tokens are converted and the ratios computed, rather than
 * judged by eye.
 *
 *   node scripts/check-contrast.mjs
 *
 * Exits non-zero if any required pair fails, so CI can run it.
 */

/* ── oklch → sRGB ───────────────────────────────────────────────────────── */

function oklchToSrgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180
  const a = C * Math.cos(h)
  const b = C * Math.sin(h)

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l = l_ ** 3
  const m = m_ ** 3
  const s = s_ ** 3

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

/** Linear-light channel → WCAG relative luminance contribution. */
function luminance([r, g, b]) {
  const clamp = (v) => Math.min(1, Math.max(0, v))
  return 0.2126 * clamp(r) + 0.7152 * clamp(g) + 0.0722 * clamp(b)
}

function contrast(fg, bg) {
  const l1 = luminance(oklchToSrgb(...fg))
  const l2 = luminance(oklchToSrgb(...bg))
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

/* ── Tokens, mirroring app/globals.css ──────────────────────────────────── */

const light = {
  paper: [0.988, 0.0015, 265],
  surface: [1, 0, 0],
  sunken: [0.967, 0.003, 265],
  ink: [0.17, 0.008, 265],
  'ink-soft': [0.4, 0.009, 265],
  'ink-muted': [0.48, 0.009, 265],
  'ink-faint': [0.545, 0.009, 265],
  accent: [0.545, 0.185, 32],
  verify: [0.5, 0.085, 185],
}

const dark = {
  paper: [0.158, 0.006, 265],
  surface: [0.192, 0.007, 265],
  sunken: [0.132, 0.005, 265],
  ink: [0.955, 0.002, 265],
  'ink-soft': [0.755, 0.007, 265],
  'ink-muted': [0.68, 0.008, 265],
  'ink-faint': [0.6, 0.008, 265],
  accent: [0.735, 0.155, 40],
  verify: [0.755, 0.095, 185],
}

/**
 * Every foreground token is used at small sizes somewhere on the site — the
 * monospace labels are 10–11px — so all of them are held to the 4.5:1 normal
 * text threshold rather than the 3:1 large-text one.
 */
const REQUIRED = 4.5
const FOREGROUNDS = ['ink', 'ink-soft', 'ink-muted', 'ink-faint', 'accent', 'verify']
const BACKGROUNDS = ['paper', 'surface', 'sunken']

let failures = 0

for (const [themeName, tokens] of [
  ['light', light],
  ['dark', dark],
]) {
  console.log(`\n${themeName.toUpperCase()}`)
  for (const fg of FOREGROUNDS) {
    const row = BACKGROUNDS.map((bg) => {
      const ratio = contrast(tokens[fg], tokens[bg])
      const ok = ratio >= REQUIRED
      if (!ok) failures++
      return `${bg} ${ratio.toFixed(2)}${ok ? '' : '  ✗'}`
    })
    console.log(`  ${fg.padEnd(10)} ${row.join('   ')}`)
  }
}

console.log(
  failures === 0
    ? `\n✓ every foreground/background pair meets ${REQUIRED}:1`
    : `\n✗ ${failures} pair(s) below ${REQUIRED}:1`
)
process.exit(failures === 0 ? 0 : 1)
