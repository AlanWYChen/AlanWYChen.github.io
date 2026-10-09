# Sign in with Apple for Mobile

Use AuthenticationServices on Apple platforms where applicable.

## Flow

- request authorization
- use nonce when integrating with backend identity providers
- send the identity token/authorization result to the backend
- backend validates signature, issuer, audience, expiry, and nonce
- use Apple subject identifier as stable provider identity
- create the application's own backend session/tokens

Remember:
- name may only be supplied on first authorization
- private relay email may be used
- email should not be treated as the stable Apple identity key
