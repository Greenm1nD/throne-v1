/**
 * Hall of Kings — seasonal leaderboard. Scored in CROWNS (season points earned
 * by play), never in money: no fabricated winnings or jackpot figures. All
 * entries are demo data and are labeled as such in the UI ("Season XII · demo").
 */

import { RANKS } from './progression'

export interface KingChampion {
  rank: 1 | 2 | 3
  name: string
  /** Ladder rank the player holds (see src/data/progression.ts). */
  title: string
  /**
   * Season crowns — leaderboard points, not currency.
   */
  crowns: string
  /** Portrait (rank 1) or insignia (ranks 2–3) artwork */
  image: string
  accent: 'gold' | 'silver' | 'bronze'
}

export interface KingStat {
  label: string
  value: string
  description: string
  /** AppIcon glyph key */
  icon: string
}

export const kingsSeason = {
  name: 'Season XII',
  measure: 'Ranked by Crowns — season points, not money',
  daysRemaining: '12 Days Remaining',
}

/** Ordered for the podium row: #2 · #1 · #3 (champion centred). */
export const kingsChampions: KingChampion[] = [
  {
    rank: 2,
    name: 'Lionheart',
    title: 'Sovereign',
    crowns: '41,380 Crowns',
    image: '/assets/images/king-lion.webp',
    accent: 'silver',
  },
  {
    rank: 1,
    name: 'Kingmaker',
    title: 'Monarch',
    crowns: '48,210 Crowns',
    image: '/assets/images/king-champion.webp',
    accent: 'gold',
  },
  {
    rank: 3,
    name: 'Crownlord',
    title: 'Crown',
    crowns: '36,905 Crowns',
    image: '/assets/images/king-crown.webp',
    accent: 'bronze',
  },
]

const leader = kingsChampions.find((c) => c.rank === 1)!

/** Honest-shaped: counts computed from the data above and the real ladder. */
export const kingsStats: KingStat[] = [
  { label: 'Leading Score', value: leader.crowns, description: `${leader.name} — ${leader.title}`, icon: 'trophy' },
  { label: 'On the Podium', value: `${kingsChampions.length} Ranked`, description: 'Demo roster — the full board arrives with the backend', icon: 'crown' },
  { label: 'Rank Titles', value: `${RANKS.length} Titles`, description: `${RANKS[0].name} to ${RANKS[RANKS.length - 1].name}, rates published`, icon: 'chart' },
  { label: 'Days Remaining', value: '12 Days', description: 'Until the season closes', icon: 'calendar' },
]
