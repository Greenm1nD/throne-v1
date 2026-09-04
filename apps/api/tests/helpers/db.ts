import { sql } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { createDb, type Db } from '../../src/db/client.js'

const url = process.env.DATABASE_URL_TEST ?? 'postgres://localhost:5432/throne_chat_test'

export async function withTestDb(): Promise<{ db: Db; close: () => Promise<void> }> {
  const { db, pool } = createDb(url)
  await migrate(db, { migrationsFolder: 'src/db/migrations' })
  await truncateAll(db)
  return { db, close: () => pool.end() }
}

/** Order does not matter: CASCADE handles the graph. */
export async function truncateAll(db: Db): Promise<void> {
  await db.execute(sql`
    truncate table feedback, unresolved_questions, tool_calls, support_tickets,
                   messages, conversations, visitors, users, knowledge_documents
    restart identity cascade
  `)
}
