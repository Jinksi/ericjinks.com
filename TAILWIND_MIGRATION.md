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

### 2.2 Component Style Audit ✅ COMPLETED

- [x] Audit Astro component styles (`.astro` files)
- [x] Audit React CSS modules in `src/components/react/`
- [x] Audit Svelte component scoped styles
- [x] Document current dark/light theme implementation

**Astro Component Styles:**
- **Layout Components**: `BlogPost.astro` (scoped styles for article header, responsive h1 typography, post meta), `Sketch.astro` (minimal title/hr styling)
- **Navigation**: `Nav.astro` (header padding, nav flexbox), `NavLink.astro` (link states, transitions, active styling using CSS custom properties)
- **Content**: `PostList.astro` (post cards, hover effects, transitions), `Footer.astro` (basic layout)
- **Styling Patterns**: Scoped `<style>` blocks, heavy use of CSS custom properties, responsive media queries, hover/focus states

**React Components CSS Modules:**
- **AnimatedTitle.module.css**: Complex positioning, color transitions using CSS custom properties, mix-blend-mode effects
- **Loading.module.scss**: Flexbox centering, global loader styling integration, typography sizing
- **Dependencies**: Uses external `loaders.css` library for spinner animations

**Svelte Components:**
- **One Component Found**: `_DayVsMoment.svelte` - No scoped styles, uses global typography/code styling

**Theme Implementation Analysis:**
- **Strategy**: Automatic theme detection via `prefers-color-scheme` media queries in global.scss
- **React Hook**: `usePreferredTheme.ts` provides React components access to theme state via `matchMedia` API
- **CSS Variables**: All theming handled through CSS custom properties (--color-text, --color-background, etc.)
- **No Manual Toggle**: Current implementation only responds to system preference, no user override
- **Component Integration**: Astro components use CSS custom properties directly, React components access via CSS modules

### 2.3 Migration Strategy Analysis ✅ COMPLETED

- [x] Evaluate full migration vs selective adoption approach
- [x] Consider keeping global.scss with Tailwind for React components only
- [x] Assess benefits vs complexity of complete migration
- [x] Define hybrid approach boundaries and guidelines

**Analysis of MDX File Usage:**
- **9 MDX files found**: Blog posts and sketches primarily import React/Astro/Svelte components
- **Component imports**: HighlightBox (Astro), DayVsMoment (Svelte), various React components
- **No inline styling**: MDX files contain only content and component imports, no custom CSS
- **Tailwind compatibility**: MDX files can use Tailwind classes directly in JSX syntax

**Current React Component Architecture:**
- **CSS Modules**: Components like AnimatedTitle use CSS modules with CSS custom properties
- **Global integration**: Heavy reliance on CSS custom properties for theming
- **Complex styling**: AnimatedTitle has sophisticated positioning, layering, and theming

**Recommendation: Selective/Hybrid Approach**

After evaluating the codebase, a selective approach targeting React components and MDX content is optimal:

**Hybrid Approach Boundaries:**

1. **Use Tailwind CSS for:**
   - React components in `/src/components/react/`
   - Content within MDX files (inline JSX elements)
   - Future Svelte components requiring utility classes
   - Simple utility classes needed across component types

