<template>
  <i-container>
    <i-row>
      <i-column>
        <CollapsibleSingle v-model:is-open="isOpen" title="Upload new animation(s)">
          <FileUpload @collapse="collapseToggle" />
        </CollapsibleSingle>
      </i-column>
    </i-row>
    <i-row v-if="isLoading">
      <i-column>
        <Loader color="primary" />
      </i-column>
    </i-row>
    <i-row v-else>
      <i-column>
        <AnimationGallery :animations="animations" />
      </i-column>
    </i-row>
  </i-container>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import pb from '@/api/pocketbase'
import type { Record } from 'pocketbase'

import Loader from '@/components/Loader.vue'
import CollapsibleSingle from '@/ui/CollapsibleSingle.vue'
import FileUpload from '@/components/FileUpload.vue'
import AnimationGallery from '@/components/AnimationGallery.vue'

export interface Animations extends Record {
  riv: string
  title: string
  description: string
  screenshot: string
}

// by default non-existent item, so collapsible is closed. Click on close button then supply empty string, which will close it again.
const isOpen = ref<string[]>(['collapsible-item-2'])
const collapseToggle = () => {
  isOpen.value = ['']
}

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
