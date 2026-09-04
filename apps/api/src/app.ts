import { randomUUID } from 'node:crypto'
import Fastify, { type FastifyInstance } from 'fastify'
import { LIMITS } from '@throne/shared'
import type { Env } from './config/env.js'
import type { Db } from './db/client.js'
import { registerErrorHandler } from './plugins/error-handler.js'
import { registerSecurity } from './plugins/security.js'
import { registerHealthRoutes } from './modules/health/routes.js'

export interface AppDeps {
  env: Env
  db: Db
}

export function createApp({ env, db }: AppDeps): FastifyInstance {
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
    registerHealthRoutes(instance, db)
  })

  return app
}
