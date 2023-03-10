<template>
  <fieldset class="fieldset">
    <legend>Rive animation #{{ props.index + 1 }}</legend>
    <i-form-group inline class="form-container">
      <i-form-group class="first-group">
        <FileDrop name="riv" :index="index" accept=".riv" @file-change="fileToParent">
          <p>
            Drop RIV file here<br />
            or click and choose from computer.
          </p>
        </FileDrop>
      </i-form-group>
      <i-form-group>
        <FileDrop name="screenshot" :index="index" accept="image/png, image/jpeg" @file-change="fileToParent">
          <p>
            Drop png/jpg file here<br />
            or click and choose from computer.
          </p>
        </FileDrop>
      </i-form-group>
      <i-form-group>
        <i-form-group>
          <i-form-label :for="'title' + index">Title:</i-form-label>
          <i-input type="text" :id="'title' + index" :value="title" v-model="titleValue" />
        </i-form-group>
        <i-form-group>
          <i-form-label :for="'desc' + index">Description:</i-form-label>
          <i-input :id="'desc' + index" name="desc" rows="4" cols="26" :value="desc" v-model="descValue" />
        </i-form-group>
      </i-form-group>
      <slot></slot>
    </i-form-group>
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import FileDrop from '@/components/FileDrop.vue'

const props = defineProps<{
  index: number
  title: String
  desc: String
}>()

const emit = defineEmits<{
  (e: 'fileChange', file: File | null): void
  (e: 'screenshot', file: File | null): void
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

const fileToParent = (file: File | null) => {
  file?.name.includes('.riv') ? emit('fileChange', file) : emit('screenshot', file)
}
</script>
<style lang="scss" scoped>
.fieldset {
  border: 1px solid rgba(0, 0, 0, 0.501);
  padding: 1rem;
  & > legend {
    display: inline;
    width: auto;
  }
}
.form-container {
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-end;
}
.first-group {
  margin-top: var(--margin-top);
}
</style>
