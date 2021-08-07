import type { UserFormData } from '../../user'
import { UserRole } from '../../user'
import userMocks from '../../user/user.mock'
import { uuid } from '../../utils'

export type LoginResult = {
  username: string
  name: string
  roles: UserRole[]
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
        userMocks.push({
          id,
          name,
          username,
          password,
          roles: [UserRole.USER],
        })
        resolve(id)
      }, this.delayTime)
    })
  }

  login(username: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      setTimeout(() => {
        const user = userMocks.find(
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
