<script setup lang="ts">
import { ref } from 'vue'
import { gameImage, type Game } from '@/data/games'
import { assets } from '@/data/assets'

const props = defineProps<{ game: Game }>()
const img = gameImage(props.game)
const hoverVideo = props.game.hoverVideo ? assets[props.game.hoverVideo] : null

const video = ref<HTMLVideoElement | null>(null)

function play() {
  video.value?.play().catch(() => {})
}
function stop() {
  const v = video.value
  if (v) {
    v.pause()
    v.currentTime = 0
  }
}
</script>

<template>
  <article
    class="card-lux group flex h-[290px] flex-col overflow-hidden"
    data-reveal
    @mouseenter="play"
    @mouseleave="stop"
  >
    <!-- Title block, centered at the top of the card -->
    <div class="relative z-10 px-3 pb-2 pt-6 text-center">
      <h3 class="font-display text-xl font-semibold tracking-[0.12em] text-gold-gradient">
        {{ game.name }}
      </h3>
      <p class="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">
        {{ game.category }}
      </p>
    </div>

    <!-- Media fills the remaining card area -->
    <div class="relative flex-1 overflow-hidden">
      <!-- Static image (default) -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
        :style="{ backgroundImage: `url('${img.src}')`, backgroundColor: '#0d0d10' }"
      />

      <!-- Hover video: fades in and plays on hover -->
      <video
        v-if="hoverVideo"
        ref="video"
        class="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        :poster="img.src"
        muted
        loop
        playsinline
        preload="none"
        aria-hidden="true"
      >
        <source :src="hoverVideo.src" type="video/mp4" />
      </video>

      <!-- Gradient scrim so the image blends into the card -->
      <div
        class="pointer-events-none absolute inset-0"
        style="
          background: linear-gradient(
            180deg,
            rgba(17, 17, 19, 0.65),
            rgba(5, 5, 5, 0.15) 38%,
            rgba(5, 5, 5, 0.5)
          );
        "
      />
    </div>
  </article>
</template>
