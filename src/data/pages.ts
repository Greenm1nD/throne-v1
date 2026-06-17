/**
 * Content for the section pages (Casino, Sports, Live Casino, VIP, Kingdom).
 * Every page view is purely presentational and reads from here.
 *
 * `image` paths point at dedicated artwork; `fallback` is an existing asset
 * layered underneath so pages look finished before the art is generated.
 */

import { joinCta, finaleSub } from '@/config'

export interface StripItem {
  label: string
  /** fontello glyph (preferred) */
  font?: string
  /** AppIcon glyph */
  icon?: string
  active?: boolean
}

export interface BandItem {
  icon?: string
  font?: string
  title: string
  sub?: string
}

// ── CASINO ─────────────────────────────────────────────────────────────
export const casinoPage = {
  hero: {
    title: 'Casino',
    tagline: 'Where fortune bows to kings',
    sub: 'Enter a world of endless wins',
    cta: 'Play Now',
    image: '/assets/images/page-casino-hero.webp',
    fallback: '/assets/images/game-roulette.webp',
    video: '/assets/images/page-casino-hero-video.mp4',
    posY: '62%',
  },
  categories: <StripItem[]>[
    { label: 'Roulette', font: 'card-roulette' },
    { label: 'Blackjack', font: 'card-blackjack' },
    { label: 'Slots', font: 'slots' },
    { label: 'Baccarat', font: 'card-baccarat' },
    { label: 'Poker', font: 'card-poker' },
    { label: 'Table Games', font: 'games' },
    { label: 'Jackpots', font: 'jackpot-1' },
    { label: 'Live Casino', font: 'nav-casino' },
  ],
  jackpot: {
    label: 'Progressive Jackpot',
    amount: '€10,892,750',
    cta: 'Play to Win',
    image: '/assets/images/casino-jackpot.webp',
    fallback: '/assets/images/hall-biggest-jackpot.webp',
  },
  vipBand: {
    title: 'VIP Experience',
    sub: 'Unlock royal privileges',
    items: <BandItem[]>[
      { icon: 'star', title: 'Exclusive Bonuses' },
      { icon: 'bolt', title: 'Fast Payouts' },
      { icon: 'headset', title: 'VIP Support' },
      { icon: 'crown', title: 'Private Events' },
      { icon: 'percent', title: 'Cashback Rewards' },
    ],
    ctaLead: 'Ready to become royalty?',
    cta: joinCta,
  },
}

// ── SPORTS ─────────────────────────────────────────────────────────────
export const sportsPage = {
  hero: {
    title: 'Sports',
    tagline: 'Bet on greatness',
    sub: 'Champions are made here',
    cta: 'Bet Now',
    icon: 'trophy',
    image: '/assets/images/page-sports-hero.webp',
    fallback: '/assets/images/sportsbook-arena.webp',
    posY: '58%',
  },
  sports: <StripItem[]>[
    { label: 'Soccer', font: 'football-ball', active: true },
    { label: 'Basketball', icon: 'hoop' },
    { label: 'Tennis', icon: 'tennis' },
    { label: 'Boxing', icon: 'glove' },
    { label: 'American Football', icon: 'ball' },
    { label: 'Ice Hockey', icon: 'hockey' },
    { label: 'MMA', icon: 'glove' },
    { label: 'Golf', icon: 'golf' },
    { label: 'Volleyball', icon: 'volleyball' },
  ],
  /**
   * Third-party sportsbook embed. Set `src` to the provider's iframe URL
   * (BetConstruct / Betradar / etc.) and the frame renders live; while it is
   * empty, a THRONE-styled loading shell is shown instead.
   */
  sportsbook: {
    src: '',
    events: '1,313 Live Events',
    providers: ['Throne Arena', 'BetConstruct', 'Betradar'],
    note: 'The match list, odds and bet slip are served inside the provider frame — the THRONE shell (header, navigation, theming and footer) wraps around it.',
  },
  boost: {
    title: 'Boost your winnings',
    amount: 'Up to 25%',
    sub: 'Sports welcome bonus',
    cta: 'Claim Bonus',
    image: '/assets/images/sports-boost.webp',
    fallback: '/assets/images/sportsbook-arena.webp',
  },
  band: <BandItem[]>[
    { icon: 'bolt', title: 'Live Betting', sub: 'Bet in-play on thousands of events' },
    { icon: 'clock', title: 'Fast Payouts', sub: 'Your winnings, paid instantly' },
    { icon: 'chart', title: 'Best Odds', sub: 'Competitive odds every single day' },
    { icon: 'headset', title: '24/7 Support', sub: 'We are here to help you win' },
    { icon: 'crown', title: 'VIP Rewards', sub: 'Exclusive benefits for our members' },
  ],
}

