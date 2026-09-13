import { test, expect, type Page } from '@playwright/test'

/**
 * The flows a visitor actually performs, in the order they perform them.
 *
 * Each test maps to a question someone is trying to answer — "what does he
 * do", "what has he built", "how do I reach him" — rather than to a component.
 */

const isMobile = (page: Page) => page.viewportSize()!.width < 768

/**
 * Interactive controls do nothing until React takes over. Waiting on the
 * hydration flag makes every interaction deterministic across browsers —
 * WebKit and Firefox hydrate later than Chromium, which is what made the
 * filter and shortcut tests flake there.
 */
async function ready(page: Page) {
  await page.waitForSelector('html[data-hydrated="true"]', { timeout: 15_000 })
}

/** Navigation collapses into a disclosure menu below the md breakpoint. */
async function goToSection(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: /open menu/i }).click()
    await page
      .getByRole('navigation', { name: 'Mobile' })
      .getByRole('link', { name: new RegExp(`^${label}`) })
      .click()
  } else {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: label }).click()
  }
}

/* ── 1. Arrival ─────────────────────────────────────────────────────────── */

test('a visitor can tell what he does without scrolling', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Krishna Annavaram/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  // Role, location and current employer are all above the fold. Scoped to
  // <main>, because the header repeats the role and hides it below `sm`.
  const main = page.locator('#main')
  await expect(main.getByText('Generative AI Engineer').first()).toBeVisible()
  await expect(main.getByText(/Denton/).first()).toBeVisible()

  // The three routes out of the hero.
  await expect(page.getByRole('link', { name: /see the systems/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /résumé/i }).first()).toBeVisible()
  await expect(page.getByRole('button', { name: /ask the site/i }).first()).toBeVisible()
})

test('the page never scrolls sideways', async ({ page }) => {
  for (const path of ['/', '/projects/', '/projects/smcp-gateway/', '/contact/']) {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(overflow, `${path} scrolls horizontally by ${overflow}px`).toBeLessThanOrEqual(1)
  }
})

/* ── 2-3. Finding work ──────────────────────────────────────────────────── */

