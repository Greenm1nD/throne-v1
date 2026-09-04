import type { FastifyInstance } from 'fastify'
import { visitorSessionBody } from '@throne/shared'
import { parse } from '../../lib/validate.js'
import type { VisitorService } from './service.js'

export function registerVisitorRoutes(app: FastifyInstance, service: VisitorService): void {
  app.post('/api/visitors/session', async (request) => {
    const body = parse(visitorSessionBody, request.body ?? {})
    return service.startSession(body.visitorToken)
  })
}
