import pb from '@/api/pocketbase'
import { ref } from 'vue'
// import type { Animations } from '@/views/AnimationView.vue'
import type { Record, RecordAuthResponse } from 'pocketbase'
import type { User } from '@/api/types'

export const ensureError = (value: unknown): Error => {
  if (value instanceof Error) return value

  let stringified = '[Unable to stringify the thrown value]'
  try {
    stringified = JSON.stringify(value)
  } catch {
    /* empty */
  }
  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`)
  return error
}

export const createRecord = async (
  collection: string,
  data: Object,
  isAutocancelled: boolean
): Promise<Record | { error: string } | undefined> => {
  try {
    const record = await pb.collection(collection).create(data, { $autoCancel: isAutocancelled })
    if (record) {
      return record
    }
  } catch (err) {
    const error = ensureError(err)
    return { error: error.message }
  }
}

export const authWithPassword = async (username: string, password: string): Promise<RecordAuthResponse<User>> =>
  await pb.collection('users').authWithPassword(username, password)

export const authStore = pb.authStore

export const userState = ref(false)
