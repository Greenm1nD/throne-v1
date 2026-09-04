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
  (t) => [index('messages_conversation_created_idx').on(t.conversationId, t.createdAt)],
)
