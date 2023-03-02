<template>
  <div class="item">
    <img :src="props.screenshotUrl" class="screenshot" alt="" />
    <div class="content">
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  screenshotUrl?: string | ''
  rivFileUrl: string
  title: string
  description?: string | ''
}
const props = withDefaults(defineProps<Props>(), {
  screenshotUrl: '@/assets/screenshot.png',
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
