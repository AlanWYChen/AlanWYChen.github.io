# OAuth / OIDC Backend Guidance

For Authorization Code flows:
- validate state
- validate nonce for OIDC where applicable
- exchange codes over trusted server boundaries
- validate issuer/audience/expiry
- request minimal scopes
- encrypt refresh tokens at rest
- rotate credentials
- handle revocation
- support provider outage/error cases

Do not confuse authentication with authorization.
