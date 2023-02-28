<template>
  <!-- <RiveAnimation
    ref="animation"
    :src="animationUrl"
    state-machine="State Machine 1"
    style="width: 500px; height: 500px"
  /> -->
  <!-- <button class="btn" @click="triggerInput">Click</button> -->
  <FileUpload />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// import animationUrl from '@/animations/bubble.riv'

// import RiveAnimation from '@/components/RiveAnimation.vue'
import FileUpload from '@/components/FileUpload.vue'

// const animation = ref<InstanceType<typeof RiveAnimation> | null>(null)

// const triggerInput = () => {
//   animation.value?.trigger()
// }
</script>
<style scoped>
.btn {
  cursor: pointer;
  padding: 0.75rem 2rem;
  color: antiquewhite;
  background-color: hsla(160, 100%, 37%, 1);
  border: 1px solid antiquewhite;
  border-radius: 2rem;
  transition: all 0.3ms;
  font-size: 16px;
  max-width: 50%;
}
.btn:hover {
  background-color: hsla(160, 100%, 57%, 1);
  color: hsla(160, 100%, 27%, 1);
}
</style>
