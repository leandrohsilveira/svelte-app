import { Readable, writable } from 'svelte/store'
import { select } from '../utils'

export type AuthenticatedState = {
  authenticated: true
  username: string
  name: string
  roles: string[]
}

export type AnonymousState = {
  authenticated: false
}

export type AuthState = AuthenticatedState | AnonymousState

const store = writable<AuthState>({ authenticated: false })

export const isAuthenticated = select(store, (state) => state.authenticated)

export const loggedUsername = select(store, (state) =>
  state.authenticated ? state.username : undefined
)

export const loggedName = select(store, (state) =>
  state.authenticated ? state.name : undefined
)

export function setAuthenticated(
  username: string,
  name: string,
  roles: string[]
) {
  store.update((state) => ({
    ...state,
    authenticated: true,
    username,
    name,
    roles,
  }))
}

export default store as Readable<AuthState>
