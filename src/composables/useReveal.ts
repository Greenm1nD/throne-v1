import { onMounted, onBeforeUnmount, type Ref } from 'vue'
import gsap from 'gsap'

/**
 * Reveal-on-scroll for any container. Elements tagged with `data-reveal`
 * inside the root fade + rise into place, staggered, when the section
 * scrolls into view. Respects prefers-reduced-motion.
 */
export function useReveal(root: Ref<HTMLElement | null>, options: { stagger?: number; y?: number } = {}) {
  const { stagger = 0.1, y = 30 } = options
  let observer: IntersectionObserver | null = null
  let fallback: number | undefined

  onMounted(() => {
    const el = root.value
    if (!el) return

    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.set(targets, { opacity: 0, y })

    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const items = Array.from(
            entry.target.querySelectorAll<HTMLElement>('[data-reveal]'),
          )
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            stagger,
          })
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    observer.observe(el)

    // Safety net: reveal anything still hidden after a short while, so content
    // is never stuck invisible (no-scroll views, screenshots, JS hiccups).
    fallback = window.setTimeout(() => {
      const hidden = targets.filter((t) => Number(gsap.getProperty(t, 'opacity')) < 1)
      if (hidden.length) {
        gsap.to(hidden, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger })
      }
      observer?.disconnect()
    }, 1800)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    if (fallback) clearTimeout(fallback)
  })
}
