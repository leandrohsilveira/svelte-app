import type { Readable, Subscriber } from 'svelte/store'

export interface StorageService {
  get<T>(key: string): T

  set<T>(key: string, value: T): void

  remove(key: string): void

  getReadable<T>(key: string): Readable<T>
}

export class LocalStorageService implements StorageService {
  constructor(private storage: Storage) {}

  private subscribersMap = new Map<string, Subscriber<any>[]>()

  get<T>(key: string): T {
    const value = this.storage.getItem(key)
    if (value) return JSON.parse(value)
  }

  set<T>(key: string, value: T): void {
    const json = JSON.stringify(value)
    this.storage.setItem(key, json)
    this.notify(key, value)
  }

  remove(key: string): void {
    this.storage.removeItem(key)
    this.notify(key, undefined)
  }

  getReadable<T>(key: string): Readable<T> {
    const observers = this.getSubscribers<T>(key, true)

    return {
      subscribe: (subscriber: Subscriber<T>) => {
        observers.push(subscriber)
        subscriber(this.get<T>(key))
        return () => this.removeSubscriber(key, subscriber)
      },
    }
  }

  private getSubscribers<T>(key: string, create = false): Subscriber<T>[] {
    if (this.subscribersMap.has(key)) {
      return this.subscribersMap.get(key)
    } else if (create) {
      this.subscribersMap.set(key, [])
      return this.getSubscribers(key, false)
    }
  }

  private removeSubscriber(key: string, subscriber: Subscriber<any>): void {
    let subscribers = this.getSubscribers(key)
    if (subscribers) {
      subscribers = subscribers.filter((item) => item !== subscriber)
      if (subscribers.length > 0) this.subscribersMap.set(key, subscribers)
      else this.subscribersMap.delete(key)
    }
  }

  private notify(key: string, value: any) {
    this.getSubscribers(key)?.forEach((subscriber) => subscriber(value))
  }
}
