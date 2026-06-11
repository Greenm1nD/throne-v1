/**
 * Content for the section pages (Casino, Sports, Live Casino, VIP, Kingdom).
 * Every page view is purely presentational and reads from here.
 *
 * `image` paths point at dedicated artwork; `fallback` is an existing asset
 * layered underneath so pages look finished before the art is generated.
 */

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
    cta: 'Join the Kingdom',
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
    { label: 'All Games', font: 'win-crown', active: true },
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
      name: 'Blackjack Lobby',
      stakes: '€10 – €10,000',
      players: 256,
      image: '/assets/images/live-blackjack.webp',
      fallback: '/assets/images/game-blackjack.webp',
    },
    {
      name: 'Roulette Lobby',
      stakes: '€1 – €5,000',
      players: 210,
      image: '/assets/images/live-roulette.webp',
      fallback: '/assets/images/game-roulette.webp',
    },
    {
      name: 'Baccarat Lobby',
      stakes: '€20 – €10,000',
      players: 189,
      image: '/assets/images/live-baccarat.webp',
      fallback: '/assets/images/game-baccarat.webp',
    },
    {
      name: 'Crazy Time',
      stakes: '€0.10 – €1,000',
      players: 512,
      image: '/assets/images/live-crazytime.webp',
      fallback: '/assets/images/game-slots.webp',
    },
    {
      name: 'Poker Lobby',
      stakes: '€5 – €2,000',
      players: 132,
      image: '/assets/images/live-poker.webp',
      fallback: '/assets/images/game-baccarat.webp',
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
    sub: 'Every bet, every game, every moment brings you closer to exclusive rewards and unforgettable experiences.',
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
      title: 'Cashback',
      sub: 'Up to 25%',
      tier: 'Duke+',
      image: '/assets/images/reward-card-cashback.webp',
      fallback: '/assets/images/hall-biggest-jackpot.webp',
    },
    {
      title: 'VIP Experiences',
      sub: 'Exclusive Events',
      tier: 'Crown+',
      image: '/assets/images/reward-card-vip.webp',
      fallback: '/assets/images/vip-club.webp',
    },
    {
      title: 'Luxury Travel',
      sub: 'Dream Destinations',
      tier: 'Sovereign',
      image: '/assets/images/reward-card-travel.webp',
      fallback: '/assets/images/treasury-banner.webp',
    },
    {
      title: 'Special Bonuses',
      sub: 'Free Bets & More',
      tier: 'Noble+',
      image: '/assets/images/reward-card-bonuses.webp',
      fallback: '/assets/images/hall-vip-member.webp',
    },
    {
      title: 'Premium Gifts',
      sub: 'Handpicked for You',
      tier: 'Duke+',
      image: '/assets/images/reward-card-gifts.webp',
      fallback: '/assets/images/hall-monthly-champion.webp',
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
    { icon: 'gift', title: 'Weekly Bonuses', sub: 'Exclusive bonuses every week' },
    { icon: 'crown', title: 'Exclusive Offers', sub: 'Handpicked offers just for you' },
    { icon: 'calendar', title: 'Birthday Rewards', sub: 'Special rewards on your special day' },
    { icon: 'sparkle', title: 'Surprise Rewards', sub: 'Unlock surprises as you play' },
    { icon: 'bolt', title: 'Unlock Experiences', sub: 'Access unforgettable luxury experiences' },
  ],
}

// ── KINGDOM ────────────────────────────────────────────────────────────
export const kingdomPage = {
  hero: {
    title: 'The Kingdom',
    tagline: 'Built for the crowned',
    sub: 'The Kingdom is our exclusive loyalty universe. Rise through the ranks, unlock royal privileges, and reign over endless rewards.',
    cta: 'Join the Kingdom',
    cta2: 'Kingdom Benefits',
    image: '/assets/images/page-kingdom-hero.webp',
    fallback: '/assets/images/hero-throne-room.webp',
    posY: '55%',
  },
  ranks: [
    { name: 'Noble', range: '0 – 5,000 XP', crown: '/assets/images/crown-noble.png' },
    { name: 'Baron', range: '5,001 – 15,000 XP', crown: '/assets/images/crown-baron.png' },
    { name: 'Duke', range: '15,001 – 50,000 XP', crown: '/assets/images/crown-duke.png', active: true },
    { name: 'Crown', range: '50,001 – 150,000 XP', crown: '/assets/images/crown-crown.png' },
    { name: 'Sovereign', range: '150,001+ XP', crown: '/assets/images/crown-sovereign.png' },
  ],
  benefits: <BandItem[]>[
    { icon: 'gift', title: 'Exclusive Bonuses', sub: 'Higher bonuses and tailored offers' },
    { icon: 'percent', title: 'Cashback Rewards', sub: 'Up to 25% weekly cashback' },
    { icon: 'bolt', title: 'Faster Payouts', sub: 'Priority withdrawals and processing' },
    { icon: 'headset', title: 'VIP Support', sub: '24/7 priority dedicated support' },
    { icon: 'trophy', title: 'Private Events', sub: 'Access to exclusive tournaments' },
    { icon: 'calendar', title: 'Birthday Rewards', sub: 'Special gifts on your special day' },
    { icon: 'star', title: 'Loyalty Points', sub: 'Earn points and climb the ranks' },
  ],
  status: {
    level: 'Duke',
    xp: 32450,
    next: 50000,
    toNext: '17,550 XP to reach CROWN',
  },
  cards: [
    {
      title: 'The Royal Vault',
      sub: 'Collect loyalty points and exchange for extraordinary rewards.',
      cta: 'Explore Rewards',
      image: '/assets/images/kingdom-vault.webp',
      fallback: '/assets/images/hall-biggest-jackpot.webp',
    },
    {
      title: 'Exclusive Tournaments',
      sub: 'Compete in high-stakes tournaments and win incredible prizes.',
      cta: 'View Tournaments',
      image: '/assets/images/kingdom-tournaments.webp',
      fallback: '/assets/images/hall-monthly-champion.webp',
    },
    {
      title: 'Kingdom News',
      sub: 'Stay updated with the latest news, offers and events.',
      cta: 'Discover More',
      image: '/assets/images/kingdom-news.webp',
      fallback: '/assets/images/hall-vip-member.webp',
    },
  ],
  finale: {
    title: "This isn't just loyalty. It's legacy.",
    sub: 'Join the Kingdom. Claim your throne.',
    cta: 'Join the Kingdom',
  },
}
