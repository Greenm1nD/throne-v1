import { computed, ref } from 'vue'
import { api, type User } from '@/services/api'

/**
 * Static (client-side) auth — no backend. "Login" fetches a hard-coded demo
 * user through the mock api layer and persists it in localStorage. The module
 * rehydrates SYNCHRONOUSLY at import time, before the first router guard
 * runs, so refreshing on a protected page does not eject the user.
 */
const STORAGE_KEY = 'throne.user'

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

function persistUser(u: User | null) {
  if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
  else localStorage.removeItem(STORAGE_KEY)
}

const user = ref<User | null>(loadUser()) // rehydrate BEFORE first guard
const loading = ref(false)

export function useAuth() {
  const isLoggedIn = computed(() => user.value !== null)
  const balance = computed(() => user.value?.balance ?? 0)

  async function login() {
    loading.value = true
    try {
      user.value = await api.getCurrentUser()
      persistUser(user.value)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    persistUser(null)
  }

  function adjustBalance(delta: number) {
    if (!user.value) return
    user.value.balance = Math.max(0, user.value.balance + delta)
    persistUser(user.value)
  }

  return { user, loading, isLoggedIn, balance, login, logout, adjustBalance }
}
