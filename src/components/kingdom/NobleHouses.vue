<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { kingdomPage } from '@/data/pages'

const houses = kingdomPage.houses
const leader = computed(() => Math.max(...houses.map((h) => h.crowns)))
</script>

<template>
  <section class="container-royal pt-12 sm:pt-16">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow mb-1">Pledge your banner</p>
        <h3 class="font-display text-2xl font-bold tracking-[0.08em] text-gold-gradient">Noble Houses</h3>
      </div>
      <p class="max-w-xs font-sans text-[11px] leading-relaxed text-ink-dim sm:text-right">
        Your crowns feed your house. The leading house at season's end shares a
        <span class="text-champagne">€100,000</span> bounty.
      </p>
    </div>

    <div class="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div
        v-for="(h, i) in houses"
        :key="h.name"
        class="card-lux flex w-[360px] shrink-0 snap-start items-center gap-4 p-5 hover:translate-y-0"
        :class="h.you && 'ring-1 ring-gold/40'"
        data-reveal
      >
        <!-- Crest -->
        <div
          class="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl border font-display text-2xl font-bold"
          :style="{ borderColor: h.accent, color: h.accent, background: `radial-gradient(circle, ${h.accent}22, transparent 72%)` }"
        >
          {{ h.sigil }}
          <span class="absolute -left-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-border-gold/50 bg-surface font-sans text-[11px] font-bold tabular-nums text-champagne">
            {{ i + 1 }}
          </span>
        </div>

        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate font-display text-[15px] font-semibold tracking-[0.04em] text-ink">{{ h.name }}</p>
            <span v-if="h.you" class="shrink-0 rounded-full border border-gold/50 px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-gold-bright">
              Pledged
            </span>
          </div>
          <p class="truncate font-sans text-[11px] italic text-ink-dim">“{{ h.motto }}”</p>

          <div class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div class="h-full rounded-full" :style="{ width: `${(h.crowns / leader) * 100}%`, background: `linear-gradient(90deg, ${h.accent}, ${h.accent}aa)` }" />
          </div>
          <div class="mt-1.5 flex items-center justify-between font-sans text-[10px] text-ink-dim">
            <span><AppIcon name="user" :size="10" class="mr-0.5 inline align-[-1px]" />{{ h.members.toLocaleString() }} nobles</span>
            <span class="flex items-center gap-1 font-semibold tabular-nums text-champagne">
              <AppIcon name="crown" :size="10" class="text-gold/70" />{{ h.crowns.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
