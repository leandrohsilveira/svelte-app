import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/svelte'

import LoginForm from './LoginForm.svelte'

describe('LoginForm component', () => {
  test("Should bind username and password properties to it's fields", () => {
    const username = 'test'
    const password = 'pass'
    const { getByPlaceholderText } = render(LoginForm, { username, password })
    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    expect(usernameInput).toHaveValue(username)
    expect(passwordInput).toHaveValue(password)
  })

  it("Should emit 'submit' event with provided username and password when 'Login' button is clicked", () => {
    const submit = jest.fn()
    const username = 'test'
    const password = 'pass'
    const { getByText, component } = render(LoginForm, { username, password })
    const button = getByText('Login')
    component.$on('submit', submit)

    fireEvent.click(button)

    expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { username, password },
      })
    )
  })
})
