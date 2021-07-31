<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { Guard, Page } from '../../components'
  import { getInstance } from '../../utils'

  type Events = { forbidden: void }

  const { isAuthenticated } = getInstance('authStore')

  const dispatch = createEventDispatcher<Events>()

  onMount(() => {
    if ($isAuthenticated) {
      dispatch('forbidden')
    }
  })
</script>

<Guard allowed={!$isAuthenticated}>
  <slot />

  <Page title="Forbidden" slot="forbidden">
    Ops! This page is intended for those who is not authenticated yet
  </Page>
</Guard>
