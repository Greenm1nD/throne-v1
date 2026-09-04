import { eq } from 'drizzle-orm'
import type { Db } from '../../db/client.js'
import { users, visitors } from '../../db/schema/index.js'

export class VisitorRepository {
  constructor(private readonly db: Db) {}

  async create(): Promise<{ id: string; userId: string | null }> {
    const [row] = await this.db.insert(visitors).values({}).returning()
    return { id: row!.id, userId: row!.userId }
  }

  async touch(id: string): Promise<{ id: string; userId: string | null } | null> {
    const [row] = await this.db
      .update(visitors).set({ lastSeenAt: new Date() }).where(eq(visitors.id, id)).returning()
    return row ? { id: row.id, userId: row.userId } : null
  }

  async findUser(id: string) {
    const [row] = await this.db.select().from(users).where(eq(users.id, id)).limit(1)
    return row ?? null
  }

  /**
   * `onConflictDoUpdate({ set: { email, displayName } })` only works when at
   * least one of the two is defined: Drizzle drops an `undefined`-valued key
   * from the generated SET clause, and with both absent that leaves
   * `DO UPDATE SET` with nothing after it — invalid SQL, not a no-op update.
   * Bare claims (no email, no display name) are a real case: linkUser is
   * called with whatever the verifier returns, and a JWKS provider is not
   * guaranteed to include either. Falling back to `DO NOTHING` and reading
   * the row back keeps this always returning a user id either way.
   */
  async upsertUser(externalId: string, email?: string, displayName?: string): Promise<string> {
    if (email === undefined && displayName === undefined) {
      const [inserted] = await this.db
        .insert(users).values({ externalId })
        .onConflictDoNothing({ target: users.externalId })
        .returning()
      if (inserted) return inserted.id
      const [existing] = await this.db.select({ id: users.id }).from(users).where(eq(users.externalId, externalId)).limit(1)
      return existing!.id
    }
    const [row] = await this.db
      .insert(users).values({ externalId, email, displayName })
      .onConflictDoUpdate({ target: users.externalId, set: { email, displayName } })
      .returning()
    return row!.id
  }

  async linkVisitorToUser(visitorId: string, userId: string): Promise<void> {
    await this.db.update(visitors).set({ userId }).where(eq(visitors.id, visitorId))
  }
}
