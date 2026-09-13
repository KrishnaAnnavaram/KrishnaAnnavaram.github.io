import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Automated accessibility coverage across every route, in both themes.
 *
 * Axe catches roughly a third of real accessibility problems, so this is a
 * floor rather than a certificate — the manual findings are recorded in
 * docs/TEST_REPORT.md. But a contrast or landmark regression should never
 * reach a deploy, and this is what stops it.
 */

const ROUTES = [
  '/',
  '/projects/',
  '/projects/smcp-gateway/',
  '/projects/bootshift/',
  '/work/',
  '/experience/',
  '/research/',
  '/writing/',
  '/about/',
  '/contact/',
]

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

/**
 * Scroll reveals fade content in over 560ms. Axe sampling mid-transition reads
 * text composited at partial opacity and reports a contrast failure that does
 * not exist once the page settles. Emulating reduced motion makes the run
 * deterministic — and exercises the path a reduced-motion visitor actually
 * gets, where nothing is ever hidden.
 */
test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

for (const route of ROUTES) {
  test(`${route} has no detectable accessibility violations`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()

    // Report the rule and the element, so a failure is actionable from CI logs.
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}) — ${v.nodes.length} node(s): ${v.nodes[0]?.target.join(' ')}`
    )
    expect(summary, summary.join('\n')).toEqual([])
  })
}

/**
 * Dark mode is reached two ways and both are covered.
 *
 * The theme must be in place before first paint. Setting `data-theme` from an
 * evaluate() after load leaves axe reading colours it snapshotted earlier,
 * which reports the light palette composited on a dark ground — a failure that
 * does not exist for any real visitor.
 */
for (const [label, apply] of [
  [
    'system preference',
    async (page: import('@playwright/test').Page) => {
      await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
    },
  ],
  [
    'explicit toggle',
    async (page: import('@playwright/test').Page) => {
      await page.addInitScript(() => {
        try {
          localStorage.setItem('theme', 'dark')
        } catch {
          /* private mode */
        }
      })
    },
  ],
] as const) {
  test(`dark theme via ${label} keeps sufficient contrast`, async ({ page }) => {
    await apply(page)

    for (const route of ['/', '/projects/', '/projects/smcp-gateway/']) {
      await page.goto(route)

      const scheme = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
      expect(scheme, `${route} did not render in dark`).toBeTruthy()

      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      const failures = results.violations
        .filter((v) => v.id === 'color-contrast')
        .flatMap((v) => v.nodes.map((n) => `${route} ${n.target.join(' ')} — ${n.any[0]?.message ?? ''}`))

      expect(failures, failures.join(' // ')).toEqual([])
    }
  })
}

test('the assistant dialog is accessible once open', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /ask the site/i }).first().click()
  await expect(page.getByRole('dialog')).toBeVisible()

  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])
})

test('every image carries alternative text', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route)
    const missing = await page.$$eval('img:not([alt])', (nodes) =>
      nodes.map((n) => (n as HTMLImageElement).src)
    )
    expect(missing, `${route} has images without alt text`).toEqual([])
  }
})

test('headings descend without skipping a level', async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route)
    const levels = await page.$$eval('h1, h2, h3, h4, h5, h6', (nodes) =>
      nodes.map((n) => Number(n.tagName[1]))
    )

    expect(levels[0], `${route} does not start at h1`).toBe(1)
    for (let i = 1; i < levels.length; i++) {
      expect(
        levels[i] - levels[i - 1],
        `${route} jumps from h${levels[i - 1]} to h${levels[i]}`
      ).toBeLessThanOrEqual(1)
    }
  }
})

test('reduced motion is honoured', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  // Nothing should remain hidden waiting for a transition that will not run.
  const hidden = await page.$$eval('[data-reveal=""]', (nodes) =>
    nodes.filter((n) => getComputedStyle(n).opacity === '0').length
  )
  expect(hidden).toBe(0)
})
