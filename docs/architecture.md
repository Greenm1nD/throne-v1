# THRONE Support Agent — architecture

The AI support chatbot for the THRONE website. Written 4 Sep 2026 after inspecting the
repository at commit `3d509b2` (branch `concept-v2`). This is the Phase 1 deliverable of the
build specification; implementation starts only from this document.

The chatbot is an **AI support agent**, not an FAQ widget: it answers questions about THRONE from a
curated knowledge base, remembers the conversation, calls backend tools when it needs live data or
an action, and hands the visitor to a human when it should. The backend is the control plane.
The frontend never talks to OpenAI, n8n or the database.

## 0. Decisions already taken

Recorded so later sessions do not re-litigate them.

| Decision | Choice | Why |
|---|---|---|
| First target website | THRONE, this repository | The knowledge base (`legal.ts`, FAQ, progression spec) and the support surface (`/account/help`, `/account/contact`) already exist here. |
| Authentication boundary | Anonymous MVP with a pluggable user verifier | THRONE has no backend and no real accounts. The site's `localStorage` demo user is **not** an identity. Account-specific tools stay registered but refuse without a verified user. |
| Repository layout | pnpm monorepo in this repo | The site moves to `apps/web` unchanged; `apps/api`, `packages/chat-widget`, `packages/shared` are added. |
| API framework and hosting | Fastify 5, long-running Node process in Docker | Batteries included (pino, request ids, rate-limit, helmet, cors), trivial SSE and pg pooling. Any container host. Web stays on Vercel. |
| Data access | Drizzle ORM + drizzle-kit migrations on `pg` | Schema in TypeScript, generated SQL migrations, parameterised queries, minimal runtime. |
| Knowledge provider | OpenAI vector store, searched from **our** `search_knowledge` tool | Keeps every retrieval inside the tool executor, so the provider is replaceable (Rule 6) and source metadata stays in our hands. The built-in `file_search` tool would bypass both. |
| Local development database | Homebrew PostgreSQL | No Docker on the machine; Redis is not needed for the MVP. |

Explicitly **not** in the MVP: admin panel, analytics dashboard, conversation summarisation
(schema only), account tools with real data, embed build for third-party sites, Redis,
WebSockets, multi-tenancy.

## 1. System architecture

```
                         Vercel (static)                    Container host
┌──────────────────────────────────────────┐   ┌──────────────────────────────────────────────┐
│ apps/web  (THRONE SPA, Vue 3)            │   │ apps/api  (Fastify 5, Node 22+,  TypeScript)  │
│   └── <ChatWidget>  from                 │   │                                              │
│       packages/chat-widget               │   │  auth plugin ── visitor token (HMAC)         │
│         createChatClient()               │   │             └─ user verifier (none | jwks)   │
│         fetch + SSE parser  ─────────────┼──▶│  modules/chat ── SSE endpoint                │
│         localStorage: visitor token,     │   │       │                                      │
│                       conversation id    │   │  services/ai/orchestrator                    │
└──────────────────────────────────────────┘   │       │  builds context, runs tool loop      │
                                               │       ├──▶ LlmProvider (OpenAI Responses)    │
                                               │       └──▶ ToolExecutor                      │
                                               │              ├─ search_knowledge ──▶ KnowledgeService
                                               │              │                        └─ OpenAI vector store
                                               │              ├─ request_human_support ─┐   │
                                               │              └─ create_support_ticket ─┴─▶ SupportService
                                               │                                            └─▶ n8n webhook
                                               │  PostgreSQL (Drizzle)  ◀── every module     │
                                               │  Redis (optional, later: rate-limit store)  │
                                               └──────────────────────────────────────────────┘
                                                        ▲
                                                        │ HMAC-signed webhooks (both directions)
                                                   n8n (automation only: CRM ticket, Slack, email)
```

Principles the code must keep true:

1. **The API is the only thing with secrets.** OpenAI, n8n, database and signing keys live in the
   API's environment. The widget receives a visitor token and an SSE stream, nothing else.
2. **Modular monolith.** One deployable API process. Modules talk through TypeScript interfaces,
   never through HTTP to each other.
3. **Two replaceable seams.** `LlmProvider` (today: OpenAI Responses API) and `KnowledgeService`
   (today: OpenAI vector store). Each has exactly one implementation now; the interface exists so
   the orchestrator can be unit-tested with a fake and so a provider swap is a new file, not a
   rewrite.
4. **AI output is untrusted input.** Every tool call goes through validation, authentication and
   ownership checks in the executor before anything executes.
5. **n8n is downstream.** The API decides; n8n executes side effects (CRM, Slack, email).

## 2. Frontend architecture

### 2.1 `packages/chat-widget` — a Vue 3 library, not a THRONE component

Published inside the workspace as `@throne/chat-widget` (packages are `@throne/web`, `@throne/api`, `@throne/chat-widget`, `@throne/shared`). It never imports from `apps/web`.

```
packages/chat-widget/src/
  index.ts                     exports ChatWidget, createChatClient, useChatWidget, types
  ChatWidget.vue               root: floating button + window; owns open/closed + responsive layout
  components/
    ChatWindow.vue             header, status banner, message list, composer
    ChatHeader.vue             title, "new conversation", minimise, close
    MessageList.vue            scroll container, auto-scroll while streaming
    MessageBubble.vue          user / assistant / system rendering; streaming cursor
    Composer.vue               textarea, send, disabled states, Enter/Shift+Enter
    StatusBanner.vue           error + retry, "passed to human support", offline
  composables/
    useConversation.ts         state machine: idle → sending → streaming → idle | error | escalated
    useChatWidget.ts           tiny global store: open(), close(), toggle() — lets the host site
                               open the widget from its own buttons
  client/
    chat-client.ts             createChatClient({ apiBaseUrl, getUserToken? }): HTTP + SSE
    sse-parser.ts              parses `event:`/`data:` frames from a ReadableStream
    storage.ts                 visitor token + conversation id in localStorage (try/catch'd)
  theme.css                    CSS custom properties (--cw-bg, --cw-accent, --cw-radius, …)
```

