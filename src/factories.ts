import { LoginService, LoginServiceImpl } from './auth/login/LoginService'

import { AuthStore, AuthStoreImpl } from './auth/AuthStore'

import { LocalStorageService, ServiceFactory, StorageService } from './utils'

export type AppFactory = {
  loginService: LoginService
  authStore: AuthStore
  storageService: StorageService
}

export class AppServiceFactory
  extends ServiceFactory<AppFactory>
  implements AppFactory
{
  name = 'AppServiceFactory'

  get loginService() {
    return this.useSingleton('loginService', () => new LoginServiceImpl())
  }

  get storageService() {
    return this.useSingleton(
      'storageService',
      () => new LocalStorageService(window.localStorage)
    )
  }

  get authStore() {
    return this.useSingleton(
      'authStore',
      () => new AuthStoreImpl({ authenticated: false }, this.storageService)
    )
  }
}

const appFactory = new AppServiceFactory()

export default appFactory
