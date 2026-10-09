# Webhook Handling

For incoming webhooks:
- verify signatures
- validate timestamp/replay window
- parse and validate schema
- acknowledge quickly
- enqueue heavy work
- deduplicate events
- make handling idempotent
- handle out-of-order events
- persist processing state
- retry safely
- provide operational visibility for failures

For outgoing webhooks:
- sign payloads
- retry with backoff
- include event IDs
- version events
- allow secret rotation
