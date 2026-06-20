/**
 * Category pages (branch feature/category-pages).
 *
 * THRONE-native dedicated pages for the product categories: E-Sports, Live
 * (in-play), Virtual, Games and Poker. Sport / Casino / Live Casino already
 * have their own full views and are linked from the shared CategoryNav strip.
 *
 * Each page is driven by one config (hero + content) so the set stays
 * consistent. Two content modes:
 *   - 'events' → matchup rows with odds (esports, live, virtual)
 *   - 'grid'   → image cards (games, poker)
 */

export interface CategoryNavItem {
  label: string
  to: string
  icon: string
  /** Throne Club gets a slightly more special hover/active treatment. */
  special?: boolean
}

/**
 * The single primary nav line (casino-first), matching the header reference.
 * Products first, then THRONE brand sections. One source of truth for the bar.
 */
export const categoryNav: CategoryNavItem[] = [
  { label: 'Casino', to: '/casino', icon: 'chip' },
  { label: 'Sports', to: '/sports', icon: 'bolt' },
  { label: 'Live Casino', to: '/live-casino', icon: 'monitor' },
  { label: 'E-Sport', to: '/esports', icon: 'trophy' },
  { label: 'Virtuals', to: '/virtual', icon: 'headset' },
  { label: 'Games', to: '/games', icon: 'gamepad' },
  { label: 'Poker', to: '/poker', icon: 'spade' },
  // VIP temporarily removed from nav (per request) — route still exists; restore when asked.
  { label: 'Kingdom', to: '/kingdom', icon: 'castle' },
  { label: 'Rewards', to: '/rewards', icon: 'gift' },
]

interface EventRow {
  league: string
  a: string
  b: string
  oddsA: string
  oddsX?: string
  oddsB: string
  when: string
  live?: boolean
}
interface GridItem {
  name: string
  meta: string
  image: string
  tag?: string
}
export interface CategoryConfig {
  slug: string
  mode: 'events' | 'grid'
  hero: {
    title: string
    tagline: string
    sub: string
    cta: string
    cta2?: string
    image: string
    imageMobile?: string
    fallback: string
    posY?: string
  }
  sectionTitle: string
  sectionSub: string
  events?: EventRow[]
  items?: GridItem[]
  band: { icon: string; title: string; sub: string }[]
  cta: { title: string; sub: string }
}

