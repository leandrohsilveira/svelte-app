import { fromReadable } from '../utils'
import { AuthStoreImpl } from './AuthStore'

describe('AuthStoreImpl store', () => {
  const username = 'test_username'
  const name = 'Teste user'
  const roles = []

  describe('isAuthenticated stream', () => {
    test('Should resolve to false when authenticated is false', async () => {
      const store = new AuthStoreImpl({ authenticated: false })

      const authenticated = await fromReadable(store.isAuthenticated)

      expect(authenticated).toBeFalsy()
    })

    test('Should resolve to true when authenticated is true', async () => {
      const store = new AuthStoreImpl({ authenticated: true } as any)

      const authenticated = await fromReadable(store.isAuthenticated)

      expect(authenticated).toBeTruthy()
    })
  })

  describe('loggedUsername stream', () => {
    test('Should return undefined when authenticated is false', async () => {
      const store = new AuthStoreImpl({ authenticated: false })

      const loggedUsername = await fromReadable(store.loggedUsername)

      expect(loggedUsername).toBeUndefined()
    })

    test('Should return the logged username when authenticated is true', async () => {
      const store = new AuthStoreImpl({ authenticated: true, username } as any)

      const loggedUsername = await fromReadable(store.loggedUsername)

      expect(loggedUsername).toEqual(username)
    })
  })

  describe('loggedName stream', () => {
    test('Should return undefined when authenticated is false', async () => {
      const store = new AuthStoreImpl({ authenticated: false })

      const loggedName = await fromReadable(store.loggedName)

      expect(loggedName).toBeUndefined()
    })

    test('Should return the logged name when authenticated is true', async () => {
      const store = new AuthStoreImpl({ authenticated: true, name } as any)

      const loggedName = await fromReadable(store.loggedName)

      expect(loggedName).toEqual(name)
    })
  })

  describe('setAuthenticated setter', () => {
    test('Should update store state to authenticated', async () => {
      const store = new AuthStoreImpl({ authenticated: false })

      store.setAuthenticated(username, name, roles)

      const state = await fromReadable(store.state)

      expect(state).toEqual({
        authenticated: true,
        username,
        name,
        roles,
      })
    })
  })

  describe('setAnonymous setter', () => {
    test('Should update store state to anonymous', async () => {
      const store = new AuthStoreImpl({
        authenticated: true,
        username,
        name,
        roles,
      })

      store.setAnonymous()

      const state = await fromReadable(store.state)

      expect(state).toEqual({ authenticated: false })
    })
  })
})
