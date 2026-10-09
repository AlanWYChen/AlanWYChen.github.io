# Web CI/CD with GitHub Actions

GitHub Actions is the default CI/CD target.

## Pull Request workflow

Typical jobs:
1. checkout
2. setup Node/package manager
3. restore dependency/build cache
4. install with lockfile
5. lint
6. format check
7. type check
8. unit/component tests
9. integration tests
10. production build
11. dependency/security scan
12. Playwright E2E where practical
13. upload test/build artifacts on failure

## Main/Release workflow

Typical stages:
1. build immutable artifact
2. deploy preview/staging
3. run smoke tests
4. production deploy
5. run production smoke checks
6. tag/release
7. support rollback

## GitHub Actions guidance

- pin action major versions or SHAs according to repository policy
- use GitHub Environments for protected production deploys
- use OIDC to cloud providers instead of long-lived cloud keys where possible
- keep secrets in GitHub Secrets/Environments
- use concurrency groups to prevent conflicting production deploys
- cache package manager data safely
- use artifact retention intentionally
- fail fast on lint/type/test/build failures
