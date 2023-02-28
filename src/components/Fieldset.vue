<template>
  <fieldset>
    <legend>Rive Animation {{ props.index + 1 }}</legend>
    <label :for="'file' + index">Rive file:</label>
    <input type="file" :name="'file' + index" :id="'file' + index" accept=".riv" @change="handleFileInputChange" />
    <label :for="'title' + index">State Machine:</label>
    <input type="text" :id="'title' + index" :value="modelValue" @input="updateModelValue" />
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
  modelValue: String
}>()

const emit = defineEmits<{
  (e: 'fileChange', files: File): void
  (e: 'update:modelValue', value: string): void
}>()

function handleFileInputChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (files && files.length > 0) {
    emit('fileChange', files[0])
  }
}

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) emit('update:modelValue', target.value)
}
</script>
