<template>
  <div class="grid">
    <GalleryItem
      v-for="animation in animations"
      :animation="animation"
      :key="animation.id"
      :source="getUrl(animation.collectionId, animation.id, animation.screenshot)"
      @click="show(animation.collectionId, animation.id, animation.riv[0])"
    />
  </div>

  <Pagination :items-total="props.animations?.length" :per-page="perPage"></Pagination>
  <Modal :visible="visible" @close="close">
    <RiveAnimation ref="animationRef" :src="rivUrl" state-machine="State Machine 1" />
  </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Animations } from '@/views/AnimationView.vue'
import GalleryItem from '@/components/GalleryItem.vue'
import Pagination from '@/components/Pagination.vue'
import RiveAnimation from '@/components/RiveAnimation.vue'
import Modal, { useModal } from '@/ui/Modal.vue'

//TODO: Might need better typing!
const props = defineProps<{
  animations: Animations[] | undefined
}>()

const perPage = ref<number>(9)

const getUrl = (collectionId: string, recordId: string, filename: string) => {
  return new URL(`../../db/pb_data/storage/${collectionId}/${recordId}/${filename}`, import.meta.url).href
}

const rivUrl = ref('')

// const animationRef = ref<InstanceType<typeof RiveAnimation>>()

const modal = useModal()
const show = (collectionId: string, recordId: string, riv: string) => {
  rivUrl.value = getUrl(collectionId, recordId, riv)
  modal.showModal()
}
const close = () => {
  modal.hideModal()
}
const visible = ref(modal.visible)

console.log(props.animations)
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(200px, auto);
  padding: 1rem 0 2rem 0;
}
</style>
