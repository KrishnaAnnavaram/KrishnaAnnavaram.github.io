# Design Notes

## Design Philosophy

The portfolio is designed around a single principle: **the medium demonstrates the expertise**.

A GenAI Engineer's portfolio should feel like a living AI artifact — something that breathes, responds, and thinks. Every design decision is in service of this signal.

## Color System

Dark-first. Deep space palette with brand indigo as the primary signal color.

```css
/* Backgrounds — dark hierarchy */
--bg-primary: #050508;       /* Page background */
--bg-secondary: #0d0d14;     /* Section backgrounds */
--bg-surface: #12121c;       /* Cards */
--bg-elevated: #1a1a28;      /* Elevated elements, code blocks */

/* Brand */
--brand-primary: #6366f1;    /* Indigo — primary actions, highlights */
--brand-secondary: #8b5cf6;  /* Violet — gradients, secondary elements */
--brand-accent: #06b6d4;     /* Cyan — accents, tech labels */
--brand-warm: #f59e0b;       /* Amber — healthcare/human warmth */

/* Text — three levels of hierarchy */
--text-primary: #f1f5f9;     /* Headlines, important content */
--text-secondary: #94a3b8;   /* Body text */
--text-muted: #475569;       /* Labels, metadata, captions */
```

To change the accent color scheme, update CSS custom properties in `app/globals.css`. The colors cascade through all components automatically.

## Typography

Three typefaces, each with a clear role:

- **Space Grotesk** (`--font-space-grotesk`) — Display/headings. Distinctive, technical character.
- **Inter** (`--font-inter`) — Body text. Maximum readability.
- **JetBrains Mono** (`--font-jetbrains-mono`) — Code, technical labels, tags.

Fluid type scale uses `clamp()` to scale naturally across viewport widths. No media query breakpoints needed for type.

## Glass Morphism

The `glass` class creates the characteristic frosted-glass effect:

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}
```

Use `.glass-sm` for tighter elements (pills, small cards).

## Animation Principles

1. **Performance first** — use `transform` and `opacity` only. Never animate layout properties.
2. **Purposeful** — every animation must communicate information or guide attention.
3. **Reduced motion respected** — all non-essential animations are disabled via `prefers-reduced-motion`.
4. **Stagger with intent** — card stagger delays feel natural, not mechanical.

Framer Motion `whileInView` with `viewport={{ once: true }}` for scroll-triggered animations (avoids re-triggering on scroll back).

## 3D Scene

The hero 3D scene uses:
- **Icosphere** with custom vertex shader for neural firing displacement
- **Particle field** with directional flow and speed-based coloring
- **Inline GLSL** via `shaderMaterial` — no external shader files needed for this build

Performance tiers are detected at runtime:
- WebGL2 available → full scene
- WebGL2 unavailable → CSS gradient orbs fallback (still premium looking)

The scene uses `frameloop="demand"` when not in viewport to preserve battery.

## Accessibility

- All interactive elements have visible focus indicators
- Color contrast meets WCAG 2.1 AA (minimum 4.5:1 for body text)
- Skip-to-content link at top of each page
- ARIA labels on all icon-only buttons
- Semantic HTML hierarchy throughout
- One `h1` per page

## Mobile

- Bottom tab navigation (thumb zone) replaces header on mobile
- All touch targets are ≥ 44×44px
- Swipe gestures on project cards via `@use-gesture/react`

## Customizing the Design System

To change the accent from indigo to another color:

1. Update `--brand-primary` and `--brand-secondary` in `app/globals.css`
2. Update the same values in `tailwind.config.ts` under `colors.brand`
3. The gradient text and glow effects will update automatically

To add a new animation:

1. Define keyframes in `tailwind.config.ts` under `keyframes`
2. Add the `animation` entry under `animation`
3. Use via Tailwind class: `animate-your-name`
