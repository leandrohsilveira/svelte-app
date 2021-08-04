import { navigate } from '../router'

export type NavigationHandler = () => void

export function createNavigationHandler(to: string) {
  return () => navigate(to)
}
