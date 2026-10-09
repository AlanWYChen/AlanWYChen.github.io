# OAuth 2.0 Authorization Code + PKCE

Use PKCE for public/browser clients and modern OAuth integrations.

- Generate a high-entropy `code_verifier`.
- Derive `code_challenge`.
- Use `S256`.
- Generate and validate `state`.
- Use nonce for OIDC identity flows where applicable.
- Exchange the authorization code only at the trusted callback boundary.
- Validate redirect URI exactly.
- Request minimum scopes.
- Treat access and refresh tokens as secrets.
- Rotate/refresh tokens securely.
- Handle revoked credentials.
