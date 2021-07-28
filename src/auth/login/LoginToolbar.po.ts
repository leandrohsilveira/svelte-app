import type { RenderResult } from "@testing-library/svelte";
import { LoginFormPO } from "./LoginForm.po";

export class LoginToolbarPO {

  constructor(private render: RenderResult) {
    this.loginFormPO = new LoginFormPO(render)
  }

  loginFormPO: LoginFormPO;

  loggingInText = 'Logging in...'

  get loggingInSpan() {
    return this.render.getByText(this.loggingInText, { selector: 'span' })
  }

}