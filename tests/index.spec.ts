import { test, expect } from '@playwright/test'

test('home page renders correctly', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Eric Jinks/)

  await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()

  // Expect tags
  await expect(
    page.getByRole('link', { name: /#javascript/ }).first()
  ).toBeVisible()

  // Expect posts
  await expect(page.getByRole('link', { name: /Read/ })).toHaveCount(3)
})

test('blog page renders correctly', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Blog' }).click()

  await expect(page).toHaveTitle(/Blog/)

  // Expect tags
  await expect(
    page.getByRole('link', { name: /#javascript/ }).first()
  ).toBeVisible()

  // Expect posts
  const postCount = await page.getByRole('link', { name: /Read/ }).count()
  await expect(postCount).toBeGreaterThan(3)
})

test('post renders correctly', async ({ page }) => {
  await page.goto('/blog/')

  await page.getByRole('link', { name: /Read/ }).first().click()

  await expect(await page.title()).toMatch(/ – Eric Jinks/)

  const article = await page.getByRole('article')
  await expect(article).toBeVisible()

  const pageHeading = await article.getByRole('heading').first()
  const pageHeadingText = await pageHeading.textContent()
  expect(pageHeadingText?.length).toBeGreaterThanOrEqual(3)
  await expect(pageHeading).toBeVisible()
  await expect(pageHeading).toHaveJSProperty('tagName', 'H1')
  await expect(await page.title()).toContain(pageHeadingText)
})
