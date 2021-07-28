import { fireEvent } from '@testing-library/dom'
import { render } from '@testing-library/svelte'
import { provideFactory, setContextMap } from '../../utils'
import type { LoginResult, LoginService } from './LoginService'
import LoginToolbar from './LoginToolbar.svelte'

function createChangeEvent(value: any) {
  const event = new Event('change')
  event['value'] = value
  return event
}

describe('LoginToolbar component', () => {
  const context = new Map()
  let result: Promise<LoginResult>
  const loginService: LoginService = {
    login: jest.fn(() => result),
  }

  beforeAll(() => {
    setContextMap(context)
    provideFactory({ loginService })
  })

  test('Should display "Logging in" during login request', async () => {
    let resolver: (result: LoginResult) => void
    result = new Promise((resolve) => (resolver = resolve))
    const { getByText, getByPlaceholderText, component } = render(LoginToolbar)

    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const loginButton = getByText('Login', { selector: 'button' })

    await fireEvent.input(usernameInput, { target: { value: 'test' } })
    await fireEvent.input(passwordInput, { target: { value: 'pass' } })
    await fireEvent.click(loginButton)

    expect(loginService.login).toHaveBeenCalledWith('test', 'pass')

    getByText('Logging in...', { selector: 'span' })

    resolver({} as any)
    await result
  })
})
