import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const knowledgeDocuments = pgTable('knowledge_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  path: text('path').notNull().unique(),
  title: text('title').notNull(),
  sourceUrl: text('source_url'),
  contentHash: text('content_hash').notNull(),
  provider: text('provider').notNull(),
  providerFileId: text('provider_file_id'),
  syncedAt: timestamp('synced_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
