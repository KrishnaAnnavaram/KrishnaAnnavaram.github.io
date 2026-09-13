import { test } from '@playwright/test'

/**
 * Diagnostic, not an assertion — numbers on a loopback connection are not
 * field data, and a threshold here would only measure the CI machine.
 *
 * It exists because the reveal mechanism once made the hero paragraph the LCP
 * element at ~1,050ms while First Contentful Paint was ~180ms: the page was
 * hiding its own first screen until its JavaScript arrived. This reports LCP,
 * the element responsible, and whether that element was inside a reveal — so
 * the regression is visible rather than inferred.
 *
 *   npx playwright test tests/e2e/perf-probe.spec.ts --project=chromium
 */

const ROUTES = ['/', '/projects/', '/projects/smcp-gateway/', '/about/', '/experience/']

test.describe('performance probe', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'LCP API is Chromium-only')

  test('report LCP, its element, and transferred bytes', async ({ page }) => {
    for (const route of ROUTES) {
      let bytes = 0
      const onResponse = async (r: import('@playwright/test').Response) => {
        try {
          bytes += (await r.body()).length
        } catch {
          /* redirects and aborted requests have no body */
        }
      }
      page.on('response', onResponse)

      await page.goto(route, { waitUntil: 'networkidle' })

      const timing = await page.evaluate(
        () =>
          new Promise<{ fcp: number; lcp: number; el: string; inReveal: boolean }>((resolve) => {
            let lcp = 0
            let el = '—'
            let inReveal = false

            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                const e = entry as PerformanceEntry & { element?: Element }
                lcp = entry.startTime
                if (e.element) {
                  el = `${e.element.tagName.toLowerCase()}.${String(e.element.className).split(/\s+/).slice(0, 2).join('.')}`
                  inReveal = Boolean(e.element.closest('[data-reveal]'))
                }
              }
            })
            observer.observe({ type: 'largest-contentful-paint', buffered: true })

            const fcp =
              performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0

            setTimeout(() => {
              observer.disconnect()
              resolve({ fcp, lcp, el, inReveal })
            }, 600)
          })
      )

      page.off('response', onResponse)

      console.log(
        `${route.padEnd(28)} FCP ${Math.round(timing.fcp).toString().padStart(4)}ms   ` +
          `LCP ${Math.round(timing.lcp).toString().padStart(4)}ms   ` +
          `${(bytes / 1024).toFixed(0).padStart(5)} kB   ` +
          `${timing.inReveal ? 'LCP IS INSIDE A REVEAL  ' : ''}${timing.el}`
      )
    }
  })
})
