/**
 * THRONE account navigation — single source of truth for the profile sidebar
 * and mobile account menu (redesign behind VITE_ENABLE_PROFILE_NAV_REDESIGN).
 *
 * Order reflects user-task priority: see balance → deposit/withdraw → verify →
 * history → rewards → security → support → log out. Icons are keys into
 * AccountIcon (champagne-gold line icons). `action: 'logout'` items run the
 * logout handler instead of navigating.
 */
export interface AccountNavItem {
  id: string
  label: string
  /** route to navigate to (omitted for action items like logout) */
  to?: string
  /** AccountIcon key */
  icon: string
  /** non-navigation behaviour */
  action?: 'logout'
  /** hidden until the route/feature exists */
  disabled?: boolean
}

export interface AccountNavSection {
  id: string
  title: string
  items: AccountNavItem[]
}

export const accountNavSections: AccountNavSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', to: '/account', icon: 'dashboard' },
      { id: 'profile', label: 'Profile', to: '/account/profile', icon: 'user' },
      { id: 'verification', label: 'Verification', to: '/account/verification', icon: 'verify' },
    ],
  },
  {
    id: 'wallet',
    title: 'Wallet',
    items: [
      { id: 'balance', label: 'Balance', to: '/account/balance', icon: 'wallet' },
      { id: 'deposit', label: 'Deposit', to: '/account/deposit', icon: 'deposit' },
      { id: 'withdraw', label: 'Withdraw', to: '/account/withdraw', icon: 'withdraw' },
      { id: 'transfers', label: 'Transfers', to: '/account/transfers', icon: 'transfers' },
    ],
  },
  {
    id: 'rewards',
    title: 'Rewards',
    items: [
      { id: 'bonuses', label: 'Bonuses', to: '/account/bonuses', icon: 'gift' },
      { id: 'free-spins', label: 'Free Spins', to: '/account/free-spins', icon: 'spin' },
      { id: 'cashback', label: 'Cashback', to: '/account/cashback', icon: 'cashback' },
      { id: 'rewards-wallet', label: 'Rewards Wallet', to: '/account/rewards', icon: 'rewards' },
      { id: 'vip-progress', label: 'VIP Progress', to: '/account/vip-progress', icon: 'vip' },
    ],
  },
  {
    id: 'history',
    title: 'History',
    items: [
      { id: 'transactions', label: 'Transactions', to: '/account/transactions', icon: 'receipt' },
      { id: 'bet-history', label: 'Bet History', to: '/account/bet-history', icon: 'ticket' },
      { id: 'game-history', label: 'Game History', to: '/account/game-history', icon: 'cards' },
      { id: 'account-activity', label: 'Account Activity', to: '/account/account-activity', icon: 'activity' },
      { id: 'statements', label: 'Statements', to: '/account/statements', icon: 'document' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    items: [
      { id: 'password', label: 'Password', to: '/account/security', icon: 'key' },
      { id: 'twofa', label: 'Two-Factor Authentication', to: '/account/twofa', icon: 'twofa' },
      { id: 'devices', label: 'Devices', to: '/account/devices', icon: 'devices' },
      { id: 'sessions', label: 'Sessions', to: '/account/sessions', icon: 'sessions' },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      { id: 'help', label: 'Help Center', to: '/account/help', icon: 'headset' },
      { id: 'responsible', label: 'Responsible Gaming', to: '/responsible-gaming', icon: 'responsible' },
      { id: 'concierge', label: 'Contact Concierge', to: '/account/concierge', icon: 'concierge' },
    ],
  },
  {
    id: 'session',
    title: 'Session',
    items: [{ id: 'logout', label: 'Log Out', icon: 'logout', action: 'logout' }],
  },
]
