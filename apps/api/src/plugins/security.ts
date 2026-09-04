import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import type { FastifyInstance } from 'fastify'
import type { Env } from '../config/env.js'

export async function registerSecurity(app: FastifyInstance, env: Env): Promise<void> {
  // The API serves JSON and SSE only — no HTML, so CSP is not the relevant control here.
  await app.register(helmet, { contentSecurityPolicy: false })
  await app.register(cors, {
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Visitor-Token'],
    exposedHeaders: ['X-Request-Id'],
    credentials: false,
    maxAge: 86_400,
  })
}
