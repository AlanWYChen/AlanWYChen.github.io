# Passkeys / WebAuthn for Web

## Registration

1. Server generates registration options and challenge.
2. Browser calls `navigator.credentials.create`.
3. Send attestation result to the server.
4. Server validates challenge, origin, RP ID, and credential data.
5. Store credential ID, public key, counters/metadata as required.

## Authentication

1. Server creates a fresh challenge.
2. Browser calls `navigator.credentials.get`.
3. Send assertion to the server.
4. Validate challenge, origin, RP ID, signature, and credential.
5. Establish the application session.

## Requirements

- Challenges are single-use and short-lived.
- Verification happens server-side.
- Support recovery when a user loses access to passkeys.
- Do not assume passkeys eliminate the need for account-recovery design.
