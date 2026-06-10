export interface NavItem {
  label: string
  href: string
}

export const primaryNav: NavItem[] = [
  { label: 'Casino', href: '#casino' },
  { label: 'Sports', href: '#sports' },
  { label: 'Live Casino', href: '#live-casino' },
  { label: 'VIP', href: '#vip' },
  { label: 'Kingdom', href: '#kingdom' },
  { label: 'Rewards', href: '#rewards' },
]

export interface FooterColumn {
  title: string
  links: string[]
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Throne',
    links: ['About Throne', 'Fair Play', 'Security', 'Affiliates', 'Careers'],
  },
  {
    title: 'Information',
    links: [
      'Terms & Conditions',
      'Privacy Policy',
      'Responsible Gaming',
      'Support',
      'Contact Us',
    ],
  },
]

export const paymentMethods: string[] = [
  'Visa',
  'Mastercard',
  'Apple Pay',
  'Bitcoin',
  'Tether',
  'Ethereum',
]
