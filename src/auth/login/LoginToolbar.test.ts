import { render } from '@testing-library/svelte'
import { defer, Deferred, provideFactory, setContextMap } from '../../utils'
import { AuthStoreImpl } from '../AuthStore'
import type { LoginResult, LoginService } from './LoginService'
import { LoginToolbarPO } from './LoginToolbar.po'
import LoginToolbar from './LoginToolbar.svelte'

describe('LoginToolbar component', () => {
  const context = new Map()
  let deferred: Deferred<LoginResult>
  const loginService: LoginService = {
    login: jest.fn(() => deferred.promise),
  }

  beforeAll(() => {
    setContextMap(context)
    provideFactory({ 
      loginService,
      authStore: new AuthStoreImpl({ authenticated: false }),
    })
  })

  test('Should display "Logging in" during login request', async () => {
    deferred = defer()

    const po = new LoginToolbarPO(render(LoginToolbar))

    await po.loginFormPO.enterCredentialsAndLogin('test', 'pass')

    expect(loginService.login).toHaveBeenCalledWith('test', 'pass')

    expect(po.loggingInSpan).toBeInTheDocument()

    deferred.resolve({} as any)
    await deferred.promise
  })
})
