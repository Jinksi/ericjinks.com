# Astro Admin Authentication Implementation Plan

## Intention & Goals

Implement a secure, cookie-based authentication system for **single-user admin access** to the website. This will enable future admin functionality like content management, analytics dashboard, and other administrative features.

### Key Requirements

- Simple cookie-based session management (no client-side JavaScript required)
- Single admin user (Eric) - no multi-user complexity needed
- Environment variable configuration for credentials
- Protection for `/admin/*` routes via middleware
- Secure logout functionality
- Works with existing Netlify deployment
- Compatible with Astro v5.x and current project structure

## Technical Approach

- **Authentication Method:** Username/password with simple session tokens
- **Session Storage:** HTTP-only cookies with secure random tokens (no JWT complexity)
- **Route Protection:** Astro middleware for `/admin/*` paths
- **Deployment:** Netlify with environment variables
- **Security:** HTTPS enforcement, secure cookie flags, token expiration
- **Scope:** Single admin user system - simple and effective

## Project Configuration Analysis

### Current Setup

- ✅ Astro v5.12.2 (compatible)
- ✅ `@astrojs/netlify` adapter installed
- ✅ TypeScript project setup
- ⚠️ Currently `output: 'static'` - needs hybrid/server mode
- ⚠️ Netlify adapter not configured in astro.config.mjs

### Required Changes

- [ ] Update `astro.config.mjs` for hybrid rendering + Netlify adapter
- [ ] Install JWT library (`jose`)
- [ ] Add crypto utilities if needed

## Implementation Checklist

### Phase 1: Project Configuration

- [ ] **Update astro.config.mjs**
  - [ ] Configure `@astrojs/netlify` adapter
  - [ ] Enable hybrid/server rendering for auth pages
  - [ ] Test configuration builds successfully
- [ ] **Check dependencies**
  - [ ] Verify Node.js crypto module availability (built-in)
  - [ ] No external auth libraries needed for simple token approach
- [ ] **Environment setup**
  - [ ] Create `.env` with auth variables
  - [ ] Verify `.env` in `.gitignore`
  - [ ] Document required Netlify environment variables

### Phase 2: Core Authentication Files

- [ ] **Create middleware** (`src/middleware.ts`)
  - [ ] Route protection for `/admin/*` paths
  - [ ] Simple session token validation using crypto comparison
  - [ ] Redirect logic for unauthenticated users
  - [ ] Proper TypeScript types
- [ ] **Create login page** (`src/pages/login.astro`)
  - [ ] Login form with username/password
  - [ ] POST request handler for credential validation
  - [ ] Simple session token generation using crypto.randomBytes
  - [ ] Secure cookie setting with httpOnly flag
  - [ ] Error handling for invalid credentials
  - [ ] Proper TypeScript types
- [ ] **Create logout functionality** (`src/pages/api/logout.ts`)
  - [ ] Cookie deletion/invalidation
  - [ ] Redirect to login page
  - [ ] Proper TypeScript types

### Phase 3: Protected Admin Area

- [ ] **Create admin dashboard** (`src/pages/admin/index.astro`)
  - [ ] Add `export const prerender = false` for SSR
  - [ ] Welcome message with user context
  - [ ] Navigation to other admin sections
  - [ ] Logout button/link
  - [ ] Verify middleware protection works
- [ ] **Optional: Additional admin pages**
  - [ ] Content management interface
  - [ ] Analytics dashboard
  - [ ] Site settings panel

### Phase 4: Security & Testing

- [ ] **Local testing**
  - [ ] Test login with correct credentials
  - [ ] Test login with incorrect credentials
  - [ ] Test accessing admin pages without authentication
  - [ ] Test logout functionality
  - [ ] Test session expiration
  - [ ] Test middleware redirection
- [ ] **Security validation**
  - [ ] Verify cookies set with `httpOnly: true`
  - [ ] Ensure `secure: true` in production
  - [ ] Test session token expiration
  - [ ] Verify protected routes redirect properly
  - [ ] Check for any sensitive data exposure
- [ ] **Production deployment**
  - [ ] Set environment variables in Netlify
  - [ ] Deploy and test on live site
  - [ ] Verify HTTPS enforcement
  - [ ] Test admin functionality in production

### Phase 5: Documentation & Maintenance

- [ ] **Documentation**
  - [ ] Update README with admin access info
  - [ ] Document environment variables needed
  - [ ] Create admin user guide
- [ ] **Future preparation**
  - [ ] Plan database integration approach
  - [ ] Design admin content management workflow
  - [ ] Consider additional security features (rate limiting, etc.)

## Environment Variables Required

```bash
# .env (local development)
ADMIN_USERNAME=your-chosen-username
ADMIN_PASSWORD=your-secure-password
ADMIN_SECRET=your-long-random-secret-key-32-chars-minimum
```

## Security Considerations

- **Simple but Secure:** Single admin user = simpler security model
- **Password Security:** Plain text comparison for simplicity (single user, environment variable)
- **Session Management:** Simple token expiration (24-hour default, configurable)
- **Token Generation:** Cryptographically secure random tokens (Node.js crypto module)
- **HTTPS:** Enforce secure cookies in production
- **Rate Limiting:** Could add basic login attempt limiting in future
- **Audit Logging:** Plan for admin activity logging if needed

## Files to Create/Modify

### New Files

- `src/middleware.ts` - Authentication middleware
- `src/pages/login.astro` - Login page
- `src/pages/api/logout.ts` - Logout API
- `src/pages/admin/index.astro` - Admin dashboard

### Modified Files

- `astro.config.mjs` - Add adapter and hybrid rendering
- `.env` - Add authentication variables
- No external dependencies required (uses Node.js built-in crypto)

## Testing Strategy

1. **Unit Testing:** Test authentication logic in isolation
2. **Integration Testing:** Test full authentication flow
3. **Security Testing:** Test for common vulnerabilities
4. **E2E Testing:** Add Playwright tests for admin workflow

## Success Criteria

✅ **Authentication Works:**

- Can log in with correct credentials
- Cannot access admin pages without authentication
- Can log out successfully
- Session expires after 24 hours

✅ **Security Standards:**

- HTTPOnly cookies prevent XSS
- Secure cookies in production
- No sensitive data in client-side code
- Protected routes are properly secured

✅ **Production Ready:**

- Works in Netlify environment
- Environment variables properly configured
- HTTPS enforced
- Ready for database integration

---

**Notes:**

- This plan accounts for Astro v5.x compatibility
- Uses TypeScript throughout for better type safety
- Designed to work with existing Netlify deployment
- Prepared for future admin feature expansion
