import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authStore } from '@/api/context'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const updateState = () => {
    authStore.isValid ? isAuthenticated.value === true : isAuthenticated.value === false
  }

  return { isAuthenticated, updateState }
})
