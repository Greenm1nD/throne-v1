import { reactive } from 'vue'

/**
 * Favorite games. The set of favorited game ids (slugs) is kept in
 * localStorage as an app-wide reactive set, so the star persists across
 * pages, remounts and sessions.
 */
const KEY = 'throne.games.favorites'

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

const favorites = reactive(new Set<string>(load()))

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify([...favorites]))
  } catch {
    /* storage unavailable — favorites live for this session only */
  }
}

export function useFavorites() {
  function isFavorite(id: string) {
    return favorites.has(id)
  }
  function toggleFavorite(id: string) {
    favorites.has(id) ? favorites.delete(id) : favorites.add(id)
    persist()
  }
  return { favorites, isFavorite, toggleFavorite }
}
