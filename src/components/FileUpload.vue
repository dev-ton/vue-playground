<template>
  <form v-if="!formShow" @submit.prevent="handleSubmit">
    <button type="button" @click="addFieldset" disabled>+</button>
    <!--TODO: dynamic component is not really needed here, since we use only Fieldset component. But I might be adding also different components in the future. Also I could consider making the custom component as a new component.-->
    <component
      v-for="(field, index) in fields"
      :key="index"
      :is="Fieldset"
      :index="index"
      @file-change="(f:File) => field.fileInput = f"
      v-model="field.textInput"
    >
      <button v-if="index > 0" type="button" @click="removeFieldset(index)">
        <FaIcon icon="fa-solid fa-trash" />
      </button>
    </component>
    <input type="submit" value="Upload!" />
    <input type="reset" @click.prevent="resetForm" />
  </form>
  <Loader v-if="isLoading" />
  <div v-if="sent">
    <p>File was uploaded succesfully!</p>
    <div>
      <button @click="resetView">Upload another one</button>
      <button>Go to animation gallery</button>
    </div>
  </div>
  <div v-if="errorMessage">
    <p>{{ errorMessage }}</p>
    <button @click="resetView">Try again</button>
  </div>
</template>
<script lang="ts" setup>
import pb from '@/api/pocketbase'
import { ref, computed } from 'vue'
import Fieldset from '@/components/Fieldset.vue'
import Loader from '@/components/Loader.vue'

export interface Fields {
  fileInput: File | null
  textInput: string
}

const fields = ref<Fields[]>([{ fileInput: null, textInput: '' }])

const addFieldset = () => {
  fields.value.push({ fileInput: null, textInput: '' })
}

const removeFieldset = (i: number) => {
  fields.value.splice(i, 1)
}

const resetForm = () => {
  fields.value = [{ fileInput: null, textInput: '' }]
}

const isLoading = ref<Boolean>(false)
const sent = ref<Boolean>(false)
const errorMessage = ref<string>('')

const formShow = computed(() => {
  return isLoading.value || sent.value || errorMessage.value
})

const resetView = () => {
  sent.value = false
  errorMessage.value = ''
}

const formData = new FormData()

//TODO: right now it creates only one record, so I disabled the '+' button.
const handleSubmit = async () => {
  isLoading.value = true
  fields.value.forEach((f) => {
    formData.append('statemachine', f.textInput)
    if (f.fileInput) formData.append('riv', f.fileInput)
  })
  try {
    const record = await pb.collection('animations').create(formData)
    if (record) {
      isLoading.value = false
      sent.value = true
      resetForm()
    }
    return record
  } catch (error: any) {
    if (error) isLoading.value = false
    errorMessage.value = error.message
    return { error: error.message }
  }
}
</script>
