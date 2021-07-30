import { getContext, hasContext, setContext } from 'svelte'
import type { AuthStore, LoginService } from '../auth'
import type { StorageService } from './StorageService'

export interface ContextMap {
  has(key: string): boolean
  get(key: string): any
  set(key: string, value: any): void
}

export type ServiceFactory = {
  loginService: LoginService
  authStore: AuthStore
  storageService: StorageService
}

const SERVICE_FACTORY_CONTEXT_NAME = 'ServiceFactory'

let contextMap: ContextMap = {
  has: hasContext,
  get: getContext,
  set: setContext,
}

function getServiceFactoryContext(): ServiceFactory {
  if (contextMap.has(SERVICE_FACTORY_CONTEXT_NAME)) {
    return contextMap.get(SERVICE_FACTORY_CONTEXT_NAME)
  }
  throw new Error('Service factory not provided!')
}

export function setContextMap(map: ContextMap) {
  contextMap = map
}

export function createServiceFactory(serviceFactory: ServiceFactory) {
  setContext(SERVICE_FACTORY_CONTEXT_NAME, serviceFactory)
}

export function provideFactory(factory: Partial<ServiceFactory>) {
  const context: ServiceFactory = contextMap.get(SERVICE_FACTORY_CONTEXT_NAME)
  contextMap.set(SERVICE_FACTORY_CONTEXT_NAME, {
    ...(context ?? ({} as any)),
    ...factory,
  })
}

export function getInstance<P extends keyof ServiceFactory>(
  instanceName: P
): ServiceFactory[P] {
  const instance = getServiceFactoryContext()[instanceName]
  if (instance) return instance
  else throw new Error(`No instance provided for "${instanceName}"`)
}
