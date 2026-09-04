import { describe, expect, it } from 'vitest'
import { createConversationBody, escalateBody, listMessagesQuery, sendMessageBody, visitorSessionBody } from './index.js'

describe('sendMessageBody', () => {
  it('trims and accepts a non-empty message', () => {
    expect(sendMessageBody.parse({ content: '  hello ' })).toEqual({ content: 'hello' })
  })
  it('rejects empty and whitespace-only content', () => {
    expect(sendMessageBody.safeParse({ content: '' }).success).toBe(false)
    expect(sendMessageBody.safeParse({ content: '   ' }).success).toBe(false)
  })
  it('rejects content longer than 4000 characters', () => {
    expect(sendMessageBody.safeParse({ content: 'x'.repeat(4001) }).success).toBe(false)
    expect(sendMessageBody.safeParse({ content: 'x'.repeat(4000) }).success).toBe(true)
  })
})

describe('escalateBody', () => {
  it('requires a known reason and allows an optional summary', () => {
    expect(escalateBody.parse({ reason: 'complaint' })).toEqual({ reason: 'complaint' })
    expect(escalateBody.parse({ reason: 'payment', summary: 'card declined' })).toEqual({ reason: 'payment', summary: 'card declined' })
    expect(escalateBody.safeParse({ reason: 'because' }).success).toBe(false)
  })
})

describe('listMessagesQuery', () => {
  it('defaults limit to 50, coerces strings, caps at 100', () => {
    expect(listMessagesQuery.parse({})).toEqual({ limit: 50 })
    expect(listMessagesQuery.parse({ limit: '10' })).toEqual({ limit: 10 })
    expect(listMessagesQuery.safeParse({ limit: '101' }).success).toBe(false)
    expect(listMessagesQuery.safeParse({ before: 'not-a-uuid' }).success).toBe(false)
  })
})

describe('createConversationBody', () => {
  it('accepts an empty body and strips unknown metadata keys', () => {
    expect(createConversationBody.parse({})).toEqual({})
    expect(createConversationBody.parse({ metadata: { pageUrl: 'https://throne.example/casino', evil: 1 } }))
      .toEqual({ metadata: { pageUrl: 'https://throne.example/casino' } })
  })
})

describe('visitorSessionBody', () => {
  it('accepts an absent, empty or present token', () => {
    expect(visitorSessionBody.parse({})).toEqual({})
    expect(visitorSessionBody.parse({ visitorToken: '' })).toEqual({ visitorToken: '' })
    expect(visitorSessionBody.parse({ visitorToken: 'abc.def' })).toEqual({ visitorToken: 'abc.def' })
  })
})