// ── LIVE CASINO ────────────────────────────────────────────────────────
export const livePage = {
  hero: {
    title: 'Live Casino',
    tagline: 'Real dealers. Real time. Real throne.',
    cta: 'Play Live Now',
    image: '/assets/images/page-live-hero.webp',
    fallback: '/assets/images/live-casino.webp',
    posY: '32%',
    features: <BandItem[]>[
      { icon: 'user', title: 'Real Dealers' },
      { icon: 'chat', title: 'Live Chat' },
      { icon: 'monitor', title: 'HD Quality' },
      { icon: 'check', title: 'Fair Play' },
    ],
  },
  categories: <StripItem[]>[
    { label: 'All Games', icon: 'crown', active: true },
    { label: 'Blackjack', font: 'card-blackjack' },
    { label: 'Roulette', font: 'card-roulette' },
    { label: 'Baccarat', font: 'card-baccarat' },
    { label: 'Poker', font: 'card-poker' },
    { label: 'Game Shows', font: 'game-shows' },
    { label: 'Sic Bo', font: 'dice' },
    { label: 'Dragon Tiger', font: 'games' },
    { label: 'Andar Bahar', font: 'card-all' },
  ],
  tables: [
    {
      name: 'Blackjack Live',
      provider: 'Evolution',
      stakes: '€10 – €10,000',
      players: 256,
      image: '/assets/images/live-blackjack.webp',
      hot: true,
    },
    {
      name: 'Baccarat Live',
      provider: 'Pragmatic Play Live',
      stakes: '€20 – €10,000',
      players: 189,
      image: '/assets/images/live-baccarat.webp',
    },
    {
      name: 'Crazy Time',
      provider: 'Evolution',
      stakes: '€0.10 – €1,000',
      players: 512,
      image: '/assets/images/live-crazytime.webp',
      hot: true,
    },
    {
      name: 'Poker Live',
      provider: 'Pragmatic Play Live',
      stakes: '€5 – €2,000',
      players: 132,
      image: '/assets/images/live-poker.webp',
      isNew: true,
    },
  ],
  exclusive: {
    eyebrow: 'Exclusive',
    title: 'Live Experiences',
    sub: 'Play with professional dealers from top studios worldwide.',
    cta: 'Discover More',
    image: '/assets/images/live-exclusive.webp',
    fallback: '/assets/images/hall-vip-member.webp',
  },
  band: <BandItem[]>[
    { icon: 'bolt', title: '24/7 Live Dealers', sub: 'Round the clock live casino action' },
    { icon: 'shield', title: 'Secure & Trusted', sub: 'Licensed studios and certified games' },
    { icon: 'chart', title: 'Fast Payouts', sub: 'Winnings paid instantly' },
    { icon: 'crown', title: 'VIP Treatment', sub: 'Exclusive tables for our VIP members' },
    { icon: 'monitor', title: 'Multi-Device', sub: 'Play seamlessly on any device' },
  ],
}

// ── VIP ────────────────────────────────────────────────────────────────
export const vipPage = {
  hero: {
    title: 'VIP',
    tagline: 'Exclusive. Private. Royal.',
    sub: 'Elevate your experience to the next level with elite privileges designed for kings.',
    cta: 'Become VIP',
    cta2: 'VIP Benefits',
    image: '/assets/images/page-vip-hero.webp',
    fallback: '/assets/images/vip-club.webp',
    posY: '60%',
  },
  benefits: <StripItem[]>[
    { label: 'Dedicated Account Manager', icon: 'user' },
    { label: 'Exclusive Bonuses', icon: 'gift' },
    { label: 'Higher Cashback', icon: 'percent' },
    { label: 'Faster Withdrawals', icon: 'bolt' },
    { label: 'Private Tournaments', icon: 'trophy' },
    { label: 'Invite Only Events', icon: 'crown' },
    { label: '24/7 Priority Support', icon: 'headset' },
    { label: 'Personalized VIP Offers', icon: 'sparkle' },
  ],
  tiers: [
    {
      name: 'Noble',
      range: '0 – 5,000 XP',
      crown: '/assets/images/crown-noble.png',
      perks: ['Welcome Bonus', '24/7 Support', 'Daily Rewards'],
    },
    {
      name: 'Baron',
      range: '5,001 – 15,000 XP',
      crown: '/assets/images/crown-baron.png',
      perks: ['Higher Cashback', 'Faster Withdrawals', 'Exclusive Promotions'],
    },
    {
      name: 'Duke',
      range: '15,001 – 50,000 XP',
      crown: '/assets/images/crown-duke.png',
      perks: ['Personal Account Manager', 'VIP Cashback', 'Private Events Access'],
      featured: true,
    },
    {
      name: 'Crown',
      range: '50,001 – 150,000 XP',
      crown: '/assets/images/crown-crown.png',
      perks: ['Dedicated VIP Host', 'Highest Cashback', 'Priority Withdrawals'],
    },
    {
      name: 'Sovereign',
      range: '150,001+ XP',
      crown: '/assets/images/crown-sovereign.png',
      perks: ['Exclusive VIP Lounge', 'Invite Only Tournaments', 'Custom Offers & Gifts'],
    },
  ],
  lounge: {
    title: 'VIP Lounge',
    sub: 'A private world of luxury, reserved for our elite members.',
    cta: 'Enter VIP Lounge',
    image: '/assets/images/vip-lounge.webp',
    fallback: '/assets/images/vip-club.webp',
  },
  band: <BandItem[]>[
    { icon: 'percent', title: 'Higher Cashback', sub: 'Up to 25%' },
    { icon: 'bolt', title: 'Faster Payouts', sub: 'Priority processing' },
    { icon: 'crown', title: 'Exclusive Events', sub: 'VIP members only' },
    { icon: 'gift', title: 'Birthday Rewards', sub: 'Special gifts' },
    { icon: 'star', title: 'Loyalty Bonuses', sub: 'Monthly rewards' },
    { icon: 'headset', title: 'VIP Support', sub: '24/7 priority' },
  ],
}

