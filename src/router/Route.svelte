<script lang="ts">
  import { getContext, onDestroy } from 'svelte'
  import { state } from './store'
  import { REQUIRE_MATCH_CONTEXT } from './requireMatch'

  import type { MatchedRoute } from './store'
  import type { RequireMatchStore, RequireMatchRoute } from './requireMatch'

  export let path: string
  export let exact = false
  let requireMatchStore: RequireMatchStore = getContext(REQUIRE_MATCH_CONTEXT)
  let requireMatchRoute: RequireMatchRoute

  $: if (requireMatchStore) {
    requireMatchStore.unregister(requireMatchRoute)
    requireMatchRoute = { spec: path, matched: false }
    requireMatchStore.register(requireMatchRoute)
  }
  $: matched = $state?.match(path) ?? false
  $: params = get(matched, 'params')
  $: query = get(matched, 'query')
  $: matchedUrl = get(matched, 'path')
  $: shouldRender = computeShouldRender(matched, exact)
  $: if (requireMatchStore) {
    requireMatchStore.updateMatch(requireMatchRoute, $state.url, shouldRender)
  }

  onDestroy(() => requireMatchStore?.unregister(requireMatchRoute))

  function get<T, P extends keyof T>(obj: T | false, prop: P): T[P] {
    return typeof obj === 'object' ? obj[prop] : undefined
  }

  function computeShouldRender(
    matched: MatchedRoute | false,
    isExact: boolean
  ): boolean {
    if (typeof matched === 'object') return isExact ? matched.score === 0 : true
    return matched
  }
</script>

{#if shouldRender}
  <slot {params} {query} {matchedUrl} />
{/if}
