# [ericjinks.com](https://ericjinks.com)

[![Netlify Status](https://api.netlify.com/api/v1/badges/79156c84-6012-4ed1-a8ac-af5538858166/deploy-status)](https://app.netlify.com/sites/ericjinks/deploys)

My personal website ✨

Built with **[Astro](https://astro.build)**

## Admin Access

The site includes a secure admin area:

- **Login**: [ericjinks.com/login/](https://ericjinks.com/login/)
- **Dashboard**: [ericjinks.com/admin/](https://ericjinks.com/admin/)
- **Security**: HTTPOnly cookies with 1-month sessions
- **Protection**: Cloudflare rate limiting + middleware authentication

### Environment Variables Required

```bash
# Authentication
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-super-secret-password
ADMIN_SECRET=your-32-char-secret-key

# Database (Turso)
ASTRO_DB_REMOTE_URL=libsql://your-database.turso.io
ASTRO_DB_APP_TOKEN=your-turso-auth-token
```

**Setup Commands:**

```bash
# Generate secure authentication secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Turso database setup (requires Turso CLI)
turso db create your-database-name     # Create database
turso db show your-database-name       # Get database URL
turso db tokens create your-database-name  # Generate auth token
```
