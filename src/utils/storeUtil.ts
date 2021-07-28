import type { Readable, Subscriber } from 'svelte/store'

export type Selector<I, O> = (input: I) => O

export function select<S, R>(
  store: Readable<S>,
  selector: Selector<S, R>
): Readable<R> {
  return {
    subscribe: (subscriber) =>
      store.subscribe((input) => subscriber(selector(input))),
  }
}
