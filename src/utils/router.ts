import { navigate } from "svelte-navigator";

export type NavigationHandler = () => void

export function createNavigationHandler(to: string) {
  return () => navigate(to)
}
