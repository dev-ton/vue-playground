import PocketBase from 'pocketbase'

export const url = import.meta.env.VITE_PB_URL as string
const pb = new PocketBase(url)

export default pb
