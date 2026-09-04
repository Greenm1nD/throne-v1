import { createHmac } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { signToken, verifyToken } from '../src/lib/signed-token.js'

const secret = 's'.repeat(32)
const other = 'x'.repeat(32)
const payload = { vid: '11111111-1111-4111-8111-111111111111', iat: 1_760_000_000, exp: 1_760_086_400 }

describe('signed token', () => {
  it('round-trips a payload', () => {
    expect(verifyToken(signToken(payload, secret), secret, new Date(payload.iat * 1000))).toEqual(payload)
  })

  it('rejects a token signed with another secret', () => {
    expect(verifyToken(signToken(payload, other), secret, new Date(payload.iat * 1000))).toBeNull()
  })

  it('rejects a tampered payload', () => {
    const [body, sig] = signToken(payload, secret).split('.')
    const forged = Buffer.from(JSON.stringify({ ...payload, vid: '22222222-2222-4222-8222-222222222222' })).toString('base64url')
    expect(verifyToken(`${forged}.${sig}`, secret, new Date(payload.iat * 1000))).toBeNull()
    expect(body).toBeTruthy()
  })

  it('rejects an expired token', () => {
    expect(verifyToken(signToken(payload, secret), secret, new Date((payload.exp + 1) * 1000))).toBeNull()
  })

  it('rejects malformed input without throwing', () => {
    for (const bad of ['', 'nodot', 'a.b.c', '!!!.???']) {
      expect(verifyToken(bad, secret)).toBeNull()
    }
  })

  it('rejects a signed token whose exp overflows to Infinity', () => {
    // JSON.stringify cannot emit Infinity (it serializes to null, which the
    // guard already rejected before this fix), so this builds the body by
    // hand: JSON.parse overflows 1e400 to Infinity while typeof stays
    // 'number' -- the exact shape the old guard let through. Signed with the
    // real secret so the signature genuinely passes and the payload guard is
    // what's actually under test.
    const raw = '{"vid":"11111111-1111-4111-8111-111111111111","iat":1760000000,"exp":1e400}'
    const body = Buffer.from(raw, 'utf8').toString('base64url')
    const signature = createHmac('sha256', secret).update(body).digest('base64url')
    expect(verifyToken(`${body}.${signature}`, secret, new Date(1_760_000_000_000))).toBeNull()
  })

  it('rejects a genuinely-signed token whose vid is not UUID-shaped', () => {
    const notAUuid = { ...payload, vid: 'not-a-uuid' }
    expect(verifyToken(signToken(notAUuid, secret), secret, new Date(payload.iat * 1000))).toBeNull()
  })
})
