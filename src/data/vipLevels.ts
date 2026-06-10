export interface VipLevel {
  name: string
  /** Threshold XP required to reach this level */
  threshold: number
  /** Transparent crown icon for this tier */
  crown: string
}

export const vipLevels: VipLevel[] = [
  { name: 'Noble', threshold: 0, crown: '/assets/images/crown-noble.png' },
  { name: 'Baron', threshold: 2500, crown: '/assets/images/crown-baron.png' },
  { name: 'Duke', threshold: 7500, crown: '/assets/images/crown-duke.png' },
  { name: 'Crown', threshold: 15000, crown: '/assets/images/crown-crown.png' },
  { name: 'Sovereign', threshold: 30000, crown: '/assets/images/crown-sovereign.png' },
  { name: 'Monarch', threshold: 60000, crown: '/assets/images/crown-monarch.png' },
]

/** Static player snapshot for the prototype dashboard. */
export const playerStatus = {
  currentLevel: 'Duke',
  xp: 7500,
  /** XP needed to reach the next tier (Crown) */
  nextThreshold: 15000,
}
