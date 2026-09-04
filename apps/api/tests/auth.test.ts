import type { FastifyInstance } from 'fastify'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { buildContainer } from '../src/container.js'
import { registerAuth } from '../src/plugins/auth.js'
import { testEnv } from './helpers/app.js'
import { withTestDb } from './helpers/db.js'

/**
 * registerAuth's onRequest hook and its `auth` / `requireVisitor` decorations
 * are scoped to whichever Fastify child instance they're registered on — that
 * is app.ts's own design (registerAuth runs inside the same encapsulated
 * `app.register(async (instance) => {...})` as the health/visitor routes, not
 * on the root app). A throwaway route attached directly to the root `app`
 * (the way tests/errors.test.ts attaches its route) would never see them, so
 * each test here re-runs registerAuth on its own child instance and mounts
 * its route there — exercising the exact same registerAuth function, wired
 * the same way app.ts wires it.
 */
async function buildAppWithAuthedRoute(mount: (instance: FastifyInstance) => void) {
  const ctx = await withTestDb()
  const env = testEnv()
  const container = buildContainer(env, ctx.db)
  const app = createApp({ env, db: ctx.db, container })
  app.register(async (instance) => {
    registerAuth(instance, container.visitors)
    mount(instance)
  })
  await app.ready()
  return { app, ctx }
}

const mintToken = async (app: FastifyInstance) => {
  const res = await app.inject({ method: 'POST', url: '/api/visitors/session', payload: {} })
  return res.json() as { visitorToken: string; visitorId: string }
}

describe('auth hook', () => {
  it('resolves request.auth to the minted visitor when a valid token is presented', async () => {
    const { app, ctx } = await buildAppWithAuthedRoute((instance) => {
      instance.get('/api/test-auth', async (request) => ({ auth: request.auth }))
    })

    const { visitorToken, visitorId } = await mintToken(app)
    const res = await app.inject({
      method: 'GET',
      url: '/api/test-auth',
      headers: { 'x-visitor-token': visitorToken },
    })
    expect(res.json().auth).toMatchObject({ visitorId })

    await app.close()
    await ctx.close()
  })

  it('resolves request.auth to null, not undefined, for a garbage header value', async () => {
    const { app, ctx } = await buildAppWithAuthedRoute((instance) => {
      instance.get('/api/test-auth', async (request) => ({
        auth: request.auth,
        isStrictlyNull: request.auth === null,
      }))
    })

    const res = await app.inject({
      method: 'GET',
      url: '/api/test-auth',
      headers: { 'x-visitor-token': 'not-a-real-token' },
    })
    expect(res.json()).toEqual({ auth: null, isStrictlyNull: true })

    await app.close()
    await ctx.close()
  })

  it('requireVisitor answers 401 with no token and passes once one is presented', async () => {
    const { app, ctx } = await buildAppWithAuthedRoute((instance) => {
      instance.get('/api/test-protected', { preHandler: instance.requireVisitor }, async (request) => ({
        visitorId: request.auth?.visitorId,
      }))
    })

    const denied = await app.inject({ method: 'GET', url: '/api/test-protected' })
    expect(denied.statusCode).toBe(401)
    expect(denied.json().error).toMatchObject({ code: 'UNAUTHORIZED' })

    const { visitorToken, visitorId } = await mintToken(app)
    const allowed = await app.inject({
      method: 'GET',
      url: '/api/test-protected',
      headers: { 'x-visitor-token': visitorToken },
    })
    expect(allowed.statusCode).toBe(200)
    expect(allowed.json().visitorId).toBe(visitorId)

    await app.close()
    await ctx.close()
  })
})
