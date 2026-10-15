# Beam — Pricing Page A/B Tester

A marketing homepage for **Beam**, a fictional SaaS that runs pricing-page A/B tests and
measures revenue per visitor instead of clicks.

Built with Next.js (App Router, Turbopack) and an "antigravity" visual language: layered
Z-depth, glassmorphism, isometric composition, and motion driven by GSAP + ScrollTrigger.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static prerender)
npm start
```

## Design system

Tokens live in `app/globals.css` under `@theme` (Tailwind v4 CSS-first config):

| Token | Value | Use |
| --- | --- | --- |
| `--color-ink` … `--color-ink-4` | `#0a0a14` → `#a3a3ba` | text ramp |
| `--color-beam` / `--color-beam-deep` | `#6d5dfb` / `#4a37e0` | brand violet |
| `--color-aqua` | `#12c2dd` | the "winning variant" accent |
| `--color-coral`, `--color-lime` | `#ff7a59`, `#7fd97f` | warnings / guardrail pass |
| `--font-display` | Sora | headlines |
| `--font-mono` | Geist Mono | data readouts, metrics |

Custom classes (`.glass`, `.glass-deep`, `.chip`, `.btn`, `.iso-plane`, `.rig-*`,
`.anim-*`) are declared inside `@layer components` so per-instance Tailwind utilities
can still override them.

## Motion rules

- Everything animated imports from `components/motion/gsap.ts`, so plugins register once.
- `<Reveal>` staggers direct children into view with a slight forward tip (`rotateX`).
- `<TiltCard>` uses `gsap.quickTo` for pointer-reactive 3D tilt plus a tracked glare.
- `<AnimatedNumber>` tweens numeric readouts and re-tweens from its current value.
- `prefers-reduced-motion: reduce` is respected twice over: CSS kills keyframes and
  transitions, and each component renders its final state instead of animating.

## Layout notes

- The hero "rig" is an isometric 3D board on `sm` and up, and collapses into a plain
  stacked A/B comparison on phones, where a scaled 3D scene would be unreadable
  (`.rig-tilt` / `.rig-stage` media queries).
- CSS-animated elements are always separate DOM nodes from GSAP-animated ones, so a CSS
  `animation` transform never fights an inline GSAP transform.
- `body` uses `overflow-x: clip` rather than `hidden`, because `hidden` would make the
  body a scroll container and break the sticky nav.

## Structure

```
app/
  layout.tsx      fonts, metadata, root chrome
  page.tsx        section composition
  globals.css     tokens, component classes, keyframes, reduced-motion
components/
  Nav · Hero · VariantLab · FeatureGrid · MetricsBand
  HowItWorks · Proof · PricingTiers · FinalCTA · Footer · Brand
  motion/         gsap setup, Reveal, TiltCard, AnimatedNumber, Ambience, reduced-motion hook
```

`VariantLab` is the interactive centrepiece: switch variants, change the traffic split,
and watch conversion, ARPU, revenue per visitor, confidence, and guardrails respond.
