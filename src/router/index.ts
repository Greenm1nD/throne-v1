import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/composables/useAuth'
import { useAuthModal } from '@/composables/useAuthModal'
import { applyHead } from '@/utils/head'
import { seoRouteFor } from '@/data/seoRoutes'
import { trackPageview } from '@/utils/analytics'

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
    // Throne Club nav target on this branch aliases the membership (VIP) page; the
    // full Throne Club flagship lives on feature/throne-club-redesign.
    { path: '/throne-club', name: 'throne-club', component: () => import('@/views/VipView.vue') },
    { path: '/kingdom', name: 'kingdom', component: () => import('@/views/KingdomView.vue') },
    {
      path: '/kingdom/tournament/:slug',
      name: 'tournament',
      component: () => import('@/views/TournamentDetailView.vue'),
    },
    { path: '/rewards', name: 'rewards', component: () => import('@/views/RewardsView.vue') },
    // Dedicated category pages (one config-driven CategoryView, meta.category selects content)
    // E-Sport uses the identical Sports page (same Arena frame layout).
    { path: '/esports', name: 'esports', component: () => import('@/views/SportsView.vue') },
    { path: '/live', name: 'live', meta: { category: 'live' }, component: () => import('@/views/CategoryView.vue') },
    { path: '/virtual', name: 'virtual', component: () => import('@/views/VirtualsView.vue') },
    { path: '/games', name: 'games', component: () => import('@/views/GamesView.vue') },
    { path: '/beton', name: 'beton', meta: { category: 'beton' }, component: () => import('@/views/CategoryView.vue') },
    { path: '/poker', name: 'poker', component: () => import('@/views/PokerView.vue') },
    // Static info / legal pages (shared InfoView, slug via meta.info)
    { path: '/about', name: 'about', meta: { info: 'about' }, component: () => import('@/views/InfoView.vue') },
    { path: '/help', name: 'help', meta: { info: 'help' }, component: () => import('@/views/InfoView.vue') },
    { path: '/responsible-gaming', name: 'responsible-gaming', meta: { info: 'responsible-gaming' }, component: () => import('@/views/InfoView.vue') },
    { path: '/terms', name: 'terms', meta: { info: 'terms' }, component: () => import('@/views/InfoView.vue') },
    { path: '/privacy', name: 'privacy', meta: { info: 'privacy' }, component: () => import('@/views/InfoView.vue') },
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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

// Per-route <head>. The manifest in src/data/seo-routes.json is the single
// source of truth; scripts/prerender.mjs bakes the same values into a static
// file per public route so crawlers that do not run JS see them too.
const FALLBACK = {
  title: 'THRONE · VIP Gaming Club',
  description: 'THRONE — a private royal gaming club. The casino floor, the live tables, the sportsbook and the Royal Court, gathered under one roof.',
}

router.afterEach((to) => {
  const name = String(to.name ?? '')
  const seo = seoRouteFor(name)

  // Nothing outside the public manifest may be indexed: the 28 /account routes
  // are auth-gated, the two :slug families are unbounded, and not-found is
  // not a page. Without this they would all serve the shell's metadata and
  // return 200 — exactly the duplicate problem the manifest exists to end.
  const robots = seo ? null : 'noindex'

  applyHead({
    title: seo ? `${seo.title} · THRONE` : name.startsWith('acc-') ? 'My Account · THRONE' : FALLBACK.title,
    description: seo?.description ?? FALLBACK.description,
    // `to.path` excludes query and hash, so tracking params never mint a
    // duplicate URL. An alias points at the page it duplicates instead.
    canonicalPath: seo?.canonical ?? to.path,
    robots,
  })

  trackPageview(name || 'unknown')
})

// Guests bouncing off a protected route land home with the login modal open,
// carrying where they were going so the login chain can put them back there.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !useAuth().isLoggedIn.value) {
    useAuthModal().open('login')
    return { path: '/', query: { redirect: to.fullPath } }
  }
})

export default router
