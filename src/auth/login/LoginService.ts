import type { UserFormData } from '../../user'
import { uuid } from '../../utils'

const mocks = [
  {
    id: '37d83f27-2aba-4f72-a819-eeb20d908a3e',
    name: 'Administrator',
    username: 'admin',
    password: '123456',
    roles: ['user', 'admin'],
  },
]

export type LoginResult = {
  username: string
  name: string
  roles: string[]
}

export interface LoginService {
  signUp(data: UserFormData): Promise<string>
  login(username: string, password: string): Promise<LoginResult>
}

export class LoginServiceImpl implements LoginService {
  private get delayTime() {
    return 200 + Math.random() * 2000
  }

  signUp({ name, username, password }: UserFormData) {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const id = uuid()
        mocks.push({
          id,
          name,
          username,
          password,
          roles: ['user'],
        })
        resolve(id)
      }, this.delayTime)
    })
  }

  login(username: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      setTimeout(() => {
        const user = mocks.find(
          (mock) => mock.username === username && mock.password === password
        )
        if (user)
          resolve({
            username: user.username,
            name: user.name,
            roles: user.roles,
          })
        else reject(new Error('Incorrect username or password'))
      }, this.delayTime)
    })
  }
}
