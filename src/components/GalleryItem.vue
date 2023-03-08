<template>
  <div class="item">
    <!-- <img :src="getUrl(animation.collectionId, animation.id, animation.screenshot)" class="screenshot" alt="" /> -->
    <div class="content">
      <h2>{{ animation.title }}</h2>
      <p>{{ animation.description }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { computed } from 'vue'
import type { Animations } from '@/views/AnimationView.vue'
import { onMounted } from 'vue'
const props = defineProps<{
  animation: Animations
}>()
//TODO: computed for urls, open modal
const getUrl = (collectionId: string, assetId: string, filename: string) => {
  // return new URL(`../../pb_data/storage/${collectionId}/${assetId}/${filename}`, import.meta.url).href
  console.log(`../../pb_data/storage/${collectionId}/${assetId}/${filename}`)
}
onMounted(() => {
  getUrl(props.animation.collectionId, props.animation.id, props.animation.screenshot)
})
</script>
<style lang="scss" scoped>
.item {
  padding: 0.5rem;
  border-radius: 24px;
  background-color: rgba(0, 0, 0, 0.8);

  & > img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center;
    border-radius: 12px;
  }
}
</style>
