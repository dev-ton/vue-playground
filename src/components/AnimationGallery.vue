<template>
  <Pagination :items-total="props.animations?.length" :per-page="perPage" v-model:current-page="currentPage" />
  <div class="grid" :style="{ '--total': paginatedAnimations?.length }">
    <!--TODO: Transition not working properly :D, find out whats the type issue below-->
    <TransitionGroup name="items">
      <GalleryItem
        v-for="(animation, i) in paginatedAnimations"
        :animation="animation as Animations"
        :key="animation.id"
        :style="{ '--i': i }"
        :source="getUrl(animation.collectionId, animation.id, animation.screenshot)"
        @click="show(animation.collectionId, animation.id, animation.riv[0], animation.title)"
      />
    </TransitionGroup>
  </div>
  <Pagination :items-total="props.animations?.length" :per-page="perPage" v-model:current-page="currentPage" />
  <Modal :title="rivTitle" :visible="visible" @close="close">
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

const props = defineProps<{
  animations: Animations[] | undefined
}>()

const perPage = ref<number>(9)

const currentPage = ref<number>(1)

const getUrl = (collectionId: string, recordId: string, filename: string) => {
  return new URL(`../../db/pb_data/storage/${collectionId}/${recordId}/${filename}`, import.meta.url).href
}

const rivUrl = ref('')
const rivTitle = ref('')

const paginate = (
  array: Animations[] | undefined,
  page_size: number,
  page_number: number
): Animations[] | undefined => {
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
const show = (collectionId: string, recordId: string, riv: string, title: string) => {
  rivUrl.value = getUrl(collectionId, recordId, riv)
  rivTitle.value = title
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
  overflow: hidden;

  & > * {
    opacity: 1;
  }
}
.items {
  &-move {
    transition: opacity 0.3s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.2s linear, transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4); //cubic-bezier(.7,0,.7,1);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: opacity 0.3s linear, transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.1s * var(--i));
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-from {
    transform: translateX(-1em);
  }
  &-leave-to {
    transform: translateX(1em);
  }
  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
}
</style>
