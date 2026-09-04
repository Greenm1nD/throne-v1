import { eq } from 'drizzle-orm'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { VisitorRepository } from '../src/modules/visitors/repository.js'
import { users } from '../src/db/schema/index.js'
import { withTestDb } from './helpers/db.js'

let ctx: Awaited<ReturnType<typeof withTestDb>>
let repo: VisitorRepository

beforeEach(async () => {
  ctx = await withTestDb()
  repo = new VisitorRepository(ctx.db)
})
afterEach(async () => {
  await ctx.close()
})

describe('VisitorRepository.upsertUser', () => {
  it('creates then updates a user when email and displayName are given', async () => {
    const id1 = await repo.upsertUser('ext-with-claims', 'a@example.com', 'Alice')
    const id2 = await repo.upsertUser('ext-with-claims', 'a2@example.com', 'Alice Two')
    expect(id2).toBe(id1)

    const [row] = await ctx.db.select().from(users).where(eq(users.id, id1))
    expect(row).toMatchObject({ email: 'a2@example.com', displayName: 'Alice Two' })
  })

  it('does not emit invalid SQL and returns the same id when called twice with bare claims', async () => {
    // Both email and displayName absent: onConflictDoUpdate's SET clause
    // would otherwise have nothing in it on the second call. The conflict
    // path (second call, row already exists) is exactly what the fix
    // targets — DO NOTHING plus a read-back must still resolve to the same id.
    const id1 = await repo.upsertUser('ext-bare-claims')
    const id2 = await repo.upsertUser('ext-bare-claims')
    expect(id2).toBe(id1)

    const [row] = await ctx.db.select().from(users).where(eq(users.id, id1))
    expect(row).toMatchObject({ externalId: 'ext-bare-claims', email: null, displayName: null })
  })
})
