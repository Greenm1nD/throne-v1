<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'

/**
 * Renders the richest glyph available: a custom royal PNG (`img`),
 * a fontello glyph (`font`), or an AppIcon stroke (`icon`).
 */
withDefaults(defineProps<{ icon?: string; font?: string; img?: string; size?: number }>(), {
  size: 16,
})
</script>

<template>
  <img
    v-if="img"
    :src="img"
    alt=""
    class="object-contain"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
  <FontIcon v-else-if="font" :name="font" :style="{ fontSize: `${size}px` }" />
  <AppIcon v-else-if="icon" :name="icon" :size="size" />
</template>