Behaviour:

- **Bootstrap.** On first open the client calls `POST /api/visitors/session` (with the stored
  visitor token if any) and stores the returned token. It then either resumes the stored
  conversation id (`GET …/messages`) or creates a new conversation on the first send.
- **Streaming.** `POST …/messages` is read with `fetch` + `ReadableStream`; the parser emits typed
  events (section 10). An `AbortController` backs the stop button and unmount.
- **States the UI must render:** idle, sending, streaming, error (with retry of the last user
  message), escalated/human-support (banner, input stays enabled), new conversation, minimised,
  closed. Loading skeleton while history loads.
- **Responsive.** Desktop: 380×600 panel anchored bottom-right. Below `md`: full-screen sheet.
- **Theming.** Tailwind utilities inside the SFCs plus CSS variables for colours and radius. The
  host's `tailwind.config` adds `../../packages/chat-widget/src/**/*.vue` to `content`. THRONE
  sets gold/dark values on the variables; the defaults are neutral SaaS.
- **Copy.** All strings come from a `labels` prop with English defaults, so THRONE (and a later
  Georgian version) override text without forking the component.
- **Authentication hook.** Optional `getUserToken(): Promise<string | null>` prop. When the host
  site has a real login it returns the user's JWT and the client sends it as
  `Authorization: Bearer …`. THRONE passes nothing in the MVP.

Later, not now: an IIFE `embed.js` build that mounts into a shadow root with compiled CSS for
sites that are not Vue/Tailwind. The package layout already allows it.

### 2.2 `apps/web` — the existing THRONE site, moved unchanged

The site moves to `apps/web/` as a whole (`src/`, `public/`, `index.html`, `vite.config.ts`,
`tailwind.config.js`, `postcss.config.js`, `scripts/prerender.mjs`, `vercel.json`, tsconfigs).
`prerender.mjs` resolves paths relative to its own file, so it keeps working.

Two integration touches only:

1. `App.vue` mounts `<ChatWidget>` after the intro sequence (`ready === true`) with
   `apiBaseUrl = import.meta.env.VITE_CHAT_API_URL` and THRONE labels/theme.
2. `views/account/ContactView.vue`: the "Open Chat" button calls `useChatWidget().open()`.
   It is the only dead control that becomes live.

Nothing from `useAuth()` is passed to the widget. The mock user is a UI prop, not an identity.

## 3. Backend architecture

### 3.1 Shape

Fastify 5 on Node 22 LTS or newer, TypeScript strict, ESM. One process, one `createApp()`.

```
apps/api/src/
  server.ts                    reads env, builds app, listens; the only file that calls listen()
  app.ts                       createApp(deps): registers plugins, routes, error handler
  config/
    env.ts                     Zod schema for process.env; parse once; fail fast with a readable list
    models.ts                  { chat, summary, maxOutputTokens } from env — the only place model
                               names are read
  container.ts                 buildContainer(env): constructs db, providers, services, tools.
                               Plain function, no DI library.
  plugins/
    request-id.ts              genReqId → uuid v4; echoed as X-Request-Id
    logger.ts                  pino config + redaction list
    security.ts                @fastify/helmet, @fastify/cors (allowlist), body limit
    rate-limit.ts              @fastify/rate-limit keyed by visitor id, fallback ip
    auth.ts                    builds request.auth (section 11)
    error-handler.ts           AppError → { error: { code, message, requestId } }; else 500
  modules/
    visitors/                  session bootstrap, token issue/refresh, user linking
    conversations/             CRUD, ownership, status state machine
    chat/                      POST messages → SSE; wires orchestrator to the response
    knowledge/                 KnowledgeService interface + OpenAI vector store implementation
    tools/                     AiTool interface, registry, executor, MVP tools
    support/                   tickets, escalation, n8n delivery, inbound webhook
    feedback/                  thumbs up/down per message
    health/                    GET /api/health
  services/
    ai/
      llm.provider.ts          LlmProvider interface + normalised event union
      openai.client.ts         single OpenAI SDK instance (timeout, maxRetries)
      openai.provider.ts       OpenAI Responses implementation of LlmProvider
      prompt.service.ts        loads prompts/support-agent.md, injects runtime facts
      context.builder.ts       recent window + summary → provider input
      orchestrator.ts          the turn loop (section 4.3)
    n8n/
      n8n.client.ts            signed POST with timeout and one retry
      n8n.service.ts           typed workflow calls (createSupportTicket)
  db/
    schema/                    one file per table group, exported from index.ts
    migrations/                drizzle-kit output, committed
    client.ts                  pg Pool + drizzle()
  lib/
    errors.ts                  AppError, error codes
    signed-token.ts            HMAC compact token (visitor token)
    hmac.ts                    signature build/verify with constant-time compare
    sse.ts                     writeEvent(reply.raw, event, data), heartbeat
```

Each module follows `routes.ts` → `service.ts` → `repository.ts` (Drizzle) with `schemas.ts`
(Zod) for request/response shapes. Route handlers validate and delegate; they contain no business
logic and no OpenAI calls.

### 3.2 Cross-cutting

- **Validation.** Zod everywhere: env, request bodies (via `fastify-type-provider-zod`), tool
  inputs, n8n payloads.
