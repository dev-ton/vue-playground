<template>
  <i-container>
    <i-row>
      <i-column>
        <Vitest element="div"> Hello from Dashboards </Vitest>
      </i-column>
    </i-row>
    <i-row>
      <i-column>
        <MyPokemon />
      </i-column>
    </i-row>
  </i-container>
</template>
<script setup lang="ts">
import Vitest from '@/components/Vitest.vue'
import MyPokemon from '@/components/MyPokemon.vue'
</script>
