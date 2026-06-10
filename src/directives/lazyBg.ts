import type { Directive } from 'vue'

/**
 * v-lazybg="'<background-image value>'"
 * Defers applying a heavy background-image until the element is near the
 * viewport (IntersectionObserver, 200px margin). Until then only the element's
 * placeholder background-color shows, so off-screen art isn't downloaded.
 */
export const lazyBg: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    const apply = () => {
      el.style.backgroundImage = binding.value
    }

    if (!('IntersectionObserver' in window)) {
      apply()
      return
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            apply()
            obs.disconnect()
          }
        })
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
  },
}
