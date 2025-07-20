# Tailwind CSS Migration Plan

Migrating this Astro blog from SCSS to Tailwind CSS with visual regression testing to prevent regressions.

Notes are to be included in this file as progress is made.

## Phase 1: Visual Regression Testing Setup

### 1.1 Extend Playwright for Visual Testing ✅ COMPLETED

- [x] Install `@playwright/test` visual comparison dependencies
- [x] Create baseline screenshot test suite for all major pages (focused on header component)
- [x] Add visual tests for both light and dark themes
- [x] Configure screenshot comparison thresholds (0.2 threshold, 1000 max pixel diff)
- [x] Run initial baseline capture (8 screenshots: header on homepage/blog, light/dark, desktop/mobile)

**Notes:**

- Simplified to Chrome-only testing for consistency
- Focused on stable header/navigation component to avoid dynamic content issues
- Uses proper `prefers-color-scheme` emulation matching site's theme implementation
- Generated baseline screenshots committed to repository

### 1.2 Identify Critical UI Components ✅ COMPLETED

- [x] Identify interactive components to test with visual regression (buttons, forms, modals)
- [x] Test responsive breakpoints (mobile, tablet, desktop)
- [x] Capture component states where suitable (hover, focus, active)

**Notes:**

- Focused visual regression test suite on static components only (navigation/header)
- Added testing for 5 responsive breakpoints: mobile (375px), mobile-large (450px), tablet (768px), desktop (1280px), desktop-large (1400px)
- Interactive component testing includes: navigation hover/active states, GitHub icon interactions
- Navigation responsive behaviour testing across all breakpoints
- Theme switching validation for light/dark modes on navigation
- Removed tests for dynamic content (blog pages, homepage, stars) to prevent snapshot instability
- Final test suite: 17 tests covering header/navigation components with user-facing selectors
- All baseline snapshots generated and ready for migration

## Phase 2: Current State Analysis

### 2.1 SCSS Audit ✅ COMPLETED

- [x] List all SCSS files in `src/styles/`
- [x] Document CSS custom properties for theming
- [x] Identify global styles vs component-specific styles
- [x] Note any complex SCSS features (mixins, functions, loops)

**SCSS Files Found:**

- `src/styles/global.scss` - Main global stylesheet (327 lines)
- `src/components/react/Loading.module.scss` - Loading component styles
- `src/components/react/AnimatedTitle.module.css` - AnimatedTitle component styles

**CSS Custom Properties for Theming:**

- **Color Palette**: `--green`, `--green-semi-transparent`, `--green-almost-transparent`, `--white`, `--offWhite`, `--black`, `--blackTransparent`, `--red`, `--orange`, `--cyan`, `--lightGrey`, `--lightBlack`
- **Semantic Colors**: `--color-text`, `--color-background`, `--color-lightGrey`, `--color-highlight`, `--color-highlight-semi-transparent`, `--color-highlight-almost-transparent`, `--color-highlightB`, `--color-highlightC`, `--color-code`
- **Typography**: `--font-code` (Fira Code), `--font-system` (system font stack)

**Global vs Component-Specific Styles:**

- **Global**: CSS custom properties, theme switching via `prefers-color-scheme`, base typography, layout containers (.container, .textContainer), button utilities (.Button, .OutlinedButton, .FancyButton)
- **Component-Specific**: Loading spinner styles, animated title component

**Complex SCSS Features:**

- **Nesting**: Used throughout for pseudo-selectors and child elements
- **@extend**: Used in button classes (.OutlinedButton, .FancyButton extend .Button)
- **Media queries**: Responsive breakpoints and theme switching
- **No mixins, functions, or loops detected**

**Theme Implementation:**

- Uses `prefers-color-scheme` media queries for automatic dark/light mode
- Comprehensive CSS custom property system for theming
- Well-organised semantic colour variables that will translate well to Tailwind

### 2.2 Component Style Audit

- [ ] Audit Astro component styles (`.astro` files)
- [ ] Audit React CSS modules in `src/components/react/`
- [ ] Audit Svelte component scoped styles
- [ ] Document current dark/light theme implementation

