<script setup lang="ts">
/**
 * The one progression surface (spec §4.1). Every view that shows rank, band
 * progress or the Standing Order renders THIS — no view computes progress, so
 * the three-bars-three-answers defect cannot come back.
 *
 * Placements built: Bar (home rail), Card (dashboard), Page (VIP progress),
 * Hero (rewards summary). Sheet and Pill are specified but have no call site
 * yet, so they are deliberately not built.
 *
 * Non-negotiable, per §4.4 — none of these appear anywhere below:
 *   • no countdown, on a reward, a quest or a tier
 *   • no "you're so close" prompt — the bar shows position, never editorialises
 *   • no streak that breaks
 *   • no claim button on the Standing Order: it accrues and is withdrawable,
 *     and the absence of the button IS the product
 */
import { computed, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import ParticleLayer from '@/components/ui/ParticleLayer.vue'
import { useProgression } from '@/composables/useProgression'
import { bandLabel, formatBp, formatMinor, formatTribute, totalReturnBp } from '@/data/progression'

const props = withDefaults(
  defineProps<{
    placement?: 'Bar' | 'Card' | 'Page' | 'Hero'
    /** Guests see the ladder with no personal position. */
    anonymous?: boolean
  }>(),
  { placement: 'Card', anonymous: false },
)

const { state, rank, progress, toNext, gate, currency, balanceMinor, weeklyPurseLabel, ranks } =
  useProgression()

const reduce =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const activeIndex = computed(() =>
  props.anonymous ? -1 : ranks.findIndex((r) => r.id === rank.value?.id),
)

/** Filled share of the ladder rail — position on the ladder, not band progress. */
const railPct = computed(() =>
  activeIndex.value < 0 ? 0 : (activeIndex.value / (ranks.length - 1)) * 100,
)

/** Band progress, 0–100. Answers "how far to the next rank" (§3.3). */
const bandPct = computed(() => Math.round(progress.value * 100))

/* ── The live counter (§4.3) ──────────────────────────────────────────────
 * Rolls only when a settled bet changes the balance — never on a timer.
 * 350ms, cubic-bezier(0.22, 1, 0.36, 1); a correction snaps rather than
 * animating downward, so money is never seen to drain. */
const shown = ref(balanceMinor.value ?? 0)
const pulsing = ref(false)
let raf = 0
let pulseTimer: ReturnType<typeof setTimeout> | undefined

const ease = (t: number) => 1 - Math.pow(1 - t, 3)

watch(balanceMinor, (to, from) => {
  if (to === null) return
  if (reduce || from === null || to < from) {
    shown.value = to
    return
  }
  const start = performance.now()
  const base = from
  cancelAnimationFrame(raf)
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / 350)
    shown.value = Math.round(base + (to - base) * ease(t))
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
  pulsing.value = true
  clearTimeout(pulseTimer)
  pulseTimer = setTimeout(() => (pulsing.value = false), 700)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  clearTimeout(pulseTimer)
})

/** Fail closed: no Standing Order figure means no counter, never a zero. */
const balanceLabel = computed(() =>
  balanceMinor.value === null ? null : formatMinor(shown.value, currency.value),
)

const tributeLine = computed(() => {
  if (!state.value || !rank.value) return ''
  const lifetime = `${formatTribute(state.value.lifetimeTribute)} tribute`
  const next = ranks[activeIndex.value + 1]
  if (!next) return `${lifetime} · the ladder ends here`
  // A gated player has already paid the tribute for the next rank, so quoting a
  // figure would be false. What is outstanding is a document, named separately.
  if (gate.value) return `${lifetime} · ${next.name} earned, pending verification`
  return `${lifetime} · ${formatTribute(toNext.value)} to ${next.name}`
})
</script>

