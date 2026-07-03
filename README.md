# Omnifood — Marketing Website

A production-quality marketing site for Omnifood, an AI-personalized healthy
meal subscription. Static HTML/CSS/JS, built to be fast, accessible, and easy
to hand off to a design or engineering team.

## Overview

This project takes the original Omnifood landing page and rebuilds its
visual system, copy, structure, and interactions into a site that reads as a
real product launch rather than a course exercise — while keeping the same
static, dependency-free stack (no build step required).

## Features

- **Design system** — typed color, spacing, radius, shadow, and motion tokens
  in `css/general.css`, driving every component consistently.
- **New sections** — animated stats band, "Why Omnifood" nutrition-science
  cards, a sustainability promise, and an FAQ accordion, on top of the
  original hero, how-it-works, meals, testimonials, pricing, and sign-up CTA.
- **Micro-interactions** — hover lift on cards, underline-draw nav links,
  image zoom in the gallery and meal cards, animated counters, and a floating
  rating/nutrition badge pair in the hero.
- **Scroll experience** — sticky header that compresses on scroll, a scroll
  progress bar, section reveal-on-scroll (IntersectionObserver), and a
  back-to-top button.
- **Loading screen** — branded splash with a progress sweep that fades into
  the page once assets are ready.
- **Accessibility** — semantic landmarks, a skip link, visible focus states,
  labeled form fields, `aria-expanded` on interactive controls, and
  `prefers-reduced-motion` support throughout.
- **SEO** — descriptive title/meta description, Open Graph and Twitter Card
  tags, Organization JSON-LD, canonical URL, `robots.txt`, and `sitemap.xml`.

## Technology stack

| Layer      | Choice                                   |
| ---------- | ----------------------------------------- |
| Markup     | Semantic HTML5                            |
| Styling    | Hand-written CSS (custom properties, Grid, Flexbox) |
| Fonts      | Fraunces (display) + Inter (body/UI), via Google Fonts |
| Icons      | Ionicons 5                                |
| Behavior   | Vanilla JavaScript (ES6+, no framework)   |

No bundler, package manager, or build step is required — open `index.html`
in a browser, or serve the folder with any static file server.

## Folder structure

```
Omnifood/
├── index.html              Page markup
├── manifest.webmanifest    PWA metadata
├── robots.txt               Crawler rules
├── sitemap.xml               Sitemap
├── css/
│   ├── general.css          Design tokens, reset, typography, utilities
│   ├── style.css             Component styles (header, hero, cards, etc.)
│   └── queries.css           Responsive breakpoints (1344/1200/944/704/544px)
├── js/
│   └── script.js             Nav, scroll effects, reveal, counters, FAQ, forms
└── img/                      Photography, app screenshots, logos, icons
```

## Installation

1. Download or clone this folder.
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
3. No environment variables or dependencies are required.

## Performance notes

- The hero image is served as WebP with a PNG fallback via `<picture>`, and
  is the only image marked `fetchpriority="high"`; every other image below
  the fold uses `loading="lazy"`.
- Fonts are loaded with `preconnect` hints and `display=swap` to avoid
  blocking text rendering.
- Animations are GPU-friendly (`transform`/`opacity` only) and respect
  `prefers-reduced-motion`.
- For a production deploy, run images through a compressor (e.g. Squoosh)
  and consider serving `gallery/*.jpg` and `meals/*.jpg` as WebP/AVIF too.

## Accessibility

- Skip-to-content link, landmark elements (`header`, `main`, `nav`, `footer`).
- All interactive controls are keyboard-reachable with visible focus rings.
- Form fields have associated `<label>`s; the mobile nav toggle and FAQ
  buttons expose `aria-expanded`.
- Color contrast follows WCAG AA against the cream/white surfaces.

## Future roadmap / architecture notes

The site is intentionally static so it can evolve without a rewrite:

- **Frontend**: components in `style.css` map cleanly to React components
  (Header, Hero, MealCard, PricingPlan, FaqItem) if the project moves to a
  framework — class names are already component-scoped (BEM-ish).
- **Backend**: the sign-up form (`.cta-form`) and newsletter form are ready
  to point at a Node.js/Express or PHP endpoint; swap the `netlify` attribute
  and `submit` handler in `js/script.js` for a real `fetch()` call.
- **Data**: meal cards, pricing plans, and FAQ items are simple repeated
  markup blocks — a CMS (Sanity, Contentful) or a MySQL-backed API could
  drive them without touching the CSS.
- **Auth/payments**: "Create account" / "Sign in" links in the footer are
  placeholders for a future auth flow (e.g. NextAuth or a custom JWT flow)
  and a subscription billing integration (e.g. Stripe Billing).

## Deployment

Any static host works as-is: Netlify, Vercel, GitHub Pages, or an S3 +
CloudFront bucket. Update the canonical URL, Open Graph URLs, and
`sitemap.xml` domain to match the production hostname before launch.
