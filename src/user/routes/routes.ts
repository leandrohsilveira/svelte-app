import { createNavigator, PathParams } from '../../router'

export type UserNavigator = {
  usersList(): void
  editUser(params: PathParams<'id'>)
}

function createUserNavigator(path = '/users') {
  return createNavigator<UserNavigator>({
    usersList: `${path}`,
    editUser: `${path}/:id/edit`,
  })
}

export default createUserNavigator
