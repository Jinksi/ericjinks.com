# AGENT.md - Eric Jinks Personal Website

## Commands
- Build: `npm run build` (Astro static build)
- Dev: `npm run dev` (dev server on localhost:4321)
- Preview: `npm run preview` (preview built site)
- E2E Tests: `npm run test:e2e` (Playwright tests)
- Single Test: `npx playwright test tests/specific-test.spec.ts`
- Format: `npx prettier --write .`

## Architecture
- **Tech Stack**: Astro + React + Svelte + TypeScript
- **Content**: Blog posts and sketches in `src/content/` (Astro Content Collections with Zod validation)
- **Components**: `src/components/` (mixed .astro, .tsx, .svelte files)
- **Creative Coding**: `src/sketches/` (canvas-based generative art)
- **Output**: Static site generation, selective hydration with `client:only`

## Code Style
- **TypeScript**: Strict mode, interfaces for props, type imports
- **Imports**: External packages first, then internal utilities/components
- **Components**: Functional with destructured props, CSS Modules for styling
- **Naming**: PascalCase (React), camelCase (utils), kebab-case (Astro/content)
- **Formatting**: Prettier (single quotes, no semicolons, trailing commas)
- **Styles**: SCSS with CSS custom properties, dark/light theme support
