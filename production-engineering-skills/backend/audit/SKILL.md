# Backend Production Audit

Audit:
- API design
- authentication
- authorization
- runtime validation
- data integrity
- migrations
- security
- reliability
- observability
- background jobs
- webhook behavior
- unit/integration/contract/E2E coverage
- load/resilience testing where justified
- GitHub Actions CI/CD
- deployment and rollback

Repository sweep:
- TODO
- FIXME
- hard-coded credentials
- debug endpoints
- unrestricted CORS
- disabled auth
- test keys
- localhost production config
- missing timeouts
- unbounded retries

Classify:
- Critical
- High
- Medium
- Low

Do not call the service production-ready while Critical findings remain.
