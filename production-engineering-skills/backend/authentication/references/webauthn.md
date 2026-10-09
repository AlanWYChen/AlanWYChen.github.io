# WebAuthn Verification on the Backend

Registration:
- issue single-use challenge
- verify RP ID/origin
- validate attestation/credential response
- store credential ID and public key

Authentication:
- issue single-use challenge
- verify RP ID/origin
- validate signature and credential
- handle credential counters/metadata appropriately
- establish the application session/token after successful verification

Recovery must be designed separately.
