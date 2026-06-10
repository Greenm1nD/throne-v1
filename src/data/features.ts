import { type AssetKey } from './assets'

export interface FeatureMeta {
  label: string
  /** Icon key understood by IconBadge / AppIcon */
  icon: string
}

export interface Feature {
  title: string
  subtitle: string
  image: AssetKey
  cta: string
  href: string
  meta: FeatureMeta[]
}

export const features: Feature[] = [
  {
    title: 'The Royal Tables',
    subtitle: 'Live Casino',
    image: 'liveCasino',
    cta: 'Play Now',
    href: '#live-casino',
    meta: [],
  },
  {
    title: 'The Arena',
    subtitle: 'Sportsbook',
    image: 'sportsbookArena',
    cta: 'Bet Now',
    href: '#sports',
    meta: [
      { label: 'Football', icon: 'ball' },
      { label: 'F1', icon: 'flag' },
      { label: 'NBA', icon: 'hoop' },
      { label: 'UFC', icon: 'glove' },
    ],
  },
  {
    title: 'The Inner Circle',
    subtitle: 'VIP Club',
    image: 'vipClub',
    cta: 'Explore VIP',
    href: '#vip',
    meta: [],
  },
]
