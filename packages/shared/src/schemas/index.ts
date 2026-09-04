import { z } from 'zod'
import { HANDOFF_REASON, LIMITS } from '../constants/index.js'

export const visitorSessionBody = z.object({
  // An empty token is exactly the mint case, not a validation failure: a client
  // that lost its token must be able to ask for a new one. min(1) would send it
  // a permanent 400 instead.
  visitorToken: z.string().optional(),
})

export const conversationMetadata = z.object({
  pageUrl: z.url().max(2048).optional(),
  locale: z.string().max(16).optional(),
  referrer: z.string().max(2048).optional(),
})

export const createConversationBody = z.object({
  sessionId: z.uuid().optional(),
  metadata: conversationMetadata.optional(),
})
export type CreateConversationBody = z.infer<typeof createConversationBody>

export const sendMessageBody = z.object({
  content: z.string().trim().min(1).max(LIMITS.MESSAGE_MAX_CHARS),
})
export type SendMessageBody = z.infer<typeof sendMessageBody>

export const escalateBody = z.object({
  reason: z.enum(HANDOFF_REASON),
  summary: z.string().trim().min(1).max(2000).optional(),
})
export type EscalateBody = z.infer<typeof escalateBody>

export const feedbackBody = z.object({
  messageId: z.uuid().optional(),
  rating: z.union([z.literal(-1), z.literal(1)]),
  comment: z.string().trim().max(2000).optional(),
})
export type FeedbackBody = z.infer<typeof feedbackBody>

export const listMessagesQuery = z.object({
  limit: z.coerce.number().int().min(1).max(LIMITS.HISTORY_PAGE_MAX).default(LIMITS.HISTORY_PAGE_DEFAULT),
  before: z.uuid().optional(),
})
export type ListMessagesQuery = z.infer<typeof listMessagesQuery>
