import { ERROR_CODE, type ConversationStatus } from '@throne/shared'
import { conflict } from '../../lib/errors.js'

/**
 * The transitions in docs/architecture.md section 12. `closed` is terminal:
 * a visitor who writes again starts a new conversation.
 * The retention job closes any non-closed conversation, which every row here allows.
 */
const ALLOWED: Record<ConversationStatus, readonly ConversationStatus[]> = {
  ai_active: ['escalated', 'closed'],
  escalated: ['human_active', 'resolved', 'closed'],
  human_active: ['resolved', 'closed'],
  resolved: ['ai_active', 'closed'],
  closed: [],
}

export function canTransition(from: ConversationStatus, to: ConversationStatus): boolean {
  return from === to || ALLOWED[from].includes(to)
}

export function assertTransition(from: ConversationStatus, to: ConversationStatus): void {
  if (!canTransition(from, to)) {
    throw conflict(ERROR_CODE.INVALID_TRANSITION, `Cannot move a conversation from ${from} to ${to}`)
  }
}
