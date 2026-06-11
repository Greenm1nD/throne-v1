import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/casino', name: 'casino', component: () => import('@/views/CasinoView.vue') },
    { path: '/sports', name: 'sports', component: () => import('@/views/SportsView.vue') },
    {
      path: '/live-casino',
      name: 'live-casino',
      component: () => import('@/views/LiveCasinoView.vue'),
    },
    { path: '/vip', name: 'vip', component: () => import('@/views/VipView.vue') },
    { path: '/kingdom', name: 'kingdom', component: () => import('@/views/KingdomView.vue') },
    { path: '/rewards', name: 'rewards', component: () => import('@/views/RewardsView.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
