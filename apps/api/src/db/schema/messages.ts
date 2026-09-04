import { index, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { conversations } from './conversations.js'
import { messageRole, messageStatus } from './enums.js'

export interface TokenUsage { input: number; output: number; total: number }

export const messages = pgTable(
  'messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
    role: messageRole('role').notNull(),
    content: text('content').notNull().default(''),
    model: text('model'),
    providerResponseId: text('provider_response_id'),
    tokenUsage: jsonb('token_usage').$type<TokenUsage>(),
    latencyMs: integer('latency_ms'),
    status: messageStatus('status').notNull().default('complete'),
    errorCode: text('error_code'),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  // Replaces the old (conversation_id, created_at) index rather than sitting
  // alongside it: `defaultNow()` compiles to Postgres `now()` (transaction
  // timestamp), so every row written in one transaction shares a created_at,
  // and created_at alone cannot order or page between them. This composite
  // index is what the keyset cursor in ConversationRepository.listMessages
  // actually needs to stay an index scan, and its (conversation_id,
  // created_at) prefix already serves every query the old 2-column index did
  // — there is nothing left for that index to do that this one doesn't.
  (t) => [index('messages_conversation_created_id_idx').on(t.conversationId, t.createdAt, t.id)],
)
