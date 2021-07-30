import type { RenderResult } from '@testing-library/svelte'
import { LoginFormPO } from './login/LoginForm.po'

export class AuthToolbarPO {
  constructor(private render: RenderResult) {
    this.loginFormPO = new LoginFormPO(render)
  }

  loginFormPO: LoginFormPO

  loggingInText = 'Logging in...'

  get loggingInSpan() {
    return this.render.getByText(this.loggingInText, { selector: 'span' })
  }

  getLoggedInAsText(name: string, username: string) {
    return `Logged in as ${name} (${username})`
  }

  getLoggedInAsSpan(name: string, username: string) {
    return this.render.getByText(this.getLoggedInAsText(name, username))
  }
}
