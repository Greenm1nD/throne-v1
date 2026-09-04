import type { FastifyInstance } from 'fastify'

export function registerHealthRoutes(app: FastifyInstance): void {
  app.get('/api/health', async () => ({ ok: true, version: '0.1.0' }))
}
