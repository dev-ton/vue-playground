<template>
  <div class="form-container">
    <i-form v-if="!isAuthenticated" @submit.prevent="onSubmit">
      <i-form-group>
        <label for="username">Username or Email:</label>
        <i-input type="text" name="username" id="username" v-model="username" />
      </i-form-group>
      <i-form-group>
        <label for="password">Password:</label>
        <i-input type="password" name="password" id="password" v-model="password" />
      </i-form-group>
      <i-form-group>
        <i-button type="submit" :loading="loading">Log In</i-button>
      </i-form-group>
    </i-form>
    <div v-else>Hi {{ user }}! You have been logged in.</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref, unref } from 'vue'
import { authWithPassword, authStore, isAuthenticated } from '@/api/context'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// const isLogged = ref(false)
const user = ref('')

const updateState = () => {
  if (authStore.isValid) {
    isAuthenticated.value = true
  } else {
    isAuthenticated.value = false
  }
}
const resetForm = () => {
  username.value = ''
  password.value = ''
}

const onSubmit = () => {
  authWithPassword(unref(username), unref(password)).then(
    (value) => {
      user.value = value.record.username
      console.log(value)
      updateState()
      resetForm()
    },
    (reason) => {
      error.value = reason
      console.log(reason + ' reason')
      updateState()
      resetForm()
    }
  )
}
</script>
<style lang="scss" scoped>
.form-container {
  text-align: left;
}
</style>
