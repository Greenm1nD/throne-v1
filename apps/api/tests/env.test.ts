import { describe, expect, it } from 'vitest'
import { loadEnv } from '../src/config/env.js'

const required = {
  NODE_ENV: 'test',
  APP_URL: 'https://throne.example',
  API_URL: 'https://api.throne.example',
  CORS_ORIGINS: 'https://throne.example,http://localhost:5173',
  DATABASE_URL: 'postgres://localhost:5432/throne_chat',
  OPENAI_API_KEY: 'sk-test',
  OPENAI_MODEL: 'gpt-5.6',
  N8N_BASE_URL: 'https://n8n.example',
  N8N_WEBHOOK_SECRET: 'n'.repeat(32),
  VISITOR_TOKEN_SECRET: 'v'.repeat(32),
  OPENAI_VECTOR_STORE_ID: 'vs_test',
}

describe('loadEnv', () => {
  it('applies documented defaults', () => {
    const env = loadEnv(required)
    expect(env.PORT).toBe(3000)
    expect(env.LOG_LEVEL).toBe('info')
    expect(env.VISITOR_TOKEN_TTL_DAYS).toBe(90)
    expect(env.CONTEXT_RECENT_MESSAGES).toBe(20)
    expect(env.USER_AUTH_PROVIDER).toBe('none')
    expect(env.KNOWLEDGE_PROVIDER).toBe('openai_vector_store')
  })

  it('requires a vector store id only for the openai provider', () => {
    const { OPENAI_VECTOR_STORE_ID, ...without } = required
    expect(() => loadEnv(without as NodeJS.ProcessEnv)).toThrow(/OPENAI_VECTOR_STORE_ID/)
    expect(loadEnv({ ...without, KNOWLEDGE_PROVIDER: 'none' } as NodeJS.ProcessEnv).KNOWLEDGE_PROVIDER).toBe('none')
  })

  it('requires the jwks trio only for the jwks provider', () => {
    expect(() => loadEnv({ ...required, USER_AUTH_PROVIDER: 'jwks' } as NodeJS.ProcessEnv)).toThrow(/USER_AUTH_JWKS_URL/)
  })

  it('splits CORS_ORIGINS into a list', () => {
    expect(loadEnv(required).CORS_ORIGINS).toEqual(['https://throne.example', 'http://localhost:5173'])
  })

  it('lists every missing variable in one error', () => {
    const { OPENAI_API_KEY, DATABASE_URL, ...rest } = required
    let message = ''
    try { loadEnv(rest as NodeJS.ProcessEnv) } catch (e) { message = (e as Error).message }
    expect(message).toContain('OPENAI_API_KEY')
    expect(message).toContain('DATABASE_URL')
  })

  it('rejects a short signing secret', () => {
    expect(() => loadEnv({ ...required, VISITOR_TOKEN_SECRET: 'short' })).toThrow(/VISITOR_TOKEN_SECRET/)
  })

  it('allows LOG_LEVEL=silent only under NODE_ENV=test', () => {
    expect(loadEnv({ ...required, LOG_LEVEL: 'silent' }).LOG_LEVEL).toBe('silent')
    expect(() => loadEnv({ ...required, NODE_ENV: 'production', LOG_LEVEL: 'silent' })).toThrow(/LOG_LEVEL/)
    expect(loadEnv({ ...required, NODE_ENV: 'production', LOG_LEVEL: 'warn' }).LOG_LEVEL).toBe('warn')
  })
})
