<template>
  <i-form v-model="form" v-if="!sent" @submit.prevent="onSubmit">
    <i-form-group>
      <label for="username">Username<sup>*</sup>:</label>
      <i-input type="text" name="username" id="username" required />
      <i-form-error for="username" />
    </i-form-group>
    <i-form-group>
      <label for="email">Email<sup>*</sup>:</label>
      <i-input type="email" id="email" name="email" required />
      <i-form-error for="email" />
    </i-form-group>
    <i-form-group>
      <label for="file">Upload your avatar:</label>
      <i-input type="file" id="file" name="file" ref="avatar" />
      <i-form-error for="file" />
    </i-form-group>
    <i-form-group>
      <label for="password">Password<sup>*</sup>: </label>
      <i-input type="password" id="password" name="password" required />
      <i-form-error for="password" />
    </i-form-group>
    <i-form-group>
      <label for="passwordConfirm">Confirm your password<sup>*</sup>: </label>
      <i-input type="password" id="passwordConfirm" name="passwordConfirm" required />
      <i-form-error for="passwordConfirm" />
    </i-form-group>
    <i-form-group>
      <i-form-label for="checkbox">Checkbox</i-form-label>
      <i-checkbox name="checkbox" required>I accept the terms and conditions<sup>*</sup></i-checkbox>
      <i-form-error for="checkbox" />
    </i-form-group>
    <i-form-group>
      <i-button type="submit" :loading="loading"> Submit </i-button>
    </i-form-group>
  </i-form>
  <div v-else-if="errorMessage">{{ errorMessage }}</div>
  <div v-else>User account successfully created!</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@inkline/inkline/composition-api'
import { deepUnref } from 'vue-deepunref'
import { createRecord } from '@/api/context'

// TODO: Vee-Validate seems to be better solution
const schema = {
  username: {
    validateOn: 'input',
    validators: [{ name: 'required' }, { name: 'alphanumeric' }, { name: 'minLength', value: 5 }],
  },
  email: {
    validators: [
      {
        name: 'email',
      },
    ],
  },
  file: {},
  password: {
    validators: [
      {
        name: 'required',
      },
      {
        name: 'minLength',
        value: 8,
      },
      {
        name: 'custom', // lowercase
        message: 'Please enter at least one lowercase character.',
        validator: (v: string) => /[a-z]/.test(v),
      },
      {
        name: 'custom', // uppercase
        message: 'Please enter at least one uppercase character.',
        validator: (v: string) => /[A-Z]/.test(v),
      },
      {
        name: 'custom', // numeric
        message: 'Please enter at least one numeric character.',
        validator: (v: string) => /[0-9]/.test(v),
      },
    ],
  },
  passwordConfirm: {
    validateOn: 'input',
    validators: [{ name: 'sameAs', target: 'password', schema: () => form.value }],
  },
  checkbox: {
    value: false,
    validators: [
      {
        name: 'required',
      },
    ],
  },
  group: [],
}
const form = useForm(schema)
const loading = ref<boolean>(false)
const sent = ref<boolean>(false)
const errorMessage = ref('')

const avatar = ref<HTMLInputElement | null>(null)
const file = avatar.value?.files

const resetForm = () => {
  Object.assign(form, schema)
}

//TODO: seems like the File is not being send, investigate. Also add email verification.
const onSubmit = async () => {
  loading.value = true
  const rawData = { ...deepUnref(form.value) }
  const formData = new FormData()
  formData.append('username', rawData.username.value)
  formData.append('email', rawData.email.value)
  if (file) formData.append('avatar', file[0] as File)
  formData.append('password', rawData.password.value)
  formData.append('passwordConfirm', rawData.passwordConfirm.value)
  await createRecord('users', formData, true)
    .then((value) => {
      if (value?.error) {
        errorMessage.value = value.error
      } else {
        sent.value = true
        resetForm()
      }
    })
    .then(() => (loading.value = false))
  setTimeout(() => {
    loading.value = false
    sent.value = true
  }, 500)
}
</script>
