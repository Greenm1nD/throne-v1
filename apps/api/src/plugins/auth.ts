import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { AuthContext, UserClaims } from '@throne/shared'
import { unauthorized } from '../lib/errors.js'
import type { VisitorService } from '../modules/visitors/service.js'

declare module 'fastify' {
  interface FastifyRequest {
    auth: AuthContext | null
  }
  interface FastifyInstance {
    requireVisitor: (request: FastifyRequest) => Promise<void>
  }
}

export interface UserAuthVerifier {
  verify(bearerToken: string): Promise<UserClaims | null>
}

/** MVP: THRONE has no real accounts, so no bearer token is ever accepted. */
export class NoneVerifier implements UserAuthVerifier {
  async verify(): Promise<UserClaims | null> {
    return null
  }
}

export function registerAuth(app: FastifyInstance, visitorService: VisitorService): void {
  app.decorateRequest('auth', null)

  app.addHook('onRequest', async (request: FastifyRequest) => {
    const header = request.headers['x-visitor-token']
    const token = Array.isArray(header) ? header[0] : header
    request.auth = await visitorService.resolve(token)
  })

  app.decorate('requireVisitor', async (request: FastifyRequest) => {
    if (!request.auth) throw unauthorized('A valid visitor token is required')
  })
}
