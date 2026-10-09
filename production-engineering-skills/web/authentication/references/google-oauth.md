# Google OAuth for Web

Prefer Authorization Code flow with PKCE where supported.

## Typical flow

1. User selects "Continue with Google".
2. Generate state and PKCE verifier/challenge.
3. Redirect to Google's authorization endpoint.
4. Handle callback on a trusted server route.
5. Validate state.
6. Exchange authorization code server-side.
7. Validate issuer, audience, expiry, and nonce where applicable.
8. Map or create the local user.
9. Create the application's own secure session.
10. Store sensitive tokens server-side if continued Google API access is needed.

## Important checks

- Never trust profile data directly from the browser.
- Do not expose Google client secrets to client code.
- Handle account-linking collisions deliberately.
- Define behavior when the same email already exists under another login method.
- Request the minimum scopes required.
- Store refresh tokens encrypted when needed.
- Support revoked/expired provider credentials.
