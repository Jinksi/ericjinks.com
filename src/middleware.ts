import { defineMiddleware } from 'astro:middleware'
import { ADMIN_SECRET } from 'astro:env/server'
import crypto from 'node:crypto'

export interface AuthContext {
  isAuthenticated: boolean
  user?: {
    username: string
  }
}

/**
 * Validates a session token by comparing it with stored session
 * Uses timing-safe comparison to prevent timing attacks
 */
function validateSessionToken(token: string): boolean {
  if (!token) return false
  
  // In a production system, you would store session tokens in a database
  // For this single-user system, we use a simple approach with environment validation
  if (!ADMIN_SECRET) return false
  
  // For demo purposes, we'll use a simple token format: hash of (username + secret + timestamp)
  // In practice, you'd store active sessions in a database or memory store
  try {
    // This is a simplified validation - in production you'd have proper session storage
    const tokenParts = token.split('|')
    if (tokenParts.length !== 3) return false
    
    const [username, timestamp, hash] = tokenParts
    const expectedHash = crypto
      .createHash('sha256')
      .update(`${username}|${timestamp}|${ADMIN_SECRET}`)
      .digest('hex')
    
    // Timing-safe comparison to prevent timing attacks
    const isValidHash = crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    )
    
    // Check if token is not expired (24 hours)
    const tokenTime = parseInt(timestamp, 10)
    const now = Date.now()
    const isNotExpired = (now - tokenTime) < (24 * 60 * 60 * 1000)
    
    return isValidHash && isNotExpired
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

/**
 * Extracts authentication context from request cookies
 */
function getAuthContext(request: Request): AuthContext {
  const cookies = request.headers.get('cookie')
  if (!cookies) return { isAuthenticated: false }
  
  // Parse session cookie
  const sessionMatch = cookies.match(/session=([^;]+)/)
  if (!sessionMatch) return { isAuthenticated: false }
  
  // Decode URL-encoded cookie value
  const sessionToken = decodeURIComponent(sessionMatch[1])
  const isValid = validateSessionToken(sessionToken)
  
  if (isValid) {
    // Extract username from token (first part before first pipe)
    const username = sessionToken.split('|')[0]
    return {
      isAuthenticated: true,
      user: { username }
    }
  }
  
  return { isAuthenticated: false }
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, redirect } = context
  const pathname = new URL(url).pathname
  
  // Skip authentication for non-admin routes
  if (!pathname.startsWith('/admin')) {
    return next()
  }
  
  // Check authentication for admin routes
  const authContext = getAuthContext(context.request)
  
  if (!authContext.isAuthenticated) {
    // Redirect to login page with return URL
    const loginUrl = new URL('/login/', url.origin)
    loginUrl.searchParams.set('return', pathname)
    return redirect(loginUrl.toString())
  }
  
  // Add auth context to locals for use in pages
  context.locals.auth = authContext
  
  return next()
})