import { createNavigationHandler, NavigationHandler } from './utils'

type Routes = 'home'

export const routes: Record<Routes, string> = {
  home: '/',
}

const navigator: Record<Routes, NavigationHandler> = {
  home: createNavigationHandler(routes.home),
}

export default navigator