// ── REWARDS ────────────────────────────────────────────────────────────
export const rewardsPage = {
  hero: {
    title: 'Rewards',
    tagline: 'Loyalty rewarded. Greatness recognized.',
    sub: 'Your play converts to points — and points to a way of life. Trade them for private jet hours, concierge travel, and gifts that never see a casino floor.',
    cta: 'Explore Rewards',
    image: '/assets/images/page-rewards-hero.webp',
    fallback: '/assets/images/treasury-banner.webp',
  },
  tiers: {
    title: 'Loyalty Tiers',
    sub: 'The more you play, the more you earn.',
    note: 'The higher you rise, the greater your rewards.',
    cta: 'View All Tiers',
  },
  redeem: [
    {
      title: 'Private Jet Hours',
      sub: 'Wheels up, on the house',
      tier: 'Sovereign',
      points: '250,000 pts',
      image: '/assets/images/reward-card-travel.webp',
      fallback: '/assets/images/treasury-banner.webp',
    },
    {
      title: 'Concierge & Events',
      sub: 'Courtside, backstage, front row',
      tier: 'Crown+',
      points: '90,000 pts',
      image: '/assets/images/reward-card-vip.webp',
      fallback: '/assets/images/vip-club.webp',
    },
    {
      title: 'Five-Star Escapes',
      sub: "Suites in the world's finest",
      tier: 'Crown+',
      points: '120,000 pts',
      image: '/assets/images/reward-card-bonuses.webp',
      fallback: '/assets/images/hall-vip-member.webp',
    },
    {
      title: 'Bespoke Gifts',
      sub: 'Watches, jewellery, the rare',
      tier: 'Duke+',
      points: '60,000 pts',
      image: '/assets/images/reward-card-gifts.webp',
      fallback: '/assets/images/hall-monthly-champion.webp',
    },
    {
      title: 'Royal Cashback',
      sub: 'Up to 25%, paid in real money',
      tier: 'Duke+',
      points: 'Automatic',
      image: '/assets/images/reward-card-cashback.webp',
      fallback: '/assets/images/hall-biggest-jackpot.webp',
    },
  ],
  summary: {
    level: 'Duke',
    xp: 32450,
    next: 50000,
    toNext: '17,550 XP to reach CROWN',
    stats: [
      { icon: 'star', label: 'Available Points', value: '12,450' },
      { icon: 'gift', label: 'Redeemed Rewards', value: '24' },
      { icon: 'sparkle', label: 'Total Value', value: '€2,450' },
    ],
    cta: 'Go to Rewards Wallet',
  },
  band: <BandItem[]>[
    { icon: 'star', title: 'Earn Points', sub: 'Earn points on every bet across all games' },
    { icon: 'gift', title: 'Real-World Privileges', sub: 'Trade points for travel, gifts and access' },
    { icon: 'crown', title: 'Exclusive Offers', sub: 'Handpicked offers just for you' },
    { icon: 'calendar', title: 'Birthday Rewards', sub: 'Special rewards on your special day' },
    { icon: 'sparkle', title: 'Surprise Rewards', sub: 'Unlock surprises as you play' },
    { icon: 'bolt', title: 'Unlock Experiences', sub: 'Access unforgettable luxury experiences' },
  ],
}

