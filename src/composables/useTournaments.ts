import { reactive } from 'vue'

/**
 * Tournament registration state. Which tournaments the member has entered is
 * persisted in localStorage (app-wide reactive set), so the "Entered ✓" state
 * survives navigation between the Kingdom list and a tournament's detail view.
 */
const KEY = 'throne.tournaments.entered'

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

const entered = reactive(new Set<string>(load()))

export function useTournaments() {
  function isEntered(slug: string) {
    return entered.has(slug)
  }
  function toggle(slug: string) {
    if (entered.has(slug)) entered.delete(slug)
    else entered.add(slug)
    localStorage.setItem(KEY, JSON.stringify([...entered]))
  }
  return { isEntered, toggle }
}
