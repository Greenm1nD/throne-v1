import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      component: () => import('@/layouts/AccountLayout.vue'),
      children: [
        { path: '', name: 'acc-dashboard', component: () => import('@/views/account/DashboardView.vue') },
        { path: 'profile', name: 'acc-profile', component: () => import('@/views/account/ProfileView.vue') },
        { path: 'security', name: 'acc-security', component: () => import('@/views/account/SecurityView.vue') },
        { path: 'verification', name: 'acc-verification', component: () => import('@/views/account/VerificationView.vue') },
        { path: 'balance', name: 'acc-balance', component: () => import('@/views/account/BalanceView.vue') },
        { path: 'deposit', name: 'acc-deposit', component: () => import('@/views/account/DepositView.vue') },
        { path: 'withdraw', name: 'acc-withdraw', component: () => import('@/views/account/WithdrawView.vue') },
        { path: 'transactions', name: 'acc-transactions', component: () => import('@/views/account/TransactionsView.vue') },
        { path: 'vip-progress', name: 'acc-vip-progress', component: () => import('@/views/account/VipProgressView.vue') },
        { path: 'rewards', name: 'acc-rewards', component: () => import('@/views/account/RewardsWalletView.vue') },
        { path: 'bonuses', name: 'acc-bonuses', component: () => import('@/views/account/BonusesView.vue') },
        { path: 'cashback', name: 'acc-cashback', component: () => import('@/views/account/CashbackView.vue') },
        { path: 'game-history', name: 'acc-game-history', component: () => import('@/views/account/GameHistoryView.vue') },
        { path: 'bet-history', name: 'acc-bet-history', component: () => import('@/views/account/BetHistoryView.vue') },
        { path: 'statements', name: 'acc-statements', component: () => import('@/views/account/StatementsView.vue') },
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

export default router
