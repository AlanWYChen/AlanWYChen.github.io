# Mobile CI/CD with GitHub Actions

GitHub Actions is the default CI/CD runner.

## Pull requests

Typical jobs:
- checkout
- restore package/build caches
- lint/format
- compile
- unit tests
- integration tests
- static analysis
- dependency/security scan

## iOS

Use:
- macOS GitHub runners or approved self-hosted runners
- code signing via protected secrets / App Store Connect credentials
- archived build artifacts
- TestFlight deployment from protected branches/environments

Prefer App Store Connect API keys over interactive credentials.

## Android

Use:
- Gradle caching
- signing secrets through GitHub Environments/Secrets
- AAB/APK build artifacts
- Play Console internal/testing track deployment

## Release safety

- protected production environments
- manual approval where appropriate
- version/build number automation
- immutable build artifacts
- changelog/release notes
- rollback/hotfix procedure
