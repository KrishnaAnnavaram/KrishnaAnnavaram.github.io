# Krishna Annavaram — Portfolio

Personal portfolio website for Krishna Annavaram, GenAI Engineer and Healthcare AI Specialist.

**Live:** https://krishnaannavaram.github.io

## Tech Stack

- **Framework:** Next.js 14 App Router with TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom design system tokens
- **Animation:** Framer Motion 11+ and GSAP 3.12+
- **3D:** React Three Fiber / Three.js with custom GLSL shaders
- **AI:** Claude API integration via proxy endpoint
- **Content:** MDX for writing section
- **Deployment:** GitHub Pages via `next export`

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npx serve out
```

The dev server runs at http://localhost:3000

## Environment Variables

Create a `.env.local` file for local development:

```env
# AI Concierge endpoint (your Vercel/Cloudflare Worker URL)
NEXT_PUBLIC_AI_ENDPOINT=https://your-ai-proxy.vercel.app/api/concierge

# Contact form endpoint
NEXT_PUBLIC_CONTACT_ENDPOINT=https://your-form-handler.vercel.app/api/contact
```

For GitHub Pages deployment, add these as repository secrets:
- `AI_ENDPOINT` → your AI proxy URL
- `CONTACT_ENDPOINT` → your contact form handler URL

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/
│   ├── ai/                 # AI Concierge
│   ├── layout/             # Header, Footer, MobileNav
│   ├── sections/           # Homepage sections
│   ├── three/              # Three.js 3D components
│   └── ui/                 # Shared UI components
├── content/writing/        # MDX blog posts
├── data/                   # All profile/experience/project data
├── lib/                    # Utilities and AI client code
├── public/                 # Static assets
└── styles/                 # Global CSS
```

## Updating Content

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for instructions on updating profile data, adding projects, and writing new articles.

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for full deployment instructions.

Deployment is automatic on push to `main` via GitHub Actions. The `claude/` branch is for AI-assisted development and should be merged to `main` when ready.
