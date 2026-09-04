import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { buildContainer } from '../src/container.js'
import { testEnv } from './helpers/app.js'
import { withTestDb } from './helpers/db.js'

describe('error handler', () => {
  it('reports a native Fastify 4xx with its own status, not 500', async () => {
    // Routes must be registered before ready(), so this builds its own app
    // instance instead of reusing buildTestApp() (already ready()'d).
    const ctx = await withTestDb()
    const env = testEnv()
    const app = createApp({ env, db: ctx.db, container: buildContainer(env, ctx.db) })
    app.post('/api/test-echo', async () => ({ ok: true }))
    await app.ready()

    const res = await app.inject({
      method: 'POST',
      url: '/api/test-echo',
      headers: { 'content-type': 'application/json' },
      payload: JSON.stringify({ big: 'x'.repeat(20_000) }),
    })
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
    expect(res.statusCode).toBeLessThan(500)
    expect(res.json().error.requestId).toBeTruthy()
    await app.close()
    await ctx.close()
  })
})
