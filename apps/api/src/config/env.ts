import { z } from 'zod'

const csv = z.string().min(1).transform((s) => s.split(',').map((v) => v.trim()).filter(Boolean))
const secret = z.string().min(32, 'must be at least 32 characters')
const port = z.coerce.number().int().min(1).max(65535)
const ms = z.coerce.number().int().positive()

/**
 * Mirrors what Fastify's `trustProxy` option accepts (boolean | number |
 * comma-separated IPs/CIDRs | function — the function form isn't
 * env-expressible, so it's not offered here): `false`/unset → don't trust
 * any `X-Forwarded-For` hop; `true` → trust the nearest hop unconditionally;
 * a bare integer → trust that many hops; anything else → passed through
 * verbatim as Fastify's own IP/CIDR allowlist string.
 *
 * The number this produces is not handed to Fastify as-is: Fastify's own
 * numeric `trustProxy` handling fails closed in the pinned fastify version
 * (see the comment on `resolveTrustProxy` in app.ts), so app.ts turns it
 * into an equivalent hand-written trust function instead.
 */
const trustProxy = z
  .string()
  .optional()
  .transform((v) => (v ?? '').trim())
  .transform((v): boolean | number | string => {
    const lower = v.toLowerCase()
    if (v === '' || lower === 'false') return false
    if (lower === 'true') return true
    if (/^\d+$/.test(v)) return Number(v)
    return v
  })

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: port.default(3000),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),

    APP_URL: z.url(),
    API_URL: z.url(),
    CORS_ORIGINS: csv,
    // Defaults to not trusting X-Forwarded-For: with no guarantee about what
    // sits in front of the API, trusting it by default would let any client
    // set its own request.ip and bypass a future per-IP rate limit from day
    // one. Set explicitly once a reverse proxy that overwrites (not appends)
    // this header is confirmed in front of the API.
    TRUST_PROXY: trustProxy,

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
    if (env.LOG_LEVEL === 'silent' && env.NODE_ENV !== 'test') {
      ctx.addIssue({
        code: 'custom',
        path: ['LOG_LEVEL'],
        // A silent logger hides server.ts's fatal startup log, turning a listen
        // failure into a wordless exit(1). Tests need it; nothing else should have it.
        message: "'silent' is only allowed when NODE_ENV is test",
      })
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
