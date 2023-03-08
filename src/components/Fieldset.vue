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
      <i-input type="text" :id="'title' + index" :value="title" @input="updateTitleValue" />
    </i-form-group>
    <i-form-group inline>
      <i-form-label :for="'desc' + index">Description:</i-form-label>
      <i-input
        :id="'desc' + index"
        name="desc"
        rows="4"
        cols="26"
        :value="desc"
        v-model="modelValue"
        @input="updateDescValue"
      />
    </i-form-group>
    <!-- TODO: input fields requirs vmodel in order to be editable, solve with writeable computeds? -->
    <slot></slot>
  </i-form-group>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number
  title: String
  desc: String
}>()

const emit = defineEmits<{
  (e: 'fileChange', files: File): void
  (e: 'screenshot', files: File): void
  (e: 'update:title', value: string): void
  (e: 'update:desc', value: string): void
}>()

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

const updateTitleValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) emit('update:title', target.value)
}

const updateDescValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) emit('update:desc', target.value)
}
</script>
<style lang="scss" scoped>
/*TODO: Add responsivity */
fieldset {
  width: 100%;
  padding: 1rem;
  margin: 0.75rem 0;
  border-color: rgb(37, 37, 37);
  display: flex;
  align-items: center;
  justify-content: space-around;

  & > .form-control {
    padding: 0 0.5rem;
    width: 25%;
    flex: 1 1 25%;
    display: flex;
    flex-direction: column;
  }
}
</style>
