import { navigate } from './store'

type Key = string | number | symbol
type Value = string | number
export type PathParams<K extends Key> = Record<K, Value>
export type QueryParams<K extends Key> = Partial<Record<K, Value | Value[]>>

export type NavigationHandler<P extends Key, Q extends Key = ''> = (
  params: PathParams<P>,
  query?: QueryParams<Q>
) => void

export type Navigator<Handlers> = {
  routes: Record<keyof Handlers, string>
  handlers: Handlers
}

function mountQueryString(query?: { [key: string]: Value | Value[] }) {
  return Object.keys(query)
    .map((key) => {
      const value = query[key]
      if (Array.isArray(value)) return value.map((v) => `${key}=${v}`).join('&')
      return `${key}=${query[key]}`
    })
    .join('&')
}

export function createNavigationHandler<
  Params extends Key = '',
  Query extends Key = ''
>(to: string): NavigationHandler<Params, Query> {
  return (params, query) => {
    let target = Object.keys(params ?? {}).reduce(
      (acc, key) =>
        acc.replace(
          new RegExp(`\\{(\\s+)?${key}(\\s+)?(\\:.*)?\\}`, 'gi'),
          params[key]
        ),
      to
    )
    if (query && Object.keys(query).length > 0) {
      target += `?${mountQueryString(query)}`
    }
    navigate(target)
  }
}

export function createNavigator<Handlers>(
  routes: Record<keyof Handlers, string>
): Navigator<Handlers> {
  const handlers: any = {}
  Object.keys(routes).forEach(
    (key) => (handlers[key] = createNavigationHandler(routes[key]))
  )
  return {
    routes,
    handlers,
  }
}
