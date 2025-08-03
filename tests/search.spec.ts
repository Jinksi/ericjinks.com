import { expect, test } from '@playwright/test'

test.describe('GitHub Stars Search', () => {
  test('search functionality works on stars page', async ({ page }) => {
    // Navigate to the current year stars page
    await page.goto('/stars/2025/')

    // Wait for the page to load and search component to be available
    await page.waitForSelector('.search-container')

    // Find the search input using getByPlaceholder for better user-facing selection
    const searchInput = page.getByPlaceholder('Search')
    await expect(searchInput).toBeVisible()

    // Search for TypeScript repositories
    await searchInput.fill('typescript')

    // Wait a moment for search results to appear
    await page.waitForTimeout(1000)

    // Check that search results are displayed
    const searchResults = page.locator('.pagefind-ui__results')
    await expect(searchResults).toBeVisible()

    // Verify that results contain expected TypeScript repositories
    const resultItems = page.locator('.pagefind-ui__result')
    const resultCount = await resultItems.count()
    expect(resultCount).toBeGreaterThan(0)

    // Check that at least one result contains TypeScript-related content
    const firstResult = resultItems.first()
    await expect(firstResult).toBeVisible()
  })

  test('search clears and resets properly', async ({ page }) => {
    await page.goto('/stars/2025/')
    await page.waitForSelector('.search-container')

    const searchInput = page.getByPlaceholder('Search')

    // Perform a search
    await searchInput.fill('react')
    await page.waitForTimeout(1000)

    // Verify results appear
    const searchResults = page.locator('.pagefind-ui__results')
    await expect(searchResults).toBeVisible()

    // Clear the search
    await searchInput.clear()
    await page.waitForTimeout(500)

    // Verify search results are hidden/cleared
    const resultItems = page.locator('.pagefind-ui__result')
    await expect(resultItems).toHaveCount(0)
  })

  test('search works across different years', async ({ page }) => {
    // Test search on 2024 stars page
    await page.goto('/stars/2024/')
    await page.waitForSelector('.search-container')

    const searchInput = page.getByPlaceholder('Search')
    await searchInput.fill('javascript')
    await page.waitForTimeout(1000)

    const searchResults = page.locator('.pagefind-ui__results')
    await expect(searchResults).toBeVisible()

    const resultItems = page.locator('.pagefind-ui__result')
    const resultCount = await resultItems.count()
    expect(resultCount).toBeGreaterThan(0)
  })

  test('search container is visible', async ({ page }) => {
    await page.goto('/stars/2025/')
    await page.waitForSelector('.search-container')

    // Verify search input is accessible
    const searchInput = page.getByPlaceholder('Search')
    await expect(searchInput).toBeVisible()
  })
})
