import { randomUUID } from 'node:crypto'
import Fastify, { type FastifyInstance } from 'fastify'
import { LIMITS } from '@throne/shared'
import type { Container } from './container.js'
import type { Env } from './config/env.js'
import type { Db } from './db/client.js'
import { registerErrorHandler } from './plugins/error-handler.js'
import { registerSecurity } from './plugins/security.js'
import { registerAuth } from './plugins/auth.js'
import { registerHealthRoutes } from './modules/health/routes.js'
import { registerVisitorRoutes } from './modules/visitors/routes.js'

export interface AppDeps {
  env: Env
  db: Db
  container: Container
}

export function createApp({ env, db, container }: AppDeps): FastifyInstance {
  const app = Fastify({
    // Server-minted only: a client-supplied X-Request-Id would let callers collide log streams.
    genReqId: () => randomUUID(),
    requestIdHeader: false,
    bodyLimit: LIMITS.BODY_LIMIT_BYTES,
    trustProxy: true,
    logger: {
      level: env.LOG_LEVEL,
      redact: {
        paths: ['req.headers.authorization', 'req.headers["x-visitor-token"]', 'req.headers.cookie'],
        censor: '[redacted]',
      },
    },
  })

  app.addHook('onRequest', async (request, reply) => {
    reply.header('X-Request-Id', request.id)
  })

  registerErrorHandler(app)
  app.register(async (instance) => {
    await registerSecurity(instance, env)
    registerAuth(instance, container.visitors)
    registerHealthRoutes(instance, db)
    registerVisitorRoutes(instance, container.visitors)
  })

  return app
}
