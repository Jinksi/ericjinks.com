# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `npm run dev` (starts Astro dev server on localhost:4321)
- **Build**: `npm run build` (generates static site in `dist/`)
- **Preview**: `npm run preview` (serves built site for testing)
- **Tests**: `npm run test:e2e` (runs Playwright E2E tests)
- **Single test**: `npx playwright test tests/specific-test.spec.ts`
- **Format**: `npx prettier --write .`
- I'll be running the dev server in the background

## Architecture Overview

This is a personal blog/portfolio website built with **Astro** as the primary framework, using selective hydration with React and Svelte components.

### Tech Stack
- **Framework**: Astro 5.x (static site generation)
- **UI Libraries**: React 18, Svelte 5, TypeScript
- **Content**: Astro Content Collections with Zod schema validation
- **Styling**: SCSS with CSS custom properties, dark/light theme support
- **Testing**: Playwright for E2E tests
- **Deployment**: Netlify (static hosting)

### Key Directories

- **`src/content/`**: Content Collections
  - `blog/` - Blog posts in MDX format organized by year
  - `sketch/` - Creative coding projects/sketches
  - Content schema defined in `src/content.config.ts` with Zod validation

- **`src/components/`**: Mixed component architecture
  - `.astro` files for static/server-rendered components
  - `react/` subdirectory for React components requiring client-side interactivity
  - `ml/` subdirectory for TensorFlow.js machine learning demos

- **`src/sketches/`**: Canvas-based generative art using canvas-sketch library
  - Each sketch has corresponding `.ts`/`.tsx` file and MDX content file
  - Uses Two.js, canvas-sketch, and custom Vector utilities

- **`src/layouts/`**: Astro layout components
  - `BlogPost.astro` - Blog post template with comments integration
  - `Sketch.astro` - Creative coding project template

- **`src/pages/`**: File-based routing
  - Dynamic routes using `[...id].astro` pattern
  - RSS feed generation in `rss.xml.js`

### Content Management

Content is managed through Astro Content Collections with strict TypeScript schemas:

```typescript
// Blog posts require: title, description, pubDate, tags
// Optional: updatedDate, showDate, isDraft, cardImage
```

- Files starting with `_` are ignored by the content loader
- Blog posts support both `.md` and `.mdx` formats
- Sketches have additional `previewImage` field for gallery display

### Component Hydration Strategy

- Most components are static Astro components for performance
- React components in `src/components/react/` use `client:only="react"` for client-side features
- Svelte components for specific interactive elements
- TensorFlow.js demos use selective hydration for performance

### Styling System

- Global styles in `src/styles/global.scss`
- CSS Modules for component-specific styling (`.module.css` files)
- CSS custom properties for theming
- Modern-normalize for consistent cross-browser styling
- Fira Code font for code blocks

### Testing Strategy

Playwright E2E tests configured to:
- Test against Chromium, Firefox, and WebKit
- Run against built site (`npm run preview`)
- Generate HTML reports in `playwright-report/`
- Retry failed tests on CI environments

## Code Style Guidelines

- **TypeScript**: Strict mode enabled, prefer interfaces over types
- **Imports**: External packages first, then internal utilities/components
- **Components**: Functional components with destructured props
- **Naming**: PascalCase for components, camelCase for utilities, kebab-case for content files
- **Formatting**: Prettier with single quotes, no semicolons, trailing commas