<script lang="ts">
  import { Guard, Page } from '../../components'
  import appFactory from '../../factories'

  const { isAuthenticated } = appFactory.authStore

  export let displayNotAllowed = true
</script>

<Guard allowed={$isAuthenticated} {displayNotAllowed}>
  <slot />

  <slot name="forbidden" slot="forbidden">
    <Page title="Unauthorized">
      Ops! You need to login before having access to this page ;)
    </Page>
  </slot>
</Guard>
