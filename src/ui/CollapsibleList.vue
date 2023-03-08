<template>
  <Loader v-if="!items.length" />
  <i-collapsible>
    <i-collapsible-item v-for="item in items" :key="item.id">
      <slot name="item" v-bind="item" />
    </i-collapsible-item>
  </i-collapsible>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Loader from '@/components/Loader.vue'

const props = defineProps(['source', 'per-page'])

const items = ref([
  {
    id: 1,
    name: 'Item 1',
    perPage: props['per-page'],
  },
])
</script>
