import { pgEnum } from 'drizzle-orm/pg-core'
import {
  CONVERSATION_STATUS, DELIVERY_STATUS, MESSAGE_ROLE, MESSAGE_STATUS,
  TICKET_KIND, TICKET_STATUS, TOOL_CALL_STATUS, UNRESOLVED_REASON,
} from '@throne/shared'

// Every pgEnum below is generated from a shared tuple, so the database and
// the API can never drift on that value. That does not cover every status
// tuple in packages/shared, though: TICKET_CATEGORY (support_tickets.category)
// and HANDOFF_REASON (support_tickets.reason) are deliberately plain `text`
// columns in docs/architecture.md section 8's schema, not pgEnums here.
// Both are validated only at the application layer — Zod, e.g. escalateBody's
// `z.enum(HANDOFF_REASON)` — never by a database constraint. Unlike the
// statuses above, these values are never branched on in SQL (no `WHERE
// category = ...`, no state machine keyed on them); a `text` column with
// Zod-side validation avoids a migration every time a category or reason is
// added, at the cost of the database itself not rejecting an invalid value
// written outside this API.
export const conversationStatus = pgEnum('conversation_status', CONVERSATION_STATUS)
export const messageRole = pgEnum('message_role', MESSAGE_ROLE)
export const messageStatus = pgEnum('message_status', MESSAGE_STATUS)
export const toolCallStatus = pgEnum('tool_call_status', TOOL_CALL_STATUS)
export const ticketKind = pgEnum('ticket_kind', TICKET_KIND)
export const ticketStatus = pgEnum('ticket_status', TICKET_STATUS)
export const deliveryStatus = pgEnum('delivery_status', DELIVERY_STATUS)
export const unresolvedReason = pgEnum('unresolved_reason', UNRESOLVED_REASON)
