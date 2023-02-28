<template>
  <Navigation />
  <main id="content">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  .homeHeader {
    display: flex;
    place-items: flex-start;
    padding-right: calc(var(--section-gap) / 2);
  }

  .homeHeader .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
