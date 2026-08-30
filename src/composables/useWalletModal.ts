import { reactive } from 'vue'
import { useScrollLock } from './useScrollLock'
import { track } from '@/utils/analytics'

/**
 * Global deposit/withdraw modal. The header "Deposit" button opens it; the
 * modal itself flips between deposit and withdraw via an in-modal toggle.
 */
type WalletKind = 'deposit' | 'withdraw'

const state = reactive<{ open: boolean; kind: WalletKind }>({
  open: false,
  kind: 'deposit',
})

const { lock, unlock } = useScrollLock()

export function useWalletModal() {
  function open(kind: WalletKind = 'deposit') {
    state.kind = kind
    // Guarded: deposit → withdraw while open must not double-lock.
    if (!state.open) {
      lock()
      track(kind === 'deposit' ? 'deposit_start' : 'withdraw_start')
    }
    state.open = true
  }
  function close() {
    if (state.open) unlock()
    state.open = false
  }
  function setKind(kind: WalletKind) {
    state.kind = kind
  }
  return { state, open, close, setKind }
}
