import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { buildTestApp } from './helpers/app.js'

let app: Awaited<ReturnType<typeof buildTestApp>> | undefined

beforeEach(async () => {
  app = await buildTestApp()
})
afterEach(async () => {
  await app?.closeAll()
  app = undefined
})

describe('security headers on root-context responses', () => {
  it('carries CORS and helmet headers on a 404 for an unknown route, same as a matched route', async () => {
    // testEnv()'s CORS_ORIGINS is https://throne.example — sending that as
    // Origin is what makes @fastify/cors actually engage and set
    // access-control-allow-origin, rather than silently no-op.
    const res = await app!.inject({
      method: 'GET',
      url: '/api/this-route-does-not-exist',
      headers: { origin: 'https://throne.example' },
    })
    expect(res.statusCode).toBe(404)
    expect(res.json().error.code).toBe('NOT_FOUND')
    expect(res.headers['access-control-allow-origin']).toBe('https://throne.example')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
  })

  it('still carries the same headers on a matched route, for comparison', async () => {
    const res = await app!.inject({
      method: 'GET',
      url: '/api/health',
      headers: { origin: 'https://throne.example' },
    })
    expect(res.statusCode).toBe(200)
    expect(res.headers['access-control-allow-origin']).toBe('https://throne.example')
    expect(res.headers['x-content-type-options']).toBe('nosniff')
  })
})
