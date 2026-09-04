import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { createConversationBody, listMessagesQuery } from '@throne/shared'
import { parse } from '../../lib/validate.js'
import { requireVisitor } from '../../plugins/auth.js'
import type { ConversationService } from './service.js'

const idParams = z.object({ id: z.uuid() })

export function registerConversationRoutes(app: FastifyInstance, service: ConversationService): void {
  app.post('/api/chat/conversations', { preHandler: requireVisitor }, async (request, reply) => {
    const body = parse(createConversationBody, request.body ?? {})
    const dto = await service.create(request.auth!, body)
    return reply.code(201).send(dto)
  })

  app.get('/api/chat/conversations/:id', { preHandler: requireVisitor }, async (request) => {
    const { id } = parse(idParams, request.params)
    return service.toDto(await service.getOwned(request.auth!, id))
  })

  app.get('/api/chat/conversations/:id/messages', { preHandler: requireVisitor }, async (request) => {
    const { id } = parse(idParams, request.params)
    const query = parse(listMessagesQuery, request.query ?? {})
    return { messages: await service.listMessages(request.auth!, id, query) }
  })
}
