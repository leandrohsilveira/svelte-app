import { Readable, Subscriber, writable, Writable } from 'svelte/store'

export type RequireMatchRoute = {
  spec: string
  matched: boolean
  lastVerifiedUrl?: string
  score?: number
}

export const REQUIRE_MATCH_CONTEXT = 'requireMatchCtx'

export class RequireMatchStore implements Readable<RequireMatchRoute[]> {
  constructor() {
    this.specs = writable([])
  }

  private specs: Writable<RequireMatchRoute[]>

  register(routeSpec: RequireMatchRoute) {
    this.specs.update((specs) => [...specs, routeSpec])
  }

  unregister(routeSpec: RequireMatchRoute) {
    this.specs.update((specs) => specs.filter((spec) => spec !== routeSpec))
  }

  updateMatch(routeSpec: RequireMatchRoute, url: string, matched: boolean) {
    this.specs.update((specs) =>
      specs.map((spec) => {
        if (spec === routeSpec) {
          spec.matched = matched
          spec.lastVerifiedUrl = url
        }
        return spec
      })
    )
  }

  hasMatchAfterAllRoutesVerified(url: string): Readable<boolean> {
    return {
      subscribe: (subscriber) =>
        this.subscribe((specs) => {
          if (specs.every((spec) => spec.lastVerifiedUrl === url)) {
            subscriber(specs.some((spec) => spec.matched))
          }
        }),
    }
  }

  subscribe(
    subscriber: Subscriber<RequireMatchRoute[]>,
    invalidator?: (v: RequireMatchRoute[]) => void
  ) {
    return this.specs.subscribe(subscriber, invalidator)
  }
}
