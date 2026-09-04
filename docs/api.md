# Support Agent API

Base URL: `API_URL`. All responses are JSON unless stated. Every response carries a
server-generated `X-Request-Id` (clients cannot set their own — see `apps/api/src/app.ts`).
Errors are `{ "error": { "code", "message", "requestId" } }`, where `code` is one of the values
in `ERROR_CODE` (`packages/shared/src/constants/index.ts`). Of that enum, only `VALIDATION`,
`UNAUTHORIZED`, `NOT_FOUND` and `INTERNAL` can actually be produced by the endpoints below today.
The rest of the enum (`FORBIDDEN`, `RATE_LIMITED`, `TURN_IN_PROGRESS`, `INVALID_TRANSITION`,
`AI_UNAVAILABLE`, `AI_TIMEOUT`, `TOOL_FAILED`, `N8N_UNAVAILABLE`) is reserved for endpoints and
middleware (rate limiting, the message/escalate/webhook routes) that do not exist yet — see
"Not yet implemented" below.

## Authentication

`POST /api/visitors/session` mints a visitor and returns `visitorToken`. Every `/api/chat/*`
call sends it back as the `X-Visitor-Token` header.

There is no user authentication in the MVP. `USER_AUTH_PROVIDER` defaults to `none`, and no route
currently reads an `Authorization` header at all — the user-claims verifier exists in code
(`apps/api/src/plugins/auth.ts`) but nothing calls it yet; it is reserved for a future JWKS phase.

**The session endpoint and the chat endpoints treat a bad token differently — this is
deliberate, not an oversight:**

- `POST /api/visitors/session` never rejects a token. An absent `visitorToken`, an empty
  string, or a present-but-invalid one (malformed, expired, wrongly signed, or simply
  unknown to this server) all take the same path: the caller gets a **new** visitor and a
  200. This looks like a missing validation until you know why — a client that lost or never
  had a token must be able to ask for one without the request failing.
- The `/api/chat/*` routes are strict: `X-Visitor-Token` must resolve to a currently valid,
  known visitor or the request never reaches the handler — the `requireVisitor` preHandler
  throws before it, and the response is `401 UNAUTHORIZED`.

## Endpoints

### POST /api/visitors/session
No auth required, but the `X-Visitor-Token` header is still read: if the body has no token
(absent or empty string), the header — the credential every other `/api/chat/*` endpoint
sends — is used as a fallback before falling through to minting a new visitor. Body:
`{ "visitorToken"?: string }` (Zod: `z.string().optional()`, no minimum length — an empty
string is accepted and treated as absent).

200 → `{ visitorToken, visitorId, expiresAt }`.

As above, this endpoint cannot fail on the token: an absent or empty body token falls back to
the header, and if that is also absent or unresolvable, the caller gets a fresh visitor — 200
either way. It can still 400 (`VALIDATION`) if the body isn't valid JSON or `visitorToken`
isn't a string. This matters for a client that only ever sends its token by header (as it does
on every other endpoint): without the fallback it would silently mint a new visitor on every
call to this endpoint and lose its previous conversations.

### POST /api/chat/conversations
Auth: visitor (`X-Visitor-Token`, required).

Body: `{ "sessionId"?: uuid, "metadata"?: { "pageUrl"?: url (max 2048), "locale"?: string (max
16), "referrer"?: url (max 2048) } }`. `sessionId` defaults to a server-generated UUID if
omitted.

201 → `ConversationDto`:
```
{ id, status, escalated, openTicketId, createdAt, lastMessageAt }
```
`status` starts at `"ai_active"`; `escalated` starts `false`; `openTicketId` is always `null`
today (it is wired up in Phase 5, once tickets exist).

### GET /api/chat/conversations/:id
Auth: visitor and owner. `:id` must be a syntactically valid UUID or the request is `400
VALIDATION` before any lookup happens.

200 → `ConversationDto` (same shape as above).

**404, never 403, when the conversation is unknown or not owned by the caller** — the two
cases are made indistinguishable on purpose, so a caller cannot use the response to tell a
foreign conversation id from a nonexistent one (see `ConversationService.getOwned`). Ownership
means the visitor id matches, or (once real user accounts exist) the resolved user id matches.

### GET /api/chat/conversations/:id/messages?limit=&before=
Auth: visitor and owner. Query: `limit` (1–100, default 50), `before` (a message id, must be a
valid UUID or `400 VALIDATION`).

200 → `{ messages: MessageDto[] }`:
```
{ id, role: "user" | "assistant", content, status, createdAt }
```
Oldest first. Only `user` and `assistant` roles are ever returned — `system` and `tool` rows
exist in the schema but are filtered out in SQL, not after the fact, so `limit` always counts
visible rows.

**`before` must name a message in *this same conversation*.** A `before` id that doesn't exist
at all, or that belongs to a *different* conversation the caller does or doesn't own, both
return `404` — deliberately indistinguishable, for the same reason a foreign conversation id is
404 rather than 403 (see `ConversationRepository.findMessage`). Resolving `before` against any
message in the database regardless of conversation would let a caller who owns conversation A
pass a message id from conversation B and use B's timestamp to page A.

Note: no endpoint in this phase writes messages (`POST .../messages` is Phase 3, below), so
today this route returns an empty list for any conversation created through the API, unless
rows were seeded directly in the database.

### GET /api/health
No auth. 200 → `{ ok: boolean, db: "up" | "down", version }`.

**This endpoint always returns HTTP 200, even when `db: "down"`.** It runs `select 1` against
the database and reports the outcome in the body rather than the status code — see
`apps/api/src/modules/health/routes.ts`. Anything that health-checks on status code alone
(a load balancer, an uptime monitor configured for "2xx = healthy") will read a database-less
API as healthy. Check the `db` field, not the status code.

## Merge prerequisite

**Before this branch is merged to `main`:** the Vercel project's Root Directory setting must be
changed to `apps/web` (see `docs/architecture.md` section 15). It currently still points at the
repository root, from before the monorepo move. Merging without that dashboard change breaks the
live site's routing — the SPA rewrite to `shell.html` disappears and every deep URL 404s.

## Not yet implemented

`POST /api/chat/conversations/:id/messages` (Phase 3 — sends a message and streams the reply),
`/escalate` and `/feedback` (Phase 5), `POST /api/webhooks/n8n` (Phase 6). See
`docs/architecture.md` section 9 for the full intended route table and section 16 for the phase
plan.

Two operational gaps are worth calling out explicitly, because they are real today and not
visible from the route list above:

- **No rate limiting exists anywhere in the API yet.** `POST /api/visitors/session` in
  particular is an unauthenticated write that inserts one database row per call, with no
  authentication and no limiter in front of it. It must not be exposed on a public URL until a
  rate limiter (Phase 7) lands.
- **`GET /api/health` reports `db: "down"` with HTTP 200, not a non-2xx status** (see above).
  Wire health checks to read the `db` field, not the response code.
