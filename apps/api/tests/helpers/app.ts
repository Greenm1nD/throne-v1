import { createApp } from '../../src/app.js'
import { loadEnv, type Env } from '../../src/config/env.js'
import { buildContainer } from '../../src/container.js'
import { messages } from '../../src/db/schema/index.js'
import { withTestDb } from './db.js'

export const testEnv = (overrides: Partial<NodeJS.ProcessEnv> = {}): Env =>
  loadEnv({
    NODE_ENV: 'test',
    APP_URL: 'https://throne.example',
    API_URL: 'https://api.throne.example',
    CORS_ORIGINS: 'https://throne.example',
    DATABASE_URL: process.env.DATABASE_URL_TEST ?? 'postgres://localhost:5432/throne_chat_test',
    OPENAI_API_KEY: 'sk-test',
    OPENAI_MODEL: 'gpt-5.6',
    KNOWLEDGE_PROVIDER: 'none',
    N8N_BASE_URL: 'https://n8n.example',
    N8N_WEBHOOK_SECRET: 'n'.repeat(32),
    VISITOR_TOKEN_SECRET: 'v'.repeat(32),
    LOG_LEVEL: 'silent',
    ...overrides,
  } as NodeJS.ProcessEnv)

export async function buildTestApp() {
  const ctx = await withTestDb()
  const env = testEnv()
  const container = buildContainer(env, ctx.db)
  const app = createApp({ env, db: ctx.db, container })
  await app.ready()
  return Object.assign(app, {
    testDb: ctx.db,
    closeAll: async () => { await app.close(); await ctx.close() },
    testSeedMessages: async (conversationId: string, contents: string[]) => {
      for (const [index, content] of contents.entries()) {
        await ctx.db.insert(messages).values({
          conversationId,
          role: index % 2 === 0 ? 'user' : 'assistant',
          content,
          createdAt: new Date(Date.now() + index * 1000),
        })
      }
    },
  })
}
