# Production Engineering Skills

## Purpose

This is a domain-routed skill pack for production application development.

Choose the relevant domain first:

- `web/` for browser-based applications and websites
- `mobile/` for iOS, Android, and cross-platform mobile apps
- `backend/` for APIs, services, workers, queues, data services, and platform systems

Each domain intentionally duplicates important concerns such as:
- security
- observability
- testing
- CI/CD
- authentication

The duplicated versions are customized for the domain rather than treated as generic advice.

## Routing

When working on a task:

1. Identify whether the task is primarily web, mobile, backend, or multi-domain.
2. Read that domain's `SKILL.md`.
3. Read only the applicable subskills.
4. Before completion, run the domain-specific production audit.
5. For cross-domain systems, run the audit for every affected domain.

## Global Principles

- Build complete workflows, not happy-path demos.
- Never treat frontend/mobile UI checks as authoritative authorization.
- Validate untrusted input at runtime.
- Do not expose secrets to clients.
- Prefer observability and recoverability over silent failure.
- Use GitHub Actions as the default CI/CD implementation unless the repository already uses another system.
- Test critical workflows at the appropriate layer instead of overusing one test type.
