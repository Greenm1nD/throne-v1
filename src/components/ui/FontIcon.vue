<script setup lang="ts">
/**
 * Renders a glyph from the bundled `fontello` casino icon font.
 * Usage: <FontIcon name="nav-casino" /> -> <i class="icon-nav-casino" />
 * Size/color inherit from the parent (font-size / color).
 * Full set is in src/assets/fonts/fontello/fontello.css (379 icons).
 */
defineProps<{ name: string }>()
</script>

<template>
  <i :class="`icon-${name}`" aria-hidden="true" />
</template>
