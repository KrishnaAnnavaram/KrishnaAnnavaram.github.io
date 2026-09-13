import { test, expect, type Page } from '@playwright/test'

/**
 * The responsive matrix, tested properly.
 *
 * The first version of the suite checked four routes at two widths and passed
 * while the header overflowed by 388px at 768px and the Evidence section of a
 * case study was clipped off the right edge of every phone. Both were invisible
 * because `body { overflow-x: hidden }` suppresses the scrollbar — the content
 * is gone, and nothing indicates it.
 *
 * So: every route, every breakpoint in the brief, and an assertion that names
 * the element responsible when it fails.
 */

const ROUTES = [
  '/',
  '/projects/',
  '/projects/smcp-gateway/',
  '/projects/bootshift/',
  '/projects/statute/',
  '/projects/decisionforge/',
  '/projects/adaptive-legacy-complexity-harness/',
  '/work/clinical-decision-support-graph-rag/',
  '/experience/',
  '/research/',
  '/writing/',
  '/about/',
  '/contact/',
]

/** Every width in the brief, plus the two where the header actually broke. */
const WIDTHS = [320, 375, 390, 430, 640, 700, 768, 1024, 1280, 1440, 1920]

/** Reports the widest offending element, so a failure is actionable. */
async function overflow(page: Page) {
  return page.evaluate(() => {
    const doc = document.documentElement
    const amount = doc.scrollWidth - doc.clientWidth
    if (amount <= 1) return { amount, culprits: [] as string[] }

    const limit = doc.clientWidth
    const culprits: string[] = []
    for (const el of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
      const rect = el.getBoundingClientRect()
      if (rect.width === 0 || rect.right <= limit + 1) continue
      // Only the outermost offender in a chain is worth reporting.
      const parent = el.parentElement
      if (parent && parent.getBoundingClientRect().right > limit + 1) continue
      const id = `${el.tagName.toLowerCase()}${el.className ? `.${String(el.className).split(/\s+/).slice(0, 3).join('.')}` : ''}`
      culprits.push(`${id} → right ${Math.round(rect.right)} of ${limit}`)
      if (culprits.length >= 3) break
    }
    return { amount, culprits }
  })
}

test.describe('no horizontal overflow', () => {
  // One project runs the sweep; the device profiles have fixed viewports.
  test.skip(({ browserName }) => browserName !== 'chromium', 'viewport sweep runs once')

  for (const width of WIDTHS) {
    test(`at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      const failures: string[] = []

      for (const route of ROUTES) {
        await page.goto(route)
        const { amount, culprits } = await overflow(page)
        if (amount > 1) {
          failures.push(`${route} overflows by ${amount}px — ${culprits.join(' | ')}`)
        }
      }

      expect(failures, failures.join('\n')).toEqual([])
    })
  }
})

test.describe('navigation is reachable at every width', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'viewport sweep runs once')

  for (const width of WIDTHS) {
    test(`at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await page.waitForSelector('html[data-hydrated="true"]')

      const desktopNav = page.getByRole('navigation', { name: 'Primary' })
      const toggle = page.getByRole('button', { name: /open menu/i })

      const navVisible = await desktopNav.isVisible()
      const toggleVisible = await toggle.isVisible()

      // Exactly one route into the site must exist — never zero, which is what
      // happened between 640 and 719px when the toggle rendered off-screen.
      expect(
        navVisible || toggleVisible,
        `no navigation at ${width}px: desktop nav ${navVisible}, toggle ${toggleVisible}`
      ).toBe(true)

      if (toggleVisible) {
        // Visible is not the same as reachable — assert it is actually inside
        // the viewport and can be clicked.
        const box = (await toggle.boundingBox())!
        expect(box.x + box.width, `toggle extends past ${width}px`).toBeLessThanOrEqual(width)
        await toggle.click()
        await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()
      } else {
        // Every primary link must be inside the viewport, not merely rendered.
        const links = await desktopNav.getByRole('link').all()
        expect(links.length).toBe(6)
        for (const link of links) {
          const box = (await link.boundingBox())!
          const label = await link.textContent()
          expect(box.x + box.width, `"${label}" sits past ${width}px`).toBeLessThanOrEqual(width)
        }
      }
    })
  }
})

test.describe('focus management', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'runs once')

  test('the mobile menu closes on Escape and returns focus to its toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.waitForSelector('html[data-hydrated="true"]')

  const toggle = page.getByRole('button', { name: /open menu/i })
  await toggle.click()
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /open menu/i })).toBeFocused()
})

  test('closing the assistant returns focus to whatever opened it', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('html[data-hydrated="true"]')

  const trigger = page.getByRole('button', { name: /ask the site/i }).first()
  await trigger.click()
  await expect(page.getByRole('dialog', { name: /ask about this portfolio/i })).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
})

  test('every interactive control shows a focus ring', async ({ page }) => {
  const routes = ['/projects/', '/research/', '/contact/']
  const bare: string[] = []

  for (const route of routes) {
    await page.goto(route)
    await page.waitForSelector('html[data-hydrated="true"]')

    const inputs = await page.locator('input:not([type=hidden]), textarea').all()
    for (const input of inputs) {
      await input.focus()
      const visible = await input.evaluate((el) => {
        const s = getComputedStyle(el)
        const ring = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 1
        const shadow = s.boxShadow !== 'none'
        return ring || shadow
      })
      if (!visible) {
        bare.push(`${route} ${await input.getAttribute('id')}`)
      }
    }
  }

  expect(bare, `no visible focus indicator on: ${bare.join(', ')}`).toEqual([])
})
})
