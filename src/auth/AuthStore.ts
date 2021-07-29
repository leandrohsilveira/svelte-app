import { Readable, Writable, writable } from 'svelte/store'
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

export interface AuthStore {
  state: Readable<AuthState>

  isAuthenticated: Readable<boolean>

  loggedUsername: Readable<string>

  loggedName: Readable<string>

  setAuthenticated(username: string, name: string, roles: string[]): void

  setAnonymous(): void
}

export class AuthStoreImpl implements AuthStore {
  constructor(state: AuthState) {
    this.store = writable(state)
  }

  private store: Writable<AuthState>

  get state(): Readable<AuthState> {
    return { subscribe: (subscriber) => this.store.subscribe(subscriber) }
  }

  get isAuthenticated() {
    return select(this.state, (state) => state.authenticated)
  }

  get loggedUsername() {
    return select(this.state, (state) =>
      state.authenticated ? state.username : undefined
    )
  }

  get loggedName() {
    return select(this.state, (state) =>
      state.authenticated ? state.name : undefined
    )
  }

  setAnonymous() {
    this.store.set({ authenticated: false })
  }

  setAuthenticated(username: string, name: string, roles: string[]) {
    this.store.update((state) => ({
      ...state,
      authenticated: true,
      username,
      name,
      roles,
    }))
  }
}