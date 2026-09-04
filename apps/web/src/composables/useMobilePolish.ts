import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * Mobile/Tablet UI/UX audit layer.
 *
 * Build-time flag (VITE_ENABLE_MOBILE_TABLET_POLISH). When off, the class is
 * never added and every scoped rule / lite-hero branch is inert → the current
 * stable responsive design is fully restored.
 */
export const mobilePolishEnabled =
  (import.meta as any).env?.VITE_ENABLE_MOBILE_TABLET_POLISH === 'true'

// Shared reactive viewport width (single resize listener, ref-counted).
const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1440)
let count = 0
function onResize() {
  width.value = window.innerWidth
}

/** Reactive viewport buckets: mobile < 768 ≤ tablet < 1024 ≤ desktop. */
export function useViewport() {
  onMounted(() => {
    if (count++ === 0) window.addEventListener('resize', onResize, { passive: true })
    onResize()
  })
  onUnmounted(() => {
    if (--count === 0) window.removeEventListener('resize', onResize)
  })
  const isMobile = computed(() => width.value < 768)
  const isTablet = computed(() => width.value >= 768 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)
  /** True on mobile + tablet when the flag is on — the "lighter" experience. */
  const lite = computed(() => mobilePolishEnabled && width.value < 1024)
  return { width, isMobile, isTablet, isDesktop, lite }
}
