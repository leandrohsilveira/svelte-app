import { UserRole } from './user-roles'

type User = {
  id: string
  name: string
  username: string
  password: string
  roles: UserRole[]
}

const userMocks: User[] = [
  {
    id: '37d83f27-2aba-4f72-a819-eeb20d908a3e',
    name: 'Administrator',
    username: 'admin',
    password: '123456',
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    id: '66bdca73-5549-4c3b-a937-8cf35fc4f239',
    name: 'Leandro',
    username: 'silveira',
    password: '123456789',
    roles: [UserRole.USER],
  },
]

export default userMocks
