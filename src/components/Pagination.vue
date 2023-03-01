<template>
  <ul class="pagination">
    <li>
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">First</button>
    </li>

    <li>
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">Previous</button>
    </li>

    <!-- Visible Buttons Start -->

    <li v-for="page in pages" :key="page.name">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li>
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">Next</button>
    </li>

    <li>
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">Last</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
export interface Props {
  maxVisibleButtons?: number
  totalPages: number
  perPage: number
  currentPage: number
}
const props = withDefaults(defineProps<Props>(), {
  maxVisibleButtons: 3,
})

const emit = defineEmits<{
  (e: 'pagechanged', value: number): void
}>()

const startPage = computed(() => {
  if (props.currentPage === 1) return 1
  if (props.currentPage === props.totalPages) return props.totalPages - props.maxVisibleButtons
  return props.currentPage - 1
})

const pages = computed(() => {
  const range = []
  for (let i = startPage.value; i <= Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages); i++) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    })
  }
  return range
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1
})
const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

const onClickFirstPage = () => {
  emit('pagechanged', 1)
}
const onClickPreviousPage = () => {
  emit('pagechanged', props.currentPage - 1)
}
const onClickPage = (page: number) => {
  emit('pagechanged', page)
}
const onClickNextPage = () => {
  emit('pagechanged', props.currentPage + 1)
}
const onClickLastPage = () => {
  emit('pagechanged', props.totalPages)
}
const isPageActive = (page: number) => {
  return props.currentPage === page
}
</script>
<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  & > li {
    display: inline-block;
  }
}
.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
