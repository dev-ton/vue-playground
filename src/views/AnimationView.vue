<template>
  <!-- <button class="btn" @click="triggerInput">Click</button> -->
  <FileUpload />
  <AnimationGallery />
  <Modal v-if="visible">
    <RiveAnimation ref="animation" :src="animationUrl" state-machine="State Machine 1" />
  </Modal>
  <button @click="show">Open Modal</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import animationUrl from '@/animations/bubble.riv'

import RiveAnimation from '@/components/RiveAnimation.vue'
import FileUpload from '@/components/FileUpload.vue'
import AnimationGallery from '@/components/AnimationGallery.vue'
import Modal, { useModal } from '@/ui/Modal.vue'

// const animation = ref<InstanceType<typeof RiveAnimation> | null>(null)

// const triggerInput = computed(() => {
//   animation.value?.trigger()
// })

const modal = useModal()

const show = () => {
  modal.showModal()
}

const visible = ref(modal.visible)
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
