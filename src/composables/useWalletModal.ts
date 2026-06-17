import { reactive } from 'vue'

/**
 * Global deposit/withdraw modal. The header "Deposit" button opens it; the
 * modal itself flips between deposit and withdraw via an in-modal toggle.
 */
type WalletKind = 'deposit' | 'withdraw'

const state = reactive<{ open: boolean; kind: WalletKind }>({
  open: false,
  kind: 'deposit',
})

export function useWalletModal() {
  function open(kind: WalletKind = 'deposit') {
    state.kind = kind
    state.open = true
    document.documentElement.style.overflow = 'hidden'
  }
  function close() {
    state.open = false
    document.documentElement.style.overflow = ''
  }
  function setKind(kind: WalletKind) {
    state.kind = kind
  }
  return { state, open, close, setKind }
}