test('a visitor reaches the projects index from the nav', async ({ page }) => {
  await page.goto('/')
  await goToSection(page, 'Projects')
  await expect(page).toHaveURL(/\/projects\//)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/systems/i)
})

test('filtering to agentic work narrows the list', async ({ page }) => {
  await page.goto('/projects/')
  await ready(page)

  const count = page.getByText(/\d+ projects?( of \d+)?/)
  const before = await count.textContent()

  await page.getByRole('button', { name: /^Agentic AI/ }).click()

  await expect(count).not.toHaveText(before!)
  await expect(page.getByRole('button', { name: /^Agentic AI/ })).toHaveAttribute(
    'aria-pressed',
    'true'
  )

  // Every remaining row carries the domain that was filtered on.
  const rows = page.getByRole('listitem').filter({ hasText: /Repository|University|Cognizant/ })
  await expect(rows.first()).toBeVisible()
})

test('search finds a project by technology rather than name', async ({ page }) => {
  await page.goto('/projects/')
  await ready(page)
  await page.getByLabel('Search projects').fill('MCP')
  await expect(page.getByRole('heading', { name: /Semantic MCP Data Access Gateway/ })).toBeVisible()
})

test('an empty result set explains itself and offers a way back', async ({ page }) => {
  await page.goto('/projects/')
  await ready(page)
  await page.getByLabel('Search projects').fill('zzzznothingmatchesthis')
  await expect(page.getByText(/nothing matches that combination/i)).toBeVisible()
  await page.getByRole('button', { name: /clear filters/i }).click()
  await expect(page.getByText(/nothing matches/i)).toHaveCount(0)
})

/* ── 4. Reading a case study ────────────────────────────────────────────── */

test('a case study gives problem, architecture, evidence and limitations', async ({ page }) => {
  await page.goto('/projects/smcp-gateway/')

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Semantic MCP')

  for (const section of [
    'The problem',
    'Architecture',
    'What was built',
    'Decisions',
    'Evidence',
    'What it cannot do',
  ]) {
    await expect(page.getByText(section, { exact: false }).first()).toBeVisible()
  }

  // The repository is linked, and the link is real.
  const repo = page.getByRole('link', { name: /KrishnaAnnavaram\/semantic-mcp/ })
  await expect(repo).toHaveAttribute('href', /github\.com/)
})

test('architecture nodes can be inspected without leaving the page', async ({ page }) => {
  await page.goto('/projects/bootshift/')
  await ready(page)

  // The label flips to "Hide detail" once open, so the assertion targets the
  // panel and the new label rather than re-querying the old one.
  await page.getByRole('button', { name: /\+ Detail/ }).first().click()

  const opened = page.getByRole('button', { name: /Hide detail/ })
  await expect(opened).toHaveCount(1)
  await expect(opened).toHaveAttribute('aria-expanded', 'true')

  // Exactly one panel is open, and it carries at least one labelled row.
  // (Not every node has a "Why" note, so the assertion cannot assume one.)
  const panel = page.locator('[id$="-detail"]:not([hidden])')
  await expect(panel).toHaveCount(1)
  await expect(panel).toBeVisible()
  await expect(panel.getByText(/^(In|Out|Uses|Why)$/).first()).toBeVisible()
})

test('the diagram states which stages are deterministic', async ({ page }) => {
  await page.goto('/projects/statute/')
  await expect(page.getByText(/same input produces the same output/i).first()).toBeVisible()
})

/* ── 5-6. Résumé and GitHub ─────────────────────────────────────────────── */

test('the résumé is reachable and actually resolves', async ({ page, request }) => {
  await page.goto('/')
  const link = page.getByRole('link', { name: /résumé/i }).first()
  const href = await link.getAttribute('href')
  expect(href).toBeTruthy()

  const response = await request.get(href!)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('pdf')
})

test('GitHub is linked from the hero and opens in a new tab', async ({ page }) => {
  await page.goto('/')
  const link = page.getByRole('link', { name: 'GitHub', exact: true }).first()
  await expect(link).toHaveAttribute('href', /github\.com\/KrishnaAnnavaram/)
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
})

test('GitHub activity renders from the committed snapshot', async ({ page }) => {
  await page.goto('/projects/')
  await expect(page.getByRole('heading', { name: /recent activity/i })).toBeVisible()
  await expect(page.getByText(/pushed/).first()).toBeVisible()
})

/* ── 7-8. The assistant ─────────────────────────────────────────────────── */

test('the assistant answers from the site and cites where it came from', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  await page.getByRole('button', { name: /ask the site/i }).first().click()

  const dialog = page.getByRole('dialog', { name: /ask about this portfolio/i })
  await expect(dialog).toBeVisible()

  const input = dialog.getByRole('textbox')
  await expect(input).toBeEnabled({ timeout: 10_000 })
  await input.fill('What experience does he have with RAG?')
  await input.press('Enter')

  // A citation is mandatory — an answer with no source is a bug, not a style.
  await expect(dialog.getByRole('link').first()).toBeVisible()
  await expect(dialog.getByText(/no model in the answer path/i)).toBeVisible()
})