- **Errors.** `AppError(code, status, safeMessage, cause?)`. Known codes are listed in
  `lib/errors.ts` (`NOT_FOUND`, `FORBIDDEN`, `RATE_LIMITED`, `TURN_IN_PROGRESS`,
  `AI_UNAVAILABLE`, `AI_TIMEOUT`, `TOOL_FAILED`, `N8N_UNAVAILABLE`, `VALIDATION`). Anything else
  becomes a 500 with a generic message; the full error is logged with the request id.
- **Logging.** pino, JSON, one line per request plus structured events for AI turns
  (`ai.turn.start/end`, `ai.tool.call`, `n8n.call`). Redacted: `authorization`,
  `x-visitor-token`, `cookie`, `OPENAI_API_KEY`-shaped strings. Message content is logged at
  `debug` only; at `info` we log ids, lengths and timings.
- **Tests.** Vitest. Unit: orchestrator with a `FakeLlmProvider`, tool executor, signed token,
  state machine, SSE parser. Integration: routes via `app.inject()` against a disposable test
  database (`DATABASE_URL_TEST`). Widget: `@vue/test-utils` for the composable and parser.
- **Build.** `tsx watch` in dev, `tsc` to `dist/` for production. Multi-stage `Dockerfile` using
  `pnpm deploy --filter @throne/api --prod`. Health check on `/api/health`.

## 4. OpenAI integration

### 4.1 One client, one provider

`services/ai/openai.client.ts` constructs the SDK once with `timeout: AI_REQUEST_TIMEOUT_MS` and
`maxRetries: 2` (the SDK retries only before a response begins). Nothing else imports `openai`
except `openai.provider.ts` and the vector-store knowledge service.

### 4.2 `LlmProvider` — the seam

```ts
interface LlmProvider {
  stream(req: LlmRequest, signal: AbortSignal): AsyncIterable<LlmEvent>
}
interface LlmRequest {
  model: string
  instructions: string            // system prompt
  input: LlmInputItem[]           // messages + prior tool calls/outputs for this turn
  tools: LlmToolDefinition[]      // JSON-schema function tools
  maxOutputTokens: number
}
type LlmEvent =
  | { type: 'text.delta'; delta: string }
  | { type: 'tool.call'; callId: string; name: string; argumentsJson: string; rawItem: unknown }
  | { type: 'done'; providerResponseId: string; usage: { input: number; output: number; total: number } }
  | { type: 'error'; code: string; message: string; retryable: boolean }
```

The OpenAI implementation calls `client.responses.create({ model, instructions, input, tools,
stream: true, store: false, max_output_tokens })` and maps the stream events that the API
documents:

| OpenAI event | Mapped to |
|---|---|
| `response.output_item.added` with `item.type === 'function_call'` | start accumulating that call by `output_index` |
| `response.output_text.delta` | `text.delta` |
| `response.function_call_arguments.delta` | append to the call's arguments |
| `response.output_item.done` with a `function_call` item | `tool.call` (carries `call_id`, `name`, full arguments, and the raw item for replay) |
| `response.completed` | `done` with `response.id` and `usage` |
| `response.failed`, `response.incomplete`, `error` | `error` |

`store: false` is deliberate: we hold the conversation, so context is rebuilt from PostgreSQL each
turn and `previous_response_id` is never used. This is what keeps the provider replaceable.

### 4.3 The turn loop (`orchestrator.ts`)

```
runTurn(conversation, userMessage, sink):
  1. context  = contextBuilder.build(conversation)          // section 4.4
  2. input    = context.items
  3. for round in 1..AI_MAX_TOOL_ROUNDS:
       events = provider.stream({ instructions, input, tools: registry.definitions(), … }, signal)
       collect text deltas  → sink.text(delta)             (forwarded to SSE as they arrive)
       collect tool calls   → pending[]
       on done              → record usage/responseId
       if pending is empty  → break
       for call in pending (sequentially):
         sink.toolStart(call)
         result = executor.execute(call, toolContext)        // section 5.3, always returns a result
         sink.toolEnd(call, result)
         input.push(call.rawItem)                             // replay the model's own call
         input.push({ type: 'function_call_output', call_id, output: JSON.stringify(result) })
  4. if rounds exhausted with pending calls → final message explains it could not complete
  5. persist assistant message (content, model, providerResponseId, usage, latency)
```

Tool calls inside one round run sequentially in the MVP. The text the model produces before a
tool call is streamed and kept; the final answer after the last tool result is appended to the
same assistant message. One assistant message per user message, always.

Timeouts and retries: the SDK retries 429/5xx before first byte. Once streaming has started,
nothing is retried; an error mid-stream ends the turn with an `error` SSE event and the partial
text is saved with `status = 'failed'`. The whole turn has a budget of `AI_TURN_BUDGET_MS`
(default 90 s) enforced by the abort signal.

### 4.4 Context strategy (`context.builder.ts`)

Input for a turn is built from the database, never from the client:

1. `instructions` = the system prompt (section 4.5) with runtime facts appended: current UTC time,
   conversation status, open ticket id if any, whether the visitor is authenticated, page URL.
2. If `conversation.summary` exists: one developer-role item "Summary of the earlier
   conversation: …" followed by `important_context` as a bullet list.
3. The last `CONTEXT_RECENT_MESSAGES` (default 20) user/assistant messages after
   `summary_through_message_id`, oldest first. Tool rows are not replayed across turns.
4. The new user message.

Summarisation is **schema-ready, not built**: `conversations.summary`,
`summary_through_message_id` and `important_context` exist and the builder reads them. The job
that fills them (triggered when unsummarised messages exceed a threshold, run after the turn
completes, using `models.summary`) is Phase 7+.

### 4.5 System prompt

`prompts/support-agent.md` at the repository root. Markdown, loaded at startup, hot-reloadable in
dev. It is content, not code, and holds every company-specific rule. Sections it must contain:

