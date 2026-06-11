export interface KingStat {
  label: string
  value: string
  /** Secondary line under the value */
  detail: string
  /** AppIcon glyph key */
  icon: string
  cta: string
}

export const hallOfKings: KingStat[] = [
  {
    label: 'Highest Win',
    value: '€2,450,000',
    detail: 'Imperial Roulette · single spin',
    icon: 'trophy',
    cta: 'See the Win',
  },
  {
    label: 'Biggest Jackpot',
    value: '€10,892,750',
    detail: 'Monarch Slots · royal pot',
    icon: 'sparkle',
    cta: 'Chase It',
  },
  {
    label: 'VIP Member',
    value: 'KINGMAKER',
    detail: 'Sovereign tier · 3 years crowned',
    icon: 'crown',
    cta: 'Meet the Court',
  },
  {
    label: 'Monthly Champion',
    value: 'LIONHEART',
    detail: 'June leaderboard sovereign',
    icon: 'swords',
    cta: 'View Leaderboard',
  },
]
