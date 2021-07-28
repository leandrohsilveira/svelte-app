import '@testing-library/jest-dom/extend-expect'

import { render } from '@testing-library/svelte'
import { LoginFormPO } from './LoginForm.po'

import LoginForm from './LoginForm.svelte'

describe('LoginForm component', () => {
  test("Should bind username and password properties to it's fields", () => {
    const username = 'test'
    const password = 'pass'
    const po = new LoginFormPO(
      render(LoginForm, {
        props: { username, password },
      })
    )
    expect(po.usernameInput).toHaveValue(username)
    expect(po.passwordInput).toHaveValue(password)
  })

  it('Should emit "submit" event with provided username and password when "Login" button is clicked', async () => {
    const submit = jest.fn()
    const username = 'test'
    const password = 'pass'
    const po = new LoginFormPO(
      render(LoginForm, {
        props: { username, password },
      })
    )

    po.subscribeSubmitEvent(submit)

    await po.login()

    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { username, password },
      })
    )
  })

  it('Should emit "submit" event when "Login" button is clicked after input credentials', async () => {
    const submit = jest.fn()
    const username = 'test'
    const password = 'pass'
    const po = new LoginFormPO(render(LoginForm))
    po.subscribeSubmitEvent(submit)

    await po.enterCredentialsAndLogin(username, password)

    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { username, password },
      })
    )
  })
})
