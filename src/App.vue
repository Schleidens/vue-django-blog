<script setup>
import { RouterView } from 'vue-router'

import TheNavbar from './components/layout/TheNavbar.vue';
</script>

<template>
  <header>
    <TheNavbar />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
