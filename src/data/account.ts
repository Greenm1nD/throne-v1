/**
 * Authenticated area content — single source for the dashboard shell and all
 * account subpages. Pure prototype data: no backend, no real money.
 * Figures mirror the GreenBet prototype (greenbet-five.vercel.app) so both
 * projects present identical member information.
 */

export const user = {
  name: 'Green Bet.',
  handle: '@ponka1',
  tier: 'Duke',
  avatar: '/assets/images/hall-vip-member.webp',
  memberSince: '01 Oct 2025',
  verified: false,
  email: 'gr****@gmail.com',
  phone: '+44 *** *** 4567',
  firstName: 'Green',
  lastName: 'Bet.',
  dob: '05-03-1995',
  nationalId: '*******74',
  country: 'United Kingdom',
  currency: 'USD',
  xp: 10550,
  xpNext: 15000,
  nextTier: 'Crown',
}

export const balances = {
  total: '$1,240.50',
  main: '$1,240.50',
  bonus: '$675',
  totalDeposits: '$2,050',
  totalWithdrawals: '$950',
  activeBonuses: 4,
  activeBonusBalance: '$0',
  cashbackAvailable: '$25.00',
  cashbackTotal: '$125.00',
  rewardsPoints: '12,450',
}

/** Per-provider game wallets (GreenBet "Game Balance"). */
export const gameWallets = [
  { provider: 'Pragmatic Play', kind: 'Casino Wallet', balance: '$0' },
  { provider: 'Evolution', kind: 'Live Casino', balance: '$0' },
  { provider: 'BetConstruct', kind: 'Sportsbook', balance: '$0' },
]

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
  type: 'Deposit' | 'Withdraw' | 'Bonus'
  label: string
  date: string
  amount: string
  positive: boolean
  status: 'Completed' | 'Pending'
  icon: string
}

export const transactions: Txn[] = [
  { type: 'Deposit', label: 'Deposit · Visa', date: '11 Jun 2026 · 22:14', amount: '+ $500.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Bonus', label: 'Daily reward · 10% Cashback', date: '11 Jun 2026 · 18:14', amount: '+ $25.00', positive: true, status: 'Completed', icon: 'gift' },
  { type: 'Withdraw', label: 'Withdrawal · Bank Transfer', date: '11 Jun 2026 · 00:14', amount: '− $200.00', positive: false, status: 'Completed', icon: 'bolt' },
  { type: 'Deposit', label: 'Deposit · Crypto', date: '10 Jun 2026 · 00:14', amount: '+ $1,000.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Bonus', label: 'Bonus · 200% Casino Welcome', date: '9 Jun 2026 · 00:14', amount: '+ $500.00', positive: true, status: 'Completed', icon: 'gift' },
  { type: 'Deposit', label: 'Deposit · Skrill', date: '8 Jun 2026 · 00:14', amount: '+ $250.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Withdraw', label: 'Withdrawal · Bitcoin', date: '6 Jun 2026 · 00:14', amount: '− $750.00', positive: false, status: 'Completed', icon: 'bolt' },
  { type: 'Bonus', label: 'Daily reward · Mega Reward', date: '5 Jun 2026 · 00:14', amount: '+ $100.00', positive: true, status: 'Completed', icon: 'gift' },
  { type: 'Deposit', label: 'Deposit · Bank Transfer', date: '3 Jun 2026 · 00:14', amount: '+ $300.00', positive: true, status: 'Completed', icon: 'vault' },
  { type: 'Bonus', label: 'Bonus · Free spins package', date: '31 May 2026 · 00:14', amount: '+ $50.00', positive: true, status: 'Completed', icon: 'gift' },
]

/** Financial-history roll-up shown above the transactions table. */
export const txnTotals = { events: 10, totalIn: '$2,725', totalOut: '$950', net: '+$1,775' }

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
  { name: 'Visa', time: 'Instant', limits: '$10 – $10,000', recommended: false },
  { name: 'Mastercard', time: 'Instant', limits: '$10 – $10,000', recommended: false },
  { name: 'Crypto (BTC · ETH · USDT)', time: '~10 min', limits: '$20 – $50,000', recommended: true },
  { name: 'Skrill', time: 'Instant', limits: '$10 – $5,000', recommended: false },
  { name: 'Apple Pay', time: 'Instant', limits: '$10 – $5,000', recommended: false },
  { name: 'Bank Transfer', time: '1–2 days', limits: '$100 – $100,000', recommended: false },
]

export interface BonusItem {
  name: string
  amount: string
  date: string
  status: 'Active' | 'Pending' | 'Completed' | 'Expired'
}

export const bonusTotals = { active: 4, totalReceived: '$675', activeBalance: '$0' }

