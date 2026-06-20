<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import GoldButton from '@/components/ui/GoldButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useEnter } from '@/composables/useEnter'
import { useRevealEach } from '@/composables/useReveal'
import { lobbyGames, gameSlug, type LobbyGame } from '@/data/casinoGames'

/**
 * THRONE Games — "Netflix for premium casino games". Cinematic hero · category
 * pills + search · Featured / New / Popular rails · top providers · value strip.
 * Reuses the real casino catalogue (lobbyGames) for art + providers.
 */
const { enter } = useEnter()
const router = useRouter()
const root = ref<HTMLElement | null>(null)
useRevealEach(root)

const categories = [
  'All Games', 'Crash Games', 'Instant Games', 'Table Games', 'Arcade Games', 'Card Games', 'Special Games',
]
const activeCat = ref('All Games')
const query = ref('')

const match = (list: LobbyGame[]) =>
  query.value.trim()
    ? list.filter((g) => g.name.toLowerCase().includes(query.value.trim().toLowerCase()))
    : list

const featured = computed(() => match(lobbyGames.slice(0, 6)))
const newReleases = computed(() => match(lobbyGames.slice(6, 12)))
const popular = computed(() => match(lobbyGames.slice(11, 17)))

const providers = ['Pragmatic Play', 'Spribe', 'Evolution', 'Hacksaw', "Play'n GO", 'NetEnt', 'Relax Gaming', 'NoLimit City']

const values = [
  { icon: 'bolt', title: 'Instant Play', sub: 'No downloads. Start playing instantly.' },
  { icon: 'shield', title: 'Fair & Secure', sub: 'Provably fair games and secure environment.' },
  { icon: 'clock', title: '24/7 Action', sub: 'New games and events all day, every day.' },
  { icon: 'monitor', title: 'Mobile Ready', sub: 'Play your favorite games anywhere, anytime.' },
  { icon: 'percent', title: 'Fast Payouts', sub: 'Quick withdrawals and instant results.' },
]

function play(g: LobbyGame) {
  router.push(`/casino/play/${gameSlug(g)}`)
}
</script>

<template>
  <main ref="root" class="pb-8">
    <!-- ── Hero ─────────────────────────────────────────────────────────── -->
    <section class="container-royal pt-6 sm:pt-8">
      <div class="relative overflow-hidden rounded-3xl border border-border-gold/25" data-reveal>
        <div
          v-lazybg="`linear-gradient(95deg, rgba(5,5,6,0.97) 0%, rgba(5,5,6,0.8) 44%, rgba(5,5,6,0.45) 100%), url('/assets/images/casino-jackpot.webp')`"
          class="absolute inset-0 bg-cover bg-center"
        />
        <div class="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p class="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne/80">Endless games. Instant fun.</p>
          <h1 class="mt-3 font-display text-5xl font-bold uppercase leading-[0.95] tracking-[0.02em] sm:text-6xl">
            <span class="block text-ink">Play.</span>
            <span class="block text-ink">Win.</span>
            <span class="block text-gold-gradient">Repeat.</span>
          </h1>
          <p class="mt-4 max-w-md font-sans text-[13px] leading-7 text-ink-muted">
            Explore the finest collection of premium games — instant classics, modern favorites and exclusive THRONE experiences.
          </p>
          <GoldButton variant="solid" size="lg" class="mt-6 w-fit" @click="enter()">
            Explore Games <AppIcon name="arrowRight" :size="15" />
          </GoldButton>
        </div>
      </div>
    </section>

    <!-- ── Category pills + search ──────────────────────────────────────── -->
    <section class="container-royal pt-7">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div class="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            v-for="c in categories" :key="c"
            class="shrink-0 rounded-full px-4 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200"
            :class="activeCat === c ? 'bg-gold-gradient text-bg' : 'border border-border-gold/25 bg-card/60 text-ink-muted hover:border-border-gold/60 hover:text-champagne'"
            @click="activeCat = c"
          >{{ c }}</button>
        </div>
        <label class="relative lg:w-72">
          <AppIcon name="search" :size="15" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/60" />
          <input
            v-model="query"
            type="search"
            placeholder="Search games..."
            class="h-11 w-full rounded-full border border-border-gold/60 bg-black/40 pl-11 pr-4 font-sans text-sm text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none"
          />
        </label>
      </div>
    </section>

    <!-- ── Game rails ───────────────────────────────────────────────────── -->
    <template v-for="rail in [
      { title: 'Featured Games', games: featured },
      { title: 'New Releases', games: newReleases },
      { title: 'Popular Games', games: popular },
    ]" :key="rail.title">
      <section v-if="rail.games.length" class="container-royal pt-10">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">{{ rail.title }}</h2>
          <button class="flex items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-gold/90 hover:text-gold-bright">
            View all <AppIcon name="arrowRight" :size="13" />
          </button>
        </div>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <article
            v-for="g in rail.games" :key="g.name"
            v-glow
            class="group cursor-pointer overflow-hidden rounded-2xl border border-border-gold/20 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold motion-reduce:transform-none"
            data-reveal
            @click="play(g)"
          >
            <div class="relative aspect-[4/5] overflow-hidden">
              <img :src="g.image" :alt="g.name" loading="lazy" decoding="async"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none" />
              <span v-if="g.hot" class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-bg">
                <AppIcon name="crown" :size="10" /> Hot
              </span>
              <span v-else-if="g.isNew" class="absolute left-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">New</span>
              <div class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <GoldButton variant="solid" size="sm"><AppIcon name="play" :size="12" /> Play</GoldButton>
              </div>
            </div>
            <div class="px-3 py-2.5">
              <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ g.name }}</p>
              <p class="mt-0.5 font-sans text-[10px] uppercase tracking-[0.08em] text-ink-dim">{{ g.provider }}</p>
            </div>
          </article>
        </div>
      </section>
    </template>

    <!-- ── Top providers ────────────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <h2 class="mb-5 font-display text-xl font-semibold tracking-[0.14em] text-gold-gradient">Top Providers</h2>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        <div v-for="p in providers" :key="p"
          class="flex h-16 items-center justify-center rounded-xl border border-border-gold/15 bg-card/60 px-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors hover:border-border-gold/50 hover:text-champagne">
          {{ p }}
        </div>
      </div>
    </section>

    <!-- ── Value strip ──────────────────────────────────────────────────── -->
    <section class="container-royal pt-12 sm:pt-16">
      <div class="grid grid-cols-2 gap-3 rounded-2xl border border-border-gold/15 bg-card/60 p-4 sm:grid-cols-3 lg:grid-cols-5 lg:p-5" data-reveal>
        <div v-for="v in values" :key="v.title" class="flex flex-col items-center gap-2 px-2 py-4 text-center">
          <span class="grid h-10 w-10 place-items-center rounded-full border border-border-gold/40 text-gold-bright">
            <AppIcon :name="v.icon" :size="18" />
          </span>
          <span class="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-ink">{{ v.title }}</span>
          <span class="font-sans text-[11px] leading-snug text-ink-dim">{{ v.sub }}</span>
        </div>
      </div>
    </section>
  </main>
</template>
