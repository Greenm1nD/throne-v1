import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { buildTestApp } from './helpers/app.js'

let app: Awaited<ReturnType<typeof buildTestApp>> | undefined
let token: string

async function newVisitor() {
  const res = await app!.inject({ method: 'POST', url: '/api/visitors/session', payload: {} })
  return res.json().visitorToken as string
}

const auth = (t: string) => ({ 'x-visitor-token': t })

beforeEach(async () => {
  app = await buildTestApp()
  token = await newVisitor()
})
afterEach(async () => {
  await app?.closeAll()
  app = undefined
})

describe('conversations', () => {
  it('creates a conversation owned by the calling visitor', async () => {
    const res = await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token),
      payload: { metadata: { pageUrl: 'https://throne.example/casino' } },
    })
    expect(res.statusCode).toBe(201)
    expect(res.json()).toMatchObject({ status: 'ai_active', escalated: false, openTicketId: null })
    expect(res.json().id).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('refuses to create without a visitor token', async () => {
    const res = await app!.inject({ method: 'POST', url: '/api/chat/conversations', payload: {} })
    expect(res.statusCode).toBe(401)
    expect(res.json().error.code).toBe('UNAUTHORIZED')
  })

  it('rejects a tampered visitor token with 401', async () => {
    const [body, signature] = token.split('.') as [string, string]
    const flipped = signature.slice(0, -1) + (signature.endsWith('A') ? 'B' : 'A')
    const res = await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(`${body}.${flipped}`), payload: {},
    })
    expect(res.statusCode).toBe(401)
    expect(res.json().error.code).toBe('UNAUTHORIZED')
  })

  it('lets the owner see 200 and a stranger see 404 on both endpoints, for the same conversation', async () => {
    // The positive half matters as much as the negative: without it, a route
    // that was never registered would also answer 404 to the stranger below,
    // and the test would pass for the wrong reason (see the fix-round-1 note
    // on this file for how that bit the original version of this test).
    const mine = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()

    const ownerGet = await app!.inject({ method: 'GET', url: `/api/chat/conversations/${mine.id}`, headers: auth(token) })
    expect(ownerGet.statusCode).toBe(200)
    expect(ownerGet.json().id).toBe(mine.id)

    const stranger = await newVisitor()
    const strangerGet = await app!.inject({ method: 'GET', url: `/api/chat/conversations/${mine.id}`, headers: auth(stranger) })
    expect(strangerGet.statusCode).toBe(404)
    expect(strangerGet.json().error.code).toBe('NOT_FOUND')

    const strangerMessages = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${mine.id}/messages`, headers: auth(stranger),
    })
    expect(strangerMessages.statusCode).toBe(404)
    expect(strangerMessages.json().error.code).toBe('NOT_FOUND')
  })

  it('returns 404 for an unknown id and 400 for a non-uuid id', async () => {
    const unknown = await app!.inject({
      method: 'GET', url: '/api/chat/conversations/44444444-4444-4444-8444-444444444444', headers: auth(token),
    })
    expect(unknown.statusCode).toBe(404)
    const bad = await app!.inject({ method: 'GET', url: '/api/chat/conversations/not-a-uuid', headers: auth(token) })
    expect(bad.statusCode).toBe(400)
    expect(bad.json().error.code).toBe('VALIDATION')
  })

  it('lists messages oldest first and honours the limit', async () => {
    const conversation = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    await app!.testSeedMessages(conversation.id, ['first', 'second', 'third'])

    const all = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages`, headers: auth(token),
    })
    expect(all.json().messages.map((m: { content: string }) => m.content)).toEqual(['first', 'second', 'third'])

    const limited = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages?limit=2`, headers: auth(token),
    })
    expect(limited.json().messages).toHaveLength(2)

    const rejected = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages?limit=500`, headers: auth(token),
    })
    expect(rejected.statusCode).toBe(400)
  })

  it('excludes tool/system rows from both the page contents and the LIMIT count', async () => {
    // Tool rows interleaved with the visible ones, ascending by insertion
    // order: tool, user, tool, assistant, user. Requesting limit=3 must come
    // back with exactly the three visible messages — if the role filter ran
    // in JS after a SQL LIMIT (the pre-fix behavior), the SQL layer would
    // hand back only the first 3 rows by created_at (tool, user, tool), and
    // filtering afterward would leave just one visible message instead of
    // three.
    const conversation = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    await app!.testSeedMessagesWithRoles(conversation.id, [
      { role: 'tool', content: 'tool-call-1' },
      { role: 'user', content: 'first' },
      { role: 'tool', content: 'tool-call-2' },
      { role: 'assistant', content: 'second' },
      { role: 'user', content: 'third' },
    ])

    const res = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages?limit=3`, headers: auth(token),
    })
    const body = res.json().messages as { role: string; content: string }[]
    expect(body).toHaveLength(3)
    expect(body.every((m) => m.role === 'user' || m.role === 'assistant')).toBe(true)
    expect(body.map((m) => m.content)).toEqual(['first', 'second', 'third'])
  })

  it('resolves a `before` cursor only within the same conversation, not any message in the database', async () => {
    const mine = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    await app!.testSeedMessages(mine.id, ['first', 'second'])

    const otherToken = await newVisitor()
    const other = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(otherToken), payload: {},
    })).json()
    await app!.testSeedMessages(other.id, ['other-first', 'other-second'])
    const [otherMessage] = (await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${other.id}/messages`, headers: auth(otherToken),
    })).json().messages as { id: string }[]

    // A cursor naming a real message, just not one in *this* conversation,
    // must 404 — not silently resolve and truncate the page against a
    // cutoff time that has nothing to do with this conversation's history.
    const res = await app!.inject({
      method: 'GET',
      url: `/api/chat/conversations/${mine.id}/messages?before=${otherMessage!.id}`,
      headers: auth(token),
    })
    expect(res.statusCode).toBe(404)
    expect(res.json().error.code).toBe('NOT_FOUND')
  })

  it('orders and pages messages that share the same created_at using id as a stable tiebreaker', async () => {
    // `defaultNow()` compiles to Postgres `now()` (transaction_timestamp()),
    // so every row written inside one transaction — Phase 3's user message +
    // assistant placeholder — gets an identical created_at. This seeds that
    // scenario directly, unlike testSeedMessages which deliberately spaces
    // rows a second apart and so can never exercise a tie.
    const conversation = (await app!.inject({
      method: 'POST', url: '/api/chat/conversations', headers: auth(token), payload: {},
    })).json()
    await app!.testSeedMessagesSameTimestamp(conversation.id, ['a', 'b', 'c', 'd', 'e'])

    // Full history: all 5 rows come back, with no duplicates, in one
    // deterministic total order — not whatever physical order Postgres
    // happens to return for a created_at tie.
    const full = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages`, headers: auth(token),
    })
    const fullIds = full.json().messages.map((m: { id: string }) => m.id as string)
    expect(fullIds).toHaveLength(5)
    expect(new Set(fullIds).size).toBe(5)

    // Repeating the query returns the identical order — proof this is a real
    // total order (created_at, id), not an accident of storage order.
    const again = await app!.inject({
      method: 'GET', url: `/api/chat/conversations/${conversation.id}/messages`, headers: auth(token),
    })
    expect(again.json().messages.map((m: { id: string }) => m.id)).toEqual(fullIds)

    // A cursor on a row inside the tied group must resolve by the full
    // (created_at, id) tuple, not created_at alone. If it fell back to
    // created_at alone, `created_at < cursor.createdAt` would be false for
    // every row in the tie (they're all equal) — so the entire earlier
    // portion of the group would silently vanish (a skip), even though those
    // rows are provably earlier in total order.
    const midId = fullIds[2]!
    const before = await app!.inject({
      method: 'GET',
      url: `/api/chat/conversations/${conversation.id}/messages?before=${midId}&limit=10`,
      headers: auth(token),
    })
    const beforeIds = before.json().messages.map((m: { id: string }) => m.id as string)
    expect(beforeIds).toEqual(fullIds.slice(0, 2)) // exactly the two earlier rows — no more, no fewer
    expect(beforeIds).not.toContain(midId) // strictly earlier: the cursor row is never duplicated back

    // Paging with a small limit through that earlier portion: no duplicates,
    // no gaps, and walking past the start returns empty rather than looping.
    const page1 = await app!.inject({
      method: 'GET',
      url: `/api/chat/conversations/${conversation.id}/messages?before=${midId}&limit=1`,
      headers: auth(token),
    })
    const page1Ids = page1.json().messages.map((m: { id: string }) => m.id as string)
    expect(page1Ids).toEqual(fullIds.slice(0, 1))

    const page2 = await app!.inject({
      method: 'GET',
      url: `/api/chat/conversations/${conversation.id}/messages?before=${page1Ids[0]}&limit=1`,
      headers: auth(token),
    })
    expect(page2.json().messages).toEqual([])
  })
})
