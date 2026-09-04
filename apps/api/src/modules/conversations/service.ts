import { randomUUID } from 'node:crypto'
import type {
  AuthContext, ConversationDto, ConversationStatus, CreateConversationBody, ListMessagesQuery, MessageDto, VisibleMessageRole,
} from '@throne/shared'
import { ERROR_CODE } from '@throne/shared'
import { conflict, notFound } from '../../lib/errors.js'
import type { ConversationRepository, ConversationRow, ConversationStatusPatch, MessageCursor, MessageRow } from './repository.js'
import { assertTransition } from './status.js'

export class ConversationService {
  constructor(private readonly repo: ConversationRepository) {}

  async create(auth: AuthContext, body: CreateConversationBody): Promise<ConversationDto> {
    const row = await this.repo.insert({
      visitorId: auth.visitorId,
      userId: auth.userId,
      sessionId: body.sessionId ?? randomUUID(),
      metadata: body.metadata ?? {},
    })
    return this.toDto(row)
  }

  /**
   * Ownership is the only access rule. A conversation the caller does not own
   * is reported as missing, so ids cannot be probed for existence.
   */
  async getOwned(auth: AuthContext, id: string): Promise<ConversationRow> {
    const row = await this.repo.findById(id)
    if (!row) throw notFound('Conversation not found')
    const ownedByVisitor = row.visitorId === auth.visitorId
    const ownedByUser = auth.userId !== null && row.userId === auth.userId
    if (!ownedByVisitor && !ownedByUser) throw notFound('Conversation not found')
    return row
  }

  async listMessages(auth: AuthContext, id: string, query: ListMessagesQuery): Promise<MessageDto[]> {
    await this.getOwned(auth, id)
    let cursor: MessageCursor | undefined
    if (query.before) {
      // Scoped to this conversation (see repository.findMessage): an unowned
      // or nonexistent cursor must be indistinguishable, for the same reason
      // an unowned conversation is 404 and not 403 — so this always throws
      // notFound() rather than silently falling back to "no cursor".
      const row = await this.repo.findMessage(id, query.before)
      if (!row) throw notFound('Message not found')
      // Both fields travel together: created_at alone is not a total order
      // when rows share a transaction timestamp (see repository.listMessages).
      cursor = { createdAt: row.createdAt, id: row.id }
    }
    const rows = await this.repo.listMessages(id, query.limit, cursor)
    return rows.map((r) => this.toMessageDto(r))
  }

  /**
   * Takes `auth` first like every sibling mutator and enforces ownership via
   * `getOwned` — `transition` has no caller yet, but an unauthenticated
   * signature here would invite the next phase to wire one up without an
   * ownership check.
   *
   * `from` is read from the row `getOwned` returns, never supplied by the
   * caller: trusting a caller-supplied `from` would let a stale or forged
   * value bypass the state machine. The same value is passed to
   * `repo.setStatus` as a `WHERE status = from` precondition, so two
   * concurrent transitions starting from the same observed status cannot
   * both succeed — the second's `UPDATE` matches zero rows once the first
   * has moved the status away from `from`.
   */
  async transition(auth: AuthContext, id: string, to: ConversationStatus, patch: ConversationStatusPatch = {}): Promise<ConversationRow> {
    const row = await this.getOwned(auth, id)
    const from = row.status
    assertTransition(from, to)
    const updated = await this.repo.setStatus(id, from, to, patch)
    if (!updated) {
      // The row existed a moment ago (getOwned just read it) and this module
      // never deletes conversations, so an empty result here means the
      // status predicate no longer matched: another request moved it away
      // from `from` between the read and this update. A 409, not a 404 —
      // the conversation is not missing, the precondition this transition
      // was computed from is stale.
      throw conflict(ERROR_CODE.INVALID_TRANSITION, `Conversation status changed before the transition from ${from} to ${to} could apply`)
    }
    return updated
  }

  toDto(row: ConversationRow): ConversationDto {
    return {
      id: row.id,
      status: row.status,
      escalated: row.escalated,
      openTicketId: null, // filled in Phase 5 when tickets exist
      createdAt: row.createdAt.toISOString(),
      lastMessageAt: row.lastMessageAt?.toISOString() ?? null,
    }
  }

  toMessageDto(row: MessageRow): MessageDto {
    return {
      id: row.id,
      // Safe only because the repository's SQL filter already narrowed to
      // VISIBLE_MESSAGE_ROLES — this cast and that filter now derive from
      // the same shared tuple (VisibleMessageRole), so they cannot drift.
      role: row.role as VisibleMessageRole,
      content: row.content,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    }
  }
}
