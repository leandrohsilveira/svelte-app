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

  get loggedNameSpan() {
    return this.render.getByTestId('loggedName')
  }
}
