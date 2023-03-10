<template>
  <i-container>
    <i-row>
      <i-column>
        <i-form v-if="!formShow" @submit.prevent="handleSubmit">
          <i-button type="button" circle @click="addFieldset">+</i-button>
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
          <i-form-group inline class="_margin-top:1 submitBtns">
            <i-input type="submit" value="Upload!" />
            <i-input type="reset" @click.prevent="resetForm" />
          </i-form-group>
        </i-form>

        <Loader v-if="isLoading" color="primary" />
        <div v-if="sent">
          <i-alert color="success">
            <template #icon>
              <i-icon name="ink-check" />
            </template>
            <p v-if="createdRecords < 2">File was succesfully uploaded!</p>
            <p v-else>{{ createdRecords }} files were succesfully uploaded!</p>
          </i-alert>
        </div>
        <div v-if="errorMessage">
          <i-alert color="warning">
            <template #icon>
              <i-icon name="ink-warning" />
            </template>
            <p v-if="failedRecords < 2">File upload failed!</p>
            <p v-else>{{ failedRecords }} files were not uploaded!</p>
            <p>{{ errorMessage }}</p>
          </i-alert>
        </div>
      </i-column>
    </i-row>
    <i-row center class="_margin-top:1">
      <i-column>
        <div v-if="sent || errorMessage">
          <i-button v-if="errorMessage" @click="resetView">Try again</i-button>
          <i-button v-else @click="resetView">Upload more</i-button>
          <i-button @click="closeCollapsible">Close</i-button>
        </div>
      </i-column></i-row
    >
  </i-container>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import Fieldset from '@/components/Fieldset.vue'
import Loader from '@/components/Loader.vue'
import { createRecord } from '@/api/context'

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
  console.log(fields.value)
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
const createdRecords = ref<number>(0)
const failedRecords = ref<number>(0)

const formShow = computed(() => {
  return isLoading.value || sent.value || errorMessage.value
})

const resetView = () => {
  sent.value = false
  errorMessage.value = ''
}

const emit = defineEmits<{
  (e: 'collapse', arg: Event): void
}>()

const closeCollapsible = (e: Event) => {
  emit('collapse', e)
}
//TODO: add validation.
const handleSubmit = async () => {
  isLoading.value = true
  fields.value.forEach(async (f) => {
    const formData = new FormData()
    formData.append('title', f.textInput)
    formData.append('description', f.descInput)
    if (f.fileInput) formData.append('riv', f.fileInput)
    if (f.screenshot) formData.append('screenshot', f.screenshot)
    createRecord('animations', formData, false)
      .then((value) => {
        if (value?.error) {
          errorMessage.value = value.error
          failedRecords.value += 1
        } else {
          createdRecords.value += 1
          sent.value = true
          console.log(createdRecords)
          resetForm()
        }
      })
      .then(() => (isLoading.value = false))
  })
}
</script>
<style lang="scss" scoped>
form {
  width: 100%;
  margin-bottom: 2rem;
}
.submitBtns {
  & > * {
    margin-right: 1rem;
  }
  & .input-wrapper .input > input {
    cursor: pointer;
  }
}
</style>
