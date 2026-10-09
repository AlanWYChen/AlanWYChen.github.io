# Google Sign-In for Mobile

Use platform-supported Google Sign-In / OAuth SDKs.

## Principles

- Treat the app as a public client.
- Use PKCE for authorization code flows.
- Validate identity tokens on the backend when establishing a server session.
- Verify issuer, audience, expiry, and nonce where applicable.
- Do not trust a client-supplied Google profile as proof of identity.
- Keep server API authorization independent from UI login state.
- Handle cancelled sign-in and revoked Google access cleanly.
