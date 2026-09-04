import { and, asc, eq, inArray, lt, sql } from 'drizzle-orm'
import type { ConversationStatus } from '@throne/shared'
import type { Db } from '../../db/client.js'
import { conversations, messages } from '../../db/schema/index.js'

export type ConversationRow = typeof conversations.$inferSelect
export type MessageRow = typeof messages.$inferSelect

/**
 * The only fields a status change legitimately touches. Deliberately narrower
 * than `Partial<ConversationRow>`: that wider type would also admit `id`,
 * `visitorId`, `userId` and `createdAt` — and `visitorId` is the single field
 * the entire ownership check in ConversationService.getOwned hangs on, so a
 * patch that could silently re-parent a conversation to another visitor is a
 * footgun aimed exactly at the authorization boundary.
 */
export interface ConversationStatusPatch {
  escalated?: boolean
  escalationReason?: string | null
  summary?: string | null
}

/** Only these roles are ever shown to a visitor or end user. */
const VISIBLE_MESSAGE_ROLES = ['user', 'assistant'] as const

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

  async setStatus(id: string, status: ConversationStatus, patch: ConversationStatusPatch = {}): Promise<ConversationRow> {
    const [row] = await this.db
      .update(conversations)
      .set({
        ...patch,
        status,
        updatedAt: new Date(),
        // The machine allows closed -> closed as a no-op (see status.ts), so a
        // second close must not stamp over the original closedAt.
        ...(status === 'closed' ? { closedAt: sql`coalesce(${conversations.closedAt}, now())` } : {}),
      })
      .where(eq(conversations.id, id))
      .returning()
    return row!
  }

  async touchLastMessageAt(id: string, at: Date): Promise<void> {
    await this.db.update(conversations).set({ lastMessageAt: at, updatedAt: at }).where(eq(conversations.id, id))
  }

  /**
   * Rows are always oldest-first (`ORDER BY created_at ASC`), and only
   * user/assistant roles are ever returned — the SQL filter, not a JS
   * `.filter()` afterward, so `LIMIT` counts only rows a caller can see.
   * `before` filters to messages created strictly earlier than the given
   * timestamp, which — combined with ascending order — pages forward from the
   * start of the conversation, not backward from the end: the first page is
   * already the oldest `limit` messages, and a `before` cursor set to that
   * page's own oldest timestamp returns nothing. A long conversation's most
   * recent tail is not reachable through this cursor shape; redesigning it is
   * Phase 3's decision, not this task's.
   */
  async listMessages(conversationId: string, limit: number, before?: Date): Promise<MessageRow[]> {
    const conditions = [eq(messages.conversationId, conversationId), inArray(messages.role, VISIBLE_MESSAGE_ROLES)]
    if (before) conditions.push(lt(messages.createdAt, before))
    return this.db.select().from(messages).where(and(...conditions)).orderBy(asc(messages.createdAt)).limit(limit)
  }

  /**
   * Scoped to the conversation, not a bare id lookup: a `before` cursor is
   * client-supplied, and resolving it against any message in the database
   * (regardless of which conversation it belongs to) would let a caller who
   * owns conversation A pass a message id from conversation B and have B's
   * `created_at` become the cutoff for their own page — the only place in
   * this module where a client-supplied id could cross an ownership boundary.
   */
  async findMessage(conversationId: string, id: string): Promise<MessageRow | null> {
    const [row] = await this.db
      .select()
      .from(messages)
      .where(and(eq(messages.id, id), eq(messages.conversationId, conversationId)))
      .limit(1)
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