// ── KINGDOM ────────────────────────────────────────────────────────────
// The Kingdom is THRONE's living, competitive realm — a community hub of
// leaderboards, tournaments, the running season and royal news. (The loyalty
// programme itself — tiers & perks — lives on the VIP page; the points store
// lives on Rewards.)
export interface CourtNoble {
  rank: number
  name: string
  tier: string
  crown: string
  points: number
  /** places gained (+) or lost (−) since last update; 0 = held */
  change: number
  you?: boolean
}

export interface Tournament {
  name: string
  game: string
  status: 'live' | 'upcoming'
  prize: string
  entry: string
  players: number
  when: string
  image: string
  fallback: string
}

export interface Decree {
  tag: string
  date: string
  title: string
  sub: string
}

export const kingdomPage = {
  hero: {
    title: 'The Kingdom',
    tagline: 'Where nobles compete for the crown',
    sub: 'The living realm of THRONE. Climb the Royal Court, enter high-stakes tournaments, and carve your name into the season.',
    cta: joinCta,
    cta2: 'View the Court',
    image: '/assets/images/page-kingdom-hero.webp',
    fallback: '/assets/images/hero-throne-room.webp',
    posY: '55%',
  },
  season: {
    chapter: 'Season III',
    name: 'Season of the Lion',
    pool: '€250,000',
    ends: '14d 06h 22m',
    note: 'Every wager earns crowns toward the season throne. The highest noble when the season closes is crowned Champion of the Realm — and keeps the prize for life.',
  },
  // The Royal Court — this season's live leaderboard.
  court: <CourtNoble[]>[
    { rank: 1, name: 'BlackKingV', tier: 'Sovereign', crown: '/assets/images/crown-sovereign.png', points: 1284500, change: 0 },
    { rank: 2, name: 'LadyAurelia', tier: 'Crown', crown: '/assets/images/crown-crown.png', points: 1090250, change: 1 },
    { rank: 3, name: 'DonRaphael', tier: 'Crown', crown: '/assets/images/crown-crown.png', points: 980700, change: -1 },
    { rank: 4, name: 'KingMaker', tier: 'Duke', crown: '/assets/images/crown-duke.png', points: 742300, change: 2, you: true },
    { rank: 5, name: 'IvoryTsar', tier: 'Duke', crown: '/assets/images/crown-duke.png', points: 698120, change: 0 },
    { rank: 6, name: 'VelvetDuchess', tier: 'Baron', crown: '/assets/images/crown-baron.png', points: 511940, change: 3 },
    { rank: 7, name: 'GoldenHawk', tier: 'Baron', crown: '/assets/images/crown-baron.png', points: 470310, change: -2 },
    { rank: 8, name: 'NightProvost', tier: 'Noble', crown: '/assets/images/crown-noble.png', points: 388600, change: 1 },
  ],
  // Royal Tournaments — live & upcoming.
  tournaments: <Tournament[]>[
    {
      name: 'The Midnight Joust',
      game: 'Live Blackjack',
      status: 'live',
      prize: '€50,000',
      entry: '5,000 pts',
      players: 412,
      when: 'Ends in 1h 40m',
      image: '/assets/images/live-blackjack.webp',
      fallback: '/assets/images/hall-monthly-champion.webp',
    },
    {
      name: 'Crown Roulette Royale',
      game: 'Roulette',
      status: 'upcoming',
      prize: '€120,000',
      entry: '12,000 pts',
      players: 268,
      when: 'Starts in 3h 05m',
      image: '/assets/images/game-roulette.webp',
      fallback: '/assets/images/casino-jackpot.webp',
    },
    {
      name: "The Sovereign's Cup",
      game: 'High-Roller Slots',
      status: 'upcoming',
      prize: '€500,000',
      entry: 'Crown tier & above',
      players: 96,
      when: 'Opens Friday, 20:00',
      image: '/assets/images/casino-jackpot.webp',
      fallback: '/assets/images/hall-biggest-jackpot.webp',
    },
  ],
  // Royal Decrees — kingdom news & happenings.
  decrees: <Decree[]>[
    { tag: 'Decree', date: 'Today', title: 'Season of the Lion has begun', sub: 'Crowns count double on every live table through the weekend.' },
    { tag: 'Event', date: 'In 2 days', title: 'The Masquerade Ball returns', sub: 'An invite-only night for Crown tier and above — Vienna, June 28.' },
    { tag: 'Champion', date: 'Last week', title: 'DonRaphael claimed the Diamond Joust', sub: 'A €75,000 pot and a place in the Hall of Kings.' },
  ],
  finale: {
    title: "This isn't just loyalty. It's legacy.",
    sub: finaleSub,
    cta: joinCta,
  },
}
