<template>
  <!-- <GalleryItem v-for="animation in animations" :animation="animation" :key="animation.id" /> -->
  <Pagination :total-pages="totalPages" :current-page="1" :per-page="perPage"></Pagination>
</template>
<script setup lang="ts">
// TODO: Create a grid for items and v-for
import { ref, computed } from 'vue'
import type { Animations } from '@/views/AnimationView.vue'
// import GalleryItem from '@/components/GalleryItem.vue'
import Pagination from '@/components/Pagination.vue'

//TODO: Might need better typing!
const props = defineProps<{
  animations: Animations[] | undefined
}>()

const perPage = ref<number>(9)
const totalPages = computed(() => {
  if (props.animations) {
    return Math.ceil(props.animations.length / perPage.value)
  } else {
    return undefined
  }
})

console.log(props.animations)
</script>
