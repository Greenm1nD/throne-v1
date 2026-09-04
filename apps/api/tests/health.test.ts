import { describe, expect, it } from 'vitest'
import { buildTestApp } from './helpers/app.js'

describe('GET /api/health', () => {
  it('reports ok and echoes a request id', async () => {
    const app = await buildTestApp()
    const res = await app.inject({ method: 'GET', url: '/api/health' })
    expect(res.statusCode).toBe(200)
    expect(res.json()).toMatchObject({ ok: true, db: 'up' })
    expect(res.headers['x-request-id']).toMatch(/^[0-9a-f-]{36}$/)
    await app.closeAll()
  })

  it('returns the error envelope for an unknown route', async () => {
    const app = await buildTestApp()
    const res = await app.inject({ method: 'GET', url: '/api/nope' })
    expect(res.statusCode).toBe(404)
    expect(res.json().error).toMatchObject({ code: 'NOT_FOUND' })
    expect(res.json().error.requestId).toBeTruthy()
    await app.closeAll()
  })

  it('ignores a client-supplied request id', async () => {
    const app = await buildTestApp()
    const res = await app.inject({ method: 'GET', url: '/api/health', headers: { 'x-request-id': 'forged' } })
    expect(res.headers['x-request-id']).not.toBe('forged')
    await app.closeAll()
  })
})
