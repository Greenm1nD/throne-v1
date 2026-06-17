import { onUnmounted, reactive } from 'vue'
import type { CourtNoble } from '@/data/pages'

/**
 * Live Royal Court. Clones the static leaderboards and gently drifts crowns
 * upward over time so "Updating live" is truthful. Increments are tiny relative
 * to the gaps between nobles, so rank order stays stable (no jarring reorders).
 * Reduced-motion users get the static numbers (no ticking).
 */
type Lists = Record<string, CourtNoble[]>

export function useCourt(source: Lists) {
  const lists = reactive<Lists>(JSON.parse(JSON.stringify(source)))

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) {
    const id = window.setInterval(() => {
      for (const key of Object.keys(lists)) {
        const arr = lists[key]
        // Bump two random nobles by a small amount each tick.
        for (let k = 0; k < 2; k++) {
          const n = arr[Math.floor(Math.random() * arr.length)]
          if (n) n.points += Math.floor(Math.random() * 400) + 40
        }
      }
    }, 2600)
    onUnmounted(() => clearInterval(id))
  }

  return lists
}
