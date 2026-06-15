# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Yash Bhatt, an Actuarial Pricing & Analytics Consultant. It is a pure HTML/CSS/JS site with no build system, package manager, or framework — open `index.html` directly in a browser or use any static file server.

## Development

Since there is no build step, serving the site locally is the only development requirement:

```bash
# Any of these work:
python3 -m http.server 8080
npx serve .
open index.html   # Direct file open (carousel images may not load due to CORS)
```

To preview print/PDF export mode, use the browser's Print dialog — a `@media print` stylesheet is embedded in `index.html` that hides nav, contact form, and scroll elements.

## Architecture

**Single-page layout** — all content lives in `index.html` as one long document with anchor-linked sections: `#hero`, `#about`, `#experience`, `#skills`, `#engagement-models`, `#resume`, `#insights`, `#contact`.

**CSS is split into five modules** (loaded in order — order matters):
- `css/variables.css` — all design tokens (colors, spacing, typography, shadows, transitions). Uses `light-dark()` CSS function for automatic dark/light theming via `color-scheme`. All other CSS files depend on these custom properties.
- `css/base.css` — CSS reset and body defaults.
- `css/layout.css` — structural helpers: `.container`, `.container-narrow`, `.grid`, `.section`, `.section-alt`, `.header`, `.footer`, `.timeline-container`.
- `css/components.css` — reusable UI components: `.btn`, `.card`, `.glass-card`, `.metric-card`, `.insight-card`, `.tech-card`, `.form-control`, `.client-logo-*`.
- `css/animations.css` — keyframes and animation classes: `.scroll-reveal`, `.scroll-reveal-slow`, `.scroll-fade`, `.animate-pulse-soft`. Uses CSS `@layer animations`.

**JS is split into two modules:**
- `js/main.js` — header scroll state, mobile nav (with focus trapping), theme toggle (persisted in `localStorage` as `theme-preference`, applied via `document.documentElement.style.colorScheme`), contact form validation, nav active highlighting, hero background carousel (5s interval).
- `js/scroll-effects.js` — detects native CSS Scroll-Driven Animations support (`animation-timeline: view()`). If unsupported, falls back to `IntersectionObserver` for `.scroll-reveal` elements and a JS scroll event for the progress bar.

**Theme system** uses the native CSS `color-scheme` property and `light-dark()` function — no class toggling. Switching theme sets `document.documentElement.style.colorScheme` and saves to `localStorage`.

## Key Conventions

- All spacing, color, and typography values must use the CSS custom properties defined in `variables.css` — do not hardcode values.
- Cache-busting is done with `?v=1.1` query params on CSS/JS `<link>`/`<script>` tags — increment when making changes to those files.
- Tech icons are loaded from `cdn.jsdelivr.net/gh/devicons/devicon` and `api.iconify.design` CDNs. Company-specific logos (Databricks, Snowflake, client logos) are local PNGs in `assets/`.
- Hero carousel uses `.png` images (`assets/img1.png`–`img5.png`). Both `.png` and `.jpg` versions exist in `assets/` — HTML references `.png`.
- The contact form does **not** submit to a backend — it is a UI-only simulation that shows a success alert and resets the form.
