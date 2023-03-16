import type { Record } from 'pocketbase'

export interface User extends Record {
  username: string
  email: string
  emailVisibility: boolean
  password: string
  passwordConfirm: string
  avatar: File | null
}
