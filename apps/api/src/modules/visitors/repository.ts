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

  async upsertUser(externalId: string, email?: string, displayName?: string): Promise<string> {
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
