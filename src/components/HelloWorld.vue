<template>
  <i-container>
    <i-row>
      <i-column>
        <p class="lead">{{ msg }}</p>
      </i-column>
    </i-row>
  </i-container>
</template>
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>
