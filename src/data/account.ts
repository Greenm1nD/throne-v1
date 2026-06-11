/**
 * Authenticated area content — single source for the dashboard shell and all
 * account subpages. Pure prototype data: no backend, no real money.
 * Figures mirror the GreenBet prototype (greenbet-five.vercel.app) so both
 * projects present identical member information.
 */

export const user = {
  name: 'KingMaker',
  handle: '@kingmaker',
  tier: 'Duke',
  avatar: '/assets/images/hall-vip-member.webp',
  memberSince: '01 Oct 2025',
  verified: false,
  email: 'ki****@gmail.com',
  phone: '+44 *** *** 4567',
  firstName: 'Giorgi',
  lastName: 'Mepe',
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
    title: 'Account',
    items: [
      { label: 'Profile', to: '/account/profile', icon: 'user' },
      { label: 'Password Security', to: '/account/security', icon: 'key' },
      { label: 'Verification', to: '/account/verification', font: 'verification' },
    ],
  },
  {
    title: 'History',
    items: [
      { label: 'Bet History', to: '/account/bet-history', font: 'bet-history' },
      { label: 'Game History', to: '/account/game-history', font: 'session-history' },
      { label: 'My Free Spins', to: '/account/free-spins', icon: 'sparkle' },
      { label: 'My Bonuses', to: '/account/bonuses', icon: 'gift' },
    ],
  },
  {
    title: 'Transactions',
    items: [
      { label: 'Financial History', to: '/account/transactions', font: 'finance-history' },
      { label: 'Account Activity', to: '/account/account-activity', font: 'account-history' },
      { label: 'Transfers', to: '/account/transfers', icon: 'arrowRight' },
      { label: 'Game Balance', to: '/account/game-balance', icon: 'vault' },
      { label: 'Statements', to: '/account/statements', icon: 'calendar' },
    ],
  },
  {
    title: 'Rewards',
    items: [
      { label: 'VIP Progress', to: '/account/vip-progress', icon: 'crown' },
      { label: 'My Rewards', to: '/account/rewards', icon: 'gift' },
      { label: 'Cashback', to: '/account/cashback', icon: 'percent' },
    ],
  },
  {
    title: 'Security',
    items: [
      { label: 'Two-Factor Auth', to: '/account/twofa', icon: 'lock' },
      { label: 'My Devices', to: '/account/devices', icon: 'monitor' },
      { label: 'Session History', to: '/account/sessions', icon: 'clock' },
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

/** Payment methods for the Deposit / Withdraw panels (pm-card rows). */
export interface PayMethod {
  name: string
  cat: 'bank' | 'crypto' | 'card'
  icon: string
  time: string
  min: string
  max: string
}

export const DEPOSIT: PayMethod[] = [
  { name: 'Visa', cat: 'card', icon: 'vault', time: 'Instant', min: '$10', max: '$10,000' },
  { name: 'Mastercard', cat: 'card', icon: 'vault', time: 'Instant', min: '$10', max: '$10,000' },
  { name: 'Fast Bank Transfer', cat: 'bank', icon: 'bolt', time: 'Instant', min: '$100', max: '$100,000' },
  { name: 'Crypto (BTC · ETH · USDT)', cat: 'crypto', icon: 'sparkle', time: '~10 min', min: '$20', max: '$50,000' },
  { name: 'Skrill', cat: 'bank', icon: 'globe', time: 'Instant', min: '$10', max: '$5,000' },
]

export const WITHDRAW: PayMethod[] = [
  { name: 'Fast Bank Transfer', cat: 'bank', icon: 'bolt', time: '~2 hours', min: '$100', max: '$100,000' },
  { name: 'Crypto (BTC · ETH · USDT)', cat: 'crypto', icon: 'sparkle', time: '~10 min', min: '$20', max: '$50,000' },
  { name: 'Skrill', cat: 'bank', icon: 'globe', time: '~2 hours', min: '$10', max: '$5,000' },
]

export const WITHDRAW_BANKS = ['Wise', 'Revolut', 'HSBC', 'Barclays']

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
  { channel: 'Email Verification', detail: 'ki****@gmail.com', state: 'NOT VERIFIED' },
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

/* ── Shared history machinery (StatTiles + HistoryRows) ───────────────── */

export type Tone = 'in' | 'out' | 'neutral' | 'bonus' | 'highlight'

export interface StatTile {
  label: string
  value: string
  icon?: string
  font?: string
  tone?: Tone
}

export interface HistoryRow {
  icon?: string
  font?: string
  title: string
  sub: string
  ago?: string
  amount: string
  amountTone?: 'in' | 'out' | 'neutral'
  /** Filter key — matched against the active chip (status or type). */
  tag?: string
  details: Array<{ label: string; value: string }>
  note?: { label: string; text: string }
}

export interface GenHistoryConfig {
  title: string
  desc: string
  icon: string
  filter: 'status' | 'type' | 'none'
  filterOptions?: string[]
  tiles: StatTile[]
  rows: HistoryRow[]
}

/** Generic history panels — one component, many sections (see GenericHistoryView). */
export const genericHistories: Record<string, GenHistoryConfig> = {
  'free-spins': {
    title: 'My Free Spins',
    desc: 'Active and used free-spin rewards.',
    icon: 'sparkle',
    filter: 'status',
    filterOptions: ['All', 'Active', 'Used'],
    tiles: [
      { label: 'Active Grants', value: '2', icon: 'sparkle', tone: 'highlight' },
      { label: 'Spins Left', value: '56 / 85', icon: 'chart', tone: 'neutral' },
      { label: 'Total Won', value: '$14.70', icon: 'trophy', tone: 'in' },
    ],
    rows: [
      { icon: 'sparkle', title: 'Gates of Olympus', sub: '1304132351780142644 · 9 Jun 2026 00:18', ago: 'Jun 9', amount: '4/10', amountTone: 'neutral', tag: 'Active', details: [{ label: 'Game', value: 'Gates of Olympus' }, { label: 'Grant ID', value: '1304132351780142644' }, { label: 'Started', value: '9 Jun 2026 00:18' }, { label: 'Spins Used', value: '4 of 10' }, { label: 'Status', value: 'ACTIVE' }] },
      { icon: 'sparkle', title: 'Sugar Rush', sub: '9211045882103492210 · 11 Jun 2026 00:18', ago: 'Jun 11', amount: '0/50', amountTone: 'neutral', tag: 'Active', details: [{ label: 'Game', value: 'Sugar Rush' }, { label: 'Grant ID', value: '9211045882103492210' }, { label: 'Started', value: '11 Jun 2026 00:18' }, { label: 'Spins Used', value: '0 of 50' }, { label: 'Status', value: 'ACTIVE' }] },
      { icon: 'sparkle', title: 'Sweet Bonanza', sub: '7822910344019875422 · 3 Jun 2026 00:18', ago: 'Jun 3', amount: '25/25', amountTone: 'out', tag: 'Used', details: [{ label: 'Game', value: 'Sweet Bonanza' }, { label: 'Grant ID', value: '7822910344019875422' }, { label: 'Started', value: '3 Jun 2026 00:18' }, { label: 'Spins Used', value: '25 of 25' }, { label: 'Status', value: 'USED' }] },
    ],
  },
  bonuses: {
    title: 'My Bonuses',
    desc: 'Track active, pending and completed bonuses.',
    icon: 'gift',
    filter: 'status',
    filterOptions: ['All', 'Active', 'Pending', 'Completed', 'Expired'],
    tiles: [
      { label: 'Active Bonuses', value: '4', icon: 'star', tone: 'highlight' },
      { label: 'Total Received', value: '$675', icon: 'gift', tone: 'bonus' },
      { label: 'Active Balance', value: '$0', icon: 'vault', tone: 'neutral' },
    ],
    rows: [
      { icon: 'gift', title: '10% Cashback', sub: 'Daily reward · +100%', ago: '6h ago', amount: '$25', amountTone: 'in', tag: 'Completed', details: [{ label: 'Bonus', value: '10% Cashback' }, { label: 'Boost', value: '+100%' }, { label: 'Granted', value: '11 Jun 2026 18:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'gift', title: '200% Casino Welcome', sub: 'Welcome offer · +100%', ago: 'Jun 9', amount: '$500', amountTone: 'in', tag: 'Completed', details: [{ label: 'Bonus', value: '200% Casino Welcome' }, { label: 'Boost', value: '+100%' }, { label: 'Granted', value: '9 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'gift', title: 'Mega Reward', sub: 'Daily reward · +100%', ago: 'Jun 5', amount: '$100', amountTone: 'in', tag: 'Completed', details: [{ label: 'Bonus', value: 'Mega Reward' }, { label: 'Boost', value: '+100%' }, { label: 'Granted', value: '5 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'gift', title: 'Free spins package', sub: 'Promotion · +100%', ago: 'May 31', amount: '$50', amountTone: 'in', tag: 'Completed', details: [{ label: 'Bonus', value: 'Free spins package' }, { label: 'Boost', value: '+100%' }, { label: 'Granted', value: '31 May 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
    ],
  },
  'financial-history': {
    title: 'Financial History',
    desc: 'Check your deposit, withdrawal and bonus history.',
    icon: 'vault',
    filter: 'type',
    filterOptions: ['All', 'Deposit', 'Withdrawal', 'Bonus'],
    tiles: [
      { label: 'Total Events', value: '10', icon: 'chart', tone: 'neutral' },
      { label: 'Total In', value: '$2,725', icon: 'vault', tone: 'in' },
      { label: 'Total Out', value: '$950', icon: 'bolt', tone: 'out' },
      { label: 'Net', value: '+$1,775', icon: 'percent', tone: 'highlight' },
    ],
    rows: transactions.map((t) => ({
      icon: t.icon,
      title: t.label,
      sub: t.type === 'Withdraw' ? 'Withdrawal' : t.type,
      ago: t.date,
      amount: t.amount,
      amountTone: (t.positive ? 'in' : 'out') as 'in' | 'out',
      tag: t.type === 'Withdraw' ? 'Withdrawal' : t.type,
      details: [
        { label: 'Type', value: t.type === 'Withdraw' ? 'Withdrawal' : t.type },
        { label: 'Method', value: t.label.split('·')[1]?.trim() ?? '—' },
        { label: 'Date', value: t.date },
        { label: 'Status', value: t.status.toUpperCase() },
      ],
    })),
  },
  'account-activity': {
    title: 'Account Activity',
    desc: "Track your account's activity across all games.",
    icon: 'chart',
    filter: 'none',
    tiles: [
      { label: 'Total Events', value: '10', icon: 'chart', tone: 'neutral' },
      { label: 'Total In', value: '$2,725', icon: 'vault', tone: 'in' },
      { label: 'Total Out', value: '$950', icon: 'bolt', tone: 'out' },
      { label: 'Net', value: '+$1,775', icon: 'percent', tone: 'highlight' },
    ],
    rows: [
      { icon: 'vault', title: 'Deposit Confirmed', sub: 'Deposit · Visa', ago: '2h ago', amount: '+ $500', amountTone: 'in', details: [{ label: 'Event', value: 'Deposit Confirmed' }, { label: 'Date', value: '11 Jun 2026 22:14' }, { label: 'Balance After', value: '$1,240.50' }] },
      { icon: 'gift', title: 'Bonus Credited', sub: 'Daily reward · 10% Cashback', ago: '6h ago', amount: '+ $25', amountTone: 'in', details: [{ label: 'Event', value: 'Bonus Credited' }, { label: 'Date', value: '11 Jun 2026 18:14' }, { label: 'Balance After', value: '$740.50' }] },
      { icon: 'bolt', title: 'Withdrawal Request', sub: 'Withdrawal · Bank Transfer', ago: 'Jun 11', amount: '− $200', amountTone: 'out', details: [{ label: 'Event', value: 'Withdrawal Request' }, { label: 'Date', value: '11 Jun 2026 00:14' }, { label: 'Balance After', value: '$715.50' }] },
      { icon: 'vault', title: 'Deposit Confirmed', sub: 'Deposit · Crypto', ago: 'Jun 10', amount: '+ $1,000', amountTone: 'in', details: [{ label: 'Event', value: 'Deposit Confirmed' }, { label: 'Date', value: '10 Jun 2026 00:14' }, { label: 'Balance After', value: '$915.50' }] },
      { icon: 'gift', title: 'Bonus Credited', sub: 'Bonus · 200% Casino Welcome', ago: 'Jun 9', amount: '+ $500', amountTone: 'in', details: [{ label: 'Event', value: 'Bonus Credited' }, { label: 'Date', value: '9 Jun 2026 00:14' }, { label: 'Balance After', value: '−$84.50' }] },
      { icon: 'vault', title: 'Deposit Confirmed', sub: 'Deposit · Skrill', ago: 'Jun 8', amount: '+ $250', amountTone: 'in', details: [{ label: 'Event', value: 'Deposit Confirmed' }, { label: 'Date', value: '8 Jun 2026 00:14' }, { label: 'Balance After', value: '−$584.50' }] },
      { icon: 'bolt', title: 'Withdrawal Request', sub: 'Withdrawal · Bitcoin', ago: 'Jun 6', amount: '− $750', amountTone: 'out', details: [{ label: 'Event', value: 'Withdrawal Request' }, { label: 'Date', value: '6 Jun 2026 00:14' }, { label: 'Balance After', value: '−$834.50' }] },
      { icon: 'gift', title: 'Bonus Credited', sub: 'Daily reward · Mega Reward', ago: 'Jun 5', amount: '+ $100', amountTone: 'in', details: [{ label: 'Event', value: 'Bonus Credited' }, { label: 'Date', value: '5 Jun 2026 00:14' }, { label: 'Balance After', value: '−$84.50' }] },
      { icon: 'vault', title: 'Deposit Confirmed', sub: 'Deposit · Bank Transfer', ago: 'Jun 3', amount: '+ $300', amountTone: 'in', details: [{ label: 'Event', value: 'Deposit Confirmed' }, { label: 'Date', value: '3 Jun 2026 00:14' }, { label: 'Balance After', value: '−$184.50' }] },
      { icon: 'gift', title: 'Bonus Credited', sub: 'Bonus · Free spins package', ago: 'May 31', amount: '+ $50', amountTone: 'in', details: [{ label: 'Event', value: 'Bonus Credited' }, { label: 'Date', value: '31 May 2026 00:14' }, { label: 'Balance After', value: '−$234.50' }] },
    ],
  },
  transfers: {
    title: 'Transfers',
    desc: 'Move funds between wallets instantly.',
    icon: 'arrowRight',
    filter: 'type',
    filterOptions: ['All', 'To Game', 'To Main'],
    tiles: [
      { label: 'From Game', value: '$410', icon: 'vault', tone: 'in' },
      { label: 'To Game', value: '$380', icon: 'bolt', tone: 'out' },
      { label: 'Net', value: '+$30', icon: 'percent', tone: 'highlight' },
    ],
    rows: [
      { icon: 'arrowRight', title: 'Main → Game Wallet', sub: 'Instant', ago: '2h ago', amount: '+ $500', amountTone: 'in', tag: 'To Game', details: [{ label: 'Route', value: 'Main → Game Wallet' }, { label: 'Date', value: '11 Jun 2026 22:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'arrowRight', title: 'Game Wallet → Main', sub: 'Instant', ago: 'Jun 11', amount: '− $200', amountTone: 'out', tag: 'To Main', details: [{ label: 'Route', value: 'Game Wallet → Main' }, { label: 'Date', value: '11 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'arrowRight', title: 'Main → Game Wallet', sub: 'Instant', ago: 'Jun 10', amount: '+ $1,000', amountTone: 'in', tag: 'To Game', details: [{ label: 'Route', value: 'Main → Game Wallet' }, { label: 'Date', value: '10 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'arrowRight', title: 'Main → Game Wallet', sub: 'Instant', ago: 'Jun 8', amount: '+ $250', amountTone: 'in', tag: 'To Game', details: [{ label: 'Route', value: 'Main → Game Wallet' }, { label: 'Date', value: '8 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'arrowRight', title: 'Game Wallet → Main', sub: 'Instant', ago: 'Jun 6', amount: '− $750', amountTone: 'out', tag: 'To Main', details: [{ label: 'Route', value: 'Game Wallet → Main' }, { label: 'Date', value: '6 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
      { icon: 'arrowRight', title: 'Main → Game Wallet', sub: 'Instant', ago: 'Jun 3', amount: '+ $300', amountTone: 'in', tag: 'To Game', details: [{ label: 'Route', value: 'Main → Game Wallet' }, { label: 'Date', value: '3 Jun 2026 00:14' }, { label: 'Status', value: 'COMPLETED' }] },
    ],
  },
}

export const faqs = [
  { q: 'How fast are Duke-tier withdrawals?', a: 'Priority processing — typically under 2 hours for e-wallets and crypto, 1–2 banking days for cards.' },
  { q: 'How do I earn XP toward the next tier?', a: 'Every wager earns XP across casino, live tables and sports. Tier upgrades apply instantly.' },
  { q: 'Where do I redeem reward points?', a: 'In My Rewards — exchange points for cashback, free spins, or luxury experiences from the Treasury.' },
  { q: 'Is my account protected?', a: 'Two-factor authentication, device management and session control are available under Security.' },
]
