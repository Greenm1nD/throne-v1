import { eq } from 'drizzle-orm'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { conversations, messages, visitors } from '../src/db/schema/index.js'
import { withTestDb } from './helpers/db.js'

let ctx: Awaited<ReturnType<typeof withTestDb>>
beforeAll(async () => { ctx = await withTestDb() })
afterAll(async () => { await ctx.close() })

describe('schema', () => {
  it('defaults a new conversation to ai_active and not escalated', async () => {
    const [visitor] = await ctx.db.insert(visitors).values({}).returning()
    const [conversation] = await ctx.db
      .insert(conversations).values({ visitorId: visitor!.id, sessionId: 'session-1' }).returning()
    expect(conversation!.status).toBe('ai_active')
    expect(conversation!.escalated).toBe(false)
    expect(conversation!.importantContext).toEqual([])
    expect(conversation!.lastMessageAt).toBeNull()
  })

  it('cascades messages when a conversation is deleted', async () => {
    const [visitor] = await ctx.db.insert(visitors).values({}).returning()
    const [conversation] = await ctx.db
      .insert(conversations).values({ visitorId: visitor!.id, sessionId: 'session-2' }).returning()
    await ctx.db.insert(messages).values({ conversationId: conversation!.id, role: 'user', content: 'hello' })
    await ctx.db.delete(conversations).where(eq(conversations.id, conversation!.id))
    const left = await ctx.db.select().from(messages).where(eq(messages.conversationId, conversation!.id))
    expect(left).toHaveLength(0)
  })

  it('rejects an unknown status value', async () => {
    const [visitor] = await ctx.db.insert(visitors).values({}).returning()
    await expect(
      ctx.db.insert(conversations).values({
        visitorId: visitor!.id, sessionId: 'session-3',
        status: 'gone_fishing' as never,
      }),
    ).rejects.toThrow()
  })
})
