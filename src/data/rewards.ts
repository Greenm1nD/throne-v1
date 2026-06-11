export interface Reward {
  title: string
  description: string
  /** Icon key understood by AppIcon */
  icon: string
}

export const royalTreasures: Reward[] = [
  { title: 'Royal Gifts', description: 'Hand-picked bonuses for the crowned', icon: 'gift' },
  { title: 'Treasury Rewards', description: 'Cashback drawn from the vault', icon: 'vault' },
  { title: 'Crown Benefits', description: 'Privileges that scale with your rank', icon: 'shield' },
  { title: 'Exclusive Promotions', description: 'Members-only seasonal events', icon: 'sparkle' },
  { title: 'Daily Rewards', description: 'A tribute paid every single day', icon: 'calendar' },
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
