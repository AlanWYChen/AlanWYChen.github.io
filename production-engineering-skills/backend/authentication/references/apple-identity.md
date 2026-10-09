# Verifying Apple Identity on the Backend

Validate:
- token signature using Apple's published keys
- issuer
- audience
- expiry
- nonce where applicable

Use Apple `sub` as the stable provider identity.

Account linking must account for:
- private relay emails
- email changes
- multiple login methods
