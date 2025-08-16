import { test, expect } from '@playwright/test'

test.describe('Authentication Security', () => {
  test('should block unauthorized access to admin dashboard', async ({ page }) => {
    // Attempt to access admin dashboard without authentication
    await page.goto('/admin/')
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/\/login\//)
    
    // Should see login form
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
  })

  test('should preserve return URL when redirected to login', async ({ page }) => {
    // Attempt to access admin dashboard
    await page.goto('/admin/')
    
    // Should be redirected to login with return parameter
    await expect(page).toHaveURL(/\/login\/\?return=%2Fadmin%2F/)
  })

  test('should block access to admin subdirectories', async ({ page }) => {
    // Test that admin subdirectories are also protected
    // Note: These paths don't exist yet, but middleware should still protect them
    const protectedPaths = ['/admin/settings/', '/admin/content/', '/admin/analytics/']
    
    for (const path of protectedPaths) {
      await page.goto(path)
      
      // Should be redirected to login page with correct return URL
      await expect(page).toHaveURL(new RegExp(`\\/login\\/\\?return=${encodeURIComponent(path).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`))
    }
  })

  test('should allow access to public pages without authentication', async ({ page }) => {
    // Test that public pages are not affected by auth middleware
    const publicPaths = ['/', '/blog/', '/sketches/', '/stars/']
    
    for (const path of publicPaths) {
      await page.goto(path)
      
      // Should not be redirected to login
      await expect(page).not.toHaveURL(/\/login\//)
      
      // Should not see login form
      await expect(page.getByRole('heading', { name: 'Admin Login' })).not.toBeVisible()
    }
  })

  test('should allow access to login page itself', async ({ page }) => {
    // Ensure login page is accessible
    await page.goto('/login/')
    
    // Should show login form
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()
    
    // Should have back to website link
    await expect(page.getByRole('link', { name: /back to website/i })).toBeVisible()
  })

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login/')
    
    // Fill in invalid credentials
    await page.getByRole('textbox', { name: 'Username' }).fill('invalid@example.com')
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword')
    
    // Submit form
    await page.getByRole('button', { name: 'Sign In' }).click()
    
    // Should stay on login page and show error
    await expect(page).toHaveURL(/\/login\//)
    await expect(page.getByText(/Invalid username or password/)).toBeVisible()
  })

  test('should handle logout endpoint gracefully', async ({ page }) => {
    // Test that logout endpoint redirects to login even without session
    await page.goto('/api/logout/')
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/\/login\//)
  })

  test('should not expose sensitive information in client-side code', async ({ page }) => {
    // Visit admin-related pages and check that no sensitive data is exposed
    await page.goto('/login/')
    
    // Check that actual credentials are not in page source
    const content = await page.content()
    
    // Only check for actual env values if they exist, not the fallbacks
    if (process.env.ADMIN_USERNAME) {
      expect(content).not.toContain(process.env.ADMIN_USERNAME)
    }
    if (process.env.ADMIN_PASSWORD) {
      expect(content).not.toContain(process.env.ADMIN_PASSWORD)
    }
    if (process.env.ADMIN_SECRET) {
      expect(content).not.toContain(process.env.ADMIN_SECRET)
    }
    
    // Check that no obvious credential patterns are exposed
    expect(content).not.toMatch(/password\s*[:=]\s*['"]\w+['"]/)
    expect(content).not.toMatch(/secret\s*[:=]\s*['"]\w+['"]/)
    
    // The word "admin" in "Admin Login" and "/admin/" return URL is expected and safe
    expect(content).toContain('Admin Login')  // This is expected UI text
  })
})