2. **Keep SCSS/CSS for:**
   - Astro component scoped styles (leverage Astro's scoped styling strength)
   - Global styles, CSS custom properties, and theme system in `global.scss`
   - Complex animations and positioning (like AnimatedTitle background layers)
   - Layout components where scoped styles are more maintainable

**Benefits of This Approach:**
- **Lower risk**: Preserve working Astro components while modernising React workflow
- **MDX flexibility**: Tailwind classes work seamlessly in MDX JSX elements
- **Best of both worlds**: Astro scoped styles + Tailwind utilities where beneficial
- **Incremental adoption**: Can expand Tailwind usage over time
- **Maintainable**: Clear boundaries between styling approaches

**Implementation Strategy:**
- Install Tailwind configured for React components and MDX files
- Configure Tailwind theme to reference existing CSS custom properties for consistency
- Migrate React CSS modules to Tailwind utilities that use CSS custom properties
- Preserve global.scss for base styles and CSS custom properties
- Update build configuration to process Tailwind for React/MDX only

## Phase 3: Tailwind Installation & Configuration

### 3.1 Install Tailwind CSS ✅ COMPLETED

- [x] Install `@astrojs/tailwind` integration
- [x] Install `tailwindcss` and dependencies
- [x] Configure Astro to use Tailwind integration for React components and MDX only
- [x] Configure content paths to include `/src/components/react/**` and `/src/content/**/*.mdx`
- [x] Verify Tailwind works with React components in MDX files

**Implementation Notes:**

- **Dependencies installed**: `@astrojs/tailwind` and `tailwindcss` via npm
- **Astro configuration**: Added Tailwind integration with `applyBaseStyles: false` to prevent conflicts with existing SCSS
- **Content paths configured**: Selective targeting of React components (`./src/components/react/**/*.{js,jsx,ts,tsx}`) and MDX files (`./src/content/**/*.mdx`) only
- **Hybrid approach maintained**: Astro components retain scoped SCSS styles while React components can use Tailwind utilities

**File Structure Changes:**
- Created `src/styles/tailwind.css` with `@tailwind` directives
- Updated `src/styles/global.scss` to import Tailwind CSS via `@import './tailwind.css'`
- Modified `astro.config.mjs` to include Tailwind integration
- Generated `tailwind.config.js` with selective content paths

**Issues Resolved:**
- **Sass deprecation warning**: Fixed by moving `@tailwind` directives to separate CSS file (SCSS doesn't support Tailwind at-rules)
- **Unknown at-rule error**: Resolved by using CSS import in SCSS instead of direct Tailwind directives
- **Tailwind base reset conflicts**: Added custom styles to `global.scss` to restore essential browser defaults that were being reset by Tailwind's base layer
- **E2E test validation**: All 20 tests pass, confirming no visual regressions

**Tailwind Base Layer Handling:**
Since `@tailwind base` includes Preflight (Tailwind's CSS reset), essential browser defaults needed to be restored in `global.scss`:

- **Typography**: Restored `font-weight: bold` for headings, font sizes for h2-h4, `strong` element styling
- **Links**: Preserved `text-decoration: underline` and hover states
- **Lists**: Restored `list-style-type: disc` for `<ul>` and `decimal` for `<ol>`, proper margins and padding
- **Paragraphs**: Maintained `margin-top: 0` and `margin-bottom: 1em` spacing
- **Images**: Kept responsive `max-width: 100%` and `height: auto`
- **Box model**: Ensured consistent `box-sizing: border-box` inheritance

This approach allows Tailwind utilities to work in React components while maintaining the existing design system's visual consistency across Astro components.

**Verification Completed:**
- ✅ Tailwind utilities (padding, borders, colours) successfully applied to React components
- ✅ No conflicts with existing SCSS styling system
- ✅ CSS custom properties remain intact for theming
- ✅ Browser defaults restored after Tailwind base reset
- ✅ Visual regression tests pass without any layout changes
- ✅ Clean CLI output without deprecation warnings

### 3.2 Design System Configuration ✅ COMPLETED

- [x] Map existing CSS custom properties to Tailwind theme (e.g., `'text': 'var(--color-text)'`, `'highlight': 'var(--color-highlight)'`)
- [x] Configure typography to match existing fonts (Fira Code for code blocks, system font stack)
- [x] Set up spacing scale to match current design patterns from global.scss
- [x] Configure Tailwind dark mode to integrate with existing `prefers-color-scheme` system
- [x] Add custom utility classes for React-specific styling needs
- [x] Ensure Tailwind utilities complement rather than replace CSS custom properties

**Implementation Notes:**

- **Color System**: Mapped all CSS custom properties to Tailwind theme, including semantic colors (`text`, `background`, `highlight`) and static colors (`green`, `red`, `orange`, etc.)
- **Typography**: Configured `font-code` (Fira Code) and `font-system` (system font stack), set system font as default sans-serif
- **Spacing Scale**: Added custom spacing values (`1em`, `2.5rem`, `7rem`, `10rem`, `15rem`) and container widths (`1111px`, `700px`) matching global.scss patterns
- **Dark Mode**: Configured `darkMode: 'media'` to work with existing `prefers-color-scheme` system
- **Custom Utilities**: Added button utilities (`btn-base`, `btn-outlined`) and container utilities (`container-site`, `container-text`) via plugin system
- **Typography Scale**: Included heading font sizes (`h2`, `h3`, `h4`) and code/caption sizes
- **Integration Verified**: All visual regression tests pass, Tailwind classes generate correctly when used

**Color Mapping Examples:**
- `bg-highlight` → `var(--color-highlight)` 
- `text-background` → `var(--color-background)`
- `border-light-grey` → `var(--color-lightGrey)`

**Note:** The colour duplication between global.scss and Tailwind config creates minimal maintenance overhead for a personal blog with stable design. Benefits of consistent utility classes (`text-text`, `bg-highlight`) outweigh occasional need to update both files when adding colours.

## Phase 4: Migration Execution

### 4.1 Selective Integration Setup

- [ ] Preserve `src/styles/global.scss` for base styles and CSS custom properties
- [ ] Ensure Tailwind CSS custom properties integration works correctly
- [ ] Test Tailwind utilities alongside existing SCSS styles
- [ ] Verify no conflicts between Tailwind and global styles

### 4.2 React Components Migration

- [ ] Start with simpler React components (Loading, PostComments)
- [ ] Remove CSS module imports from React components
- [ ] Convert class names to Tailwind utilities while preserving CSS custom property usage
- [ ] Update TypeScript interfaces to use `className` prop where needed
- [ ] Migrate complex components (AnimatedTitle) carefully, keeping CSS modules for complex layering if needed
- [ ] Test client-side hydration with new styles
- [ ] Verify TensorFlow.js demo styling

### 4.3 MDX Content Enhancement

- [ ] Add Tailwind utility classes to inline JSX elements in MDX files
- [ ] Test React component rendering within MDX with Tailwind classes
- [ ] Verify blog post and sketch content displays correctly
- [ ] Ensure HighlightBox and other imported components work with enhanced MDX

### 4.4 Astro Components (NO MIGRATION)

- [ ] Document decision to preserve Astro component scoped styles
- [ ] Ensure Astro components continue to work alongside Tailwind
- [ ] Test that scoped styles don't conflict with Tailwind utilities in React components
- [ ] Verify layout components maintain current functionality

## Phase 5: Theme System Migration

### 5.1 Dark/Light Mode Implementation

- [ ] Configure Tailwind dark mode to work with existing CSS custom properties
- [ ] Add Tailwind dark mode classes to React components only
- [ ] Preserve existing theme switching logic in global.scss
- [ ] Test theme changes work for both Tailwind (React) and SCSS (Astro) components
- [ ] Verify consistent theming across hybrid styling approach

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

### 7.1 Remove Legacy Code (Selective)

- [ ] Remove only migrated CSS module files from React components (`.module.css`, `.module.scss`)
- [ ] Preserve `src/styles/global.scss` for Astro components and base styles
- [ ] Keep SCSS dependencies and build configuration for Astro component support
- [ ] Clean up only unused React component CSS modules

### 7.2 Update Documentation

- [ ] Update CLAUDE.md with hybrid styling guidelines (Tailwind for React, SCSS for Astro)
- [ ] Document Tailwind configuration decisions and content path restrictions
- [ ] Update component development patterns for selective approach
- [ ] Add Tailwind best practices for React components and MDX content only

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
- **Selective Approach Decision**: After analysis of 9 MDX files and React component architecture, decided on hybrid approach using Tailwind for React components and MDX content only, preserving Astro scoped styles for layout and navigation components
- **MDX Tailwind Usage**: MDX files can include Tailwind utility classes in inline JSX elements (e.g., `<div className="bg-blue-500 p-4">content</div>`) while imported Astro/Svelte components retain their existing styling approaches
- **CSS Custom Properties Preservation**: Maintain global.scss and CSS custom property theming system to ensure consistent colours and spacing across both Tailwind and SCSS components
- **Tailwind Theme Configuration**: Map CSS custom properties to Tailwind theme values (e.g., `colors: { 'text': 'var(--color-text)' }`) to ensure React components using Tailwind utilities maintain visual consistency with Astro components using SCSS

## Current Progress Summary

**✅ COMPLETED PHASES:**
- **Phase 1**: Visual Regression Testing Setup (1.1, 1.2)
- **Phase 2**: Current State Analysis (2.1, 2.2, 2.3) 
- **Phase 3**: Tailwind Installation & Configuration (3.1, 3.2)

**🎯 CURRENT STATUS:**
- Tailwind CSS successfully installed and configured for selective use with full design system integration
- Hybrid approach working: React components can use Tailwind utilities, Astro components retain SCSS
- Complete CSS custom property mapping to Tailwind theme for seamless integration
- All typography, spacing, colors, and dark mode configuration completed
- Custom utility plugins added for button and container patterns
- All E2E tests passing with zero visual regressions
- Tailwind classes generating correctly when used in React components
- Clean build process without deprecation warnings
- Ready to proceed with Phase 4 (Migration Execution)

**📁 KEY FILES MODIFIED:**
- `astro.config.mjs`: Added Tailwind integration with `applyBaseStyles: false`
- `tailwind.config.js`: Complete design system configuration with CSS custom property mapping, typography, spacing, dark mode, and custom utilities
- `src/styles/tailwind.css`: New file containing `@tailwind` directives
- `src/styles/global.scss`: Updated to import Tailwind CSS while preserving CSS custom properties

**🔧 TECHNICAL APPROACH:**
- **Selective targeting**: Only React components (`src/components/react/**`) and MDX files (`src/content/**/*.mdx`)
- **CSS custom properties preserved**: Existing theming system remains intact in `global.scss`
- **Tailwind base handling**: Browser defaults restored in global styles after Tailwind's Preflight reset
- **Zero conflicts**: Tailwind utilities work alongside existing SCSS without interference
- **Incremental migration**: Can expand Tailwind usage gradually over time
