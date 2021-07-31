import { render } from '@testing-library/svelte'
import { tick } from 'svelte'
import { defer, Deferred, provideFactory, setContextMap } from '../utils'
import { AuthStoreImpl } from './AuthStore'
import type { LoginResult, LoginService } from './login'
import { AuthToolbarPO } from './AuthToolbar.po'
import AuthToolbar from './AuthToolbar.svelte'

describe('AuthToolbar component', () => {
  const name = 'Test User'
  const username = 'test'
  const password = 'pass'
  let context: Map<string, any>
  let deferred: Deferred<LoginResult>
  const loginService: LoginService = {
    login: jest.fn(() => deferred.promise),
  }

  beforeEach(() => {
    context = new Map()
    setContextMap(context)
    provideFactory({
      loginService,
    })
  })

  test('Should display "Logging in" during login request', async () => {
    provideFactory({
      authStore: new AuthStoreImpl({ authenticated: false }),
    })
    deferred = defer()

    const po = new AuthToolbarPO(render(AuthToolbar))

    await po.loginFormPO.enterCredentialsAndLogin(username, password)

    expect(loginService.login).toHaveBeenCalledWith(username, password)

    expect(po.loggingInSpan).toBeInTheDocument()

    deferred.resolve({} as any)
    await deferred.promise
  })

  test('Should display "Logged in as $name ($username)" after login is completed', async () => {
    provideFactory({
      authStore: new AuthStoreImpl({ authenticated: false }),
    })
    deferred = defer()

    const po = new AuthToolbarPO(render(AuthToolbar))

    await po.loginFormPO.enterCredentialsAndLogin(username, password)

    deferred.resolve({ name, username, roles: [] })
    await deferred.promise
    await tick()

    expect(po.loggedNameSpan).toHaveTextContent(name)
  })

  test('Should display "Logged in as $name ($username)" when user actually is logged in', async () => {
    provideFactory({
      authStore: new AuthStoreImpl({
        authenticated: true,
        username,
        name,
        roles: [],
      }),
    })
    deferred = defer()

    const po = new AuthToolbarPO(render(AuthToolbar))

    expect(po.loggedNameSpan).toHaveTextContent(name)
  })
})
