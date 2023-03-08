<template>
  <i-form v-if="!formShow" @submit.prevent="handleSubmit">
    <i-row>
      <i-column>
        <i-button circle @click="addFieldset" disabled>+</i-button>
        <h3>Rive Animation {{ fields.length }}</h3>
      </i-column>
    </i-row>
    <!--TODO: dynamic component is not really needed here, since we use only Fieldset component. But I might be adding also different components in the future. Also I could consider making the custom component as a new component.-->
    <component
      v-for="(field, index) in fields"
      :key="index"
      :is="Fieldset"
      :index="index"
      @file-change="(f:File) => field.fileInput = f"
      @screenshot="(s:File) => field.screenshot = s"
      v-model:title="field.textInput"
      v-model:desc="field.descInput"
    >
      <i-button v-if="index > 0" circle type="button" @click="removeFieldset(index)">
        <FaIcon icon="fa-solid fa-trash" />
      </i-button>
    </component>
    <i-form-group inline>
      <i-input type="submit" value="Upload!" />
      <i-input type="reset" @click.prevent="resetForm" />
    </i-form-group>
  </i-form>
  <Loader v-if="isLoading" />
  <div v-if="sent">
    <p>File was uploaded succesfully!</p>
    <div>
      <i-button @click="resetView">Upload another one</i-button>
      <i-button>Go to animation gallery</i-button>
    </div>
  </div>
  <div v-if="errorMessage">
    <p>{{ errorMessage }}</p>
    <i-button @click="resetView">Try again</i-button>
  </div>
</template>
<script lang="ts" setup>
import pb from '@/api/pocketbase'
import { ref, computed } from 'vue'
import Fieldset from '@/components/Fieldset.vue'
import Loader from '@/components/Loader.vue'

export interface Fields {
  fileInput: File | null
  screenshot: File | null
  textInput: string
  descInput: string
}

const fields = ref<Fields[]>([
  {
    fileInput: null,
    textInput: '',
    descInput: '',
    screenshot: null,
  },
])

const addFieldset = () => {
  fields.value.push({
    fileInput: null,
    textInput: '',
    descInput: '',
    screenshot: null,
  })
}

const removeFieldset = (i: number) => {
  fields.value.splice(i, 1)
}

const resetForm = () => {
  fields.value = [
    {
      fileInput: null,
      textInput: '',
      descInput: '',
      screenshot: null,
    },
  ]
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

//TODO: right now it creates only one record, so I disabled the '+' button. also add validation.
const handleSubmit = async () => {
  isLoading.value = true
  fields.value.forEach((f) => {
    formData.append('title', f.textInput)
    formData.append('description', f.descInput)
    if (f.fileInput) formData.append('riv', f.fileInput)
    if (f.screenshot) formData.append('screenshot', f.screenshot)
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
<style lang="scss" scoped>
form {
  width: 100%;
  margin-bottom: 2rem;
}
</style>
