import { z } from 'zod'

const csv = z.string().min(1).transform((s) => s.split(',').map((v) => v.trim()).filter(Boolean))
const secret = z.string().min(32, 'must be at least 32 characters')
const port = z.coerce.number().int().min(1).max(65535)
const ms = z.coerce.number().int().positive()

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: port.default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

    APP_URL: z.url(),
    API_URL: z.url(),
    CORS_ORIGINS: csv,

    DATABASE_URL: z.string().min(1),
    DATABASE_URL_TEST: z.string().min(1).optional(),
    REDIS_URL: z.string().min(1).optional(),

    OPENAI_API_KEY: z.string().min(1),
    OPENAI_MODEL: z.string().min(1),
    OPENAI_SUMMARY_MODEL: z.string().min(1).optional(),
    OPENAI_VECTOR_STORE_ID: z.string().min(1).optional(),

    KNOWLEDGE_PROVIDER: z.enum(['openai_vector_store', 'none']).default('openai_vector_store'),
    KNOWLEDGE_MIN_SCORE: z.coerce.number().min(0).max(1).default(0.3),

    N8N_BASE_URL: z.url(),
    N8N_WEBHOOK_SECRET: secret,
    N8N_SUPPORT_TICKET_PATH: z.string().min(1).default('throne/support-ticket'),

    VISITOR_TOKEN_SECRET: secret,
    VISITOR_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(90),

    USER_AUTH_PROVIDER: z.enum(['none', 'jwks']).default('none'),
    USER_AUTH_JWKS_URL: z.url().optional(),
    USER_AUTH_ISSUER: z.string().min(1).optional(),
    USER_AUTH_AUDIENCE: z.string().min(1).optional(),

    RATE_LIMIT_MESSAGES_PER_MIN: z.coerce.number().int().positive().default(20),
    RATE_LIMIT_REQUESTS_PER_MIN: z.coerce.number().int().positive().default(60),

    AI_MAX_TOOL_ROUNDS: z.coerce.number().int().positive().default(5),
    AI_REQUEST_TIMEOUT_MS: ms.default(60_000),
    AI_TURN_BUDGET_MS: ms.default(90_000),
    AI_MAX_OUTPUT_TOKENS: z.coerce.number().int().positive().default(1024),
    CONTEXT_RECENT_MESSAGES: z.coerce.number().int().positive().default(20),
    CONVERSATION_RETENTION_DAYS: z.coerce.number().int().positive().default(180),
  })
  .superRefine((env, ctx) => {
    if (env.KNOWLEDGE_PROVIDER === 'openai_vector_store' && !env.OPENAI_VECTOR_STORE_ID) {
      ctx.addIssue({ code: 'custom', path: ['OPENAI_VECTOR_STORE_ID'], message: 'required when KNOWLEDGE_PROVIDER is openai_vector_store' })
    }
    if (env.USER_AUTH_PROVIDER === 'jwks') {
      for (const key of ['USER_AUTH_JWKS_URL', 'USER_AUTH_ISSUER', 'USER_AUTH_AUDIENCE'] as const) {
        if (!env[key]) ctx.addIssue({ code: 'custom', path: [key], message: 'required when USER_AUTH_PROVIDER is jwks' })
      }
    }
  })

export type Env = z.infer<typeof envSchema>

/** Parse once at startup. Throws with every problem listed, so one run fixes them all. */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source)
  if (result.success) return result.data
  const lines = result.error.issues.map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
  throw new Error(`Invalid environment configuration:\n${lines.join('\n')}`)
}
