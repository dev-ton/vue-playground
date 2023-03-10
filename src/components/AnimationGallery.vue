<template>
  <Pagination :items-total="props.animations?.length" :per-page="perPage" v-model:current-page="currentPage" />
  <div class="grid">
    <!--TODO: Transition not working properly :D, find out whats the type issue below-->
    <TransitionGroup name="items">
      <GalleryItem
        v-for="animation in paginatedAnimations"
        :animation="animation"
        :key="animation.id"
        :source="getUrl(animation.collectionId, animation.id, animation.screenshot)"
        @click="show(animation.collectionId, animation.id, animation.riv[0])"
      />
    </TransitionGroup>
  </div>
  <Pagination :items-total="props.animations?.length" :per-page="perPage" v-model:current-page="currentPage" />
  <Modal :visible="visible" @close="close">
    <RiveAnimation ref="animationRef" :src="rivUrl" state-machine="State Machine 1" />
  </Modal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
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

const currentPage = ref<number>(1)

const getUrl = (collectionId: string, recordId: string, filename: string) => {
  return new URL(`../../db/pb_data/storage/${collectionId}/${recordId}/${filename}`, import.meta.url).href
}

const rivUrl = ref('')

const paginate = (array: Animations[] | undefined, page_size: number, page_number: number) => {
  return array?.slice((page_number - 1) * page_size, page_number * page_size)
}

const paginatedAnimations = ref<Animations[] | undefined>([])

watch(
  currentPage,
  () => {
    paginatedAnimations.value = paginate(props.animations, perPage.value, currentPage.value)
  },
  { immediate: true }
)

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
.items-enter-from,
.items-fade-leave-to {
  opacity: 0;
}

.items-enter-active,
.items-leave-active {
  transition: all 0.95s ease-in-out;
  opacity: 0;
}

.items-enter-to,
.items-leave-from {
  opacity: 0;
}

.items-leave-active {
  position: absolute;
  opacity: 0;
}
</style>
