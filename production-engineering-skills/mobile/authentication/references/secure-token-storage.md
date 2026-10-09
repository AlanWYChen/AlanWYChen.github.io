# Secure Token Storage on Mobile

Use OS-provided secure storage:
- iOS Keychain
- Android Keystore-backed storage

Avoid storing access/refresh tokens in:
- plaintext preferences
- SQLite without appropriate protection
- logs
- crash reports

Consider:
- token rotation
- refresh token revocation
- device compromise assumptions
- clearing credentials on logout
- biometric gating for especially sensitive local secrets
