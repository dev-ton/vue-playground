import pb from '@/api/pocketbase'
// import type { Animations } from '@/views/AnimationView.vue'
import type { Record } from 'pocketbase'

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
