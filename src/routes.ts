import { createNavigator } from './router'

export type RootNavigator = {
  home(): void
  about(): void
  contact(): void
}

const navigator = createNavigator<RootNavigator>({
  home: '/',
  about: '/about',
  contact: '/contact',
})

export default navigator
