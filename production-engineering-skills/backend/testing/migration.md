# Database Migration Testing

Test migrations against representative schema/data.

Verify:
- forward migration
- deployment compatibility during rolling release
- old app + new schema where required
- new app + transitional schema
- rollback/recovery plan
- index creation impact
- data backfill behavior
