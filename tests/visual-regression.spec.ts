import { test, expect } from '@playwright/test'

test.describe('Header/Navigation Visual Regression Tests', () => {
  test.describe('Header Component', () => {
    test('header on homepage - light mode desktop', async ({ page }) => {
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-light-desktop.png')
    })

    test('header on blog page - light mode desktop', async ({ page }) => {
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-light-desktop.png')
    })

    test('header on homepage - light mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-light-mobile.png')
    })

    test('header on blog page - light mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate light color scheme preference
      await page.emulateMedia({ colorScheme: 'light' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-light-mobile.png')
    })

    test('header on homepage - dark mode desktop', async ({ page }) => {
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-dark-desktop.png')
    })

    test('header on blog page - dark mode desktop', async ({ page }) => {
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-dark-desktop.png')
    })

    test('header on homepage - dark mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-homepage-dark-mobile.png')
    })

    test('header on blog page - dark mode mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      // Emulate dark color scheme preference
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.goto('/blog/')
      await page.waitForLoadState('networkidle')
      
      // Find the header/nav element
      const header = page.locator('header, nav').first()
      await expect(header).toBeVisible()
      
      await expect(header).toHaveScreenshot('header-blog-dark-mobile.png')
    })
  })
})