/**
 * THRONE Poker — page content (single source; the view is pure presentation).
 * Premium poker room: cash games, tournaments, jackpot, top players.
 */

export const pokerHero = {
  label: 'Welcome to Throne Poker',
  titleA: 'Where Skill',
  titleB: 'Becomes Power',
  sub: 'Compete. Conquer. Take the Throne.',
  body: 'Join thousands of players in real tournaments and cash games. Compete, win, and become a legend.',
  image: '/assets/images/live-poker.webp',
  highlights: [
    { icon: 'clock', title: '24/7 Action', sub: 'Always running' },
    { icon: 'shield', title: 'Secure & Fair', sub: 'Provably fair' },
    { icon: 'crown', title: 'Biggest Prizes', sub: 'High stakes' },
  ],
}

export const jackpotPool = {
  label: 'Jackpot Pool',
  amount: '€245,782.50',
  players: '24,591+ players',
}

export const pokerStats = [
  { label: 'Cash Games', value: '7,842', icon: 'chip' },
  { label: 'Tournaments', value: '156', icon: 'trophy' },
  { label: 'Sit & Go', value: '482', icon: 'spade' },
  { label: 'Spin & Go', value: '1,235', icon: 'sparkle' },
  { label: 'Private Tables', value: '37', icon: 'lock' },
]

export interface CashGame {
  table: string
  game: string
  stakes: string
  players: string
  pot: string
  featured?: boolean
}
export const liveCashGames: CashGame[] = [
  { table: 'Throne High Stakes 01', game: "No Limit Hold'em", stakes: '€50 / €100', players: '6 / 9', pot: '€2,450', featured: true },
  { table: 'Royal Flush Club', game: "No Limit Hold'em", stakes: '€25 / €50', players: '5 / 9', pot: '€1,250' },
  { table: 'Black Crown Table', game: 'Pot Limit Omaha', stakes: '€10 / €20', players: '8 / 9', pot: '€680' },
  { table: 'Golden Elite 02', game: "No Limit Hold'em", stakes: '€5 / €10', players: '6 / 9', pot: '€320' },
  { table: 'Omaha Royale', game: 'Pot Limit Omaha', stakes: '€2 / €5', players: '7 / 9', pot: '€540' },
]

export const topPlayers = [
  { rank: 1, name: 'RoyalFlush', tier: 'King', amount: '€125,430.50' },
  { rank: 2, name: 'AceMaster', tier: 'Duke', amount: '€98,750.20' },
  { rank: 3, name: 'PokerMind', tier: 'King', amount: '€76,341.10' },
  { rank: 4, name: 'HighRoller', tier: 'Duke', amount: '€64,118.80' },
]

export interface Tournament {
  name: string
  gtd: string
  buyin: string
  startsIn: string
  icon: string
}
export const tournaments: Tournament[] = [
  { name: 'Daily Crown', gtd: '€25,000 GTD', buyin: '€50', startsIn: '01:25:36', icon: 'crown' },
  { name: 'Throne Masters', gtd: '€100,000 GTD', buyin: '€250', startsIn: '04:45:12', icon: 'crown' },
  { name: 'Royal Flush', gtd: '€75,000 GTD', buyin: '€150', startsIn: '07:15:43', icon: 'sparkle' },
  { name: 'Night High Roller', gtd: '€150,000 GTD', buyin: '€500', startsIn: '09:30:22', icon: 'spade' },
]

export const pokerFeatures = [
  { icon: 'shield', title: 'Fair Play', sub: 'Provably fair games and a secure environment' },
  { icon: 'headset', title: '24/7 Support', sub: 'Dedicated support anytime you need' },
  { icon: 'trophy', title: 'Big Tournaments', sub: 'Daily tournaments with huge prizes' },
  { icon: 'spade', title: 'Multiple Games', sub: "Texas Hold'em, Omaha and more" },
  { icon: 'bolt', title: 'Secure & Fast', sub: 'Safe deposits and instant withdrawals' },
]
