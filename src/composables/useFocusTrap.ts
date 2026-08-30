import { nextTick, onScopeDispose, watch, type Ref } from 'vue'

/**
 * Keyboard focus containment for a dialog.
 *
 * All four dialogs declare `aria-modal="true"`, which promises assistive tech
 * that the rest of the page is unreachable. Nothing enforced it, so Tab walked
 * straight out into the page behind. This makes the promise true: it marks the
 * app root `inert` while a dialog is open and cycles Tab within the dialog.
 *
 * Dialogs stack (the 2FA seal opens over the login card), so the traps form a
 * stack too and only the innermost one handles Tab.
 */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const stack: HTMLElement[] = []
/** Parallel to `stack`: what to call when Escape reaches that dialog. */
const escapes = new Map<HTMLElement, () => void>()

function focusable(root: HTMLElement): HTMLElement[] {
  // offsetParent is null for display:none — skips a collapsed panel's controls.
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (n) => n.offsetParent !== null || n === document.activeElement,
  )
}

function onKeydown(e: KeyboardEvent) {
  const top = stack[stack.length - 1]
  if (!top) return

  if (e.key === 'Escape') {
    const close = escapes.get(top)
    if (close) {
      e.preventDefault()
      close()
    }
    return
  }
  if (e.key !== 'Tab') return

  const nodes = focusable(top)
  if (!nodes.length) {
    e.preventDefault()
    return
  }
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement
  const outside = !top.contains(active)

  if (e.shiftKey && (active === first || outside)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (active === last || outside)) {
    e.preventDefault()
    first.focus()
  }
}

export interface FocusTrapOptions {
  /**
   * Called when Escape is pressed while this is the innermost open dialog.
   * Pass it for any overlay that does not already handle Escape itself —
   * `aria-modal` promises a keyboard user a way out.
   */
  onEscape?: () => void
}

export function useFocusTrap(
  el: Ref<HTMLElement | null>,
  active: Ref<boolean>,
  options: FocusTrapOptions = {},
) {
  let trapped: HTMLElement | null = null
  let restoreTo: HTMLElement | null = null

  async function engage() {
    const previous = document.activeElement as HTMLElement | null
    await nextTick()
    const root = el.value
    if (!root || trapped) return

    // Only now: a bail-out above must not leave a stale element that a later
    // release() would steal focus to.
    restoreTo = previous
    trapped = root
    stack.push(root)
    if (options.onEscape) escapes.set(root, options.onEscape)
    if (stack.length === 1) {
      document.addEventListener('keydown', onKeydown, true)
      document.getElementById('app')?.setAttribute('inert', '')
    }
    // Some dialogs focus a specific field themselves (the 2FA code boxes) —
    // don't fight them.
    if (!root.contains(document.activeElement)) focusable(root)[0]?.focus()
  }

  function release() {
    if (!trapped) return
    const i = stack.lastIndexOf(trapped)
    if (i !== -1) stack.splice(i, 1)
    escapes.delete(trapped)
    trapped = null

    if (!stack.length) {
      document.removeEventListener('keydown', onKeydown, true)
      document.getElementById('app')?.removeAttribute('inert')
    }
    // Hand focus back to whatever opened the dialog, so the keyboard user is
    // not dropped at the top of the document.
    restoreTo?.focus?.()
    restoreTo = null
  }

  watch(active, (on) => (on ? engage() : release()), { immediate: true })
  onScopeDispose(release)
}
