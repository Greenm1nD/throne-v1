import { and, asc, eq, inArray, sql } from 'drizzle-orm'
import { VISIBLE_MESSAGE_ROLES, type ConversationStatus } from '@throne/shared'
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

/**
 * The pagination cursor is the pair, not just the timestamp: `created_at`
 * alone is not a total order because `defaultNow()` compiles to Postgres
 * `now()` (`transaction_timestamp()`), so every row written inside one
 * transaction — e.g. a user message and its assistant placeholder in Phase 3
 * — shares an identical `created_at`. `id` breaks the tie.
 */
export interface MessageCursor {
  createdAt: Date
  id: string
}

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

  /**
   * `from` is a precondition, not just a label: the `WHERE status = from`
   * clause makes this a compare-and-swap, so two concurrent calls starting
   * from the same observed status cannot both succeed — the loser's `UPDATE`
   * matches zero rows and this returns `null` rather than silently applying
   * a transition the caller's `from` no longer describes. The caller
   * (ConversationService.transition) is responsible for turning a `null`
   * into the right response; this layer only enforces the precondition.
   */
  async setStatus(id: string, from: ConversationStatus, to: ConversationStatus, patch: ConversationStatusPatch = {}): Promise<ConversationRow | null> {
    const [row] = await this.db
      .update(conversations)
      .set({
        ...patch,
        status: to,
        updatedAt: new Date(),
        // The machine allows closed -> closed as a no-op (see status.ts), so a
        // second close must not stamp over the original closedAt.
        ...(to === 'closed' ? { closedAt: sql`coalesce(${conversations.closedAt}, now())` } : {}),
      })
      .where(and(eq(conversations.id, id), eq(conversations.status, from)))
      .returning()
    return row ?? null
  }

  async touchLastMessageAt(id: string, at: Date): Promise<void> {
    await this.db.update(conversations).set({ lastMessageAt: at, updatedAt: at }).where(eq(conversations.id, id))
  }

  /**
   * Rows are always oldest-first (`ORDER BY created_at ASC, id ASC`), and
   * only user/assistant roles are ever returned — the SQL filter, not a JS
   * `.filter()` afterward, so `LIMIT` counts only rows a caller can see.
   * `cursor` filters to messages strictly before the given (created_at, id)
   * pair using a row-value comparison, which — combined with the matching
   * ascending order — pages forward from the start of the conversation, not
   * backward from the end: the first page is already the oldest `limit`
   * messages, and a cursor set to that page's own oldest row returns nothing.
   * A long conversation's most recent tail is not reachable through this
   * cursor shape; redesigning it is Phase 3's decision, not this task's.
   *
   * The pair, not just `created_at`, is required: rows written in the same
   * transaction (Phase 3's user message + assistant placeholder) share a
   * `created_at`, so `created_at` alone cannot total-order or page between
   * them — `id` breaks the tie, matching the composite index on
   * (conversation_id, created_at, id).
   */
  async listMessages(conversationId: string, limit: number, cursor?: MessageCursor): Promise<MessageRow[]> {
    const conditions = [eq(messages.conversationId, conversationId), inArray(messages.role, VISIBLE_MESSAGE_ROLES)]
    if (cursor) conditions.push(sql`(${messages.createdAt}, ${messages.id}) < (${cursor.createdAt}, ${cursor.id})`)
    return this.db
      .select()
      .from(messages)
      .where(and(...conditions))
      .orderBy(asc(messages.createdAt), asc(messages.id))
      .limit(limit)
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
