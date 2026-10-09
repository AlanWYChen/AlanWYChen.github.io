# Web Session Cookies

For server-managed browser sessions, sensitive cookies should generally be:

- `HttpOnly`
- `Secure`
- appropriate `SameSite`
- narrowly scoped by domain/path
- rotated after authentication/privilege changes
- invalidated on logout

Also consider:
- CSRF protection
- session expiration
- idle timeout
- absolute timeout
- server-side revocation
- logout-all-sessions
- session fixation protection
