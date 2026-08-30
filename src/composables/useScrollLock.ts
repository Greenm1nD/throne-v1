/**
 * Reference-counted page scroll lock.
 *
 * Four overlays (auth, 2FA, wallet, age gate) can be open at once. Each used to
 * write `documentElement.style.overflow` unconditionally, so whichever closed
 * first unlocked the page underneath the ones still open. The counter makes the
 * lock belong to the set of open overlays rather than to the last one to speak.
 */
let depth = 0

function lock() {
  if (depth === 0) document.documentElement.style.overflow = 'hidden'
  depth++
}

function unlock() {
  // Clamped: an unbalanced unlock must not push the count negative, or the next
  // genuine lock would need two unlocks to release.
  if (depth === 0) return
  depth--
  if (depth === 0) document.documentElement.style.overflow = ''
}

export function useScrollLock() {
  return { lock, unlock }
}
