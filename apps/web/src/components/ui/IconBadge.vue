<script setup lang="ts">
/**
 * IconBadge — a gold-outlined glyph chip used for rewards, meta rows,
 * and community channels. Sits on a faint gold disc with hover glow.
 */
import AppIcon from './AppIcon.vue'

withDefaults(
  defineProps<{
    icon: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' },
)

const box = { sm: 'h-10 w-10', md: 'h-14 w-14', lg: 'h-16 w-16' }
const glyph = { sm: 18, md: 24, lg: 28 }
</script>

<template>
  <span
    class="group/badge inline-flex items-center justify-center rounded-2xl border border-border-gold bg-gold/[0.06] text-champagne transition-all duration-300 hover:border-gold hover:bg-gold/15 hover:text-gold-bright hover:shadow-gold-soft"
    :class="box[size]"
  >
    <AppIcon :name="icon" :size="glyph[size]" />
  </span>
</template>
