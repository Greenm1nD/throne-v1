import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app.js'
import { buildContainer } from '../src/container.js'
import { testEnv } from './helpers/app.js'
import { withTestDb } from './helpers/db.js'

/**
 * Fastify's own numeric `trustProxy` branch fails closed in the pinned
 * fastify version (see the comment on `resolveTrustProxy` in src/app.ts) —
 * verified by diffing the installed package against the one published to
 * npm. These prove the hand-written replacement actually restores "trust
 * the nearest N hops" behavior, not just that env.ts parses the value.
 */
async function buildAppWithTrustProxy(trustProxy: string) {
  const ctx = await withTestDb()
  const env = testEnv({ TRUST_PROXY: trustProxy })
  const container = buildContainer(env, ctx.db)
  const app = createApp({ env, db: ctx.db, container })
  app.get('/api/test-ip', async (request) => ({ ip: request.ip }))
  await app.ready()
  return { app, ctx }
}

describe('trustProxy wiring', () => {
  it('ignores X-Forwarded-For when TRUST_PROXY is unset (default false)', async () => {
    const { app, ctx } = await buildAppWithTrustProxy('false')
    try {
      const res = await app.inject({
        method: 'GET', url: '/api/test-ip', headers: { 'x-forwarded-for': '203.0.113.9' },
      })
      expect(res.json().ip).not.toBe('203.0.113.9')
    } finally {
      await app.close()
      await ctx.close()
    }
  })

  it('honors X-Forwarded-For from the immediate hop when TRUST_PROXY=1', async () => {
    const { app, ctx } = await buildAppWithTrustProxy('1')
    try {
      const res = await app.inject({
        method: 'GET', url: '/api/test-ip', headers: { 'x-forwarded-for': '203.0.113.9' },
      })
      // With exactly one hop trusted, the socket peer is trusted and the
      // header's client-side entry is used as request.ip — the standard
      // "one reverse proxy in front of us" topology.
      expect(res.json().ip).toBe('203.0.113.9')
    } finally {
      await app.close()
      await ctx.close()
    }
  })

  it('does not extend trust past the configured hop count', async () => {
    const { app, ctx } = await buildAppWithTrustProxy('1')
    try {
      // Two hops in the header, only one hop trusted: the resolved ip must
      // be the second entry (the trusted proxy's own view of its client),
      // not the first (an untrusted, client-supplied value beyond hop 1).
      const res = await app.inject({
        method: 'GET', url: '/api/test-ip', headers: { 'x-forwarded-for': '198.51.100.7, 203.0.113.9' },
      })
      expect(res.json().ip).toBe('203.0.113.9')
    } finally {
      await app.close()
      await ctx.close()
    }
  })
})
