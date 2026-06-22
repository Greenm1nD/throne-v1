/** Hall of Kings — season, podium champions and headline stats. */

export interface KingChampion {
  rank: 1 | 2 | 3
  name: string
  title: string
  winnings: string
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
  name: 'Season of the Lion',
  prizePool: '€500,000 Prize Pool',
  daysRemaining: '12 Days Remaining',
}

/** Ordered for the podium row: #2 · #1 · #3 (champion centred). */
export const kingsChampions: KingChampion[] = [
  {
    rank: 2,
    name: 'Lionheart',
    title: 'The Conqueror',
    winnings: '€18,750,000',
    image: '/assets/images/king-lion.webp',
    accent: 'silver',
  },
  {
    rank: 1,
    name: 'Kingmaker',
    title: 'Season Champion',
    winnings: '€24,500,000',
    image: '/assets/images/king-champion.webp',
    accent: 'gold',
  },
  {
    rank: 3,
    name: 'Crownlord',
    title: 'The Strategist',
    winnings: '€12,890,000',
    image: '/assets/images/king-crown.webp',
    accent: 'bronze',
  },
]

export const kingsStats: KingStat[] = [
  { label: 'Highest Win', value: '€2,450,000', description: 'Imperial Roulette', icon: 'trophy' },
  { label: 'Biggest Jackpot', value: '€10,892,750', description: 'Monarch Slots — Royal Pot', icon: 'spade' },
  { label: 'Season Prize Pool', value: '€500,000', description: 'For the top 50 players', icon: 'vault' },
  { label: 'Days Remaining', value: '12 Days', description: 'Until season ends', icon: 'calendar' },
]
