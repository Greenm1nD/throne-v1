export const CONVERSATION_STATUS = ['ai_active', 'escalated', 'human_active', 'resolved', 'closed'] as const
export type ConversationStatus = (typeof CONVERSATION_STATUS)[number]

export const MESSAGE_ROLE = ['user', 'assistant', 'system', 'tool'] as const
export type MessageRole = (typeof MESSAGE_ROLE)[number]

/**
 * The single source for "which roles a visitor or end user is ever shown" —
 * `ConversationRepository.listMessages` filters to exactly this tuple in
 * SQL, and `MessageDto['role']` is derived from it below, so the two can
 * never drift apart the way a hand-typed literal union and a hand-typed SQL
 * filter tuple could.
 */
export const VISIBLE_MESSAGE_ROLES = ['user', 'assistant'] as const
export type VisibleMessageRole = (typeof VISIBLE_MESSAGE_ROLES)[number]

export const MESSAGE_STATUS = ['complete', 'streaming', 'failed', 'cancelled'] as const
export type MessageStatus = (typeof MESSAGE_STATUS)[number]

export const TOOL_CALL_STATUS = ['pending', 'success', 'error', 'rejected'] as const
export type ToolCallStatus = (typeof TOOL_CALL_STATUS)[number]

export const TICKET_KIND = ['handoff', 'ticket'] as const
export type TicketKind = (typeof TICKET_KIND)[number]

export const TICKET_STATUS = ['open', 'in_progress', 'resolved', 'closed'] as const
export type TicketStatus = (typeof TICKET_STATUS)[number]

export const DELIVERY_STATUS = ['pending', 'delivered', 'failed'] as const
export type DeliveryStatus = (typeof DELIVERY_STATUS)[number]

export const UNRESOLVED_REASON = ['no_knowledge', 'escalated', 'low_confidence'] as const
export type UnresolvedReason = (typeof UNRESOLVED_REASON)[number]

export const HANDOFF_REASON = [
  'user_request', 'complaint', 'payment', 'security', 'account', 'self_exclusion', 'unable_to_answer', 'tool_failure',
] as const
export type HandoffReason = (typeof HANDOFF_REASON)[number]

export const TICKET_CATEGORY = ['wallet_payments', 'bonuses_rewards', 'account_verification', 'technical', 'other'] as const
export type TicketCategory = (typeof TICKET_CATEGORY)[number]

export const ERROR_CODE = {
  VALIDATION: 'VALIDATION',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  FORBIDDEN: 'FORBIDDEN',
  RATE_LIMITED: 'RATE_LIMITED',
  TURN_IN_PROGRESS: 'TURN_IN_PROGRESS',
  INVALID_TRANSITION: 'INVALID_TRANSITION',
  AI_UNAVAILABLE: 'AI_UNAVAILABLE',
  AI_TIMEOUT: 'AI_TIMEOUT',
  TOOL_FAILED: 'TOOL_FAILED',
  N8N_UNAVAILABLE: 'N8N_UNAVAILABLE',
  INTERNAL: 'INTERNAL',
} as const
export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]

export const LIMITS = {
  MESSAGE_MAX_CHARS: 4000,
  BODY_LIMIT_BYTES: 16 * 1024,
  HISTORY_PAGE_DEFAULT: 50,
  HISTORY_PAGE_MAX: 100,
} as const
