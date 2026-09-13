#!/usr/bin/env node
/**
 * Minimal static server for the `out/` export, used by the Playwright suite.
 *
 * Deliberately dependency-free: adding a server package to devDependencies to
 * serve a folder of files during tests is a poor trade. It mirrors the two
 * behaviours of GitHub Pages that the tests depend on — `trailingSlash` index
 * resolution, and a 404 page — and nothing else.
 *
 *   node scripts/serve-out.mjs [port]
 */

import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat, readFile } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const ROOT = resolve(process.cwd(), 'out')
const PORT = Number(process.argv[2] || process.env.PORT || 4321)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

async function resolveFile(urlPath) {
  // Reject traversal before touching the filesystem.
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '')
  const target = join(ROOT, clean)
  if (!target.startsWith(ROOT)) return null

  try {
    const info = await stat(target)
    if (info.isDirectory()) {
      const index = join(target, 'index.html')
      await stat(index)
      return index
    }
    return target
  } catch {
    // `/projects` with no trailing slash still has to find `/projects/index.html`.
    try {
      const withIndex = join(ROOT, clean, 'index.html')
      await stat(withIndex)
      return withIndex
    } catch {
      try {
        const withHtml = `${target}.html`
        await stat(withHtml)
        return withHtml
      } catch {
        return null
      }
    }
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url || '/')

  if (!file) {
    const notFound = join(ROOT, '404.html')
    try {
      const body = await readFile(notFound)
      res.writeHead(404, { 'content-type': TYPES['.html'] })
      res.end(body)
    } catch {
      res.writeHead(404, { 'content-type': TYPES['.txt'] })
      res.end('Not found')
    }
    return
  }

  res.writeHead(200, {
    'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  })
  createReadStream(file).pipe(res)
})

server.listen(PORT, () => {
  console.log(`serving ./out at http://localhost:${PORT}`)
})
