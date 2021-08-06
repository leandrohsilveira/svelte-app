import type { Unsubscriber } from 'svelte/store'
import { createNavigator, PathParams } from './navigator'
import { setup, state } from './store'

describe('router > navigator', () => {
  let unsubscribers: Unsubscriber[]

  beforeEach(() => {
    unsubscribers = []
    setup()
  })

  afterEach(() => unsubscribers.forEach((unsubscriber) => unsubscriber()))

  test('Should navigate to defined route using handlers', () => {
    type Navigator = { home(): void }
    const subscriber = jest.fn()
    const navigator = createNavigator<Navigator>({
      home: '/home',
    })

    navigator.handlers.home()
    unsubscribers.push(state.subscribe(subscriber))

    expect(navigator.routes.home).toEqual('/home')
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/home' })
    )
  })

  test('Should navigate to defined route with path params using handlers', () => {
    type Navigator = { editUser(params: PathParams<'id'>): void }
    const id = '019099f0-f4dc-4935-a099-cb6f406e9220'
    const subscriber = jest.fn()
    const navigator = createNavigator<Navigator>({
      editUser: '/user/{id}/edit',
    })

    navigator.handlers.editUser({ id })
    unsubscribers.push(state.subscribe(subscriber))

    expect(navigator.routes.editUser).toEqual('/user/{id}/edit')
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({ url: `/user/${id}/edit` })
    )
  })

  test('Should navigate to defined route with path params with regex using handlers', () => {
    type Navigator = { editUser(params: PathParams<'id'>): void }
    const id = 1
    const subscriber = jest.fn()
    const navigator = createNavigator<Navigator>({
      editUser: '/user/{id:\\d+}/edit',
    })

    navigator.handlers.editUser({ id })
    unsubscribers.push(state.subscribe(subscriber))

    expect(navigator.routes.editUser).toEqual('/user/{id:\\d+}/edit')
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({ url: `/user/${id}/edit` })
    )
  })

  test('Should navigate to defined route with path params with regex with spaces using handlers', () => {
    type Navigator = { editUser(params: PathParams<'id'>): void }
    const id = 1
    const subscriber = jest.fn()
    const navigator = createNavigator<Navigator>({
      editUser: '/user/{ id : \\d+}/edit',
    })

    navigator.handlers.editUser({ id })
    unsubscribers.push(state.subscribe(subscriber))

    expect(navigator.routes.editUser).toEqual('/user/{ id : \\d+}/edit')
    expect(subscriber).toHaveBeenCalledWith(
      expect.objectContaining({ url: `/user/${id}/edit` })
    )
  })
})
