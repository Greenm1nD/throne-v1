import type { FastifyInstance } from 'fastify'
import { visitorSessionBody } from '@throne/shared'
import { parse } from '../../lib/validate.js'
import type { VisitorService } from './service.js'

export function registerVisitorRoutes(app: FastifyInstance, service: VisitorService): void {
  app.post('/api/visitors/session', async (request) => {
    const body = parse(visitorSessionBody, request.body ?? {})
    // The auth hook has already resolved a token from the X-Visitor-Token
    // header on this same request — the only credential source every other
    // /api/chat/* endpoint reads. A client that sends its token by header,
    // as it does everywhere else, must not silently lose its visitor
    // identity (and every conversation tied to it) to a freshly-minted one
    // just because this one endpoint only looked at the body. The body wins
    // when present — that is the documented contract in docs/api.md — the
    // header is a fallback, never an override.
    const header = request.headers['x-visitor-token']
    const headerToken = Array.isArray(header) ? header[0] : header
    return service.startSession(body.visitorToken || headerToken)
  })
}