export const categoryPages: Record<string, CategoryConfig> = {
  esports: {
    slug: 'esports',
    mode: 'events',
    hero: {
      title: 'E-Sports',
      tagline: 'The arena never sleeps',
      sub: 'Bet on the biggest titles in competitive gaming — live odds, deep markets and tournament finals from every region.',
      cta: 'Explore Markets',
      image: '/assets/images/page-sports-hero.webp',
      imageMobile: '/assets/images/hero-mobile-sports.webp?v=2',
      fallback: '/assets/images/sportsbook-arena.webp',
      posY: '45%',
    },
    sectionTitle: 'Featured Matches',
    sectionSub: 'Top esports events trading right now',
    events: [
      { league: 'CS2 · BLAST Premier', a: 'NAVI', b: 'FaZe', oddsA: '1.72', oddsB: '2.05', when: 'Live', live: true },
      { league: 'Dota 2 · The International', a: 'Team Spirit', b: 'Gaimin Gladiators', oddsA: '1.55', oddsB: '2.40', when: '18:30' },
      { league: 'LoL · Worlds', a: 'T1', b: 'Gen.G', oddsA: '1.90', oddsB: '1.85', when: '20:00' },
      { league: 'Valorant · Champions', a: 'Sentinels', b: 'Fnatic', oddsA: '2.10', oddsB: '1.68', when: 'Tomorrow' },
      { league: 'Rainbow Six', a: 'G2', b: 'Spacestation', oddsA: '1.80', oddsB: '1.95', when: 'Tomorrow' },
      { league: 'King of Glory', a: 'AG', b: 'TES', oddsA: '1.95', oddsB: '1.80', when: 'Fri' },
    ],
    band: [
      { icon: 'monitor', title: 'Every Major Title', sub: 'CS2 · Dota · LoL · Valorant' },
      { icon: 'bolt', title: 'Live In-Play', sub: 'Map & round markets' },
      { icon: 'chart', title: 'Deep Markets', sub: 'Hundreds per match' },
      { icon: 'trophy', title: 'Tournament Finals', sub: 'Every region covered' },
    ],
    cta: { title: 'Back the best in the game', sub: 'Live esports odds, settled in seconds.' },
  },

  live: {
    slug: 'live',
    mode: 'events',
    hero: {
      title: 'Live Betting',
      tagline: 'Every second is a market',
      sub: 'In-play betting across thousands of events — odds that move with the game and cash-out whenever you choose.',
      cta: 'View Live Events',
      image: '/assets/images/page-sports-hero.webp',
      imageMobile: '/assets/images/hero-mobile-sports.webp?v=2',
      fallback: '/assets/images/sportsbook-arena.webp',
      posY: '50%',
    },
    sectionTitle: 'Live Now',
    sectionSub: 'In-play across the board',
    events: [
      { league: 'Football · Premier League', a: 'Arsenal', b: 'Chelsea', oddsA: '2.10', oddsX: '3.30', oddsB: '3.05', when: "67' · 1–1", live: true },
      { league: 'Tennis · ATP Finals', a: 'Alcaraz', b: 'Sinner', oddsA: '1.80', oddsB: '1.95', when: 'Set 2', live: true },
      { league: 'Basketball · NBA', a: 'Lakers', b: 'Celtics', oddsA: '1.90', oddsB: '1.88', when: 'Q3', live: true },
      { league: 'Football · La Liga', a: 'Real Madrid', b: 'Barcelona', oddsA: '2.25', oddsX: '3.40', oddsB: '2.80', when: "34' · 0–0", live: true },
      { league: 'Ice Hockey · NHL', a: 'Rangers', b: 'Bruins', oddsA: '1.75', oddsB: '2.10', when: 'P2', live: true },
      { league: 'Volleyball · Serie A', a: 'Perugia', b: 'Trento', oddsA: '1.60', oddsB: '2.30', when: 'Set 3', live: true },
    ],
    band: [
      { icon: 'bolt', title: 'Real-Time Odds', sub: 'Prices that move live' },
      { icon: 'chart', title: 'Cash Out', sub: 'Lock profit anytime' },
      { icon: 'ball', title: 'Thousands of Events', sub: 'Daily, around the clock' },
      { icon: 'play', title: 'Live Streaming', sub: 'Watch as you bet' },
    ],
    cta: { title: 'Bet the moment', sub: 'In-play odds across every major sport.' },
  },

  virtual: {
    slug: 'virtual',
    mode: 'events',
    hero: {
      title: 'Virtual Sports',
      tagline: 'No off-season',
      sub: 'Realistic, provably-fair virtual sports running around the clock — a new event every few minutes, results in seconds.',
      cta: 'Enter the Arena',
      image: '/assets/images/page-sports-hero.webp',
      imageMobile: '/assets/images/hero-mobile-sports.webp?v=2',
      fallback: '/assets/images/sportsbook-arena.webp',
      posY: '55%',
    },
    sectionTitle: 'Starting Soon',
    sectionSub: 'A new event every few minutes',
    events: [
      { league: 'Virtual Football · Champions Cup', a: 'Royal United', b: 'Crown City', oddsA: '1.85', oddsX: '3.10', oddsB: '2.20', when: 'in 02:14' },
      { league: 'Virtual Horse Racing', a: 'Ascot Sprint', b: '12 runners', oddsA: '3.50', oddsB: '—', when: 'in 01:05' },
      { league: 'Virtual Tennis', a: 'Player A', b: 'Player B', oddsA: '1.70', oddsB: '2.05', when: 'in 00:48' },
      { league: 'Virtual Greyhounds', a: 'Trap 1', b: '8 runners', oddsA: '2.80', oddsB: '—', when: 'in 03:30' },
      { league: 'Virtual Basketball', a: 'North Kings', b: 'South Dukes', oddsA: '1.92', oddsB: '1.86', when: 'in 04:00' },
      { league: 'Virtual Speedway', a: 'Grid A', b: '6 riders', oddsA: '4.10', oddsB: '—', when: 'in 05:12' },
    ],
    band: [
      { icon: 'bolt', title: 'Every Few Minutes', sub: 'No waiting for fixtures' },
      { icon: 'shield', title: 'Provably Fair', sub: 'RNG-certified results' },
      { icon: 'hockey', title: 'Many Disciplines', sub: 'Football to racing' },
      { icon: 'chart', title: 'Instant Settlement', sub: 'Paid in seconds' },
    ],
    cta: { title: 'The game never stops', sub: 'Virtual sports, every few minutes.' },
  },

  games: {
    slug: 'games',
    mode: 'grid',
    hero: {
      title: 'Games',
      tagline: 'Fast play, big multipliers',
      sub: 'Instant and crash games — quick rounds, transparent maths and multipliers that climb into the thousands.',
      cta: 'Play Now',
      image: '/assets/images/page-casino-hero-2.webp',
      imageMobile: '/assets/images/hero-mobile-casino.webp',
      fallback: '/assets/images/page-casino-hero.webp',
      posY: '50%',
    },
    sectionTitle: 'Instant Games',
    sectionSub: 'One tap, one round, instant result',
    items: [
      { name: 'Aviator', meta: 'Crash · up to x1000', image: '/assets/images/games/bounty-gold.webp', tag: 'Hot' },
      { name: 'Gates of Olympus', meta: 'Instant · x5000', image: '/assets/images/games/gates-of-olympus.webp' },
      { name: 'Plinko', meta: 'Arcade · pick your risk', image: '/assets/images/games/candy-blitz.webp' },
      { name: 'Mines', meta: 'Strategy · cash out anytime', image: '/assets/images/games/empty-the-bank.webp' },
      { name: 'JetX', meta: 'Crash · x1000', image: '/assets/images/games/fishin-reels.webp', tag: 'New' },
      { name: 'Dice', meta: 'Classic · provably fair', image: '/assets/images/games/fruit-rainbow.webp' },
      { name: 'Big Bass', meta: 'Instant · x2100', image: '/assets/images/games/great-stick-up.webp' },
      { name: 'Octobeer', meta: 'Arcade · x900', image: '/assets/images/games/octobeer.webp' },
    ],
    band: [
      { icon: 'bolt', title: 'Instant Rounds', sub: 'Seconds, not minutes' },
      { icon: 'chart', title: 'Huge Multipliers', sub: 'Up to x5000' },
      { icon: 'shield', title: 'Provably Fair', sub: 'Verify every result' },
      { icon: 'star', title: 'Auto-Play', sub: 'Set it and watch' },
    ],
    cta: { title: 'Quick rounds, real thrills', sub: 'Instant games with transparent maths.' },
  },

  poker: {
    slug: 'poker',
    mode: 'grid',
    hero: {
      title: 'Poker',
      tagline: 'Take your seat',
      sub: 'Cash games, Sit & Go and major tournaments running 24/7 — from low-entry tables to invitation-only high-roller felt.',
      cta: 'Find a Table',
      image: '/assets/images/live-poker.webp',
      imageMobile: '/assets/images/hero-mobile-live.webp',
      fallback: '/assets/images/live-casino.webp',
      posY: '45%',
    },
    sectionTitle: 'Tables & Formats',
    sectionSub: 'A seat for every style of play',
    items: [
      { name: 'Texas Hold’em', meta: 'Cash games · 24/7', image: '/assets/images/live-poker.webp', tag: 'Popular' },
      { name: 'Omaha', meta: 'Pot-limit · 4 cards', image: '/assets/images/live-poker.webp' },
      { name: 'Sit & Go', meta: 'Single table · fast', image: '/assets/images/live-poker.webp' },
      { name: 'Tournaments', meta: 'Guaranteed prize pools', image: '/assets/images/live-poker.webp', tag: 'Daily' },
      { name: 'Spin & Go', meta: 'Three-handed · jackpot', image: '/assets/images/live-poker.webp' },
      { name: 'High Roller Tables', meta: 'Invitation only', image: '/assets/images/live-poker.webp', tag: 'VIP' },
    ],
    band: [
      { icon: 'swords', title: 'Cash & Tournaments', sub: 'Every format, all day' },
      { icon: 'bolt', title: 'Fast Tables', sub: 'Quick-seat in one tap' },
      { icon: 'trophy', title: 'Guaranteed Pools', sub: 'Daily majors' },
      { icon: 'crown', title: 'High-Roller Felt', sub: 'For Throne Club members' },
    ],
    cta: { title: 'The table is set', sub: 'Cash games and tournaments, 24/7.' },
  },
}
