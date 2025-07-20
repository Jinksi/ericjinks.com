import { test, expect } from '@playwright/test'

// Define responsive breakpoints based on current SCSS implementation
const BREAKPOINTS = {
  mobile: { width: 375, height: 667 },    // Small mobile
  mobileLarge: { width: 450, height: 800 }, // Large mobile (450px breakpoint)
  tablet: { width: 768, height: 1024 },   // Tablet
  desktop: { width: 1280, height: 720 },  // Desktop (default)
  desktopLarge: { width: 1400, height: 900 } // Large desktop (800px+ breakpoint)
}

test.describe('Visual Regression Tests for Tailwind Migration', () => {
  test.describe('Header/Navigation Components', () => {
    test('header on homepage - light mode desktop', async ({ page }) => {
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-light-desktop.png')
    })

    test('header on blog page - light mode desktop', async ({ page }) => {
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-light-desktop.png')
    })

    test('header on homepage - light mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-light-mobile.png')
    })

    test('header on blog page - light mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-light-mobile.png')
    })

    test('header on homepage - dark mode desktop', async ({ page }) => {
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-dark-desktop.png')
    })

    test('header on blog page - dark mode desktop', async ({ page }) => {
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-dark-desktop.png')
    })

    test('header on homepage - dark mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-dark-mobile.png')
    })

    test('header on blog page - dark mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element using user-facing selector
      const header = page.getByRole('banner').or(page.getByRole('navigation')).first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-dark-mobile.png')
    })
  })

  test.describe('Interactive Components', () => {
    test.describe('Navigation States', () => {
      test('navigation hover states - desktop', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        
        // Hover over navigation links - be specific to the nav area
        const nav = page.getByRole('navigation')
        const blogLink = nav.getByRole('link', { name: 'Blog' })
        await blogLink.hover()
        
        await expect(nav).toHaveScreenshot('nav-hover-states-desktop.png')
      })

      test('navigation active states', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto('/blog/')
        await page.waitForLoadState('networkidle')
        
        // Blog page should show active state on blog link
        const nav = page.getByRole('navigation')
        await expect(nav).toHaveScreenshot('nav-active-states.png')
      })

      test('github icon hover state', async ({ page }) => {
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        
        const nav = page.getByRole('navigation')
        const githubIcon = nav.getByRole('link', { name: 'GitHub' })
        await githubIcon.hover()
        
        // Take screenshot of the navigation area containing the GitHub icon
        await expect(nav).toHaveScreenshot('github-icon-hover.png')
      })
    })
  })

  test.describe('Component Responsive Behavior', () => {
    Object.entries(BREAKPOINTS).forEach(([breakpointName, viewport]) => {
      test(`navigation - ${breakpointName} responsive`, async ({ page }) => {
        await page.setViewportSize(viewport)
        await page.emulateMedia({ colorScheme: 'light' })
        await page.goto('/')
        await page.waitForLoadState('networkidle')
        
        const nav = page.getByRole('navigation')
        await expect(nav).toHaveScreenshot(`nav-${breakpointName}-responsive.png`)
      })
    })
  })

  test.describe('Theme Switching', () => {
    test('navigation theme switching', async ({ page }) => {
      // Test navigation in light theme
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      const nav = page.getByRole('navigation')
      await expect(nav).toHaveScreenshot('nav-theme-light.png')
      
      // Test navigation in dark theme
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.reload()
      await page.waitForLoadState('networkidle')
      
      await expect(nav).toHaveScreenshot('nav-theme-dark.png')
    })
  })

  test.describe('React Components', () => {
    test('event sourcing undo redo component - light mode desktop', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/blog/2025/event-sourcing/')
      await page.waitForLoadState('networkidle')
      
      // Wait for React component to hydrate
      const component = page.getByTestId('event-sourcing-undo-redo')
      await expect(component).toBeVisible()
      
      await expect(component).toHaveScreenshot('event-sourcing-component-light-desktop.png')
    })

    test('event sourcing undo redo component - dark mode desktop', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/blog/2025/event-sourcing/')
      await page.waitForLoadState('networkidle')
      
      // Wait for React component to hydrate
      const component = page.getByTestId('event-sourcing-undo-redo')
      await expect(component).toBeVisible()
      
      await expect(component).toHaveScreenshot('event-sourcing-component-dark-desktop.png')
    })
  })
})