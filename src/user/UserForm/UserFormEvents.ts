import type { UserFormData } from './UserFormData'

export interface UserFormEvents {
  submit: UserFormData
  cancel: void
}
