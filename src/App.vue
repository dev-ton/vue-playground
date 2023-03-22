<template>
  <i-layout>
    <Navigation />
    <i-layout-content class="main">
      <RouterView />
    </i-layout-content>
    <i-layout-footer> </i-layout-footer>
  </i-layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
</script>

<style scoped>
.main {
  padding-top: 60px;
}

@media (min-width: 1024px) {
  .main {
    padding-top: 100px;
  }
}
</style>
