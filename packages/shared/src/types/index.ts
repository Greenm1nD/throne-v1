import type { ConversationStatus, ErrorCode, MessageStatus } from '../constants/index.js'

export interface UserClaims {
  externalId: string
  email?: string
  displayName?: string
}

/** Resolved server-side for every request; never built from client-supplied ids. */
export interface AuthContext {
  visitorId: string
  userId: string | null
  user: UserClaims | null
}

export interface ApiErrorBody {
  error: { code: ErrorCode; message: string; requestId: string }
}

export interface VisitorSessionResponse {
  visitorToken: string
  visitorId: string
  expiresAt: string
}

export interface ConversationDto {
  id: string
  status: ConversationStatus
  escalated: boolean
  openTicketId: string | null
  createdAt: string
  lastMessageAt: string | null
}

export interface MessageDto {
  id: string
  role: 'user' | 'assistant'
  content: string
  status: MessageStatus
  createdAt: string
}

export type SseEvent =
  | { event: 'message.accepted'; data: { userMessageId: string; assistantMessageId: string } }
  | { event: 'text.delta'; data: { delta: string } }
  | { event: 'tool.start'; data: { toolCallId: string; name: string } }
  | { event: 'tool.end'; data: { toolCallId: string; name: string; ok: boolean; sources?: { title: string; url?: string }[] } }
  | { event: 'status.changed'; data: { status: ConversationStatus; ticketId?: string } }
  | { event: 'message.completed'; data: { messageId: string; usage?: { input: number; output: number; total: number } } }
  | { event: 'error'; data: { code: ErrorCode; message: string } }
