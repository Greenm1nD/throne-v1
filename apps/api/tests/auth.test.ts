import type { FastifyInstance } from 'fastify'
import { eq } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { buildContainer } from '../src/container.js'
import { requireVisitor, registerAuth } from '../src/plugins/auth.js'
import { visitors } from '../src/db/schema/index.js'
import { buildTestApp, testEnv } from './helpers/app.js'
import { withTestDb } from './helpers/db.js'

/**
 * registerAuth's onRequest hook and its `auth` decoration are scoped to
 * whichever Fastify child instance they're registered on — that is app.ts's
 * own design (registerAuth runs inside the same encapsulated
 * `app.register(async (instance) => {...})` as the health/visitor routes, not
 * on the root app). A throwaway route attached directly to the root `app`
 * (the way tests/errors.test.ts attaches its route) would never see them, so
 * the two tests below that need a throwaway route re-run registerAuth on
 * their own child instance and mount their route there — exercising the
 * exact same registerAuth function, wired the same way app.ts wires it. This
 * is safe to do because, unlike the old decorator-based requireVisitor,
 * neither registerAuth's hook nor request.auth's resolution is order- or
 * wiring-sensitive in a way a sibling instance could paper over — see the
 * `buildTestApp()` test below for the complementary proof against the real
 * app.ts wiring itself.
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
    try {
      const { visitorToken, visitorId } = await mintToken(app)
      const res = await app.inject({
        method: 'GET',
        url: '/api/test-auth',
        headers: { 'x-visitor-token': visitorToken },
      })
      expect(res.json().auth).toMatchObject({ visitorId })
    } finally {
      await app.close()
      await ctx.close()
    }
  })

  it('resolves request.auth to null, not undefined, for a garbage header value', async () => {
    const { app, ctx } = await buildAppWithAuthedRoute((instance) => {
      instance.get('/api/test-auth', async (request) => ({
        auth: request.auth,
        isStrictlyNull: request.auth === null,
      }))
    })
    try {
      const res = await app.inject({
        method: 'GET',
        url: '/api/test-auth',
        headers: { 'x-visitor-token': 'not-a-real-token' },
      })
      expect(res.json()).toEqual({ auth: null, isStrictlyNull: true })
    } finally {
      await app.close()
      await ctx.close()
    }
  })

  it('requireVisitor (imported function) answers 401 with no token and passes once one is presented', async () => {
    const { app, ctx } = await buildAppWithAuthedRoute((instance) => {
      // Imported directly, not read off the instance — see the comment on
      // requireVisitor in src/plugins/auth.ts for why that distinction is
      // the entire point of this test.
      instance.get('/api/test-protected', { preHandler: requireVisitor }, async (request) => ({
        visitorId: request.auth?.visitorId,
      }))
    })
    try {
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
    } finally {
      await app.close()
      await ctx.close()
    }
  })

  it('resolves request.auth on a real route in app.ts\'s real block (buildTestApp, no sibling)', async () => {
    // No throwaway route, no sibling registerAuth call: this drives the
    // unmodified createApp()/buildTestApp() wiring exactly as app.ts defines
    // it. None of app.ts's own routes echo request.auth back in their
    // response, so resolution is observed through its one real side effect
    // instead: VisitorService.resolve -> repository.touch bumps the
    // visitor's last_seen_at. That write only happens if the onRequest hook
    // actually ran and actually resolved the token on this exact route, in
    // this exact (real) registration block.
    const app = await buildTestApp()
    try {
      const { visitorToken, visitorId } = await mintToken(app)
      const [beforeRow] = await app.testDb.select().from(visitors).where(eq(visitors.id, visitorId))
      const beforeSeen = beforeRow!.lastSeenAt.getTime()

      await new Promise((resolve) => setTimeout(resolve, 10))

      const res = await app.inject({
        method: 'GET',
        url: '/api/health',
        headers: { 'x-visitor-token': visitorToken },
      })
      expect(res.statusCode).toBe(200)

      const [afterRow] = await app.testDb.select().from(visitors).where(eq(visitors.id, visitorId))
      expect(afterRow!.lastSeenAt.getTime()).toBeGreaterThan(beforeSeen)
    } finally {
      await app.closeAll()
    }
  })
})
