<template>
  <div class="dropzone-container" @dragover.prevent="dragover" @dragleave="dragleave" @drop.prevent="drop">
    <label :for="name + index" class="file-label">
      <div v-if="isDragging">Release to drop files here.</div>
      <div v-else>
        <slot />
      </div>
    </label>
    <input
      class="hidden-input"
      ref="inputEl"
      type="file"
      :name="name + index"
      :id="name + index"
      :accept="accept"
      @change="handleFileInputChange"
    />
  </div>
  <div v-if="file">
    <p>
      {{ file.name }}
      {{ Math.round(file.size / 1000) + 'kb' }}
    </p>
  </div>
</template>
<script setup lang="ts">
//TODO: Now it support only single file upload, extend it to multiple with props
import { ref } from 'vue'

defineProps<{
  index: number
  name: string
  accept?: string
}>()

const emit = defineEmits<{
  (e: 'fileChange', file: File | null): void
}>()

const isDragging = ref(false)
const file = ref<File | null>(null)

const handleFileInputChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    file.value = input.files[0]
  }
  console.log(file)
  emit('fileChange', file.value)
}

const dragover = () => {
  isDragging.value = true
}
const dragleave = () => {
  isDragging.value = false
}
const drop = (e: DragEvent) => {
  const input = e.target as HTMLInputElement
  if (e.dataTransfer) input.files = e.dataTransfer.files
  handleFileInputChange(e)
  isDragging.value = false
}
</script>

<style lang="scss" scoped>
.dropzone-container {
  padding: 2rem;
  background: var(--background);
  border: 1px dashed #e2e8f0;
  border-radius: var(--border-radius);

  & label {
    text-align: center;
  }
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
  color: var(--color--gray);
}
</style>
