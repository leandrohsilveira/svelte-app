import { navigate } from 'svelte-routing'

export type NavigationHandler = () => void

export function createNavigationHandler(to: string) {
  return () => navigate(to)
}
