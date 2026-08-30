import { reactive, readonly } from 'vue'
import { useScrollLock } from './useScrollLock'
import { track } from '@/utils/analytics'

export type AuthMode = 'login' | 'register'

const state = reactive({
  open: false,
  mode: 'login' as AuthMode,
  /** Second step of the login chain — the 2FA code dialog. */
  twofaOpen: false,
})

const { lock, unlock } = useScrollLock()

/** Tiny shared store for the auth modal — no Pinia needed for one dialog. */
export function useAuthModal() {
  return {
    state: readonly(state),
    open(mode: AuthMode = 'login') {
      state.mode = mode
      // Guarded on the flag: re-opening an already-open dialog (login → register)
      // must not take a second lock the single close() can never release.
      if (!state.open) {
        lock()
        track(mode === 'register' ? 'registration_start' : 'login_start')
      }
      state.open = true
    },
    close() {
      if (state.open) unlock()
      state.open = false
    },
    setMode(mode: AuthMode) {
      state.mode = mode
    },
    openTwofa() {
      if (!state.twofaOpen) lock()
      state.twofaOpen = true
    },
    closeTwofa() {
      if (state.twofaOpen) unlock()
      state.twofaOpen = false
    },
  }
}
