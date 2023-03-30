<template>
  <div class="item">
    <img :src="props.source" class="screenshot" alt="" />
    <div class="content">
      <h2>{{ animation.title }}</h2>
      <p>{{ animation.description }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
//TODO: rewrite it to generic Card component
import type { Animations } from '@/views/AnimationView.vue'
const props = defineProps<{
  animation: Animations
  source: string
}>()
</script>
<style lang="scss" scoped>
.item {
  padding: 0.5rem;
  border-radius: 24px;
  background-color: var(--color--gray-80);
  cursor: pointer;
  border: 1px solid black;
  transition: border ease 0.3s;
  box-sizing: content-box;

  &:hover {
    border: 1px solid antiquewhite;
  }

  & > img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
    object-position: center;
    border-radius: 16px;
    width: 100%;
  }

  & > .content {
    padding: 1rem;

    & > h2 {
      color: antiquewhite;
    }

    & > p {
      line-height: 130%;
    }
  }
}
</style>
