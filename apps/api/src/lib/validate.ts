import type { ZodType } from 'zod'
import { validation } from './errors.js'

/** Parse untrusted input; failures become a 400 with a readable, non-leaking message. */
export function parse<T>(schema: ZodType<T>, value: unknown): T {
  const result = schema.safeParse(value)
  if (result.success) return result.data
  const detail = result.error.issues
    .map((i) => `${i.path.join('.') || 'body'}: ${i.message}`)
    .join('; ')
  throw validation(detail)
}
