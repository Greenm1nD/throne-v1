import { pgEnum } from 'drizzle-orm/pg-core'
import {
  CONVERSATION_STATUS, DELIVERY_STATUS, MESSAGE_ROLE, MESSAGE_STATUS,
  TICKET_KIND, TICKET_STATUS, TOOL_CALL_STATUS, UNRESOLVED_REASON,
} from '@throne/shared'

// Every enum is generated from the shared tuple, so the database and the API
// can never drift on a status value.
export const conversationStatus = pgEnum('conversation_status', CONVERSATION_STATUS)
export const messageRole = pgEnum('message_role', MESSAGE_ROLE)
export const messageStatus = pgEnum('message_status', MESSAGE_STATUS)
export const toolCallStatus = pgEnum('tool_call_status', TOOL_CALL_STATUS)
export const ticketKind = pgEnum('ticket_kind', TICKET_KIND)
export const ticketStatus = pgEnum('ticket_status', TICKET_STATUS)
export const deliveryStatus = pgEnum('delivery_status', DELIVERY_STATUS)
export const unresolvedReason = pgEnum('unresolved_reason', UNRESOLVED_REASON)
