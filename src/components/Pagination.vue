<template>
  <i-pagination v-model="page" :items-total="props.itemsTotal" :items-per-page="perPage" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
export interface Props {
  itemsTotal?: number | undefined
  perPage?: number
  currentPage?: number
}
const props = withDefaults(defineProps<Props>(), {
  perPage: 9,
  currentPage: 1,
})

const emit = defineEmits(['update:currentPage'])

const page = computed({
  get() {
    return props.currentPage
  },
  set(page) {
    emit('update:currentPage', page)
  },
})
</script>
