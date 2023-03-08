<template>
  <i-form-group inline>
    <i-form-group inline>
      <i-form-label :for="'file' + index">Rive file:</i-form-label>
      <i-input type="file" :name="'file' + index" :id="'file' + index" accept=".riv" @change="handleFileInputChange" />
    </i-form-group>
    <i-form-group inline>
      <i-form-label :for="'screenshot' + index">Screenshot:</i-form-label>
      <i-input
        type="file"
        :name="'screenshot' + index"
        :id="'screenshot' + index"
        accept="image/png, image/jpeg"
        @change="handleScreenshotInputChange"
      />
    </i-form-group>
    <i-form-group inline>
      <i-form-label :for="'title' + index">Title:</i-form-label>
      <i-input type="text" :id="'title' + index" :value="title" v-model="titleValue" />
    </i-form-group>
    <i-form-group inline>
      <i-form-label :for="'desc' + index">Description:</i-form-label>
      <i-input :id="'desc' + index" name="desc" rows="4" cols="26" :value="desc" v-model="descValue" />
    </i-form-group>
    <slot></slot>
  </i-form-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  index: number
  title: String
  desc: String
}>()

const emit = defineEmits<{
  (e: 'fileChange', file: File): void
  (e: 'screenshot', file: File): void
  (e: 'update:title', value: String): void
  (e: 'update:desc', value: String): void
}>()

const titleValue = computed({
  get() {
    return props.title
  },
  set(titleValue) {
    emit('update:title', titleValue)
  },
})

const descValue = computed({
  get() {
    return props.desc
  },
  set(descValue) {
    emit('update:desc', descValue)
  },
})

//TODO: can both files be sent in one emit? I think so.

const handleFileInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (files && files.length > 0) {
    emit('fileChange', files[0])
  }
}

const handleScreenshotInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    const file = input.files[0]
    emit('screenshot', file)
  }
}
</script>
<style lang="scss" scoped>
/*TODO: Add responsivity */
</style>
