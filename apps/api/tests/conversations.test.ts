import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { buildTestApp } from './helpers/app.js'

let app: Awaited<ReturnType<typeof buildTestApp>> | undefined
let token: string

async function newVisitor() {
  const res = await app!.inject({ method: 'POST', url: '/api/visitors/session', payload: {} })
  return res.json().visitorToken as string
}

const auth = (t: string) => ({ 'x-visitor-token': t })

beforeEach(async () => {
  app = await buildTestApp()
  token = await newVisitor()
})
afterEach(async () => {
  await app?.closeAll()
  app = undefined
})

describe('conversations', () => {
  it('creates a conversation owned by the calling visitor', async () => {
    const res = await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token),
      payload: { metadata: { pageUrl: 'https://throne.example/casino' } },
    })
    expect(res.statusCode).toBe(201)
    expect(res.json()).toMatchObject({ status: 'ai_active', escalated: false, openTicketId: null })
    expect(res.json().id).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('refuses to create without a visitor token', async () => {
    const res = await app!.inject({ method: 'POST', url: '/api/chat/conversations', payload: {} })
    expect(res.statusCode).toBe(401)
    expect(res.json().error.code).toBe('UNAUTHORIZED')
  })

  it('rejects a tampered visitor token with 401', async () => {
    const [body, signature] = token.split('.') as [string, string]
    const flipped = signature.slice(0, -1) + (signature.endsWith('A') ? 'B' : 'A')
    const res = await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(`${body}.${flipped}`), payload: {},
    })
    expect(res.statusCode).toBe(401)
    expect(res.json().error.code).toBe('UNAUTHORIZED')
  })

  it('returns 404 for another visitor’s conversation', async () => {
    const mine = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    const stranger = await newVisitor()
    const res = await app!.inject({ method: 'GET', url: `/api/chat/conversations/${mine.id}`, headers: auth(stranger) })
    expect(res.statusCode).toBe(404)
    expect(res.json().error.code).toBe('NOT_FOUND')
  })

  it('returns 404 for an unknown id and 400 for a non-uuid id', async () => {
    const unknown = await app!.inject({
      method: 'GET', url: '/api/chat/conversations/44444444-4444-4444-8444-444444444444', headers: auth(token),
    })
    expect(unknown.statusCode).toBe(404)
    const bad = await app!.inject({ method: 'GET', url: '/api/chat/conversations/not-a-uuid', headers: auth(token) })
    expect(bad.statusCode).toBe(400)
    expect(bad.json().error.code).toBe('VALIDATION')
  })

  it('lists messages oldest first and honours the limit', async () => {
    const conversation = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    await app!.testSeedMessages(conversation.id, ['first', 'second', 'third'])

    const all = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages`, headers: auth(token),
    })
    expect(all.json().messages.map((m: { content: string }) => m.content)).toEqual(['first', 'second', 'third'])

    const limited = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages?limit=2`, headers: auth(token),
    })
    expect(limited.json().messages).toHaveLength(2)

    const rejected = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages?limit=500`, headers: auth(token),
    })
    expect(rejected.statusCode).toBe(400)
  })
})
