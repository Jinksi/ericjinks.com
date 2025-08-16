# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `npm run dev` (starts Astro dev server on localhost:4321)
- **Build**: `npm run build` (fetches GitHub stars, then generates static site in `dist/`)
- **Preview**: `npm run preview` (serves built site for testing)
- **Tests**: `npm run test:e2e` (runs Playwright E2E tests)
- **Single test**: `npx playwright test tests/specific-test.spec.ts`
- **Format**: `npx prettier --write .`
- **Fetch GitHub stars**: `npm run fetch-stars` (updates cached star data from GitHub REST API)
- I'll be running the dev server in the background
- To view GitHub dependabot autodetected vulnerabilities, use 'gh api repos/Jinksi/ericjinks.com/dependabot/alerts'

## Secrets and Credentials

- The GH_TOKEN is in the `.env` file
- Authentication credentials (ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_SECRET) are in `.env`
- Uses Astro 5.x `astro:env` system for type-safe environment variable access

## Architecture Overview

This is a personal blog/portfolio website built with **Astro** as the primary framework, using selective hydration with React and Svelte components.

### Tech Stack
- **Framework**: Astro 5.x (static site generation with hybrid SSR)
- **UI Libraries**: React 18, Svelte 5, TypeScript
- **Content**: Astro Content Collections with Zod schema validation
- **Styling**: SCSS with CSS custom properties, dark/light theme support
- **Testing**: Playwright for E2E tests
- **Deployment**: Netlify (static hosting with serverless functions)
- **Authentication**: Single-user admin system with HTTPOnly cookies and session tokens

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
  - **GitHub Stars**: Paginated by year at `/stars/[year]/` (e.g., `/stars/2025/`, `/stars/2024/`)
    - `/stars/` redirects to current year
    - Data cached in `src/data/github-stars.json` at build time
    - Fetched via REST API using `scripts/fetch-github-stars.js`
  - **Authentication**: 
    - `/login/` - Admin login page with form-based authentication
    - `/admin/` - Protected admin dashboard (requires authentication)
    - `/api/logout/` - Logout endpoint supporting both GET and POST requests

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
- Authentication pages use `export const prerender = false` for server-side rendering

### Styling System

- Global styles in `src/styles/global.scss`
- CSS Modules for component-specific styling (`.module.css` files)
- CSS custom properties for theming
- Modern-normalize for consistent cross-browser styling
- Fira Code font for code blocks

### Authentication System

Single-user admin authentication with the following components:

- **Middleware** (`src/middleware.ts`): Route protection for `/admin/*` paths
  - Session token validation using secure hash comparison
  - Redirects unauthenticated users to login with return URL
  - Adds auth context to `Astro.locals` for use in pages

- **Login** (`src/pages/login.astro`): Form-based authentication
  - Simple credential validation using `astro:env/server` (appropriate for single-user system)
  - Generates session tokens with format: `username|timestamp|hash`
  - Sets HTTPOnly cookies for security (secure in production)

- **Session Management**: 
  - Session tokens use SHA-256 hash with secret and timestamp
  - 1 month token expiration
  - URL-safe delimiter (`|`) to handle email addresses in usernames

- **Environment Variables**: Uses Astro 5.x `astro:env` system
  - Type-safe server environment variables with schema validation
  - Required variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SECRET`

- **Rate Limiting**: Handled by Cloudflare at edge level
  - Requires Cloudflare proxy enabled (orange cloud icon in DNS settings)
  - Configure rate limiting rules in Cloudflare Dashboard → Security → WAF
  - Free plan setting: 2 POST requests to `/login` per 10 seconds, block for 10 seconds
  - Creates cycling blocks for automated attacks while allowing legitimate use
  - Prevents brute force attacks and conserves Netlify function invocations

### Testing Strategy

Playwright E2E tests configured to:
- Test against Chromium, Firefox, and WebKit
- Run against dev server (`npm run dev`) for authentication testing
- Generate HTML reports in `playwright-report/`
- Retry failed tests on CI environments
- Authentication security tests in `tests/auth.spec.ts` (8 comprehensive tests)
- Visual regression playwright tests are located in `@tests/visual-regression.spec.ts`

## Code Style Guidelines

- **TypeScript**: Strict mode enabled, prefer interfaces over types
- **Imports**: External packages first, then internal utilities/components
- **Components**: Functional components with destructured props
- **Naming**: PascalCase for components, camelCase for utilities, kebab-case for content files
- **Formatting**: Prettier with single quotes, no semicolons, trailing commas

## Node.js Conventions

- **Module System**: `package.json` contains "type": "module", so use `import`, not `require`, when writing node scripts

## URL Conventions

- All URLs have a trailing slash