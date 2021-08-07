<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'

  import { Guard, Page } from '../../components'
  import appFactory from '../../factories'

  type Events = { forbidden: void }

  const { isAuthenticated } = appFactory.authStore

  export let displayNotAllowed = true

  const dispatch = createEventDispatcher<Events>()

  onMount(() => {
    if ($isAuthenticated) {
      dispatch('forbidden')
    }
  })
</script>

<Guard allowed={!$isAuthenticated} {displayNotAllowed}>
  <slot />

  <slot name="forbidden" slot="forbidden">
    <Page title="Forbidden">
      Ops! This page is intended for those who is not authenticated yet
    </Page>
  </slot>
</Guard>
