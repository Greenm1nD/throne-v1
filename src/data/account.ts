/**
 * Authenticated area content — single source for the dashboard shell and all
 * account subpages. Pure prototype data: no backend, no real money.
 */

export const user = {
  name: 'KingMaker',
  tier: 'Duke',
  avatar: '/assets/images/hall-vip-member.webp',
  memberSince: 'May 12, 2024',
  verified: true,
  email: 'kingmaker@throne.club',
  phone: '+995 555 12 34 56',
  firstName: 'Giorgi',
  lastName: 'Mepe',
  country: 'Georgia',
  currency: 'EUR',
  xp: 10550,
  xpNext: 15000,
  nextTier: 'Crown',
}

export const balances = {
  total: '€12,450.00',
  main: '€10,250.00',
  bonus: '€2,200.00',
  cashbackAvailable: '€350.75',
  cashbackTotal: '€1,250.75',
  rewardsPoints: '12,450',
}

export interface AccNavItem {
  label: string
  to: string
  icon?: string
  font?: string
}
export interface AccNavSection {
  title?: string
  items: AccNavItem[]
}

export const accountNav: AccNavSection[] = [
  {
    items: [{ label: 'Dashboard', to: '/account', font: 'games' }],
  },
  {
    title: 'My Account',
    items: [
      { label: 'Profile', to: '/account/profile', icon: 'user' },
      { label: 'Security', to: '/account/security', icon: 'lock' },
      { label: 'Verification', to: '/account/verification', font: 'verification' },
      { label: 'Preferences', to: '/account/profile', icon: 'sparkle' },
    ],
  },
  {
    title: 'Wallet',
    items: [
      { label: 'Balance', to: '/account/balance', font: 'wallet' },
      { label: 'Deposit', to: '/account/deposit', font: 'deposit' },
      { label: 'Withdraw', to: '/account/withdraw', icon: 'bolt' },
      { label: 'Transactions', to: '/account/transactions', font: 'finance-history' },
    ],
  },
  {
    title: 'Rewards',
    items: [
      { label: 'VIP Progress', to: '/account/vip-progress', icon: 'crown' },
      { label: 'My Rewards', to: '/account/rewards', icon: 'gift' },
      { label: 'Bonuses', to: '/account/bonuses', icon: 'star' },
      { label: 'Cashback', to: '/account/cashback', icon: 'percent' },
    ],
  },
  {
    title: 'Activity',
    items: [
      { label: 'Game History', to: '/account/game-history', font: 'session-history' },
      { label: 'Bet History', to: '/account/bet-history', font: 'bet-history' },
      { label: 'Statements', to: '/account/statements', font: 'account-history' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', to: '/account/help', icon: 'chat' },
      { label: 'Contact Support', to: '/account/contact', icon: 'headset' },
      { label: 'VIP Concierge', to: '/account/concierge', icon: 'crown' },
    ],
  },
]

export interface Txn {
  type: 'Deposit' | 'Withdraw' | 'Bonus' | 'Cashback' | 'Reward'
  date: string
  amount: string
  positive: boolean
  status: 'Completed' | 'Pending'
  icon: string
}

export const transactions: Txn[] = [
  { type: 'Deposit', date: 'May 25, 2024 · 14:32', amount: '+ €500.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Withdraw', date: 'May 24, 2024 · 09:15', amount: '− €300.00', positive: false, status: 'Completed', icon: 'bolt' },
  { type: 'Bonus', date: 'May 24, 2024 · 08:45', amount: '+ €50.00', positive: true, status: 'Completed', icon: 'gift' },
  { type: 'Cashback', date: 'May 23, 2024 · 12:30', amount: '+ €25.75', positive: true, status: 'Completed', icon: 'percent' },
  { type: 'Deposit', date: 'May 22, 2024 · 16:20', amount: '+ €200.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Reward', date: 'May 21, 2024 · 19:05', amount: '+ 450 pts', positive: true, status: 'Completed', icon: 'star' },
  { type: 'Withdraw', date: 'May 20, 2024 · 11:48', amount: '− €750.00', positive: false, status: 'Completed', icon: 'bolt' },
  { type: 'Deposit', date: 'May 18, 2024 · 21:12', amount: '+ €1,000.00', positive: true, status: 'Completed', icon: 'vault' },
]

export const quickActions = [
  { label: 'Deposit', to: '/account/deposit', font: 'deposit' },
  { label: 'Withdraw', to: '/account/withdraw', icon: 'bolt' },
  { label: 'My Bonuses', to: '/account/bonuses', icon: 'gift' },
  { label: 'Transactions', to: '/account/transactions', font: 'finance-history' },
  { label: 'Game History', to: '/account/game-history', font: 'session-history' },
  { label: 'VIP Lounge', to: '/account/concierge', icon: 'crown' },
  { label: 'Support', to: '/account/contact', icon: 'headset' },
]

export const paymentMethods = [
  { name: 'Visa', time: 'Instant', limits: '€10 – €10,000', recommended: false },
  { name: 'Mastercard', time: 'Instant', limits: '€10 – €10,000', recommended: false },
  { name: 'Crypto (BTC · ETH · USDT)', time: '~10 min', limits: '€20 – €50,000', recommended: true },
  { name: 'Apple Pay', time: 'Instant', limits: '€10 – €5,000', recommended: false },
  { name: 'Google Pay', time: 'Instant', limits: '€10 – €5,000', recommended: false },
  { name: 'Bank Transfer', time: '1–2 days', limits: '€100 – €100,000', recommended: false },
]

export const bonuses = [
  { name: 'Welcome Bonus', desc: '100% up to €500 + 200 royal spins', progress: 100, status: 'Completed' },
  { name: 'Reload Bonus', desc: '50% up to €250 every Friday', progress: 62, status: 'Active' },
  { name: 'Sports Bonus', desc: '€50 free bet on accumulator wins', progress: 30, status: 'Active' },
  { name: 'Cashback Bonus', desc: 'Up to 25% weekly cashback, Duke tier', progress: 80, status: 'Active' },
  { name: 'Seasonal Bonus', desc: 'Summer Court — exclusive June event', progress: 0, status: 'Upcoming' },
]

export const sessions = [
  { device: 'MacBook Pro · Safari', place: 'Tbilisi, GE', time: 'Active now', current: true },
  { device: 'iPhone 15 Pro · App', place: 'Tbilisi, GE', time: '2 hours ago', current: false },
  { device: 'Windows · Chrome', place: 'Batumi, GE', time: 'May 21, 2024', current: false },
]

export const gameHistory = [
  { game: 'Gates of Olympus', provider: 'Pragmatic Play', result: '+ €145.00', positive: true, duration: '24 min', date: 'May 25' },
  { game: 'Blackjack Live', provider: 'Evolution', result: '− €60.00', positive: false, duration: '41 min', date: 'May 24' },
  { game: 'Crazy Time', provider: 'Evolution', result: '+ €310.50', positive: true, duration: '18 min', date: 'May 24' },
  { game: 'The Ultimate 5', provider: 'Pragmatic Play', result: '− €25.00', positive: false, duration: '12 min', date: 'May 23' },
  { game: 'Roulette Live', provider: 'Evolution', result: '+ €80.00', positive: true, duration: '33 min', date: 'May 22' },
]

export const betHistory = [
  { match: 'Real Madrid — Manchester City', market: 'Match Winner · Real Madrid', odds: '1.65', stake: '€100', payout: '+ €165.00', won: true, date: 'May 24' },
  { match: 'Liverpool — Bayern Munich', market: 'Over 2.5 Goals', odds: '1.80', stake: '€50', payout: '− €50.00', won: false, date: 'May 23' },
  { match: 'PSG — Juventus', market: 'Both Teams to Score', odds: '1.72', stake: '€80', payout: '+ €137.60', won: true, date: 'May 21' },
]

export const statements = [
  { period: 'May 2024', items: 42, net: '+ €1,240.00' },
  { period: 'April 2024', items: 57, net: '− €380.00' },
  { period: 'March 2024', items: 38, net: '+ €920.00' },
]

export const faqs = [
  { q: 'How fast are Duke-tier withdrawals?', a: 'Priority processing — typically under 2 hours for e-wallets and crypto, 1–2 banking days for cards.' },
  { q: 'How do I earn XP toward the next tier?', a: 'Every wager earns XP across casino, live tables and sports. Tier upgrades apply instantly.' },
  { q: 'Where do I redeem reward points?', a: 'In My Rewards — exchange points for cashback, free spins, or luxury experiences from the Treasury.' },
  { q: 'Is my account protected?', a: 'Two-factor authentication, device management and session control are available under Security.' },
]
