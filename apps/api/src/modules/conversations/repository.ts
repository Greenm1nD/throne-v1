import { and, asc, eq, lt } from 'drizzle-orm'
import type { ConversationStatus } from '@throne/shared'
import type { Db } from '../../db/client.js'
import { conversations, messages } from '../../db/schema/index.js'

export type ConversationRow = typeof conversations.$inferSelect
export type MessageRow = typeof messages.$inferSelect

export class ConversationRepository {
  constructor(private readonly db: Db) {}

  async insert(values: {
    visitorId: string
    userId: string | null
    sessionId: string
    metadata: Record<string, unknown>
  }): Promise<ConversationRow> {
    const [row] = await this.db.insert(conversations).values(values).returning()
    return row!
  }

  async findById(id: string): Promise<ConversationRow | null> {
    const [row] = await this.db.select().from(conversations).where(eq(conversations.id, id)).limit(1)
    return row ?? null
  }

  async setStatus(id: string, status: ConversationStatus, patch: Partial<ConversationRow> = {}): Promise<ConversationRow> {
    const [row] = await this.db
      .update(conversations)
      .set({ ...patch, status, updatedAt: new Date(), ...(status === 'closed' ? { closedAt: new Date() } : {}) })
      .where(eq(conversations.id, id))
      .returning()
    return row!
  }

  async touchLastMessageAt(id: string, at: Date): Promise<void> {
    await this.db.update(conversations).set({ lastMessageAt: at, updatedAt: at }).where(eq(conversations.id, id))
  }

  /** Oldest first; `before` pages backwards by creation time. */
  async listMessages(conversationId: string, limit: number, before?: Date): Promise<MessageRow[]> {
    const where = before
      ? and(eq(messages.conversationId, conversationId), lt(messages.createdAt, before))
      : eq(messages.conversationId, conversationId)
    return this.db.select().from(messages).where(where).orderBy(asc(messages.createdAt)).limit(limit)
  }

  async findMessage(id: string): Promise<MessageRow | null> {
    const [row] = await this.db.select().from(messages).where(eq(messages.id, id)).limit(1)
    return row ?? null
  }

  async insertMessage(values: typeof messages.$inferInsert): Promise<MessageRow> {
    const [row] = await this.db.insert(messages).values(values).returning()
    return row!
  }

  async updateMessage(id: string, patch: Partial<typeof messages.$inferInsert>): Promise<MessageRow> {
    const [row] = await this.db.update(messages).set(patch).where(eq(messages.id, id)).returning()
    return row!
  }
}
