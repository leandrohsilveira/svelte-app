export type Deferred<T> = {
  promise: Promise<T>
  resolve(value: T): void
  reject(error: any): void
}

export function defer<T>(): Deferred<T> {
  let resolve: Deferred<T>['resolve']
  let reject: Deferred<T>['reject']
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return {
    promise,
    resolve,
    reject,
  }
}
