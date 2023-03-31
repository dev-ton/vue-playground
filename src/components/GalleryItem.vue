<template>
  <div class="item -dark">
    <div>
      <img :src="props.source" class="screenshot" alt="" />
    </div>
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
  padding: var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all ease-in-out var(--transition-duration);
  overflow: hidden;
  box-sizing: content-box;
  // border: 1px solid transparent;
  box-shadow: var(--box-shadow--plain-black);
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    content: '';
    border-radius: inherit;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }

  body.-dark & {
    background: var(--color--gray-80);
    // border-color: var(--color--dark-40);
  }

  body.-dark &:hover {
    border-color: var(--color--secondary-50);
    box-shadow: var(--box-shadow-gradual);
  }

  body.-light & {
    background: var(--color--white);
    border-color: var(--color--gray-05);
  }

  body.-light &:hover {
    border-color: var(--color--primary-30);
    box-shadow: var(--box-shadow-gradual);
  }

  & > div:first-child {
    width: 100%;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: var(--border-radius--inner);

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      opacity: 0.6;
      transform-origin: center;
      transform: scale3d(1.1, 1.1, 1);
      transition: all ease-in-out 0.3s;
    }
  }

  &:hover > div:first-child > img {
    opacity: 1;
    transform: scale3d(1.2, 1.2, 1);
  }

  & > .content {
    padding: var(--padding);
  }
}
</style>
