# Service-to-Service Authentication

Prefer workload identity over static secrets where infrastructure supports it.

Options:
- cloud IAM/workload identity
- OIDC federation
- mTLS
- short-lived signed service tokens

Avoid long-lived shared secrets embedded in images or repositories.
Authorize by service identity and required scope, not merely network location.
