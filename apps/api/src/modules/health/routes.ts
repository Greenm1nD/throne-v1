import { sql } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'
import type { Db } from '../../db/client.js'

export function registerHealthRoutes(app: FastifyInstance, db: Db): void {
  app.get('/api/health', async (request) => {
    let database: 'up' | 'down' = 'up'
    try {
      await db.execute(sql`select 1`)
    } catch (error) {
      database = 'down'
      request.log.error({ err: error }, 'health: database unreachable')
    }
    return { ok: database === 'up', db: database, version: '0.1.0' }
  })
}