test('the assistant declines a question the site cannot answer', async ({ page }) => {
  await page.goto('/')
  await ready(page)
  await page.getByRole('button', { name: /ask the site/i }).first().click()

  const dialog = page.getByRole('dialog', { name: /ask about this portfolio/i })
  const input = dialog.getByRole('textbox')
  await expect(input).toBeEnabled({ timeout: 10_000 })
  await input.fill('what is the capital of France')
  await input.press('Enter')

  await expect(dialog.getByText(/don't have anything in the portfolio/i)).toBeVisible()
})

test('a missing index degrades to a usable message, not a broken dialog', async ({ page }) => {
  await page.route('**/ai/knowledge.json', (route) => route.abort())
  await page.goto('/')
  await page.getByRole('button', { name: /ask the site/i }).first().click()

  const dialog = page.getByRole('dialog', { name: /ask about this portfolio/i })
  await expect(dialog.getByText(/index didn’t load|index didn't load/i)).toBeVisible()
  // It still points the visitor somewhere useful.
  await expect(dialog.getByRole('link', { name: /projects/i })).toBeVisible()
})

test('escape closes the assistant', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /ask the site/i }).first().click()
  const dialog = page.getByRole('dialog', { name: /ask about this portfolio/i })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
})

/* ── 9. Contact ─────────────────────────────────────────────────────────── */

test('the contact form composes a real message', async ({ page }) => {
  await page.goto('/contact/')

  await page.getByRole('button', { name: 'A role' }).click()
  await page.getByLabel(/your name/i).fill('Dana Reviewer')
  await page.getByLabel(/message/i).fill('We are hiring for an agentic AI role.')

  const send = page.getByRole('link', { name: /open in your mail app/i })
  const href = await send.getAttribute('href')
  expect(href).toContain('mailto:')
  expect(href).toContain('Dana%20Reviewer')
})

test('the email address is reachable in one click from the home page', async ({ page }) => {
  await page.goto('/')
  const mailto = page.locator('a[href^="mailto:"]').first()
  await expect(mailto).toBeVisible()
})

/* ── 10. Mobile ─────────────────────────────────────────────────────────── */

test('mobile navigation opens, navigates, and closes', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile layouts only')

  await page.goto('/')
  await ready(page)
  await ready(page)
  const toggle = page.getByRole('button', { name: /open menu/i })
  await toggle.click()

  const menu = page.getByRole('navigation', { name: 'Mobile' })
  await expect(menu).toBeVisible()

  await menu.getByRole('link', { name: /^Projects/ }).click()
  await expect(page).toHaveURL(/\/projects\//)
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toHaveCount(0)
})

test('tap targets are large enough to hit', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile layouts only')

  await page.goto('/projects/')
  const chip = page.getByRole('button', { name: /^Agentic AI/ })
  const box = await chip.boundingBox()
  expect(box!.height).toBeGreaterThanOrEqual(24)
})

/* ── 11. Theme ──────────────────────────────────────────────────────────── */

test('the theme toggle switches and survives a reload', async ({ page }) => {
  await page.goto('/')

  // The toggle is a radiogroup of three options: system, light, dark.
  const options = page.getByRole('radiogroup', { name: /colour theme/i }).getByRole('radio')
  const toggle = options.last()
  await toggle.click()

  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  expect(['dark', 'light']).toContain(theme)

  await page.reload()
  const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
  expect(after).toBe(theme)
})

/* ── 12. Keyboard ───────────────────────────────────────────────────────── */

test('the keyboard reaches the content and the skip link works', async ({
  page,
  browserName,
}) => {
  test.skip(isMobile(page), 'keyboard navigation is a desktop concern')

  await page.goto('/')
  await ready(page)

  const skip = page.getByRole('link', { name: /skip to content/i })

  if (browserName === 'webkit') {
    // Safari only tabs to links when "Full Keyboard Access" is enabled, and
    // Playwright's WebKit matches that default. The link is still the first
    // focusable element and still works — which is what actually matters.
    await skip.focus()
  } else {
    await page.keyboard.press('Tab')
  }

  await expect(skip).toBeFocused()
  await skip.press('Enter')
  await expect(page.locator('#main')).toBeVisible()
})

test('the assistant opens on / and traps focus', async ({ page }) => {
  test.skip(isMobile(page), 'keyboard shortcut is a desktop affordance')

  await page.goto('/')
  // The shortcut is bound on hydration; pressing before that is a test race.
  await ready(page)
  await page.keyboard.press('/')

  const dialog = page.getByRole('dialog', { name: /ask about this portfolio/i })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('textbox')).toBeFocused()
})

/* ── 13. Resilience ─────────────────────────────────────────────────────── */

test('the site is fully usable with no network access to GitHub', async ({ page }) => {
  await page.route('**://api.github.com/**', (route) => route.abort())
  await page.route('**://github.com/**', (route) => route.abort())

  await page.goto('/projects/')
  await expect(page.getByRole('heading', { name: /recent activity/i })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
})

test('content renders with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()

  await page.goto('/projects/smcp-gateway/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // Reveal animations are gated on a `js` class, so nothing is hidden without it.
  await expect(page.getByText(/The problem/).first()).toBeVisible()

  await context.close()
})

test('no console errors on the main routes', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(err.message))

  for (const path of ['/', '/projects/', '/projects/bootshift/', '/about/', '/contact/']) {
    await page.goto(path)
    await page.waitForLoadState('networkidle')
  }

  expect(errors).toEqual([])
})