- Identity and tone (the Court's voice: confident, honest, never salesy).
- Grounding rules: answer THRONE questions only from `search_knowledge` results; if nothing is
  found say so and offer human support; never invent policies, limits, licences, bonuses,
  timelines or account facts.
- Tool rules: when to search, when to escalate, when to create a ticket; never claim an action
  happened unless the tool result says so.
- Responsible gaming: no encouragement to play or deposit, no "winning" language, surface the
  help organisations from `src/config/trust.ts` on signs of distress or loss-chasing, offer
  escalation for self-exclusion or limit requests.
- Honesty about state: THRONE is in preparation; there is no real-money play, no deposits, no
  withdrawals. Say so plainly when asked.
- Account questions: without a verified login, explain what would be needed and offer a ticket;
  never guess from what the user typed.
- Language: reply in the language the user writes in.

## 5. Tool calling architecture

### 5.1 The interface

```ts
interface AiTool<I = unknown> {
  name: string                       // snake_case, unique
  description: string                // what it does and when the model should use it
  inputSchema: z.ZodType<I>          // converted to strict JSON schema for the provider
  requiresAuth: boolean              // true → executor refuses without auth.userId
  timeoutMs?: number                 // default 10 000
  execute(input: I, ctx: ToolContext): Promise<ToolResult>
}
interface ToolContext {
  conversationId: string
  auth: AuthContext
  requestId: string
  log: Logger
  services: { knowledge: KnowledgeService; support: SupportService; /* grows */ }
}
type ToolResult =
  | { ok: true; data: unknown; sources?: KnowledgeSource[] }
  | { ok: false; error: { code: string; message: string } }
```

### 5.2 Registry

`ToolRegistry.register(tool)` at container build time; `definitions()` returns provider tool
definitions (`type: 'function'`, `strict: true`, `additionalProperties: false`); `get(name)`.
Adding a tool = one file in `modules/tools/tools/` plus one `register` line. The chat core does not
change.

### 5.3 Executor — every call is an untrusted request

```
execute(call, ctx):
  tool = registry.get(call.name)            → unknown: { ok:false, code:'UNKNOWN_TOOL' }
  args = JSON.parse(call.argumentsJson)     → malformed: { ok:false, code:'INVALID_ARGUMENTS' }
  input = tool.inputSchema.safeParse(args)  → invalid:   { ok:false, code:'INVALID_ARGUMENTS', message: issues }
  if tool.requiresAuth && !ctx.auth.userId  → { ok:false, code:'AUTH_REQUIRED' }
  row = toolCalls.insert(pending)
  result = withTimeout(tool.execute(input, ctx), tool.timeoutMs)
           → throws: { ok:false, code:'TOOL_FAILED' }   (details logged, not returned)
  result.data = truncate(result.data, 8 KB)
  toolCalls.update(row, status, output, duration, error)
  return result
```

Errors are returned to the model as structured failures so it can apologise or escalate; they are
never thrown into the stream. Ownership checks live inside each tool (`get_payment_status` must
load the payment and compare its owner to `ctx.auth.userId`); the executor guarantees only that a
user exists.

### 5.4 MVP tools

| Tool | Input | requiresAuth | Effect |
|---|---|---|---|
| `search_knowledge` | `{ query: string, maxResults?: 1–8 }` | no | `KnowledgeService.search`; returns `[{ title, snippet, score, sourceId }]`; records an `unresolved_questions` row when empty |
| `request_human_support` | `{ reason: HandoffReason, summary: string }` | no | `SupportService.escalate` → ticket of kind `handoff`, conversation → `escalated`, n8n notified; returns ticket id |
| `create_support_ticket` | `{ category: TicketCategory, subject, details }` | no | `SupportService.createTicket` → ticket of kind `ticket`, status unchanged, n8n notified; returns ticket id |

`HandoffReason` = `user_request | complaint | payment | security | account | self_exclusion |
unable_to_answer | tool_failure`. `TicketCategory` = `wallet_payments | bonuses_rewards |
account_verification | technical | other` (the categories ContactView already offers). Both live
in `packages/shared/src/constants`.

Both support tools go through the same n8n workflow (`create_support_ticket`) with a `kind` field.
The difference is conversational: a handoff changes the conversation's status; a ticket does not.

Planned, registered with `requiresAuth: true` and a stub that returns `AUTH_REQUIRED` until a
verifier exists: `get_account_status`, `get_payment_status`. They are placeholders for the
security model, not features.

## 6. Knowledge retrieval

### 6.1 Interface

```ts
interface KnowledgeService {
  search(query: string, opts?: { maxResults?: number }): Promise<KnowledgeResult[]>
}
interface KnowledgeResult {
  title: string
  snippet: string
  score: number
  source: { provider: string; documentId: string; path: string; url?: string }
}
```

Selected by `KNOWLEDGE_PROVIDER`: `openai_vector_store` (MVP) or `none` (search returns `[]`,
useful in tests and before the store exists). A pgvector implementation later is a new class plus
its own ingestion; the tool, the prompt and the orchestrator do not change.

### 6.2 OpenAI vector store implementation

`client.vectorStores.search(OPENAI_VECTOR_STORE_ID, { query, max_num_results })`. Each result's
`content[].text` chunks are joined into the snippet; `file_id` maps through `knowledge_documents`
to our path/title/url. Results below `KNOWLEDGE_MIN_SCORE` (default 0.3) are dropped.

### 6.3 Content and ingestion

```
knowledge/
  README.md                what belongs here, frontmatter contract, how to sync
  site/                    GENERATED — do not edit
    about.md, help.md, responsible-gaming.md, terms.md, privacy.md, account-faq.md
  manual/                  founder-written: rakeback-standing-order.md, ranks.md, …
```

Every file has frontmatter `title`, `url` (site route), `audience: public`. Two scripts:

- `apps/web/scripts/export-knowledge.ts` — reads `src/data/legal.ts` and the FAQ in
  `src/data/account.ts` (the site owns that data) and writes `knowledge/site/*.md`.
- `apps/api/scripts/knowledge-sync.ts` — for every `knowledge/**/*.md`: hash content; if the hash
  differs from `knowledge_documents.content_hash`, upload the file with attributes
  `{ path, title, url }`, add it to the store, delete the previous file, update the row. Removed
  files are deleted from the store. Idempotent; safe to run in CI.

Retrieval is model-driven: the prompt tells the model to call `search_knowledge` for any
THRONE-specific question before answering, and never to answer such questions from memory. No
document is injected into every prompt. Source metadata travels with each result and with the
`tool.end` SSE event, so a "Sources" line in the widget is a rendering change later, not a
backend change.

## 7. n8n integration

n8n is called only when a side effect outside our system is needed. The MVP has one outbound
workflow and one inbound event.

**Outbound — `create_support_ticket`.** `N8nClient.trigger(path, payload)`:

- `POST {N8N_BASE_URL}/webhook/{N8N_SUPPORT_TICKET_PATH}`
- Headers: `Content-Type: application/json`, `X-Throne-Timestamp: <unix seconds>`,
  `X-Throne-Signature: sha256=<hex HMAC-SHA256(N8N_WEBHOOK_SECRET, timestamp + "." + rawBody)>`,
  `X-Throne-Idempotency-Key: <ticketId>`
- Timeout 10 s. One retry on network error or 5xx. No retry on 4xx.
- Payload: `{ ticketId, kind, reason, category, subject, details, conversationId, visitorId,
  user: { externalId, email } | null, transcript: last 30 messages [{ role, content, at }],
  pageUrl, locale, createdAt }`
- Response: `{ ok: boolean, externalRef?: string }`. On success
  `support_tickets.delivery_status = 'delivered'`, `external_ref` stored. On failure
  `'failed'` with the attempt count; the ticket still exists in our database and the model tells
  the user the request is recorded. A `support:redeliver` script (Phase 7) resends failed tickets.

What the workflow does inside n8n (CRM ticket, Slack, email) is configured there, not here.

**Inbound — `POST /api/webhooks/n8n`.** Same signature scheme with our secret; timestamp within
±5 minutes; constant-time compare. Events: `ticket.updated { ticketId, status }` maps to the ticket
and, for `resolved`, moves the conversation `escalated → resolved`. Unknown events are logged and
acknowledged with 202.

## 8. Database schema

PostgreSQL 16+, Drizzle schema in `apps/api/src/db/schema/`, migrations committed. UUID v4 keys,
`timestamptz` everywhere, `jsonb` for open-ended metadata.

```
visitors
  id uuid pk · user_id uuid null fk users · created_at · last_seen_at · metadata jsonb

users                                   -- populated only by a user verifier (none in MVP)
  id uuid pk · external_id text unique · email text null · display_name text null · created_at

conversations
  id uuid pk · visitor_id fk · user_id uuid null fk · session_id text
  status conversation_status ('ai_active' | 'escalated' | 'human_active' | 'resolved' | 'closed')
  escalated boolean · escalation_reason text null
  summary text null · summary_through_message_id uuid null · important_context jsonb
  metadata jsonb (pageUrl, userAgent, locale, referrer)
  created_at · updated_at · last_message_at · closed_at null
  idx (visitor_id, created_at desc) · idx (status)

messages
  id uuid pk · conversation_id fk · role message_role ('user' | 'assistant' | 'system' | 'tool')
  content text · model text null · provider_response_id text null
  token_usage jsonb null ({ input, output, total }) · latency_ms int null
  status message_status ('complete' | 'streaming' | 'failed' | 'cancelled') · error_code text null
  metadata jsonb · created_at
  idx (conversation_id, created_at)

tool_calls
  id uuid pk · conversation_id fk · message_id uuid null fk messages · provider_call_id text
  tool_name text · input jsonb · output jsonb null
  status tool_call_status ('pending' | 'success' | 'error' | 'rejected') · error text null
  duration_ms int null · created_at
  idx (conversation_id, created_at) · idx (tool_name)

support_tickets
  id uuid pk · conversation_id fk · visitor_id fk · user_id uuid null
  kind ticket_kind ('handoff' | 'ticket') · category text · subject text · details text · reason text null
  status ticket_status ('open' | 'in_progress' | 'resolved' | 'closed')
  delivery_status delivery_status ('pending' | 'delivered' | 'failed') · delivery_attempts int
  external_ref text null · created_at · updated_at · resolved_at null
  idx (conversation_id) · idx (status)

feedback
  id uuid pk · conversation_id fk · message_id uuid null fk · rating smallint (-1 | 1)
  comment text null · created_at

knowledge_documents
  id uuid pk · path text unique · title text · source_url text null · content_hash text
  provider text · provider_file_id text null · synced_at null · created_at · updated_at

unresolved_questions
  id uuid pk · conversation_id fk · message_id fk · question text
  reason unresolved_reason ('no_knowledge' | 'escalated' | 'low_confidence') · created_at
```

Analytics (section 22 of the spec) are SQL over these tables: conversations and messages per
day, latency from `messages.latency_ms`, tool usage from `tool_calls`, escalation rate from
`support_tickets.kind = 'handoff'`, cost from `token_usage` × model price, unresolved from
`unresolved_questions`, feedback from `feedback`. No separate metrics tables are needed to start.

Retention: `CONVERSATION_RETENTION_DAYS` (default 180); a purge script is Phase 7+.

## 9. API routes

All under `/api`. JSON in, JSON out, except the message endpoint which streams. Errors:
`{ error: { code, message, requestId } }`.

| Method & path | Auth | Purpose |
|---|---|---|
| `POST /api/visitors/session` | none (token optional) | Issue a new visitor token or refresh a valid one. Body `{ visitorToken? }` → `{ visitorToken, visitorId, expiresAt }`. |
| `POST /api/chat/conversations` | visitor | Create. Body `{ metadata?: { pageUrl?, locale?, referrer? } }` → conversation. |
| `GET /api/chat/conversations/:id` | owner | Conversation with status and open ticket id. |
| `GET /api/chat/conversations/:id/messages?limit=50&before=<id>` | owner | History, user/assistant only, oldest first. |
| `POST /api/chat/conversations/:id/messages` | owner | Body `{ content }` (1–4000 chars). Response `text/event-stream` (section 10). 409 `TURN_IN_PROGRESS` if a turn is running. |
| `POST /api/chat/conversations/:id/escalate` | owner | Body `{ reason: HandoffReason, summary? }`. User-initiated handoff without the model → ticket + status. |
| `POST /api/chat/conversations/:id/feedback` | owner | Body `{ messageId?, rating: -1 \| 1, comment? }`. |
| `POST /api/webhooks/n8n` | HMAC | Inbound events from n8n. |
| `GET /api/health` | none | `{ ok, db: 'up' \| 'down', version }`. |

Headers: `X-Visitor-Token` carries the visitor token on every `/chat` call.
`Authorization: Bearer <jwt>` is reserved for the end-user token (unused in MVP).
`X-Request-Id` is returned on every response.

Rate limits (env-tunable defaults): 20 messages/min per visitor, 60 requests/min per IP,
10 conversation creations/hour per visitor. Store: in-memory now, `@fastify/rate-limit`'s Redis
store when `REDIS_URL` is set (needed the day there is more than one API instance).

## 10. Streaming strategy

Server-Sent Events over a `POST` response. No WebSockets: the flow is one request, one answer,
and SSE survives every proxy and CDN that HTTP does.

Server: `reply.hijack()`, then on `reply.raw` write `200` with `Content-Type: text/event-stream`,
`Cache-Control: no-cache, no-transform`, `Connection: keep-alive`, `X-Accel-Buffering: no`.
Each frame is `id: <seq>\nevent: <name>\ndata: <json>\n\n`. A `: ping` comment every 15 s keeps
idle proxies from closing the stream during long tool calls.

| Event | Data | When |
|---|---|---|
| `message.accepted` | `{ userMessageId, assistantMessageId }` | user message persisted, turn started |
| `text.delta` | `{ delta }` | each model text chunk |
| `tool.start` | `{ toolCallId, name }` | executor begins a tool |
| `tool.end` | `{ toolCallId, name, ok, sources? }` | executor finished (no raw output) |
| `status.changed` | `{ status, ticketId? }` | conversation status changed during the turn |
| `message.completed` | `{ messageId, usage? }` | assistant message persisted; stream closes |
| `error` | `{ code, message }` | turn failed; stream closes |

Persistence order: the user message row is written before the OpenAI request; the assistant
message row is created with `status = 'streaming'` and empty content; on completion it is updated
with content, usage, latency and `status = 'complete'`; on failure `'failed'` with partial content
kept; on client abort `'cancelled'` with partial content kept.

Cancellation: the widget aborts the fetch; the server sees `request.raw.on('close')`, aborts the
provider stream via the shared `AbortSignal`, and finalises the row. One in-flight turn per
conversation is enforced by an in-process set (single instance in MVP; Redis `SET NX` later).

Client: `fetch` with `Accept: text/event-stream`, body read through `ReadableStream`, frames
parsed by `sse-parser.ts`. `EventSource` is not used because it cannot `POST` or send headers.

Deployment note: the API's container host or any reverse proxy in front of it must not buffer
responses (`proxy_buffering off` on nginx). Vercel is not in the API's path.

## 11. Authentication strategy

Two identities, both resolved server-side by the `auth` plugin into
`request.auth: AuthContext = { visitorId, userId: string | null, user: UserClaims | null }`.

**Visitor (always present on `/chat`).** The API mints the id. The token is a compact HMAC token:
`base64url(JSON{ vid, iat, exp }) + "." + base64url(HMAC-SHA256(VISITOR_TOKEN_SECRET, payload))`,
TTL `VISITOR_TOKEN_TTL_DAYS` (90). `POST /api/visitors/session` creates the `visitors` row and
returns the token; presenting a valid token refreshes `exp` and `last_seen_at`; an invalid or
expired token yields a new visitor (old conversations are simply no longer reachable, which is the
correct outcome for an anonymous identity). The widget stores it in `localStorage`. A client can
never choose or forge an id, which is what "do not trust frontend-generated user IDs" requires.

**User (future).** `UserAuthVerifier { verify(token): Promise<UserClaims | null> }` selected by
`USER_AUTH_PROVIDER`: `none` (MVP: always `null`) or `jwks` (verifies `Authorization: Bearer`
against `USER_AUTH_JWKS_URL`, `USER_AUTH_ISSUER`, `USER_AUTH_AUDIENCE` with `jose`). When a
verifier returns claims: upsert `users` by `external_id`, set `visitors.user_id` if unset, and
backfill `conversations.user_id` for that visitor's earlier conversations. That is the "associate
previous conversations with the authenticated account" requirement, done once at link time.

**Ownership.** A conversation is readable and writable when `conversation.visitor_id ===
auth.visitorId`, or when `auth.userId` is set and `conversation.user_id === auth.userId`.
Everything else is `404` (not `403`, to avoid confirming ids exist).

**Admin.** Not in MVP. The future admin panel authenticates separately (role claim from the same
verifier or a dedicated admin token) and never shares the widget's endpoints.

**What is explicitly not an identity:** THRONE's `useAuth()` demo user in `localStorage`. The
widget does not read it and the API has no field for it.

## 12. Human handoff flow

Triggers in the MVP:

- The model calls `request_human_support` (the prompt tells it to for: explicit requests,
  complaints, payment or security matters, self-exclusion or limit requests, anything it cannot
  answer from knowledge after searching, or after a tool failure it cannot recover from).
- The visitor presses "Talk to a human" → `POST …/escalate` (no model involved).

```
trigger
  → SupportService.escalate(conversation, reason, summary)
      → insert support_tickets (kind = 'handoff', status = 'open', delivery_status = 'pending')
      → conversations.status: ai_active → escalated; escalated = true; escalation_reason
      → insert unresolved_questions (reason = 'escalated')
      → n8n createSupportTicket(payload with last 30 messages)   [timeout 10 s, 1 retry]
      → delivery_status = delivered | failed
  → SSE status.changed { status: 'escalated', ticketId }
  → the model (or the escalate route) confirms to the user with the ticket id
```

State machine (`modules/conversations/status.ts`; an illegal transition throws
`INVALID_TRANSITION`):

| From | To | Who |
|---|---|---|
| `ai_active` | `escalated` | tool or escalate route |
| `escalated` | `human_active` | admin takeover (future) |
| `escalated`, `human_active` | `resolved` | inbound n8n `ticket.updated` or admin |
| `ai_active`, `resolved` | `closed` | visitor starts a new conversation |
| any except `closed` | `closed` | retention job after `CONVERSATION_RETENTION_DAYS` |
| `resolved` | `ai_active` | visitor sends a new message after resolution |

While `escalated`, the assistant keeps answering general questions; the runtime facts in the
prompt tell it a ticket is open so it does not open another and does not promise a reply time.
`human_active` implies a human is typing into the same conversation, which needs the admin panel;
until then the honest state after escalation is "recorded, a human will follow up", and that is
what the widget banner says. There is no support team yet; the architecture does not pretend
otherwise.

## 13. Security model

| Threat | Control |
|---|---|
| Forged visitor or conversation ids | Server-minted ids, HMAC visitor token, ownership check on every conversation route, 404 on mismatch |
| Secrets reaching the browser | Only `apps/api` reads secrets; the widget bundle has none; `VITE_*` carries only the API URL |
| Model calls a tool it should not | Registry allowlist; Zod validation; `requiresAuth`; ownership inside the tool; per-tool timeout; result size cap; max tool rounds |
| Prompt injection via knowledge or user text | Tool results are data, never instructions; the model cannot execute anything except registered tools; no tool moves money or changes account state in MVP |
| Abuse and cost | Rate limits per visitor and IP; 4000-char messages; 16 KB body limit; `max_output_tokens`; turn budget; token usage recorded per message |
| Injection into SQL | Drizzle parameterised queries only; no string-built SQL |
| Cross-origin misuse | `@fastify/cors` allowlist from `CORS_ORIGINS`; `@fastify/helmet` headers; no cookies, so no CSRF surface |
| Webhook forgery | HMAC-SHA256 with timestamp, ±5 min window, constant-time compare, idempotency key |
| Leaking internals | `AppError` safe messages; generic 500; request id for correlation; pino redaction; content logged at `debug` only |
| Supply chain | Lockfile committed; `pnpm audit` in CI; no dependency added without a reason in the PR |

Compliance controls live in the prompt (section 4.5) and in what tools exist: there is no tool
that deposits, withdraws, changes limits or contacts a self-excluded player, so the model cannot
do those things regardless of what it is asked.

## 14. Environment variables

Validated by `apps/api/src/config/env.ts` at startup; a missing required variable prints the full
list of problems and exits with code 1.

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `NODE_ENV` | yes | — | `development` \| `test` \| `production` |
| `PORT` | no | `3000` | API listen port |
| `LOG_LEVEL` | no | `info` | pino level |
| `APP_URL` | yes | — | THRONE site origin (used in links inside tickets) |
| `API_URL` | yes | — | public API origin |
| `CORS_ORIGINS` | yes | — | comma-separated allowlist |
| `DATABASE_URL` | yes | — | PostgreSQL connection string |
| `DATABASE_URL_TEST` | no | — | integration tests |
| `REDIS_URL` | no | — | when set: rate-limit store and turn lock |
| `OPENAI_API_KEY` | yes | — | |
| `OPENAI_MODEL` | yes | — | chat model; never hard-coded |
| `OPENAI_SUMMARY_MODEL` | no | `OPENAI_MODEL` | future summarisation |
| `OPENAI_VECTOR_STORE_ID` | when provider is `openai_vector_store` | — | |
| `KNOWLEDGE_PROVIDER` | no | `openai_vector_store` | `openai_vector_store` \| `none` |
| `KNOWLEDGE_MIN_SCORE` | no | `0.3` | drop weaker results |
| `N8N_BASE_URL` | yes | — | e.g. `https://n8n.example.com` |
| `N8N_WEBHOOK_SECRET` | yes | — | HMAC secret, both directions |
| `N8N_SUPPORT_TICKET_PATH` | no | `throne/support-ticket` | webhook path |
| `VISITOR_TOKEN_SECRET` | yes | — | ≥ 32 bytes |
| `VISITOR_TOKEN_TTL_DAYS` | no | `90` | |
| `USER_AUTH_PROVIDER` | no | `none` | `none` \| `jwks` |
| `USER_AUTH_JWKS_URL`, `USER_AUTH_ISSUER`, `USER_AUTH_AUDIENCE` | when `jwks` | — | |
| `RATE_LIMIT_MESSAGES_PER_MIN` | no | `20` | per visitor |
| `RATE_LIMIT_REQUESTS_PER_MIN` | no | `60` | per IP |
| `AI_MAX_TOOL_ROUNDS` | no | `5` | |
| `AI_REQUEST_TIMEOUT_MS` | no | `60000` | per provider call |
| `AI_TURN_BUDGET_MS` | no | `90000` | whole turn |
| `AI_MAX_OUTPUT_TOKENS` | no | `1024` | |
| `CONTEXT_RECENT_MESSAGES` | no | `20` | |
| `CONVERSATION_RETENTION_DAYS` | no | `180` | |

Web: `VITE_CHAT_API_URL` (the API origin). Each app ships its own `.env.example`; the existing
root `.env` moves to `apps/web/.env`.

## 15. Directory structure

```
throne_v1/
  package.json                 workspace root: dev/build/lint/test/typecheck scripts, pnpm
  pnpm-workspace.yaml          apps/* , packages/*
  tsconfig.base.json           strict, ES2022, bundler resolution; apps extend it
  eslint.config.js · .prettierrc
  .gitignore
  apps/
    web/                       the THRONE site, moved unchanged (+ two integration touches)
      src/ · public/ · scripts/prerender.mjs · index.html · vite.config.ts
      tailwind.config.js · postcss.config.js · vercel.json · tsconfig*.json · .env.example
    api/
      src/                     section 3.1
      drizzle.config.ts
      scripts/knowledge-sync.ts · scripts/support-redeliver.ts (Phase 7)
      Dockerfile · .env.example · vitest.config.ts
  packages/
    chat-widget/               section 2.1; vite library build; peerDependency vue
    shared/
      src/
        types/                 Conversation, Message, Ticket, AuthContext, SSE event union
        schemas/               Zod: message body, feedback, escalate, n8n payloads
        constants/             status enums, error codes, limits
  prompts/
    support-agent.md
  knowledge/
    README.md · site/ (generated) · manual/
  docs/
    architecture.md (this file) · api.md · tools.md   (api.md and tools.md written in Phase 2/5)
    README.md, frontend-backlog.md, … (existing, unchanged)
  marketing_strategy/ · crm_retention/ · tech_integrations/   (unchanged)
```

Vercel: the web project's **Root Directory** setting becomes `apps/web` (Vercel detects the pnpm
workspace from the root lockfile). This is a one-time dashboard change and must happen before the
monorepo branch is merged to `main`; until then production keeps building from `main` as today.

