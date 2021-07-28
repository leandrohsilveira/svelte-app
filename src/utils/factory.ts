import { getContext, hasContext, setContext } from "svelte";
import type { LoginService } from "../auth";

const SERVICE_FACTORY_CONTEXT_NAME = "ServiceFactory";

export type ServiceFactory = {
  loginService: LoginService;
};

export function createServiceFactory(serviceFactory: ServiceFactory) {
  setContext(SERVICE_FACTORY_CONTEXT_NAME, serviceFactory);
}

export function getInstance<P extends keyof ServiceFactory>(
  instanceName: P
): ServiceFactory[P] {
  if (hasContext(SERVICE_FACTORY_CONTEXT_NAME)) {
    const context: ServiceFactory = getContext(SERVICE_FACTORY_CONTEXT_NAME);
    const instance = context[instanceName];
    if (instance) return instance;
    else throw new Error(`No instance provided for "${instanceName}"`);
  }
  throw new Error("Service factory not provided!");
}
