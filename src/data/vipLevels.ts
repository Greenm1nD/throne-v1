export interface VipLevel {
  name: string
  /** Threshold XP required to reach this level */
  threshold: number
  /** Transparent champagne-gold tier medallion (uniform circular footprint) */
  crown: string
}

export const vipLevels: VipLevel[] = [
  { name: 'Noble', threshold: 0, crown: '/assets/images/medallion-noble.webp' },
  { name: 'Baron', threshold: 2500, crown: '/assets/images/medallion-baron.webp' },
  { name: 'Duke', threshold: 7500, crown: '/assets/images/medallion-duke.webp' },
  { name: 'Crown', threshold: 15000, crown: '/assets/images/medallion-crown.webp' },
  { name: 'Sovereign', threshold: 30000, crown: '/assets/images/medallion-sovereign.webp' },
  { name: 'Monarch', threshold: 60000, crown: '/assets/images/medallion-monarch.webp' },
]

/** Static player snapshot for the prototype dashboard. */
export const playerStatus = {
  currentLevel: 'Duke',
  xp: 7500,
  /** XP needed to reach the next tier (Crown) */
  nextThreshold: 15000,
}
