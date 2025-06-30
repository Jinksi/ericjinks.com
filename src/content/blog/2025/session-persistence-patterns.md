---
title: 'Session persistence patterns: staying authenticated after login'
pubDate: 2025-06-30
description: 'How to maintain authentication state between client and server after identity is established.'
showDate: true
tags: System design
isDraft: true
---

Authentication has two distinct phases: **identity establishment** (proving who you are) and **session persistence** (staying logged in). This post focuses on the second phase - the patterns for maintaining authentication state after login. (See [Identity establishment patterns: how users log in](/blog/2025/identity-establishment-patterns) for the first phase.)

## The Session Persistence Flow

Once identity is established (via login, OAuth, etc.), all persistence patterns follow the same basic flow:

1. Server creates authentication proof (token, session, etc.)
2. Client receives and stores the proof
3. Client sends proof with subsequent requests
4. Server validates proof on each request

The key differences lie in **how** the proof is created, stored, and transmitted.

## Authentication Methods

### JWT (JSON Web Tokens)

**Storage**: Client-side (localStorage/sessionStorage)
**Transmission**: `Authorization: Bearer <token>` header

**Pros**: Stateless, works across domains, carries user data
**Cons**: Can't revoke until expiry, larger payload, security risk if compromised

**JWT flow:**

```
POST /login { username, password }
→ Server validates
← Returns: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

Then every request:
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```javascript
// After login
localStorage.setItem('token', response.token)

// With each request
fetch('/api/profile', {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
})
```

### Bearer Tokens (Opaque)

**Storage**: Client-side (localStorage/sessionStorage)
**Transmission**: `Authorization: Bearer <token>` header

Similar implementation to JWT, but tokens are random strings that reference server-side session data.

**Pros**: Easy to revoke, smaller payload, server controls session
**Cons**: Requires server-side storage, not stateless

**Bearer flow:**

```
POST /login { username, password }
→ Server creates random token, stores in DB
← Returns: { token: "abc123xyz789" }

Then every request:
GET /api/profile
Authorization: Bearer abc123xyz789
```

### Cookies + Sessions

**Storage**: Browser-managed cookies
**Transmission**: Automatic with same-domain requests

```javascript
// Login sets cookie automatically
// No manual header management needed
fetch('/api/profile') // Cookie sent automatically
```

**Pros**: Automatic handling, secure flags available, CSRF protection
**Cons**: Domain limitations, CSRF vulnerability, not suitable for mobile APIs

**Cookies flow:**

```
POST /login { username, password }
→ Server creates session, stores in DB
← Returns: Set-Cookie: sessionId=def456; HttpOnly; Secure

Then every request automatically includes:
Cookie: sessionId=def456
```

### API Keys (Service-to-Service)

**Storage**: Server environment variables or secure key management
**Transmission**: `Authorization: Bearer <api-key>` or custom headers

```javascript
// Long-lived tokens for service authentication
fetch('/api/data', {
  headers: { 'X-API-Key': process.env.API_KEY },
})
```

**Pros**: Simple implementation, long-lived, good for automated systems
**Cons**: Hard to rotate, no user context, security risk if leaked

## Choosing the Right Pattern

- **Traditional web apps**: Cookies + server sessions
- **SPAs (React/Vue/Angular)**: JWT or bearer tokens
- **Mobile apps**: JWT or bearer tokens
- **APIs**: Bearer tokens or API keys
- **Microservices**: JWT (stateless) or shared session store

## Security Considerations

- **JWT**: Use short expiry times, implement refresh tokens
- **Bearer tokens**: Store securely, implement token rotation
- **Cookies**: Use `HttpOnly`, `Secure`, `SameSite` flags
- **All methods**: HTTPS only, proper logout (clear tokens/invalidate sessions)

The key is matching the authentication pattern to your application architecture and security requirements.
