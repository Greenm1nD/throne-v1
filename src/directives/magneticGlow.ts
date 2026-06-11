import type { Directive } from 'vue'

/**
 * v-glow — a soft champagne light that follows the pointer across a card.
 * Implemented as a CSS radial-gradient overlay driven by --gx/--gy variables;
 * one rAF-throttled pointermove per element, removed on leave.
 * Skips entirely on touch devices and for reduced-motion users.
 */
export const magneticGlow: Directive<HTMLElement> = {
  mounted(el) {
    if (!window.matchMedia('(hover: hover)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const overlay = document.createElement('span')
    overlay.setAttribute('aria-hidden', 'true')
    Object.assign(overlay.style, {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      opacity: '0',
      transition: 'opacity 0.35s ease',
      background:
        'radial-gradient(180px circle at var(--gx, 50%) var(--gy, 50%), rgba(245,215,122,0.14), transparent 65%)',
      zIndex: '1',
    })
    const cs = getComputedStyle(el)
    if (cs.position === 'static') el.style.position = 'relative'
    el.appendChild(overlay)

    let raf = 0
    const move = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        overlay.style.setProperty('--gx', `${e.clientX - r.left}px`)
        overlay.style.setProperty('--gy', `${e.clientY - r.top}px`)
        raf = 0
      })
    }
    const enter = () => (overlay.style.opacity = '1')
    const leave = () => (overlay.style.opacity = '0')

    el.addEventListener('pointermove', move)
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointerleave', leave)
    ;(el as any).__glowCleanup = () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerenter', enter)
      el.removeEventListener('pointerleave', leave)
      overlay.remove()
    }
  },
  unmounted(el) {
    ;(el as any).__glowCleanup?.()
  },
}
