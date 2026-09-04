import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { signToken } from '../src/lib/signed-token.js'
import { buildTestApp, testEnv } from './helpers/app.js'

// Built fresh in beforeEach (not inline per-test) so a rejected buildTestApp()
// in one test can never leave afterEach closing the *previous* test's
// already-closed app — that double-close would mask the real failure.
let app: Awaited<ReturnType<typeof buildTestApp>> | undefined

beforeEach(async () => {
  app = await buildTestApp()
})

afterEach(async () => {
  await app?.closeAll()
  app = undefined
})

const session = (payload?: unknown) =>
  app!.inject({ method: 'POST', url: '/api/visitors/session', payload: payload ?? {} })

describe('POST /api/visitors/session', () => {
  it('mints a visitor and returns a token', async () => {
    const res = await session()
    expect(res.statusCode).toBe(200)
    const body = res.json()
    expect(body.visitorId).toMatch(/^[0-9a-f-]{36}$/)
    expect(body.visitorToken.split('.')).toHaveLength(2)
    expect(new Date(body.expiresAt).getTime()).toBeGreaterThan(Date.now())
  })

  it('keeps the same visitor when a valid token is presented', async () => {
    const first = (await session()).json()
    const second = (await session({ visitorToken: first.visitorToken })).json()
    expect(second.visitorId).toBe(first.visitorId)
  })

  it('mints a new visitor for a token signed with the wrong secret', async () => {
    const first = (await session()).json()
    const forged = signToken(
      { vid: first.visitorId, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 },
      'w'.repeat(32),
    )
    const second = (await session({ visitorToken: forged })).json()
    expect(second.visitorId).not.toBe(first.visitorId)
  })

  it('mints a new visitor when the token points at a deleted row', async () => {
    const first = (await session()).json()
    // Signed with the *real* test secret (not a hardcoded duplicate of it) so this
    // stays an orphan-row test even if the test secret is ever rotated, instead of
    // silently degrading into another wrong-secret test.
    const ghost = signToken(
      { vid: '33333333-3333-4333-8333-333333333333', iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60 },
      testEnv().VISITOR_TOKEN_SECRET,
    )
    const second = (await session({ visitorToken: ghost })).json()
    expect(second.visitorId).not.toBe(first.visitorId)
    expect(second.visitorId).not.toBe('33333333-3333-4333-8333-333333333333')
  })

  it('mints a fresh visitor for an empty-string token instead of failing validation', async () => {
    const res = await session({ visitorToken: '' })
    expect(res.statusCode).toBe(200)
    expect(res.json().visitorId).toMatch(/^[0-9a-f-]{36}$/)
  })
})
