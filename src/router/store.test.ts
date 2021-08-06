import type { Unsubscriber } from 'svelte/store'
import {
  MatchedRoute,
  navigate,
  RouteState,
  setup,
  state,
  synchronizeStoreAndHistory,
} from './store'

describe('router > store', () => {
  const UUID_REGEX =
    '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$'
  let unsubscribers: Unsubscriber[]

  beforeEach(() => {
    unsubscribers = []
  })

  afterEach(() => unsubscribers.forEach((unsubscriber) => unsubscriber()))

  test('Should synchronize to history when navigate has been called', () => {
    window.history.pushState = jest.fn()
    window.history.replaceState = jest.fn()
    setup()
    unsubscribers.push(synchronizeStoreAndHistory())

    navigate('url2')

    expect(window.history.pushState).toHaveBeenCalledWith(
      undefined,
      null,
      'url2'
    )
  })

  test('Should synchronize to store when popstate event has been called', () => {
    let listener: EventListener
    const addEventListener = jest.fn((e, _listener) => (listener = _listener))
    const removeEventListener = jest.fn()
    const source: any = {
      location: {
        pathname: 'url2',
        search: '',
      },
      history: {
        pushState: jest.fn(),
      },
      addEventListener,
      removeEventListener,
    }

    setup(source)
    unsubscribers.push(synchronizeStoreAndHistory())

    const subscriber = jest.fn()

    listener(new Event('popstate'))
    unsubscribers.push(state.subscribe(subscriber))

    expect(source.history.pushState).not.toHaveBeenCalled()
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'url2',
      })
    )
  })

  describe('RouteState match function with url "path/d5fc6150-2856-4839-8620-a15c3b3578a4/to?query=test"', () => {
    const id = 'd5fc6150-2856-4839-8620-a15c3b3578a4'
    const query = 'test'
    let currentState: RouteState

    function getMatchRoute(match: MatchedRoute | false): MatchedRoute {
      if (typeof match !== 'boolean') {
        return match
      } else {
        fail("match should't be a boolean")
      }
    }

    function getFalsyMatchRoute(match: MatchedRoute | false): false {
      if (typeof match === 'boolean') {
        return match
      } else {
        fail('match should be a boolean')
      }
    }

    beforeEach(() => {
      const source: any = {
        location: {
          pathname: `path/${id}/to`,
          search: `?query=${query}`,
        },
      }
      setup(source)
      unsubscribers.push(state.subscribe((_state) => (currentState = _state)))
    })

    test('Should match to spec "path/{id}/to" with score 0', () => {
      const match = getMatchRoute(currentState.match('path/{id}/to'))
      expect(match.score).toEqual(0)
    })

    test('Should match to spec "/path/{id}/to" with score 0', () => {
      const match = getMatchRoute(currentState.match('/path/{id}/to'))
      expect(match.score).toEqual(0)
    })

    test('Should match to spec "/path/{id}/to/" with score 0', () => {
      const match = getMatchRoute(currentState.match('/path/{id}/to/'))
      expect(match.score).toEqual(0)
    })

    test('Should match to spec "path/{id}/to/" with score 0', () => {
      const match = getMatchRoute(currentState.match('path/{id}/to/'))
      expect(match.score).toEqual(0)
    })

    test('Should map path parameter "id" to params with spec "path/{id}/to"', () => {
      const match = getMatchRoute(currentState.match('path/{id}/to'))
      expect(match.params).toEqual({ id })
    })

    test('Should map path parameter "id" to params with spec "path/{ id }/to"', () => {
      const match = getMatchRoute(currentState.match('path/{ id }/to'))
      expect(match.params).toEqual({ id })
    })

    test('Should map path parameter "id" to params with spec "path/{ id : ${UUID_REGEX} }/to"', () => {
      const match = getMatchRoute(
        currentState.match(`path/{ id : ${UUID_REGEX} }/to`)
      )
      expect(match.score).toEqual(0)
    })

    test('Should map query parameter "query" to params with spec "path/{id}/to"', () => {
      const match = getMatchRoute(currentState.match('path/{id}/to'))
      expect(match.query).toEqual({ query: [query] })
    })

    test('Should match to spec "path/{id}" with score 1', () => {
      const match = getMatchRoute(currentState.match('path/{id}'))
      expect(match.score).toEqual(1)
    })

    test("Shouldn't match to spec 'path/{id}/to/it'", () => {
      const match = getFalsyMatchRoute(currentState.match('path/{id}/to/it'))
      expect(match).toBeFalsy()
    })

    test("Should match to spec 'path/{id:${UUID_REGEX}}/to'", () => {
      const match = getMatchRoute(
        currentState.match(`path/{id:${UUID_REGEX}}/to`)
      )
      expect(match.score).toEqual(0)
    })

    test("Shouldn't match to spec 'path/{id:/d+}/to'", () => {
      const match = getFalsyMatchRoute(currentState.match('path/{id:/d+}/to'))
      expect(match).toBeFalsy()
    })
  })
})
