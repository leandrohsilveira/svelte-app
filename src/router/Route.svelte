<script lang="ts">
  import type { MatchedRoute } from './store'
  import { state } from './store'

  export let path: string
  export let exact = false

  $: match = $state?.match(path) ?? false
  $: params = typeof match === 'object' ? match.params : {}
  $: query = typeof match === 'object' ? match.query : {}
  $: matchedUrl = typeof match === 'object' ? match.path : undefined
  $: shouldRender = computeShouldRender(match, exact)

  function computeShouldRender(
    match: MatchedRoute | false,
    isExact: boolean
  ): boolean {
    if (typeof match === 'object') return isExact ? match.score === 0 : true
    return match
  }
</script>

{#if shouldRender}
  <slot {params} {query} {matchedUrl} />
{/if}
