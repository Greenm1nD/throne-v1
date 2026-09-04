import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { AuthContext } from '@throne/shared'
import { buildContainer, type Container } from '../src/container.js'
import { ConversationRepository } from '../src/modules/conversations/repository.js'
import { ConversationService } from '../src/modules/conversations/service.js'
import { testEnv } from './helpers/app.js'
import { withTestDb } from './helpers/db.js'

/**
 * `ConversationService.transition` has no route yet (see the fix-round note
 * on service.ts), so these exercise it directly against the container rather
 * than through app.inject() — there is no HTTP surface to drive it through.
 */
let ctx: Awaited<ReturnType<typeof withTestDb>>
let container: Container
let repo: ConversationRepository
let authA: AuthContext
let authB: AuthContext

beforeEach(async () => {
  ctx = await withTestDb()
  container = buildContainer(testEnv(), ctx.db)
  repo = new ConversationRepository(ctx.db)
  const a = await container.visitors.startSession(undefined)
  const b = await container.visitors.startSession(undefined)
  authA = (await container.visitors.resolve(a.visitorToken))!
  authB = (await container.visitors.resolve(b.visitorToken))!
})

afterEach(async () => {
  await ctx.close()
})

describe('ConversationService.transition', () => {
  it('applies a legal transition, reading `from` from the row rather than trusting a caller-supplied value', async () => {
    const conv = await container.conversations.create(authA, {})
    const updated = await container.conversations.transition(authA, conv.id, 'escalated')
    expect(updated.status).toBe('escalated')
  })

  it('still throws INVALID_TRANSITION for an illegal move', async () => {
    const conv = await container.conversations.create(authA, {})
    await container.conversations.transition(authA, conv.id, 'escalated')
    // escalated -> ai_active is not in the allowed table (see status.ts).
    await expect(container.conversations.transition(authA, conv.id, 'ai_active'))
      .rejects.toMatchObject({ code: 'INVALID_TRANSITION', status: 409 })
  })

  it('is 404 on a conversation the caller does not own', async () => {
    const conv = await container.conversations.create(authA, {})
    await expect(container.conversations.transition(authB, conv.id, 'escalated'))
      .rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
    // Unchanged: the foreign attempt must not have applied.
    const row = await repo.findById(conv.id)
    expect(row!.status).toBe('ai_active')
  })

  it('does not silently apply when the row`s current status no longer matches the `from` the caller computed', async () => {
    const conv = await container.conversations.create(authA, {})
    // Advance the real status for real (ai_active -> escalated).
    await container.conversations.transition(authA, conv.id, 'escalated')

    // A stale `from` (still 'ai_active') must not silently apply, even
    // though 'ai_active' -> 'closed' is itself a legal transition in the
    // abstract — the WHERE status = from precondition is what catches this,
    // not the state machine, which never sees the stale value.
    const result = await repo.setStatus(conv.id, 'ai_active', 'closed')
    expect(result).toBeNull()

    const row = await repo.findById(conv.id)
    expect(row!.status).toBe('escalated') // unchanged by the stale attempt
  })

  it('maps a stale-`from` no-match to a thrown 409 through the service, not a silently-applied write', async () => {
    // Drives the exact branch the fix adds to ConversationService.transition:
    // when repo.setStatus reports no match (a `null`, standing in for a
    // repository whose precondition lost a race), the service must throw a
    // conflict rather than the pre-fix `return row!`, which turned a
    // `undefined` row into a value typed as ConversationRow.
    const conv = await container.conversations.create(authA, {})
    const racedRepo = {
      findById: repo.findById.bind(repo),
      setStatus: async () => null,
    } as unknown as ConversationRepository
    const racedService = new ConversationService(racedRepo)
    await expect(racedService.transition(authA, conv.id, 'escalated'))
      .rejects.toMatchObject({ code: 'INVALID_TRANSITION', status: 409 })

    // And the real repository confirms nothing actually changed.
    const row = await repo.findById(conv.id)
    expect(row!.status).toBe('ai_active')
  })
})
