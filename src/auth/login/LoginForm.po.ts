import { fireEvent, RenderResult } from '@testing-library/svelte'
import type { LoginSubmitEventDetail } from './LoginEvents'

export class LoginFormPO {
  constructor(private render: RenderResult) {}

  usernamePlaceholder = 'Username'

  passwordPlaceholder = 'Password'

  loginButtonText = 'Login'

  get usernameInput() {
    return this.render.getByPlaceholderText(this.usernamePlaceholder)
  }

  get passwordInput() {
    return this.render.getByPlaceholderText(this.passwordPlaceholder)
  }

  get loginButton() {
    return this.render.getByText(this.loginButtonText, { selector: 'button' })
  }

  subscribeSubmitEvent(callback: (e: CustomEvent<LoginSubmitEventDetail>) => void) {
    this.render.component.$on('submit', callback)
  }

  async login() {
    await fireEvent.click(this.loginButton)
  }

  async enterUsername(username: string) {
    await fireEvent.input(this.usernameInput, { target: { value: username } })
  }

  async enterPassword(password: string) {
    await fireEvent.input(this.passwordInput, { target: { value: password } })
  }

  async enterCredentialsAndLogin(username: string, password: string) {
    await Promise.all([
      this.enterUsername(username),
      this.enterPassword(password)
    ])
    await this.login()
  }
  
}
