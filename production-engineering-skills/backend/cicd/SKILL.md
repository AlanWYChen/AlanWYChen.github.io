# Backend CI/CD with GitHub Actions

GitHub Actions is the default CI/CD implementation.

## Pull Request workflow

Typical stages:
1. checkout
2. setup language/runtime
3. restore dependency caches
4. install dependencies from lockfile
5. lint/format
6. type/static checks
7. unit tests
8. integration tests with service containers
9. contract tests
10. build artifact/container image
11. vulnerability scan
12. migration validation
13. upload test artifacts on failure

## Main/Release workflow

Typical stages:
1. build immutable container/artifact
2. generate SBOM if required
3. scan artifact
4. push to registry
5. deploy staging
6. run migration/pre-deploy checks
7. smoke/integration checks
8. protected production deployment
9. post-deploy smoke checks
10. rollback on failed health gates

## GitHub Actions practices

- prefer OIDC federation for AWS/GCP/Azure over static cloud keys
- use GitHub Environments for production protection
- use concurrency controls for deployment workflows
- pin important third-party actions
- separate build and deploy permissions
- use least-privilege `permissions:` blocks
- never print secrets
- keep production credentials environment-scoped
- publish test reports and logs as artifacts when useful
