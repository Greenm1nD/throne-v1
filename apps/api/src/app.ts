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
import { registerConversationRoutes } from './modules/conversations/routes.js'

export interface AppDeps {
  env: Env
  db: Db
  container: Container
}

/**
 * Fastify's own numeric `trustProxy` branch fails closed — verified against
 * the exact pinned `fastify@5.12.3` (`lib/request.js`'s `getTrustProxyFn`
 * returns `() => false` for any `number`, deliberately, so a hop count alone
 * can never validate the immediate peer). Fastify's own `.d.ts` agrees:
 * `trustProxy` is typed `boolean | string | string[] | TrustProxyFunction`,
 * with no `number` — passing one through as-is would silently behave like
 * `false`, defeating the point of `TRUST_PROXY=<n>`. A hand-written
 * `TrustProxyFunction` reproduces the standard "trust the nearest N hops"
 * semantics instead, since Fastify uses a supplied function as-is.
 */
function resolveTrustProxy(value: Env['TRUST_PROXY']): boolean | string | string[] | ((address: string, hop: number) => boolean) {
  if (typeof value === 'number') return (_address, hop) => hop < value
  return value
}

export function createApp({ env, db, container }: AppDeps): FastifyInstance {
  const app = Fastify({
    // Server-minted only: a client-supplied X-Request-Id would let callers collide log streams.
    genReqId: () => randomUUID(),
    requestIdHeader: false,
    bodyLimit: LIMITS.BODY_LIMIT_BYTES,
    trustProxy: resolveTrustProxy(env.TRUST_PROXY),
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

  // Registered on the root instance, not inside the encapsulated block below:
  // registerErrorHandler's notFoundHandler and errorHandler live on this same
  // root instance and fire for requests that never match any route, so they
  // never enter the child encapsulation's context. Helmet and CORS were
  // previously registered only inside that child, so their onRequest/onSend
  // hooks never ran for a 404 or an unhandled error — the final reviewer
  // verified empirically that a matched route got access-control-allow-origin
  // and strict-transport-security while an unknown route got neither, not
  // even x-content-type-options. Moving them to root (rather than moving
  // registerErrorHandler into the child) keeps the wiring clearest: CORS and
  // helmet are universal, cross-cutting response concerns that belong on
  // every response including errors, while auth/route registration is
  // naturally scoped per-module and stays in the child below.
  void registerSecurity(app, env)

  registerErrorHandler(app)
  app.register(async (instance) => {
    registerAuth(instance, container.visitors)
    registerHealthRoutes(instance, db)
    registerVisitorRoutes(instance, container.visitors)
    registerConversationRoutes(instance, container.conversations)
  })

  return app
}
