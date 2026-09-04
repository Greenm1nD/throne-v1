export interface Reward {
  title: string
  description: string
  /** Icon key understood by AppIcon (fallback) */
  icon: string
  /** Premium gold 3D icon (transparent PNG) */
  image: string
}

export const royalTreasures: Reward[] = [
  { title: 'Royal Gifts', description: 'Hand-picked bonuses for the crowned', icon: 'gift', image: '/assets/images/reward-gifts.png' },
  { title: 'Treasury Rewards', description: 'Cashback drawn from the vault', icon: 'vault', image: '/assets/images/reward-vault.png' },
  { title: 'Crown Benefits', description: 'Privileges that scale with your rank', icon: 'shield', image: '/assets/images/reward-shield.png' },
  { title: 'Exclusive Promotions', description: 'Members-only seasonal events', icon: 'sparkle', image: '/assets/images/reward-promo.png' },
  { title: 'Daily Rewards', description: 'A tribute paid every single day', icon: 'calendar', image: '/assets/images/reward-daily.png' },
]

export interface CourtChannel {
  label: string
  icon: string
  href: string
}

export const courtChannels: CourtChannel[] = [
  { label: 'Discord', icon: 'discord', href: '#discord' },
  { label: 'Telegram', icon: 'telegram', href: '#telegram' },
  { label: 'Leaderboard', icon: 'trophy', href: '#leaderboard' },
  { label: 'Tournaments', icon: 'swords', href: '#tournaments' },
]

export const socialLinks: CourtChannel[] = [
  { label: 'Discord', icon: 'discord', href: '#discord' },
  { label: 'Telegram', icon: 'telegram', href: '#telegram' },
  { label: 'X', icon: 'x', href: '#x' },
  { label: 'Instagram', icon: 'instagram', href: '#instagram' },
  { label: 'YouTube', icon: 'youtube', href: '#youtube' },
]
