# Backend Resilience Testing

Test behavior when:
- DB is slow/unavailable
- cache is unavailable
- dependency returns 500/429
- queue is delayed
- network times out
- worker crashes mid-job
- duplicate message arrives
- message arrives out of order

Verify retries are bounded and operations remain idempotent.
