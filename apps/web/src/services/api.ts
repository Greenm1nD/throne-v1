/**
 * Mock API layer — the single seam where a real backend later drops in.
 * Every getter resolves after a small delay so components exercise their
 * loading states exactly as they would against real HTTP calls.
 *
 * BACKEND INTEGRATION POINT: replace the bodies below with fetch/axios calls
 * (e.g. `return (await http.get('/me')).data`). Component code and the auth
 * store stay untouched — they only ever talk to `api.*`.
 */

export interface User {
  id: string
  name: string
  handle: string
  email: string
  balance: number
  currency: string
  tier: string
  verified: boolean
}

const delay = (ms = 220) => new Promise((r) => setTimeout(r, ms))

const demoUser: User = {
  id: 'u1',
  name: 'KingMaker',
  handle: '@kingmaker',
  email: 'ki****@gmail.com',
  balance: 1240.5,
  currency: 'USD',
  tier: 'Duke',
  verified: false,
}

export const api = {
  async getCurrentUser(): Promise<User> {
    await delay()
    return { ...demoUser }
  },
  /** Generic list getter used by history panels for skeleton loading. */
  async getList<T>(rows: T[]): Promise<T[]> {
    await delay()
    return rows
  },
}
