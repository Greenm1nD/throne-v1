export interface NavItem {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Casino', href: '/casino' },
  { label: 'Sports', href: '/sports' },
  { label: 'Live Casino', href: '/live-casino' },
  { label: 'VIP', href: '/vip' },
  { label: 'Kingdom', href: '/kingdom' },
  { label: 'Rewards', href: '/rewards' },
]

export interface FooterLink {
  label: string
  /** AppIcon glyph (left columns) */
  icon?: string
  /** FontIcon glyph from the fontello set (Connect column) */
  fontIcon?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

/** Four link columns flanking the centre crest: Throne · Experience | Support · Connect */
export const footerNav: FooterColumn[] = [
  {
    title: 'Throne',
    links: [
      { label: 'About Throne', icon: 'shield' },
      { label: 'The Kingdom', icon: 'crown' },
      { label: 'Royal Rewards', icon: 'gift' },
      { label: 'VIP Club', icon: 'star' },
      { label: 'The Court', icon: 'vault' },
      { label: 'Careers', icon: 'user' },
    ],
  },
  {
    title: 'Experience',
    links: [
      { label: 'Casino' },
      { label: 'Sports' },
      { label: 'Live Casino' },
      { label: 'Games' },
      { label: 'Tournaments' },
      { label: 'Promotions' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center' },
      { label: 'Responsible Gaming' },
      { label: 'Security' },
      { label: 'Terms of Service' },
      { label: 'Privacy Policy' },
      { label: 'Cookie Policy' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Discord', fontIcon: 'discord' },
      { label: 'Telegram', fontIcon: 'telegram' },
      { label: 'Instagram', fontIcon: 'instagram-circle' },
      { label: 'X (Twitter)', fontIcon: 'twitter-x' },
      { label: 'YouTube', fontIcon: 'youtube-play' },
    ],
  },
]

export const paymentMethods: string[] = [
  'Visa',
  'Mastercard',
  'PayPal',
  'Bitcoin',
  'Tether',
  'Ethereum',
]
