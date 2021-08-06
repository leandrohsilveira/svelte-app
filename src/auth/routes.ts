import { createNavigator } from '../router'

export interface AuthNavigator {
  signup(): void
  editCurrentUser(): void
}

const authNavigator = createNavigator<AuthNavigator>({
  signup: '/signup',
  editCurrentUser: '/auth/user/edit',
})

export default authNavigator
