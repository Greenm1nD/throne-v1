import type { FastifyInstance } from 'fastify'
import { ERROR_CODE } from '@throne/shared'
import { AppError } from '../lib/errors.js'

export function registerErrorHandler(app: FastifyInstance): void {
  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ error: { code: ERROR_CODE.NOT_FOUND, message: 'Not found', requestId: request.id } })
  })

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      request.log.warn({ err: error, code: error.code }, 'handled error')
      reply.code(error.status).send({ error: { code: error.code, message: error.message, requestId: request.id } })
      return
    }
    const status = (error as { statusCode?: number }).statusCode
    if (status === 429) {
      reply.code(429).send({ error: { code: ERROR_CODE.RATE_LIMITED, message: 'Too many requests', requestId: request.id } })
      return
    }
    // Fastify raises its own 4xx for oversized bodies, malformed JSON and bad
    // media types. Those are the caller's fault, not ours — reporting them as
    // 500 would send a client hunting a server bug that does not exist. Their
    // messages are Fastify's own and safe to pass on; 5xx messages are not.
    if (typeof status === 'number' && status >= 400 && status < 500) {
      request.log.warn({ err: error, statusCode: status }, 'client error')
      reply.code(status).send({ error: { code: ERROR_CODE.VALIDATION, message: (error as Error).message, requestId: request.id } })
      return
    }
    request.log.error({ err: error }, 'unhandled error')
    reply.code(500).send({ error: { code: ERROR_CODE.INTERNAL, message: 'Internal server error', requestId: request.id } })
  })
}
