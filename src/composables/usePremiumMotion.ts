import { onMounted, ref } from 'vue'

/**
 * Premium Motion UI Refresh — single source of truth for the experimental
 * elegant-motion layer (branch feature/premium-motion-ui-refresh).
 *
 * Gated entirely by the build-time flag VITE_ENABLE_PREMIUM_MOTION_REFRESH.
 * When it is not 'true', `premiumEnabled` is false and every premium-only
 * branch (atmospheres, command bar, cinemagraphs) is skipped — the site renders
 * exactly as the stable design. Nothing else needs changing to revert.
 */
export const premiumEnabled =
  (import.meta as any).env?.VITE_ENABLE_PREMIUM_MOTION_REFRESH === 'true'

export function usePremiumMotion() {
  // Actual motion (loops, parallax) runs only when enabled AND the visitor has
  // not requested reduced motion. Components use `motionOk` to decide whether to
  // play a cinemagraph or show its static poster fallback.
  const motionOk = ref(false)
  onMounted(() => {
    motionOk.value = premiumEnabled && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  return { enabled: premiumEnabled, motionOk }
}
