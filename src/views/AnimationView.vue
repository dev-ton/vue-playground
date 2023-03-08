<template>
  <FileUpload />
  <Loader v-if="isLoading" />
  <AnimationGallery v-else :animations="animations" />
  <Modal :visible="visible" @close="close">
    <RiveAnimation ref="animation" :src="animationUrl" state-machine="State Machine 1" />
  </Modal>
  <button @click="show" style="cursor: pointer">Open Modal</button>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import pb from '@/api/pocketbase'
import type { Record } from 'pocketbase'
import animationUrl from '@/animations/bubble.riv'

import Loader from '@/components/Loader.vue'
import RiveAnimation from '@/components/RiveAnimation.vue'
import FileUpload from '@/components/FileUpload.vue'
import AnimationGallery from '@/components/AnimationGallery.vue'
import Modal, { useModal } from '@/ui/Modal.vue'

export interface Animations extends Record {
  riv: string
  title: string
  description: string
  screenshot: string
}

const modal = useModal()
const show = () => {
  modal.showModal()
}
const close = () => {
  modal.hideModal()
}
const visible = ref(modal.visible)

const isLoading = ref<Boolean>(false)

let animations: Animations[] | undefined = []

const error = ref<{ error: any }>()

const getAnimations = async (): Promise<void> => {
  isLoading.value = true
  try {
    const records = await pb.collection('animations').getFullList({
      sort: '-created',
    })

    if (records) {
      isLoading.value = false
      animations = records as Animations[]
    }
  } catch (e: any) {
    isLoading.value = false
    error.value = { error: e.message }
    console.log('error:' + e.message)
  }
}

onBeforeMount(() => {
  getAnimations()
})
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