## 16. MVP implementation order

Each phase ends with a check that can be run, not a feeling.

**Phase 1 — Architecture (this document).** Check: this file exists and the founder has read it.

**Phase 2 — Foundation.**
1. Move the site to `apps/web`; add `pnpm-workspace.yaml`, root scripts, `tsconfig.base.json`,
   ESLint/Prettier. Check: `pnpm --filter @throne/web build` produces the same `dist/` (route documents,
   `shell.html`, `sitemap.xml`) as before the move; `pnpm --filter @throne/web dev` serves the site.
2. `packages/shared` with types, schemas, constants. Check: typecheck passes.
3. `apps/api` skeleton: env validation, logger, request id, error handler, security plugins,
   `GET /api/health`. Check: `curl /api/health` → `{ ok: true, db: 'up' }`; starting without
   `OPENAI_API_KEY` exits with a readable error.
4. Database: Homebrew PostgreSQL, Drizzle schema for all tables in section 8, first migration.
   Check: `pnpm --filter @throne/api db:migrate` on an empty database succeeds and is idempotent.
5. Visitor sessions and conversations: token, `POST /visitors/session`, conversation CRUD with
   ownership. Check: integration tests — foreign visitor gets 404; tampered token gets 401.

Status: complete (see docs/api.md for the endpoints that exist).

