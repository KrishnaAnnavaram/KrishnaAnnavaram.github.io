# Deployment Guide

## GitHub Pages (Primary Deployment)

The site deploys automatically to GitHub Pages when you push to `main`.

### Setup (One-Time)

1. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: GitHub Actions

2. **Add Repository Secrets:**
   Go to repo Settings → Secrets → Actions → New repository secret:
   - `AI_ENDPOINT` — URL of your AI proxy (see AI Concierge section)
   - `CONTACT_ENDPOINT` — URL of your contact form handler (optional)

3. **Push to main:**
   ```bash
   git push origin main
   ```

   The GitHub Actions workflow will build and deploy automatically.

---

## AI Concierge Backend

The AI Concierge requires a proxy endpoint (since GitHub Pages is static and cannot make server-side API calls to Anthropic).

### Option A: Vercel Edge Function (Recommended)

1. Create a new Next.js project on Vercel
2. Add this API route (`pages/api/concierge.ts`):

```typescript
import { NextApiRequest, NextApiResponse } from 'next'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, system, model = 'claude-sonnet-4-6', max_tokens = 512 } = req.body

  // CORS for your portfolio domain
  res.setHeader('Access-Control-Allow-Origin', 'https://krishnaannavaram.github.io')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  try {
    const stream = await anthropic.messages.stream({
      model,
      max_tokens,
      system,
      messages,
    })

    for await (const event of stream) {
      res.write(`data: ${JSON.stringify(event)}\n\n`)
    }
    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    res.status(500).json({ error: 'AI service error' })
  }
}
```

3. Set `ANTHROPIC_API_KEY` in Vercel environment variables
4. Deploy and copy the URL
5. Set `AI_ENDPOINT` secret in the portfolio repo

### Option B: Cloudflare Worker

Similar approach using Cloudflare Workers with the Anthropic SDK.

### Fallback Behavior

If `AI_ENDPOINT` is not set, the concierge falls back to pre-written responses covering common recruiter questions. The concierge still works, it just uses static responses.

---

## Contact Form Backend

### Option A: Formspree (Easiest)

1. Create account at formspree.io
2. Create a new form
3. Use the endpoint URL as `CONTACT_ENDPOINT`
4. No additional configuration needed

### Option B: Vercel API Route

Similar to AI endpoint, create a simple form handler.

### Without Backend

The contact form shows an error state if no endpoint is configured, and includes a direct email link as fallback.

---

## Local Development

```bash
# Install
npm install

# Create .env.local
cp .env.example .env.local
# Edit with your endpoint URLs

# Develop
npm run dev

# Build
npm run build

# Preview built output
npx serve out
```

---

## Performance Optimization

The Three.js 3D scene lazy-loads via `dynamic()` with `ssr: false`, so it does not affect initial page load.

Images are not optimized by Next.js (required for static export), so manually optimize profile and project images before committing.

Target image sizes:
- Profile photo: 512×512 WebP, < 100KB
- Project screenshots: 1200×800 WebP, < 200KB each
