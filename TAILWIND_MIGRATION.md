# Tailwind CSS Migration Plan

Migrating this Astro blog from SCSS to Tailwind CSS with visual regression testing to prevent
regressions

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

### 1.2 Identify Critical UI Components

- [ ] Identify interactive components to test with visual regression (buttons, forms, modals)
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Capture component states where suitable (hover, focus, active)

## Phase 2: Current State Analysis

### 2.1 SCSS Audit

- [ ] List all SCSS files in `src/styles/`
- [ ] Document CSS custom properties for theming
- [ ] Identify global styles vs component-specific styles
- [ ] Note any complex SCSS features (mixins, functions, loops)

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
- [ ] Check component behavior at all screen sizes
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
- [ ] Verify CSS delivery optimization

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
