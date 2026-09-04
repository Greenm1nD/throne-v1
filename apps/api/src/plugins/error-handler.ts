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
    if ((error as { statusCode?: number }).statusCode === 429) {
      reply.code(429).send({ error: { code: ERROR_CODE.RATE_LIMITED, message: 'Too many requests', requestId: request.id } })
      return
    }
    request.log.error({ err: error }, 'unhandled error')
    reply.code(500).send({ error: { code: ERROR_CODE.INTERNAL, message: 'Internal server error', requestId: request.id } })
  })
}
