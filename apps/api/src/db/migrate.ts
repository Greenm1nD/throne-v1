import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { createDb } from './client.js'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is required to run migrations')
  process.exit(1)
}

const { db, pool } = createDb(url)
await migrate(db, { migrationsFolder: 'src/db/migrations' })
await pool.end()
console.log('migrations applied')
