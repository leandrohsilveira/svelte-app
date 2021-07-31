<script lang="ts">
  import { Guard, Page } from '../../components'
  import { getInstance } from '../../utils'

  const { isAuthenticated } = getInstance('authStore')
</script>

<Guard allowed={$isAuthenticated}>
  <slot />

  <Page title="Unauthorized" slot="forbidden">
    Ops! You need to login before having access to this page ;)
  </Page>
</Guard>
