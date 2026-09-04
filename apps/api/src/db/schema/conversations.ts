import { boolean, index, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { conversationStatus } from './enums.js'
import { users, visitors } from './visitors.js'

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    visitorId: uuid('visitor_id').notNull().references(() => visitors.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    sessionId: text('session_id').notNull(),
    status: conversationStatus('status').notNull().default('ai_active'),
    escalated: boolean('escalated').notNull().default(false),
    escalationReason: text('escalation_reason'),
    summary: text('summary'),
    summaryThroughMessageId: uuid('summary_through_message_id'),
    importantContext: jsonb('important_context').$type<string[]>().notNull().default([]),
    metadata: jsonb('metadata').$type<Record<string, unknown>>().notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    lastMessageAt: timestamp('last_message_at', { withTimezone: true }),
    closedAt: timestamp('closed_at', { withTimezone: true }),
  },
  (t) => [
    index('conversations_visitor_created_idx').on(t.visitorId, t.createdAt.desc()),
    index('conversations_status_idx').on(t.status),
  ],
)
