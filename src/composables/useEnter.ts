import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './useAuth'
import { useAuthModal } from './useAuthModal'
import { joinCta } from '@/config'

/**
 * Auth-aware "join / enter" CTA.
 *
 * Guests → open the registration modal.
 * Members → are already in the kingdom, so the same button takes them into the
 * product to act (by default the casino, where play earns season crowns) rather
 * than wrongly re-opening the sign-up flow.
 */
export function useEnter() {
  const { isLoggedIn } = useAuth()
  const { open } = useAuthModal()
  const router = useRouter()

  function enter(dest = '/casino') {
    if (isLoggedIn.value) router.push(dest)
    else open('register')
  }

  // "Join the Kingdom" for guests; a member-appropriate label once signed in.
  const enterLabel = computed(() => (isLoggedIn.value ? 'Enter the Casino' : joinCta))

  return { enter, enterLabel, isLoggedIn }
}