**Phase 3 — Basic chat.**
1. `LlmProvider` + OpenAI implementation, prompt loader, context builder, orchestrator without
   tools, SSE endpoint, message persistence. Check: unit test of the orchestrator with
   `FakeLlmProvider`; `curl -N` shows deltas; both messages are rows with usage and latency.
2. `packages/chat-widget`: client, parser, composable, UI states; mounted in THRONE `App.vue`;
   ContactView button opens it. Check: browser verification — send a message, watch it stream,
   reload, history returns, stop button cancels and the row is `cancelled`.

**Phase 4 — Knowledge.** `KnowledgeService`, vector store implementation, `knowledge/` folder,
export and sync scripts, `search_knowledge` tool wired through the executor. Check: a question
about rakeback returns an answer grounded in `knowledge/manual/rakeback-standing-order.md` and the
`tool_calls` row shows the query; a nonsense question yields an `unresolved_questions` row.

**Phase 5 — Tools.** Registry, executor with validation/auth/timeout/logging,
`request_human_support`, `create_support_ticket`, status state machine, `POST /escalate`, the
auth-gated stubs. Check: executor unit tests for unknown tool, malformed args, `AUTH_REQUIRED`,
timeout; asking for a human moves the conversation to `escalated` and the widget shows the banner.

**Phase 6 — n8n.** Client with signature, timeout, retry; `create_support_ticket` delivery;
inbound webhook with verification; `ticket.updated → resolved`. Check: against a local n8n or a
signed echo server, a ticket is `delivered` with `external_ref`; an unsigned inbound call is 401;
a stale timestamp is 401.

**Phase 7 — Hardening.** Rate limits per visitor/IP, Redis store when configured, turn lock,
`support-redeliver`, retention purge, token cost recording, log review, CI (`typecheck`, `lint`,
`test`, `pnpm audit`), `Dockerfile` and a documented deploy for the API. Check: CI green; load a
conversation with 50 messages and confirm the context window stays at 20; rate-limit test returns
429 with `RATE_LIMITED`.

Not started until all seven phases are done: summarisation job, admin panel, analytics views,
JWKS verifier, account tools with data, embed build.
