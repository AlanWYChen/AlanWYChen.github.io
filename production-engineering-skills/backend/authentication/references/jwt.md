# JWT Authentication

Validate:
- signature
- allowed algorithm
- issuer
- audience
- expiry
- not-before where used
- token purpose/type

Operational guidance:
- short-lived access tokens
- revocation/rotation strategy when needed
- key rotation
- `kid` handling
- never accept `alg=none`
- do not treat decoded-but-unverified claims as trusted
