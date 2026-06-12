<script setup lang="ts">
/**
 * GoldButton — the brand's primary action.
 * variants:
 *  - solid:   filled champagne-gold (high emphasis)
 *  - outline: hairline gold border on glass (medium)
 *  - ghost:   bare text with gold hover (low)
 */
withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
  }>(),
  { variant: 'solid', size: 'md', block: false },
)

const sizeMap = {
  sm: 'h-9 px-4 text-[11px]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-[52px] px-9 text-[13px]',
}
</script>

<template>
  <button
    class="shimmer-host group inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold uppercase tracking-[0.18em] transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
    :class="[
      sizeMap[size],
      block && 'w-full',
      variant === 'solid' &&
        'bg-gold-gradient text-[#1a1407] shadow-gold-soft brightness-100 hover:shadow-gold hover:brightness-110 active:scale-[0.98]',
      variant === 'outline' &&
        'border border-border-gold bg-white/[0.02] text-champagne hover:border-gold hover:bg-gold/10 hover:text-gold-bright',
      variant === 'ghost' && 'text-ink-muted hover:text-gold-bright',
    ]"
  >
    <slot />
  </button>
</template>
