# Content Guide

How to update and maintain the portfolio content.

## Profile / Bio

Edit `data/profile.ts`:
- `bio` — main bio text (shown on About page)
- `philosophy` — extended philosophy text
- `principles` — 3 principle cards (title, description, icon)
- `availability` — current availability status line
- `socials` — email, LinkedIn, GitHub URLs
- `idealRoles` — list of target roles

## Experience

Edit `data/experience.ts`. Each role has:

```typescript
{
  id: 'unique-id',
  company: 'Company Name',
  title: 'Job Title',
  startDate: 'YYYY-MM',
  endDate: 'YYYY-MM', // or null if current
  location: 'City, State',
  type: 'Full-time', // 'Contract' | 'Part-time' | 'Academic'
  summary: 'One or two sentence summary',
  context: 'What problem were you solving?',
  built: ['item 1', 'item 2'],  // What you built
  architecture: 'Technical architecture description',
  impact: [{ metric: 'Metric name', value: 'Defensible description' }],
  techStack: ['Python', 'FastAPI'],
  relatedProjects: ['project-slug'],
  lessonsLearned: 'Key lesson from this role',
  featured: true,  // Show in featured section?
}
```

**IMPORTANT:** Use defensible impact language. No unverifiable compliance claims.

## Projects

Edit `data/projects.ts`. Each project has:

```typescript
{
  slug: 'url-slug',
  title: 'Project Title',
  tagline: 'One sentence description',
  category: 'Healthcare AI', // See ProjectCategory type
  year: '2024',
  problem: 'What problem was this solving?',
  approach: 'How did you approach it?',
  results: [{ metric: 'name', description: 'defensible result description' }],
  techStack: ['Python', 'FastAPI'],
  architecture: 'Architecture description',
  images: [],  // paths like '/images/projects/my-project.png'
  reportAvailable: false,  // Shows lock icon if true
  repoUrl: 'https://github.com/...', // optional
  demoUrl: 'https://...', // optional
  relatedExperience: ['experience-id'],
  featured: true,
}
```

## Writing (MDX Articles)

Create a new file in `content/writing/your-slug.mdx`:

```mdx
---
title: "Your Article Title"
date: "2024-12-01"
tags: [GenAI, RAG, Production]
readTime: 8
excerpt: "A one or two sentence description shown in article listings."
featured: false
---

# Your Article Title

Your content here...
```

MDX supports standard markdown plus:
- Code blocks with language highlighting
- Tables
- Blockquotes
- Links

## Skills

Edit `data/skills.ts`. Add new skills:

```typescript
{
  name: 'Skill Name',
  category: 'GenAI & LLMs',  // See SkillCategory type
  level: 'Expert',  // 'Expert' | 'Advanced' | 'Proficient'
  years: 3,
  relatedProjects: ['project-slug'],
}
```

## Certifications

Edit `data/certifications.ts`. Each certification:

```typescript
{
  id: 'unique-id',
  name: 'Certification Name',
  issuer: 'Issuing Organization',
  issuedDate: 'YYYY-MM',
  expiryDate: 'YYYY-MM',  // optional
  credentialId: '...',  // optional, for Credly badge ID
  verifyUrl: 'https://credly.com/badges/...',  // optional
  category: 'Cloud & AI',
  featured: true,
}
```

## Profile Photo

Replace `public/images/profile/profile.png` with a new photo.
Recommended: 512×512 or larger, square crop.

## Resume / Cover Letter

Replace `public/resume/resume.pdf` and `public/resume/cover-letter.pdf`.
These are directly downloaded by site visitors.

## After Any Changes

1. Test locally: `npm run dev`
2. Build: `npm run build` — fix any errors
3. Commit and push to trigger deployment