<template>
  <!-- ══ BAR — the home rail ══════════════════════════════════════════════ -->
  <div
    v-if="placement === 'Bar'"
    class="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8"
  >
    <h3
      class="shrink-0 font-display text-xs font-semibold uppercase leading-tight tracking-[0.22em] text-champagne sm:text-sm"
    >
      <template v-if="!anonymous">Kingdom<br class="hidden lg:block" /> Status</template>
      <template v-else>Rise Through<br class="hidden lg:block" /> The Ranks</template>
    </h3>

    <div
      class="flex flex-1 items-center gap-3 overflow-x-auto py-1 [scrollbar-width:none] lg:overflow-visible"
    >
      <AppIcon name="arrowLeft" :size="16" class="shrink-0 text-ink-dim" />

      <div class="relative flex-1 px-1">
        <div class="pointer-events-none absolute inset-x-2 top-[52px] h-[2px] rounded bg-white/10" />
        <div
          class="pointer-events-none absolute left-2 top-[52px] h-[2px] rounded bg-gold-gradient shadow-[0_0_8px_rgba(245,215,122,0.6)] transition-[width] duration-1000 ease-out"
          :style="{ width: `${railPct}%` }"
        />

        <ol class="rank-track relative flex items-start justify-between">
          <li
            v-for="(r, i) in ranks"
            :key="r.id"
            class="group/crown relative flex shrink-0 flex-col items-center"
          >
            <ParticleLayer v-if="i === ranks.length - 1" :count="8" />

            <div class="flex h-12 items-end justify-center">
              <img loading="lazy" decoding="async"
                :src="r.crown"
                :alt="`${r.name} crown`"
                class="w-auto object-contain transition-all duration-300"
                :class="
                  i === activeIndex
                    ? 'h-11 drop-shadow-[0_0_16px_rgba(245,215,122,0.85)]'
                    : i < activeIndex
                      ? 'h-9'
                      : 'h-9 opacity-60'
                "
              />
            </div>

            <span
              class="relative z-10 mt-4 whitespace-nowrap font-sans text-[10px] font-semibold uppercase tracking-[0.2em]"
              :class="i === activeIndex ? 'text-gold-bright' : 'text-ink-muted'"
            >
              {{ r.name }}
            </span>

            <!-- The published arithmetic, on hover: floor and what it returns. -->
            <span
              class="pointer-events-none absolute -top-9 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-border-gold bg-black/90 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-champagne opacity-0 transition-opacity duration-200 group-hover/crown:opacity-100"
            >
              {{ formatTribute(r.floor) }} tribute · {{ formatBp(totalReturnBp(r)) }} back
            </span>
          </li>
        </ol>
      </div>

      <AppIcon name="arrowRight" :size="16" class="shrink-0 text-ink-dim" />
    </div>

    <div
      v-if="!anonymous && rank"
      class="shrink-0 rounded-xl border border-border-gold bg-black/40 p-4 lg:w-72"
    >
      <div class="flex items-baseline justify-between">
        <span class="eyebrow">Your Rank</span>
        <span class="font-display text-lg font-semibold tracking-[0.12em] text-gold-gradient">
          {{ rank.name }}
        </span>
      </div>
      <div class="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          class="h-full rounded-full bg-gold-gradient shadow-[0_0_12px_rgba(245,215,122,0.5)] transition-[width] duration-1000 ease-out"
          :style="{ width: `${bandPct}%` }"
        />
      </div>
      <p class="mt-2 text-right font-sans text-[11px] tabular-nums text-ink-muted">
        {{ tributeLine }}
      </p>
    </div>
  </div>

  <!-- ══ CARD — the dashboard tile ════════════════════════════════════════ -->
  <div v-else-if="placement === 'Card'" class="space-y-4">
    <div v-if="rank" class="flex items-center gap-4">
      <img :src="rank.crown" alt="" class="h-10 w-12 shrink-0 object-contain object-bottom" />
      <div class="min-w-0 flex-1">
        <div class="flex items-baseline justify-between gap-3">
          <p class="font-display text-base font-semibold uppercase tracking-[0.16em] text-gold-gradient">
            {{ rank.name }}
          </p>
          <span class="font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim">
            {{ formatBp(rank.standingOrderBp) }} of tribute
          </span>
        </div>
        <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full bg-gold-gradient transition-[width] duration-1000 ease-out"
            :style="{ width: `${bandPct}%` }"
          />
        </div>
        <p class="mt-1.5 font-sans text-[11px] tabular-nums text-ink-dim">{{ tributeLine }}</p>
      </div>
    </div>

    <div v-if="balanceLabel" class="flex items-baseline justify-between border-t border-border-gold/20 pt-3">
      <span class="eyebrow">Standing Order</span>
      <span
        class="font-display text-lg font-semibold tabular-nums text-gold-gradient transition-[filter] duration-700"
        :class="pulsing && 'drop-shadow-[0_0_12px_rgba(245,215,122,0.8)]'"
      >{{ balanceLabel }}</span>
    </div>

    <p v-if="gate" class="font-sans text-[11px] text-champagne">
      {{ gate.rank.name }} is waiting on one document — {{ gate.label.toLowerCase() }}.
    </p>

    <RouterLink
      to="/account/limits"
      class="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-champagne"
    >
      <AppIcon name="lock" :size="10" /> Writ of Restraint
    </RouterLink>
  </div>

  <!-- ══ HERO — the rewards summary panel ═════════════════════════════════ -->
  <div v-else-if="placement === 'Hero'" class="space-y-5">
    <div v-if="rank" class="flex items-center justify-between gap-4">
      <div>
        <p class="eyebrow mb-1">Your Rank</p>
        <p class="font-display text-2xl font-bold uppercase tracking-[0.16em] text-gold-gradient">
          {{ rank.name }}
        </p>
      </div>
      <img :src="rank.crown" alt="" class="h-14 w-16 object-contain object-bottom drop-shadow-[0_0_18px_rgba(245,215,122,0.6)]" />
    </div>

    <div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          class="h-full rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(245,215,122,0.5)] transition-[width] duration-1000 ease-out"
          :style="{ width: `${bandPct}%` }"
        />
      </div>
      <p class="mt-2 font-sans text-[12px] tabular-nums text-ink-muted">{{ tributeLine }}</p>
    </div>

    <dl class="grid grid-cols-2 gap-3">
      <div v-if="balanceLabel" class="rounded-xl border border-border-gold/40 bg-black/30 p-3">
        <dt class="eyebrow mb-1">Standing Order</dt>
        <dd
          class="font-display text-lg font-semibold tabular-nums text-gold-gradient transition-[filter] duration-700"
          :class="pulsing && 'drop-shadow-[0_0_12px_rgba(245,215,122,0.8)]'"
        >{{ balanceLabel }}</dd>
      </div>
      <div v-if="weeklyPurseLabel" class="rounded-xl border border-border-gold/40 bg-black/30 p-3">
        <dt class="eyebrow mb-1">Weekly Purse</dt>
        <dd class="font-display text-lg font-semibold tabular-nums text-champagne">{{ weeklyPurseLabel }}</dd>
      </div>
    </dl>

    <!-- Accrues and is withdrawable. There is deliberately no claim button. -->
    <p class="font-sans text-[11px] leading-relaxed text-ink-dim">
      Both accrue on settled bets and are withdrawable. Nothing to claim, nothing expires.
    </p>

    <RouterLink
      to="/account/limits"
      class="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-champagne"
    >
      <AppIcon name="lock" :size="10" /> Writ of Restraint
    </RouterLink>
  </div>

  <!-- ══ PAGE — the full ladder ═══════════════════════════════════════════ -->
  <div v-else class="space-y-6">
    <div v-if="rank && !anonymous" class="flex flex-col items-center gap-2 pb-6 text-center">
      <img :src="rank.crown" alt="" class="h-16 w-20 object-contain object-bottom drop-shadow-[0_0_20px_rgba(245,215,122,0.7)]" />
      <p class="font-display text-xl font-bold uppercase tracking-[0.2em] text-gold-gradient">
        {{ rank.name }}
      </p>
      <p class="font-sans text-[12px] tabular-nums text-ink-dim">{{ tributeLine }}</p>
      <div class="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
        <div
          class="h-full rounded-full bg-gold-gradient shadow-[0_0_10px_rgba(245,215,122,0.5)] transition-[width] duration-1000 ease-out"
          :style="{ width: `${bandPct}%` }"
        />
      </div>
      <p v-if="gate" class="mt-2 font-sans text-[12px] text-champagne">
        {{ gate.rank.name }} is waiting on one document — {{ gate.label.toLowerCase() }}.
      </p>
    </div>

    <!-- The rate is of TRIBUTE: the margin your play generated. Published, not buried. -->
    <div class="rounded-xl border border-border-gold/30 bg-black/25 p-4">
      <p class="font-sans text-[12px] leading-relaxed text-ink-muted">
        One tribute is one unit of house edge your play generates —
        <span class="text-champagne">wager × the edge of that game</span>. Every rate below is a
        share of tribute, never of what you wagered and never of what you lost. Low-edge games
        therefore earn slowly: a 1% game climbs at a quarter the rate of an 8% one.
      </p>
    </div>

    <ol class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <li
        v-for="(r, i) in ranks"
        :key="r.id"
        class="card-lux p-5"
        :class="i === activeIndex && 'border-gold shadow-gold-soft'"
      >
        <div class="mb-3 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <img loading="lazy" decoding="async" :src="r.crown" alt="" class="h-7 w-9 object-contain object-bottom"
              :class="i > activeIndex && 'opacity-50'" />
            <p
              class="font-display text-[13px] font-semibold uppercase tracking-[0.18em]"
              :class="i <= activeIndex ? 'text-gold-gradient' : 'text-ink-muted'"
            >{{ r.name }}</p>
          </div>
          <span
            v-if="i === activeIndex"
            class="shrink-0 rounded-full border border-border-gold px-2.5 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.16em] text-gold-bright"
          >You are here</span>
        </div>

        <p class="mb-3 font-sans text-[10px] uppercase tracking-[0.14em] text-ink-dim">
          {{ bandLabel(r) }}
        </p>

        <dl class="mb-3 space-y-1 border-y border-border-gold/20 py-2.5 font-sans text-[12px] tabular-nums">
          <div class="flex justify-between">
            <dt class="text-ink-dim">Standing Order</dt>
            <dd :class="i <= activeIndex ? 'text-champagne' : 'text-ink-muted'">{{ formatBp(r.standingOrderBp) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-ink-dim">Weekly Purse</dt>
            <dd :class="i <= activeIndex ? 'text-champagne' : 'text-ink-muted'">
              {{ r.weeklyPurseBp ? formatBp(r.weeklyPurseBp) : '—' }}
            </dd>
          </div>
          <div class="flex justify-between font-semibold">
            <dt class="text-ink-muted">Total return</dt>
            <dd :class="i <= activeIndex ? 'text-gold-bright' : 'text-ink-muted'">{{ formatBp(totalReturnBp(r)) }}</dd>
          </div>
        </dl>

        <ul class="space-y-1.5">
          <li
            v-for="p in r.perks"
            :key="p"
            class="flex items-start gap-2 font-sans text-[12px]"
            :class="i <= activeIndex ? 'text-ink-muted' : 'text-ink-dim'"
          >
            <AppIcon name="check" :size="11" class="mt-0.5 shrink-0" :class="i <= activeIndex ? 'text-gold/80' : 'text-ink-dim'" />
            {{ p }}
          </li>
          <li v-if="r.gateLabel" class="flex items-start gap-2 font-sans text-[12px] text-ink-dim">
            <AppIcon name="lock" :size="11" class="mt-0.5 shrink-0" />
            {{ r.gateLabel }}
          </li>
        </ul>
      </li>
    </ol>

    <div class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-gold/30 bg-black/25 p-4">
      <p class="font-sans text-[12px] text-ink-muted">
        Rank never decays — not for inactivity, not for withdrawing, not for taking a break.
      </p>
      <RouterLink
        to="/account/limits"
        class="inline-flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-champagne transition-colors hover:text-gold-bright"
      >
        <AppIcon name="lock" :size="10" /> Writ of Restraint
      </RouterLink>
    </div>
  </div>
</template>
