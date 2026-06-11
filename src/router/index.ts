import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/casino', name: 'casino', component: () => import('@/views/CasinoView.vue') },
    {
      path: '/casino/play/:slug',
      name: 'game-play',
      component: () => import('@/views/GamePlayView.vue'),
    },
    { path: '/sports', name: 'sports', component: () => import('@/views/SportsView.vue') },
    {
      path: '/live-casino',
      name: 'live-casino',
      component: () => import('@/views/LiveCasinoView.vue'),
    },
    { path: '/vip', name: 'vip', component: () => import('@/views/VipView.vue') },
    { path: '/kingdom', name: 'kingdom', component: () => import('@/views/KingdomView.vue') },
    { path: '/rewards', name: 'rewards', component: () => import('@/views/RewardsView.vue') },
    {
      path: '/account',
      meta: { requiresAuth: true },
      component: () => import('@/layouts/AccountLayout.vue'),
      children: [
        { path: '', name: 'acc-dashboard', component: () => import('@/views/account/DashboardView.vue') },
        // Account
        { path: 'profile', name: 'acc-profile', component: () => import('@/views/account/ProfileView.vue') },
        { path: 'security', name: 'acc-security', component: () => import('@/views/account/PasswordSecurityView.vue') },
        { path: 'verification', name: 'acc-verification', component: () => import('@/views/account/VerificationView.vue') },
        // Wallet
        { path: 'balance', name: 'acc-balance', component: () => import('@/views/account/BalanceView.vue') },
        { path: 'deposit', name: 'acc-deposit', meta: { kind: 'deposit' }, component: () => import('@/views/account/WalletActionView.vue') },
        { path: 'withdraw', name: 'acc-withdraw', meta: { kind: 'withdraw' }, component: () => import('@/views/account/WalletActionView.vue') },
        // History
        { path: 'bet-history', name: 'acc-bet-history', component: () => import('@/views/account/BetHistoryView.vue') },
        { path: 'game-history', name: 'acc-game-history', component: () => import('@/views/account/GameHistoryView.vue') },
        { path: 'free-spins', name: 'acc-free-spins', meta: { gen: 'free-spins' }, component: () => import('@/views/account/GenericHistoryView.vue') },
        { path: 'bonuses', name: 'acc-bonuses', meta: { gen: 'bonuses' }, component: () => import('@/views/account/GenericHistoryView.vue') },
        // Transactions
        { path: 'transactions', name: 'acc-transactions', meta: { gen: 'financial-history' }, component: () => import('@/views/account/GenericHistoryView.vue') },
        { path: 'account-activity', name: 'acc-activity', meta: { gen: 'account-activity' }, component: () => import('@/views/account/GenericHistoryView.vue') },
        { path: 'transfers', name: 'acc-transfers', meta: { gen: 'transfers' }, component: () => import('@/views/account/GenericHistoryView.vue') },
        { path: 'game-balance', name: 'acc-game-balance', component: () => import('@/views/account/GameBalanceView.vue') },
        { path: 'statements', name: 'acc-statements', component: () => import('@/views/account/StatementsView.vue') },
        // Rewards (THRONE-specific)
        { path: 'vip-progress', name: 'acc-vip-progress', component: () => import('@/views/account/VipProgressView.vue') },
        { path: 'rewards', name: 'acc-rewards', component: () => import('@/views/account/RewardsWalletView.vue') },
        { path: 'cashback', name: 'acc-cashback', component: () => import('@/views/account/CashbackView.vue') },
        // Security
        { path: 'twofa', name: 'acc-twofa', component: () => import('@/views/account/TwoFaView.vue') },
        { path: 'devices', name: 'acc-devices', component: () => import('@/views/account/DevicesView.vue') },
        { path: 'sessions', name: 'acc-sessions', component: () => import('@/views/account/SessionsView.vue') },
        // Responsible Gaming
        { path: 'freeze', name: 'acc-freeze', component: () => import('@/views/account/FreezeView.vue') },
        { path: 'cooling-off', name: 'acc-cooloff', component: () => import('@/views/account/CoolingOffView.vue') },
        { path: 'limits', name: 'acc-limits', component: () => import('@/views/account/LimitsView.vue') },
        // Support
        { path: 'concierge', name: 'acc-concierge', component: () => import('@/views/account/ConciergeView.vue') },
        { path: 'help', name: 'acc-help', component: () => import('@/views/account/HelpView.vue') },
        { path: 'contact', name: 'acc-contact', component: () => import('@/views/account/ContactView.vue') },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// Guests bouncing off a protected route land home with the login modal open.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuth().isLoggedIn.value) {
    useAuthModal().open('login')
    return { path: '/' }
  }
})

export default router
