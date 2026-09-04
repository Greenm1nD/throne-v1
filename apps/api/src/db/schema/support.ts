import { index, integer, pgTable, smallint, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { conversations } from './conversations.js'
import { deliveryStatus, ticketKind, ticketStatus, unresolvedReason } from './enums.js'
import { messages } from './messages.js'
import { users, visitors } from './visitors.js'

export const supportTickets = pgTable(
  'support_tickets',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
    visitorId: uuid('visitor_id').notNull().references(() => visitors.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    kind: ticketKind('kind').notNull(),
    category: text('category').notNull(),
    subject: text('subject').notNull(),
    details: text('details').notNull(),
    reason: text('reason'),
    status: ticketStatus('status').notNull().default('open'),
    deliveryStatus: deliveryStatus('delivery_status').notNull().default('pending'),
    deliveryAttempts: integer('delivery_attempts').notNull().default(0),
    externalRef: text('external_ref'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  },
  (t) => [
    index('support_tickets_conversation_idx').on(t.conversationId),
    index('support_tickets_status_idx').on(t.status),
  ],
)

export const feedback = pgTable('feedback', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id').references(() => messages.id, { onDelete: 'cascade' }),
  rating: smallint('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const unresolvedQuestions = pgTable('unresolved_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id').references(() => messages.id, { onDelete: 'set null' }),
  question: text('question').notNull(),
  reason: unresolvedReason('reason').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
