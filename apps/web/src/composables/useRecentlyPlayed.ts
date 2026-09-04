import { ref } from 'vue'

/**
 * Recently-played games. An ordered list of game slugs (most recent first)
 * kept in localStorage as app-wide reactive state; capped so the lobby row
 * stays a shortlist rather than a history.
 */
const KEY = 'throne.games.recent'
const MAX = 8

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

const recent = ref<string[]>(load())

export function useRecentlyPlayed() {
  function recordPlay(slug: string) {
    recent.value = [slug, ...recent.value.filter((s) => s !== slug)].slice(0, MAX)
    try {
      localStorage.setItem(KEY, JSON.stringify(recent.value))
    } catch {
      /* storage unavailable — the row lives for this session only */
    }
  }
  return { recent, recordPlay }
}
