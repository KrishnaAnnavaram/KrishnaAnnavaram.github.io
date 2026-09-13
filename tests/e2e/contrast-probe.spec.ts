import { test } from '@playwright/test'

/**
 * Diagnostic, not an assertion.
 *
 * scripts/check-contrast.mjs converts the oklch tokens to sRGB in JavaScript,
 * which disagrees with the browser wherever a colour falls outside the sRGB
 * gamut — the browser gamut-maps, the script clamps. This probe reads the
 * colours the browser actually paints and reports the real ratios, so the
 * palette is tuned against rendered output rather than against a model of it.
 *
 *   npx playwright test tests/e2e/contrast-probe.spec.ts --project=chromium
 */
for (const theme of ['light', 'dark'] as const) {
test(`report rendered contrast — ${theme}`, async ({ page }) => {
  await page.goto('/')
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme)

  const report = await page.evaluate(() => {
    /* getComputedStyle returns the authored `oklch(...)` string in Chromium,
       so the colour is rasterised through a canvas to get real sRGB bytes —
       including the browser's own gamut mapping, which is the whole point. */
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!

    const parse = (value: string): [number, number, number] => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = value
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
      return [r, g, b]
    }

    const channel = (c: number) => {
      const s = c / 255
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }

    const luminance = ([r, g, b]: [number, number, number]) =>
      0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

    const ratio = (a: string, b: string) => {
      const l1 = luminance(parse(a))
      const l2 = luminance(parse(b))
      const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
      return (hi + 0.05) / (lo + 0.05)
    }

    const root = getComputedStyle(document.documentElement)
    const read = (token: string) => root.getPropertyValue(`--color-${token}`).trim()

    const foregrounds = ['ink', 'ink-soft', 'ink-muted', 'ink-faint', 'accent', 'verify']
    const backgrounds = ['paper', 'surface', 'sunken']

    const out: Record<string, Record<string, string>> = {}
    for (const fg of foregrounds) {
      const fgColor = read(fg)
      const [r, g, b] = parse(fgColor)
      const hex = `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`
      out[fg] = { rgb: fgColor, hex }
      for (const bg of backgrounds) {
        out[fg][bg] = ratio(fgColor, read(bg)).toFixed(2)
      }
    }

    return out
  })

  for (const [token, row] of Object.entries(report)) {
    const { rgb, hex, ...ratios } = row
    const flags = Object.entries(ratios)
      .map(([bg, r]) => `${bg} ${r}${Number(r) < 4.5 ? ' X' : ''}`)
      .join('  ')
    console.log(`${theme.padEnd(6)} ${token.padEnd(10)} ${String(hex).padEnd(9)} ${flags}`)
  }
})
}
