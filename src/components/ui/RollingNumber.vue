<script setup lang="ts">
import { ref, watch } from 'vue'

/**
 * Odometer-style number: every digit lives on a vertical 0-9 strip and ROLLS
 * UPWARD to its new value (slot-reel feel). Separators and the prefix stay
 * static. Sized in `em`, so it inherits the parent's font and scale.
 *
 * Columns are stored right-to-left (rendered with flex-row-reverse) so that
 * when the number grows a digit, existing columns keep their identity.
 */
const props = withDefaults(defineProps<{ value: number; prefix?: string }>(), { prefix: '' })

interface Col {
  ch: string
  /** strip offset in digits; only ever increases, snapped back by 10 after anim */
  pos: number
  digit: boolean
  noTrans: boolean
}

const fmt = (v: number) => props.prefix + v.toLocaleString('en-US')
const toCols = (s: string): Col[] =>
  [...s].reverse().map((ch) => ({
    ch,
    digit: /\d/.test(ch),
    pos: /\d/.test(ch) ? +ch : 0,
    noTrans: false,
  }))

const cols = ref<Col[]>(toCols(fmt(props.value)))

watch(
  () => props.value,
  (nv) => {
    const next = [...fmt(nv)].reverse()
    const out: Col[] = []
    for (let i = 0; i < next.length; i++) {
      const ch = next[i]
      const isDigit = /\d/.test(ch)
      const old = cols.value[i]
      if (isDigit && old?.digit) {
        // Always roll upward: advance by (new - current) mod 10.
        const cur = old.pos % 10
        const delta = (+ch - cur + 10) % 10
        out.push({ ch, digit: true, pos: old.pos + delta, noTrans: false })
      } else {
        out.push({ ch, digit: isDigit, pos: isDigit ? +ch : 0, noTrans: !old })
      }
    }
    cols.value = out

    // After the roll completes, silently snap strips back into the 0-9 window.
    window.setTimeout(() => {
      cols.value = cols.value.map((c) =>
        c.pos >= 10 ? { ...c, pos: c.pos % 10, noTrans: true } : c,
      )
      requestAnimationFrame(() => {
        cols.value = cols.value.map((c) => ({ ...c, noTrans: false }))
      })
    }, 700)
  },
)
</script>

<template>
  <span
    class="inline-flex flex-row-reverse items-baseline"
    style="font-variant-numeric: tabular-nums"
  >
    <template v-for="(c, i) in cols" :key="i">
      <!-- Static glyphs: prefix, commas -->
      <span v-if="!c.digit" class="inline-block bg-gold-text bg-clip-text text-transparent" style="line-height: 1em">{{ c.ch }}</span>

      <!-- Rolling digit -->
      <span
        v-else
        class="relative inline-block overflow-hidden"
        style="height: 1em; width: 1ch; line-height: 1em"
        aria-hidden="true"
      >
        <span
          class="absolute left-0 top-0 flex flex-col items-center"
          :style="{
            transform: `translateY(-${c.pos}em)`,
            transition: c.noTrans ? 'none' : 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
          }"
        >
          <span v-for="n in 20" :key="n" class="block w-[1ch] bg-gold-text bg-clip-text text-center text-transparent" style="height: 1em; line-height: 1em">
            {{ (n - 1) % 10 }}
          </span>
        </span>
      </span>
    </template>
    <span class="sr-only">{{ fmt(value) }}</span>
  </span>
</template>
