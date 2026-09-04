import { describe, expect, it } from 'vitest'
import { assertTransition, canTransition } from '../src/modules/conversations/status.js'

describe('conversation status machine', () => {
  it('allows the documented transitions', () => {
    expect(canTransition('ai_active', 'escalated')).toBe(true)
    expect(canTransition('escalated', 'human_active')).toBe(true)
    expect(canTransition('escalated', 'resolved')).toBe(true)
    expect(canTransition('human_active', 'resolved')).toBe(true)
    expect(canTransition('resolved', 'ai_active')).toBe(true)
    expect(canTransition('ai_active', 'closed')).toBe(true)
    expect(canTransition('resolved', 'closed')).toBe(true)
    expect(canTransition('human_active', 'closed')).toBe(true)
  })

  it('refuses transitions the spec does not list', () => {
    expect(canTransition('ai_active', 'human_active')).toBe(false)
    expect(canTransition('ai_active', 'resolved')).toBe(false)
    expect(canTransition('closed', 'ai_active')).toBe(false)
    expect(canTransition('closed', 'escalated')).toBe(false)
  })

  it('treats a no-op transition as allowed', () => {
    expect(canTransition('escalated', 'escalated')).toBe(true)
  })

  it('throws INVALID_TRANSITION with both statuses named', () => {
    expect(() => assertTransition('closed', 'ai_active')).toThrowError(/closed.*ai_active/)
  })
})
