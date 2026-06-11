<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import FontIcon from '@/components/ui/FontIcon.vue'

/** Renders either an AppIcon (`icon`) or a fontello glyph (`font`). */
withDefaults(defineProps<{ icon?: string; font?: string; size?: number }>(), { size: 16 })
</script>

<template>
  <FontIcon v-if="font" :name="font" :style="{ fontSize: `${size}px` }" />
  <AppIcon v-else-if="icon" :name="icon" :size="size" />
</template>
