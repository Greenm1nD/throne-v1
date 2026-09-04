<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Premium count-up: animates a numeric value (with currency prefix / unit suffix)
 * from 0 to target when it scrolls into view. Reduced-motion → final value only.
 * Examples: "$1,250,000" · "12 Days".
 */
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1500 })

const el = ref<HTMLElement | null>(null)
const display = ref(props.value)

const match = props.value.match(/^(\D*)([\d,]+)(.*)$/)
const prefix = match ? match[1] : ''
const target = match ? Number(match[2].replace(/,/g, '')) : 0
const suffix = match ? match[3] : ''
const hasNumber = !!match
const fmt = (n: number) => prefix + n.toLocaleString('en-US') + suffix

let raf = 0
let io: IntersectionObserver | null = null

onMounted(() => {
  const node = el.value
  if (!hasNumber || !node) {
    display.value = props.value
    return
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = fmt(target)
    return
  }
  display.value = fmt(0)
  io = new IntersectionObserver(
    (entries, obs) => {
      if (!entries[0].isIntersecting) return
      obs.disconnect()
      let start = 0
      const tick = (ts: number) => {
        if (!start) start = ts
        const p = Math.min(1, (ts - start) / props.duration)
        const eased = 1 - Math.pow(1 - p, 3)
        display.value = fmt(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    },
    { threshold: 0.35 },
  )
  io.observe(node)
})

onBeforeUnmount(() => {
  io?.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display }}</span>
</template>