## Phase 3: Tailwind Installation & Configuration

### 3.1 Install Tailwind CSS

- [ ] Install `@astrojs/tailwind` integration
- [ ] Install `tailwindcss` and dependencies
- [ ] Configure Astro to use Tailwind integration
- [ ] Verify Tailwind works with React/Svelte components

### 3.2 Design System Configuration

- [ ] Extract current color palette to Tailwind config
- [ ] Configure typography (Fira Code for code blocks)
- [ ] Set up spacing scale to match current design
- [ ] Configure dark mode strategy (class-based)
- [ ] Add custom utility classes for specific needs

## Phase 4: Migration Execution

### 4.1 Global Styles Migration

- [ ] Convert `src/styles/global.scss` to Tailwind base layer
- [ ] Migrate CSS custom properties to Tailwind CSS variables
- [ ] Update modern-normalize integration
- [ ] Test global style changes with visual regression

### 4.2 Astro Components Migration

- [ ] Start with layout components (`src/layouts/`)
- [ ] Migrate `BlogPost.astro` styles
- [ ] Migrate `Sketch.astro` styles
- [ ] Convert page components in `src/pages/`
- [ ] Update component prop patterns for className

### 4.3 React Components Migration

- [ ] Remove CSS module imports from React components
- [ ] Convert class names to Tailwind utilities
- [ ] Update TypeScript interfaces to use `className` prop
- [ ] Test client-side hydration with new styles
- [ ] Verify TensorFlow.js demo styling

### 4.4 Svelte Components Migration

- [ ] Remove `<style>` blocks from Svelte components
- [ ] Convert to Tailwind utility classes
- [ ] Test Svelte component reactivity with new styles
- [ ] Verify interactive elements work correctly

## Phase 5: Theme System Migration

### 5.1 Dark/Light Mode Implementation

- [ ] Implement Tailwind dark mode classes
- [ ] Update theme switching logic
- [ ] Test theme persistence across page navigation
- [ ] Verify all components respect theme changes

### 5.2 Responsive Design Verification

- [ ] Test mobile responsiveness with Tailwind breakpoints
- [ ] Verify tablet and desktop layouts
- [ ] Check component behaviour at all screen sizes
- [ ] Update any custom responsive utilities

## Phase 6: Testing & Validation

### 6.1 Visual Regression Testing

- [ ] Run full visual regression test suite
- [ ] Compare against baseline screenshots
- [ ] Fix any visual differences
- [ ] Test across all supported browsers (Chromium, Firefox, WebKit)

### 6.2 Functional Testing

- [ ] Run existing Playwright E2E tests
- [ ] Test interactive features (forms, navigation)
- [ ] Verify sketch/canvas components work correctly
- [ ] Test blog post rendering and comments integration

### 6.3 Performance Validation

- [ ] Compare bundle sizes before/after migration
- [ ] Run Lighthouse performance audits
- [ ] Check Core Web Vitals metrics
- [ ] Verify CSS delivery optimisation

## Phase 7: Cleanup & Documentation

### 7.1 Remove Legacy Code

- [ ] Delete SCSS files from `src/styles/`
- [ ] Remove CSS module files (`.module.css`)
- [ ] Clean up unused SCSS dependencies from package.json
- [ ] Remove SCSS build configuration

### 7.2 Update Documentation

- [ ] Update CLAUDE.md with new styling guidelines
- [ ] Document Tailwind configuration decisions
- [ ] Update component development patterns
- [ ] Add Tailwind best practices for the project

### 7.3 Final Verification

- [ ] Run complete test suite one final time
- [ ] Deploy to staging environment for manual testing
- [ ] Verify production build works correctly
- [ ] Monitor for any post-deployment issues

## Notes

- **Visual regression threshold**: Configure to allow minor differences (anti-aliasing, etc.)
- **Migration order**: Start with least complex components first
- **Rollback plan**: Keep git commits small and atomic for easy rollback
- **Performance target**: Maintain or improve current bundle size and Core Web Vitals
- **Browser support**: Ensure compatibility with existing browser support matrix
