import { Readable, Unsubscriber, Writable, writable } from 'svelte/store'
import type { UserRole } from '../user'
import { select, StorageService } from '../utils'

export type AuthenticatedState = {
  authenticated: true
  username: string
  name: string
  roles: UserRole[]
}

export type AnonymousState = {
  authenticated: false
}

export type AuthState = AuthenticatedState | AnonymousState

export interface AuthStore {
  state: Readable<AuthState>

  isAuthenticated: Readable<boolean>

  authenticatedState: Readable<AuthenticatedState>

  loggedUsername: Readable<string>

  loggedName: Readable<string>

  loggedRoles: Readable<UserRole[]>

  setAuthenticated(username: string, name: string, roles: UserRole[]): void

  setAnonymous(): void
}

export class AuthStoreImpl implements AuthStore {
  constructor(state: AuthState, storageService?: StorageService) {
    this.store = writable(storageService?.get('authStore') ?? state)
    if (storageService)
      this.unsubscriber = this.state.subscribe(
        (state) => state && storageService.set('authStore', state)
      )
  }

  private store: Writable<AuthState>

  unsubscriber?: Unsubscriber

  get state(): Readable<AuthState> {
    return { subscribe: (subscriber) => this.store.subscribe(subscriber) }
  }

  get isAuthenticated() {
    return select(this.state, (state) => state.authenticated)
  }

  get authenticatedState() {
    return select(this.state, (state) =>
      state.authenticated ? state : undefined
    )
  }

  get loggedUsername() {
    return select(this.authenticatedState, (state) => state?.username)
  }

  get loggedName() {
    return select(this.authenticatedState, (state) => state?.name)
  }

  get loggedRoles() {
    return select(this.authenticatedState, (state) => state?.roles)
  }

  setAnonymous() {
    this.store.set({ authenticated: false })
  }

  setAuthenticated(username: string, name: string, roles: UserRole[]) {
    this.store.update((state) => ({
      ...state,
      authenticated: true,
      username,
      name,
      roles,
    }))
  }
}
