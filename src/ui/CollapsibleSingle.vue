<template>
  <i-collapsible>
    <i-collapsible-item :title="title">
      <slot />
    </i-collapsible-item>
  </i-collapsible>
</template>
<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
