<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'
import AmbientBackground from '@/components/ui/AmbientBackground.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const ready = ref(false)
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <AmbientBackground />
  <div v-show="ready" class="min-h-screen">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
  <AuthModal />
</template>
