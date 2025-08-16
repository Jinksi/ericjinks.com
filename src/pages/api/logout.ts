import type { APIRoute } from 'astro'

export const prerender = false // Enable SSR for session management

/**
 * Logout API endpoint
 * Clears the session cookie and redirects to login page
 */
export const POST: APIRoute = async ({ cookies, redirect, request }) => {
  try {
    // Clear the session cookie
    cookies.delete('session', {
      path: '/'
    })
    
    // Get redirect URL from form data or default to login
    const formData = await request.formData()
    const redirectTo = formData.get('redirect')?.toString() || '/login/'
    
    return redirect(redirectTo)
  } catch (error) {
    console.error('Logout error:', error)
    // Still redirect to login even if there's an error
    return redirect('/login/')
  }
}

/**
 * Support GET requests for simple logout links
 * e.g., <a href="/api/logout">Logout</a>
 */
export const GET: APIRoute = async ({ cookies, redirect, url }) => {
  try {
    // Clear the session cookie
    cookies.delete('session', {
      path: '/'
    })
    
    // Get redirect URL from query parameter or default to login
    const redirectTo = url.searchParams.get('redirect') || '/login/'
    
    return redirect(redirectTo)
  } catch (error) {
    console.error('Logout error:', error)
    // Still redirect to login even if there's an error
    return redirect('/login/')
  }
}