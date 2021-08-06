<script lang="ts">
  import { createEventDispatcher, onMount, setContext } from 'svelte'

  import { state } from './store'

  import { RequireMatchStore, REQUIRE_MATCH_CONTEXT } from './requireMatch'

  const requireMatch = new RequireMatchStore()

  const dispatch = createEventDispatcher<{ noMatch: { url: string } }>()

  setContext(REQUIRE_MATCH_CONTEXT, requireMatch)

  let mounted = false
  $: url = $state.url
  $: hasMatch = requireMatch.hasMatchAfterAllRoutesVerified(url)
  $: if (!$hasMatch && mounted) {
    dispatch('noMatch', { url })
  }

  onMount(() => (mounted = true))
</script>

<slot />

{#if !$hasMatch}
  <slot name="noMatch" />
{/if}
