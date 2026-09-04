import { index, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { conversations } from './conversations.js'
import { toolCallStatus } from './enums.js'
import { messages } from './messages.js'

export const toolCalls = pgTable(
  'tool_calls',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
    messageId: uuid('message_id').references(() => messages.id, { onDelete: 'set null' }),
    providerCallId: text('provider_call_id').notNull(),
    toolName: text('tool_name').notNull(),
    input: jsonb('input').$type<unknown>().notNull(),
    output: jsonb('output').$type<unknown>(),
    status: toolCallStatus('status').notNull().default('pending'),
    error: text('error'),
    durationMs: integer('duration_ms'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('tool_calls_conversation_created_idx').on(t.conversationId, t.createdAt),
    index('tool_calls_name_idx').on(t.toolName),
  ],
)
