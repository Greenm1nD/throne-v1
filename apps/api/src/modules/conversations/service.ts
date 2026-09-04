import { randomUUID } from 'node:crypto'
import type {
  AuthContext, ConversationDto, ConversationStatus, CreateConversationBody, ListMessagesQuery, MessageDto,
} from '@throne/shared'
import { notFound } from '../../lib/errors.js'
import type { ConversationRepository, ConversationRow, ConversationStatusPatch, MessageRow } from './repository.js'
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
    let before: Date | undefined
    if (query.before) {
      // Scoped to this conversation (see repository.findMessage): an unowned
      // or nonexistent cursor must be indistinguishable, for the same reason
      // an unowned conversation is 404 and not 403 — so this always throws
      // notFound() rather than silently falling back to "no cursor".
      const cursor = await this.repo.findMessage(id, query.before)
      if (!cursor) throw notFound('Message not found')
      before = cursor.createdAt
    }
    const rows = await this.repo.listMessages(id, query.limit, before)
    return rows.map((r) => this.toMessageDto(r))
  }

  async transition(id: string, from: ConversationStatus, to: ConversationStatus, patch: ConversationStatusPatch = {}): Promise<ConversationRow> {
    assertTransition(from, to)
    return this.repo.setStatus(id, to, patch)
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
      role: row.role as 'user' | 'assistant',
      content: row.content,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    }
  }
}
