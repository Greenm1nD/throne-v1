<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from './AppIcon.vue'

/**
 * Site-wide ambient soundtrack with a mute toggle pinned bottom-left.
 * - Track: "Frozen Star" — Kevin MacLeod (incompetech.com),
 *   licensed under CC BY 4.0 (attribution required; see README).
 * - Expects /assets/audio/throne-ambience.mp3 (loops, soft volume).
 * - Browsers block autoplay with sound, so playback only ever starts from
 *   the user's click; the preference persists in localStorage.
 * - If the file is missing, the control hides itself.
 */
const STORAGE = 'throne-audio'
const playing = ref(false)
const missing = ref(false)
let audio: HTMLAudioElement | null = null

function ensureAudio() {
  if (audio) return audio
  audio = new Audio('/assets/audio/throne-ambience.mp3')
  audio.loop = true
  audio.volume = 0.22
  audio.preload = 'none'
  audio.addEventListener('error', () => {
    missing.value = true
    playing.value = false
  })
  return audio
}

async function toggle() {
  const a = ensureAudio()
  if (playing.value) {
    a.pause()
    playing.value = false
    localStorage.setItem(STORAGE, '0')
  } else {
    try {
      await a.play()
      playing.value = true
      localStorage.setItem(STORAGE, '1')
    } catch {
      /* blocked or missing — stay silent */
    }
  }
}

onMounted(() => {
  // Hide the control entirely while the track file hasn't been added yet.
  fetch('/assets/audio/throne-ambience.mp3', { method: 'HEAD' })
    .then((r) => {
      const type = r.headers.get('content-type') ?? ''
      if (!r.ok || type.includes('text/html')) missing.value = true
    })
    .catch(() => (missing.value = true))

  // ON by default — only an explicit mute ('0') keeps the hall silent.
  // Browsers require a gesture for audible playback, so: try immediately
  // (works on soft navigations), otherwise begin on the first interaction.
  if (localStorage.getItem(STORAGE) !== '0') {
    const begin = () => {
      if (playing.value) return
      void toggle()
    }
    begin()
    window.addEventListener('pointerdown', begin, { once: true })
    window.addEventListener('keydown', begin, { once: true })
  }
})

onBeforeUnmount(() => audio?.pause())
</script>

<template>
  <button
    v-if="!missing"
    class="group fixed bottom-5 left-5 z-[90] grid h-12 w-12 place-items-center rounded-full border border-border-gold bg-black/70 backdrop-blur transition-all duration-300 hover:border-gold hover:shadow-gold-soft"
    :class="playing ? 'border-gold/70 text-gold-bright' : 'text-ink-muted hover:text-champagne'"
    :aria-pressed="playing"
    :aria-label="playing ? 'Mute ambience' : 'Play ambience'"
    @click="toggle"
  >
    <!-- Slow inviting glow until the guest mutes it -->
    <span
      v-if="playing"
      class="absolute inset-0 rounded-full"
      style="animation: softGlow 5.5s ease-in-out infinite"
    />
    <AppIcon :name="playing ? 'music' : 'musicOff'" :size="19" />
  </button>
</template>
