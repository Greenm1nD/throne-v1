import { createHmac, timingSafeEqual } from 'node:crypto'

export interface TokenPayload {
  vid: string
  iat: number
  exp: number
}

const b64url = (value: string) => Buffer.from(value, 'utf8').toString('base64url')
const sign = (body: string, secret: string) => createHmac('sha256', secret).update(body).digest('base64url')
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function signToken(payload: TokenPayload, secret: string): string {
  const body = b64url(JSON.stringify(payload))
  return `${body}.${sign(body, secret)}`
}

/**
 * Returns the payload only when the signature matches and the token is unexpired.
 * Never throws: a malformed token is simply an unknown visitor.
 */
export function verifyToken(token: string, secret: string, now: Date = new Date()): TokenPayload | null {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [body, signature] = parts as [string, string]

  const expected = Buffer.from(sign(body, secret))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenPayload
    if (typeof payload.vid !== 'string' || !UUID_RE.test(payload.vid)) return null
    if (!Number.isFinite(payload.exp) || !Number.isFinite(payload.iat)) return null
    if (payload.exp * 1000 <= now.getTime()) return null
    return payload
  } catch {
    return null
  }
}
