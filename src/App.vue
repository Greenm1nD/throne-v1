<script setup lang="ts">
import { ref } from 'vue'
import LoadingScreen from '@/components/home/LoadingScreen.vue'
import AuthModal from '@/components/auth/AuthModal.vue'

const ready = ref(false)
</script>

<template>
  <LoadingScreen v-if="!ready" @done="ready = true" />
  <RouterView v-show="ready" />
  <AuthModal />
</template>
