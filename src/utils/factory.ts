export type InstanceFactory<Instance> = () => Instance
export abstract class ServiceFactory<Factories> {
  abstract name: string

  private map: Map<string, any>

  protected useSingleton<K extends keyof Factories>(
    key: K,
    factory: InstanceFactory<Factories[K]>
  ) {
    if (!this.map) throw new Error(`ServiceFactory "${this.name}" not created`)
    const ctxKey = this.getContextKey(key)
    if (!this.map.has(ctxKey)) {
      this.map.set(ctxKey, factory())
      return this.useSingleton(key, factory)
    }
    return this.map.get(ctxKey)
  }

  create(map: Map<string, any> = new Map()) {
    this.map = map
  }

  provide(instances: Partial<Factories>) {
    Object.keys(instances).forEach((key: any) =>
      this.map.set(this.getContextKey(key), instances[key])
    )
  }

  private getContextKey<K extends keyof Factories>(key: K) {
    return `ServiceFactory#${this.name}#${key}`
  }
}

export default {}
