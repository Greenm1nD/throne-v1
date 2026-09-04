<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import GoldButton from '@/components/ui/GoldButton.vue'
import { useFavorites } from '@/composables/useFavorites'

/**
 * Canonical game tile — one shared style for every game grid (Casino, Virtuals,
 * Beton…): square art, badge, hover Play overlay, name + provider/RTP row,
 * favorite star (persisted via useFavorites).
 */
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    image: string
    hot?: boolean
    isNew?: boolean
    tag?: string
    /** Return-to-player, e.g. "96.5" — shown beside the subtitle when known */
    rtp?: string
    /** Stable favorite key (game slug); falls back to the title */
    favId?: string
  }>(),
  { subtitle: '', hot: false, isNew: false, tag: '', rtp: '', favId: '' },
)
defineEmits<{ select: [] }>()

const { isFavorite, toggleFavorite } = useFavorites()
const favKey = computed(() => props.favId || props.title)

/** "Provider · RTP 96.5%" — plain facts under the name, never decoration. */
const caption = computed(() =>
  [props.subtitle, props.rtp ? `RTP ${props.rtp}%` : ''].filter(Boolean).join(' · '),
)
</script>

<template>
  <article
    v-glow
    class="group cursor-pointer overflow-hidden rounded-xl border border-border-gold/70 bg-card shadow-[inset_0_1px_0_rgba(245,215,122,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-card-lift motion-reduce:transform-none"
    @click="$emit('select')"
  >
    <div class="relative aspect-square overflow-hidden rounded-t-[11px]">
      <img
        :src="image" :alt="title" loading="lazy" decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none"
      />
      <span v-if="hot" class="absolute left-2 top-2 flex items-center gap-1 rounded bg-gold-gradient px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-[#1a1407] shadow-gold-soft">
        <AppIcon name="crown" :size="10" /> Hot
      </span>
      <span v-else-if="isNew" class="absolute left-2 top-2 rounded border border-gold/60 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">New</span>
      <span v-else-if="tag" class="absolute left-2 top-2 rounded-full border border-border-gold/50 bg-black/60 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-gold-bright backdrop-blur">{{ tag }}</span>

      <div class="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <GoldButton variant="solid" size="sm"><AppIcon name="play" :size="12" /> Play</GoldButton>
      </div>
      <span class="shine-beam" />
    </div>

    <div class="flex items-center justify-between gap-2 px-2.5 py-2">
      <div class="min-w-0">
        <p class="truncate font-sans text-[12px] font-semibold text-ink transition-colors group-hover:text-gold-bright">{{ title }}</p>
        <p v-if="caption" class="mt-0.5 truncate font-sans text-[10px] text-ink-dim">
          {{ caption }}
        </p>
      </div>
      <button
        class="-my-1.5 -mr-1.5 grid h-11 w-11 shrink-0 place-items-center transition-colors"
        :class="isFavorite(favKey) ? 'text-gold-bright' : 'text-ink-dim hover:text-gold'"
        :aria-pressed="isFavorite(favKey)"
        :aria-label="`Favorite ${title}`"
        @click.stop="toggleFavorite(favKey)"
      >
        <AppIcon name="star" :size="15" />
      </button>
    </div>
  </article>
</template>
