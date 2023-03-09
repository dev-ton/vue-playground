<template>
  <i-collapsible v-model="open">
    <i-collapsible-item name="collapsible-item-1" :title="title">
      <slot />
    </i-collapsible-item>
  </i-collapsible>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  title: string
  isOpen: string[]
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: string[]): void
}>()

const open = computed({
  get() {
    return props.isOpen
  },
  set(open) {
    emit('update:isOpen', open)
  },
})
</script>
