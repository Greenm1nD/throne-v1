import { reactive } from 'vue'

/**
 * Royal Quests claim-state. Which quests the member has claimed is kept in
 * localStorage (app-wide reactive set). Progress itself is mock data on the
 * quest; a quest is claimable when progress >= goal and not yet claimed.
 */
const KEY = 'throne.quests.claimed'

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

const claimed = reactive(new Set<string>(load()))

export function useQuests() {
  function isClaimed(id: string) {
    return claimed.has(id)
  }
  function claim(id: string) {
    claimed.add(id)
    localStorage.setItem(KEY, JSON.stringify([...claimed]))
  }
  return { isClaimed, claim }
}
