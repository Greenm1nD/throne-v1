import { reactive, readonly } from 'vue'

export type AuthMode = 'login' | 'register'

const state = reactive({
  open: false,
  mode: 'login' as AuthMode,
})

/** Tiny shared store for the auth modal — no Pinia needed for one dialog. */
export function useAuthModal() {
  return {
    state: readonly(state),
    open(mode: AuthMode = 'login') {
      state.mode = mode
      state.open = true
      document.documentElement.style.overflow = 'hidden'
    },
    close() {
      state.open = false
      document.documentElement.style.overflow = ''
    },
    setMode(mode: AuthMode) {
      state.mode = mode
    },
  }
}