export const bonuses: BonusItem[] = [
  { name: '10% Cashback', amount: '$25', date: '11 Jun 2026 18:14', status: 'Completed' },
  { name: '200% Casino Welcome', amount: '$500', date: '9 Jun 2026 00:14', status: 'Completed' },
  { name: 'Mega Reward', amount: '$100', date: '5 Jun 2026 00:14', status: 'Completed' },
  { name: 'Free spins package', amount: '$50', date: '31 May 2026 00:14', status: 'Completed' },
]

/** Trusted devices (Device Lock is ON). */
export const devices = [
  { device: 'Chrome 137 · macOS', fingerprint: 'd19b2139…40219c88', added: '03 Jun 2026 11:28', lastSeen: '03 Jun 2026 11:29', current: true },
  { device: 'Safari · iOS', fingerprint: 'd29b2139…40219c88', added: '30 May 2026 19:32', lastSeen: '30 May 2026 19:32', current: false },
  { device: 'Safari · iOS', fingerprint: 'd39b2139…40219c88', added: '30 May 2026 19:32', lastSeen: '30 May 2026 15:10', current: false },
]

export const sessions = [
  { ip: 'IP 92.40.··.··', time: '11 Jun 2026 23:48', ago: '30m ago' },
  { ip: 'IP 92.40.··.··', time: '11 Jun 2026 22:18', ago: '2h ago' },
  { ip: 'IP 188.116.··.··', time: '11 Jun 2026 00:18', ago: 'Jun 11' },
  { ip: 'IP 92.40.··.··', time: '9 Jun 2026 00:18', ago: 'Jun 9' },
  { ip: 'IP 178.62.··.··', time: '7 Jun 2026 00:18', ago: 'Jun 7' },
]

export const passwordRules = [
  'At least 8 characters',
  'Upper & lowercase letters',
  'At least 1 number',
  'At least 1 special character (!?#@…)',
  'Different from your old password',
]

/** Verification channels and their current state. */
export const verificationStatus = [
  { channel: 'Email Verification', detail: 'gr****@gmail.com', state: 'NOT VERIFIED' },
  { channel: 'Phone Verification', detail: '+44 *** *** 4567', state: 'NOT VERIFIED' },
  { channel: 'Identity (KYC)', detail: 'Document verification status', state: 'NOT VERIFIED' },
  { channel: 'Two-Factor Auth', detail: 'Two-step login is off', state: 'DISABLED' },
]

export const gameTotals = { bet: '$150', win: '$542', refund: '$0.00', net: '+$392' }

export const gameHistory = [
  { game: 'Gates of Olympus', provider: 'Pragmatic Play', result: '+ $162.50', positive: true, kind: 'WIN', date: '11 Jun 2026 22:18' },
  { game: 'Sugar Rush', provider: 'Pragmatic Play', result: '− $10.00', positive: false, kind: 'BET', date: '11 Jun 2026 20:18' },
  { game: 'Starlight Princess', provider: 'Pragmatic Play', result: '+ $262.50', positive: true, kind: 'WIN', date: '11 Jun 2026 19:18' },
  { game: 'Money Train 3', provider: 'Relax Gaming', result: '− $20.00', positive: false, kind: 'BET', date: '11 Jun 2026 02:18' },
  { game: 'Big Bass Bonanza', provider: 'Pragmatic Play', result: '+ $27.00', positive: true, kind: 'WIN', date: '10 Jun 2026 22:18' },
  { game: 'Sweet Bonanza', provider: 'Pragmatic Play', result: '− $30.00', positive: false, kind: 'BET', date: '9 Jun 2026 22:18' },
]

export const betProviders = ['Upgaming', 'BetConstruct', 'BetRadar']

export const betHistory = [
  { match: 'Real Madrid vs Barcelona · 1', coupon: 'C-8472', time: '2h ago', payout: '+ $225', status: 'WON' },
  { match: 'Liverpool vs Arsenal · Over 2.5', coupon: 'C-8455', time: '1d ago', payout: '− $20', status: 'LOST' },
  { match: 'Bayern Munich · 1', coupon: 'C-8431', time: '2d ago', payout: '+ $195', status: 'WON' },
  { match: 'Manchester City vs Chelsea · BTTS', coupon: 'C-8410', time: 'Live', payout: '—', status: 'PENDING' },
]

export const statements = [
  { period: 'June 2026', items: 10, net: '+ $1,775.00' },
  { period: 'May 2026', items: 7, net: '+ $320.00' },
  { period: 'April 2026', items: 12, net: '− $180.00' },
]

export const faqs = [
  { q: 'How fast are Duke-tier withdrawals?', a: 'Priority processing — typically under 2 hours for e-wallets and crypto, 1–2 banking days for cards.' },
  { q: 'How do I earn XP toward the next tier?', a: 'Every wager earns XP across casino, live tables and sports. Tier upgrades apply instantly.' },
  { q: 'Where do I redeem reward points?', a: 'In My Rewards — exchange points for cashback, free spins, or luxury experiences from the Treasury.' },
  { q: 'Is my account protected?', a: 'Two-factor authentication, device management and session control are available under Security.' },
]
