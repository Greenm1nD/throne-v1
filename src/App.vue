<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import TwoFaModal from '@/components/auth/TwoFaModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'
import AmbientAudio from '@/components/ui/AmbientAudio.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const ready = ref(false)
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <AmbientBackground />
  <AppHeader v-show="ready" />
  <div v-show="ready" class="min-h-[60vh]">
    <RouterView />
  </div>
  <AppFooter v-show="ready" />
  <AmbientAudio />
  <AuthModal />
  <TwoFaModal />
</template>
