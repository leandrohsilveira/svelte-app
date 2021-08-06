import { Readable, Unsubscriber, Writable, writable } from 'svelte/store'

export type RouteState = {
  url: string
  path: string
  segments: string[]
  replace: boolean
  state?: any

  match(url: string): MatchedRoute | false
}

export type MatchedRoute = {
  spec: string
  path: string
  score: number
  params: { [name: string]: string }
  query: { [name: string]: string[] }
}

type SegmentSpecInfo = {
  value: string
  matches: boolean
  segment?: string
  paramName?: string
}

type NavigateOptions = {
  replace: boolean
  state?: any
}

type Source = {
  location: Location
  history: History
  addEventListener: (eventName: string, listener: EventListener) => void
  removeEventListener: (eventName: string, listener: EventListener) => void
}

let source: Source
let store: Writable<RouteState>

const STATE_NOT_CONFIGURED_ERROR =
  'Router store not provided. Use BrowserRouter component or setup function to provide a store'

export const state: Readable<RouteState> = {
  subscribe(subscriber, invalidate) {
    if (!store) throw new Error(STATE_NOT_CONFIGURED_ERROR)
    return store.subscribe(subscriber, invalidate)
  },
}

function createSegmentSpecInfo(
  value: string,
  segment?: string
): SegmentSpecInfo {
  let matches: boolean
  let paramName: string
  if (segment && /^\{.*\}$/.test(segment)) {
    const param = segment.replace(/(^\{|\}$)/g, '').trim()
    const [name, regexp] = param.split(':')
    paramName = name.trim()
    matches = !regexp || new RegExp(regexp.trim()).test(value)
  } else {
    matches = segment === value
  }
  return {
    segment,
    value,
    matches,
    paramName,
  }
}

function createRouteState(
  url: string,
  { state, replace }: NavigateOptions = { replace: false }
): RouteState {
  const [path, queryString] = url.split('?')
  const segments = path.split('/').filter((segment) => segment)

  function match(spec: string): MatchedRoute | false {
    const specSegments = spec.split('/').filter((segment) => segment)

    if (
      specSegments.every(
        (spec, i) => createSegmentSpecInfo(segments[i], spec).matches
      )
    ) {
      const infos = segments.map((segment, i) =>
        createSegmentSpecInfo(segment, specSegments[i])
      )
      const score = infos.reduce(
        (acc, { matches }) => acc + (matches ? 0 : 1),
        0
      )
      let params = {}
      let query = {}
      infos.forEach((info) => {
        if (info.paramName && info.matches) params[info.paramName] = info.value
      })
      const queryParams = queryString?.split('&') ?? []
      queryParams.forEach((queryParam) => {
        const [name, value] = queryParam.split('=')
        if (query[name.trim()]) {
          query[name.trim()] = [...query[name.trim()], value]
        } else {
          query[name.trim()] = [value]
        }
      })

      return {
        path,
        params,
        query,
        score,
        spec,
      }
    }

    return false
  }

  return {
    url,
    path,
    segments,
    state,
    replace,
    match,
  }
}

function pushToHistory(
  source: Source,
  url: string,
  replace = false,
  state?: any
) {
  try {
    if (replace) source.history.replaceState(state, null, url)
    else source.history.pushState(state, null, url)
  } catch (e) {
    source.location[replace ? 'replace' : 'assign'](url)
  }
}

export function setup(_source: Source = window) {
  source = _source
  store = writable(
    createRouteState(source.location.pathname + source.location.search)
  )
}

export function navigate(url: string, options?: NavigateOptions) {
  if (!store) throw new Error(STATE_NOT_CONFIGURED_ERROR)
  store.update((state) => {
    if (state.url !== url) return createRouteState(url, options)
    return state
  })
}

export function synchronizeStoreAndHistory(): Unsubscriber {
  if (!store) throw new Error(STATE_NOT_CONFIGURED_ERROR)
  const unsubscriber = store.subscribe((state) => {
    if (state.url !== source.location.pathname + source.location.search)
      pushToHistory(source, state.url, state.replace, state.state)
  })

  function listener() {
    store.set(
      createRouteState(source.location.pathname + source.location.search)
    )
  }

  source.addEventListener('popstate', listener)

  return () => {
    unsubscriber()
    source.removeEventListener('popstate', listener)
  }
}
