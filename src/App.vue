<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'

const ready = ref(false)
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <AmbientBackground />
  <RouterView v-show="ready" />
  <AuthModal />
</template>
