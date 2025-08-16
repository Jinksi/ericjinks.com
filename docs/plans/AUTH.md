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
- **Rendering Strategy:** Modern Astro 5.x hybrid approach using `output: 'static'` + adapter
- **Deployment:** Netlify with environment variables
- **Security:** HTTPS enforcement, secure cookie flags, token expiration
- **Scope:** Single admin user system - simple and effective

### Rendering Mode Rationale

Astro 5.0+ simplified hybrid rendering by removing the explicit "hybrid" mode. The new approach:

- **Global Config:** `output: 'static'` (default) with Netlify adapter configured
- **Performance:** Most pages stay static for optimal performance
- **Selective SSR:** Auth pages use `export const prerender = false` for server-side rendering
- **Best of Both:** Static performance + dynamic auth functionality when needed

This gives us hybrid behavior without complex configuration - static pages by default, with server-side rendering only where authentication is required.

## Project Configuration Analysis

### Current Setup

- ✅ Astro v5.12.2 (compatible with modern hybrid approach)
- ✅ `@astrojs/netlify` adapter installed
- ✅ TypeScript project setup
- ✅ `output: 'static'` configured with Netlify adapter (modern hybrid approach)
- ✅ Configuration builds successfully
- ✅ Ready for selective SSR using `export const prerender = false`

### Required Changes

- [x] ~~Update `astro.config.mjs` for hybrid rendering + Netlify adapter~~ ✅ **Completed**
- [ ] ~~Install JWT library (`jose`)~~ ❌ **Not needed** (using Node.js crypto)
- [ ] ~~Add crypto utilities if needed~~ ✅ **Node.js built-in crypto sufficient**

## Implementation Checklist

### Phase 1: Project Configuration ✅ **COMPLETED**

- [x] **Update astro.config.mjs** ✅ **Completed**
  - [x] Configure `@astrojs/netlify` adapter ✅
  - [x] Enable modern hybrid rendering (static + adapter) ✅
  - [x] Test configuration builds successfully ✅
- [x] **Check dependencies** ✅ **Completed**
  - [x] Verify Node.js crypto module availability (built-in) ✅
  - [x] No external auth libraries needed for simple token approach ✅
- [x] **Environment setup** ✅ **Completed**
  - [x] Create `.env` with auth variables ✅
  - [x] Verify `.env` in `.gitignore` ✅
  - [x] Document required Netlify environment variables ✅

### Phase 2: Core Authentication Files ✅ **COMPLETED**

- [x] **Create middleware** (`src/middleware.ts`) ✅ **Completed**
  - [x] Route protection for `/admin/*` paths ✅
  - [x] Simple session token validation using crypto comparison ✅
  - [x] Redirect logic for unauthenticated users ✅
  - [x] Proper TypeScript types ✅
- [x] **Create login page** (`src/pages/login.astro`) ✅ **Completed**
  - [x] Login form with username/password ✅
  - [x] POST request handler for credential validation ✅
  - [x] Simple session token generation using crypto.randomBytes ✅
  - [x] Secure cookie setting with httpOnly flag ✅
  - [x] Error handling for invalid credentials ✅
  - [x] Proper TypeScript types ✅
- [x] **Create logout functionality** (`src/pages/api/logout.ts`) ✅ **Completed**
  - [x] Cookie deletion/invalidation ✅
  - [x] Redirect to login page ✅
  - [x] Proper TypeScript types ✅

### Phase 3: Protected Admin Area ✅ **COMPLETED**

- [x] **Create admin dashboard** (`src/pages/admin/index.astro`) ✅ **Completed**
  - [x] Add `export const prerender = false` for SSR ✅
  - [x] Welcome message with user context ✅
  - [x] Navigation to other admin sections ✅
  - [x] Logout button/link ✅
  - [x] Verify middleware protection works ✅
- [x] **TypeScript environment types** (`src/env.d.ts`) ✅ **Completed**
  - [x] Authentication context types for Astro.locals ✅
  - [x] Proper TypeScript integration ✅
- [ ] **Optional: Additional admin pages** (Future phases)
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

### Netlify Environment Variables

For production deployment, configure these environment variables in Netlify:

**Site Settings → Environment Variables:**

- `ADMIN_USERNAME` - Your chosen admin username
- `ADMIN_PASSWORD` - Your secure admin password  
- `ADMIN_SECRET` - A cryptographically secure 32+ character secret key

**Security Notes:**
- Generate `ADMIN_SECRET` using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Use a strong password for `ADMIN_PASSWORD` (consider a password manager)
- Never commit these values to version control - they should only exist in `.env` (local) and Netlify environment variables (production)

## Security Considerations

- **Simple but Secure:** Single admin user = simpler security model
- **Password Security:** Plain text comparison for simplicity (single user, environment variable)
- **Session Management:** Simple token expiration (24-hour default, configurable)
- **Token Generation:** Cryptographically secure random tokens (Node.js crypto module)
- **HTTPS:** Enforce secure cookies in production
- **Rate Limiting:** Could add basic login attempt limiting in future
- **Audit Logging:** Plan for admin activity logging if needed

## Files to Create/Modify

### New Files ✅ **COMPLETED**

- `src/middleware.ts` - Authentication middleware ✅
- `src/pages/login.astro` - Login page ✅
- `src/pages/api/logout.ts` - Logout API ✅
- `src/pages/admin/index.astro` - Admin dashboard ✅
- `src/env.d.ts` - TypeScript environment types ✅

### Modified Files

- `astro.config.mjs` - ✅ **Completed** - Added Netlify adapter with modern static + selective SSR approach
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
