# Mobile Security

Focus on client-device and API boundaries.

Check:
- server-side authorization
- secure token storage
- no embedded secrets
- certificate/TLS correctness
- deep-link validation
- WebView hardening
- file/share intent validation
- clipboard sensitivity
- screenshot/screen recording policy where appropriate
- local database protection
- log redaction
- jailbreak/root assumptions where relevant
- push notification payload sensitivity
- biometric reauthentication for sensitive actions
- dependency vulnerabilities

Do not assume app-store distribution makes secrets private.
Anything in the binary should be considered recoverable by an attacker.
