# Passkeys on Mobile

Use platform credential APIs:
- iOS AuthenticationServices
- Android Credential Manager / passkey APIs

Backend responsibilities:
- generate challenges
- verify WebAuthn/passkey assertions
- validate relying party/origin/app association requirements
- store credential public keys/IDs
- support recovery and device migration scenarios

Never verify passkey assertions only on-device.
