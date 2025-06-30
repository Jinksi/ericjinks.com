---
title: 'Identity establishment patterns: how users log in'
pubDate: 2025-06-30
description: 'Exploring different methods for establishing user identity in web applications.'
showDate: true
tags: System design
isDraft: true
---

Authentication has two distinct phases: **identity establishment** (proving who you are) and **session persistence** (staying logged in). This post focuses on the first phase - the various patterns for establishing user identity. (See [Session persistence patterns: staying authenticated after login](/blog/2025/session-persistence-patterns) for the second phase.)

## What is Identity Establishment?

Identity establishment is the process of proving that a user is who they claim to be. This happens at the beginning of a session, before any persistent authentication tokens are issued.

## Identity Establishment Methods

### Username/Password

**Flow**: User provides credentials → Server validates against database

**Pros**:

- Simple implementation
- Full control over user data
- Works offline/air-gapped systems

**Cons**:

- Password management burden on users
- Security risks (breaches, weak passwords)
- Need to implement password reset flows

### OAuth 2.0 / OpenID Connect

**Flow**: Redirect to provider → User authenticates → Authorization code → Access token

**Common Providers**: Google, GitHub, Microsoft, Auth0

**Pros**:

- No password handling for your app
- Trusted identity providers
- Standardised protocols
- Reduced registration friction

**Cons**:

- External dependency
- Complex implementation
- Privacy concerns (data sharing)
- Limited customisation of auth flow

### SAML (Security Assertion Markup Language)

**Flow**: Enterprise SSO with XML-based assertions

**Use Cases**: Large organisations, enterprise applications

**Pros**:

- Enterprise-grade security
- Detailed attribute exchange
- Mature standard with extensive tooling

**Cons**:

- Complex XML-based protocol
- Steep learning curve
- Overkill for simple applications

### Magic Links / Passwordless

**Flow**: User enters email → Receives login link → Clicks to authenticate

**Pros**:

- No passwords to manage
- Good user experience
- Reduces credential theft risk

**Cons**:

- Requires email delivery
- Email security becomes critical
- Potential for email interception

### Multi-Factor Authentication (MFA)

**Flow**: Primary auth + secondary factor (SMS, TOTP, hardware key)

**Factors**:

- Something you know (password)
- Something you have (phone, hardware key)
- Something you are (biometrics)

**Pros**:

- Significantly increased security
- Industry best practice
- Multiple implementation options

**Cons**:

- Added complexity for users
- Dependency on secondary devices
- Recovery scenarios more complex

### Biometric Authentication

**Flow**: Fingerprint, face recognition, voice recognition

**Pros**:

- Excellent user experience
- Hard to replicate
- No credentials to remember

**Cons**:

- Device/platform dependent
- Privacy concerns
- Fallback methods still needed

### Certificate-Based Authentication

**Flow**: Client presents digital certificate → Server validates

**Use Cases**: High-security environments, API-to-API communication

**Pros**:

- Very high security
- No shared secrets
- Non-repudiation

**Cons**:

- Complex certificate management
- Not user-friendly for consumers
- PKI infrastructure required

## Choosing the Right Method

### Consumer Applications

- **Simple apps**: Username/password + optional MFA
- **Social apps**: OAuth (Google, Facebook, etc.)
- **Progressive enhancement**: Start with OAuth, add passwordless

### Enterprise Applications

- **Small teams**: OAuth with business providers (Google Workspace, Microsoft)
- **Large organisations**: SAML + MFA
- **High security**: Certificate-based + MFA

### API/Service Authentication

- **Service-to-service**: Certificate-based or API keys
- **User-delegated**: OAuth 2.0 with appropriate scopes

## Security Considerations

### Implementation Best Practices

- Always use HTTPS for credential transmission
- Implement rate limiting on auth endpoints
- Log authentication attempts for monitoring
- Use secure session management after establishment

### Common Vulnerabilities

- **Credential stuffing**: Attackers use leaked passwords
- **Phishing**: Fake login pages steal credentials
- **Session fixation**: Attacker sets known session ID
- **Brute force**: Automated password guessing

### Mitigation Strategies

- Implement CAPTCHA after failed attempts
- Monitor for unusual login patterns
- Use secure password policies
- Educate users about phishing

## Integration with Session Persistence

Once identity is established, you need to maintain that authentication state:

1. **Identity established** → OAuth callback, password validation, etc.
2. **Create session proof** → JWT, session token, or cookie
3. **Return to client** → For ongoing authentication
4. **Session persistence** → Client uses proof for subsequent requests

The identity establishment phase ends when the server is confident about the user's identity and can issue persistent authentication credentials.

## Next Steps

After establishing identity, you'll need to implement session persistence patterns to maintain authentication state between requests. This involves choosing between JWTs, bearer tokens, cookies, or other persistence mechanisms based on your application architecture.
