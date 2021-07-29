<script lang="ts">
  import { AuthStoreImpl, LoginServiceImpl } from './auth'
  import { createServiceFactory } from './utils'
  import Layout, { Page } from './layout'

  const loginService = new LoginServiceImpl()
  const authStore = new AuthStoreImpl({ authenticated: false })

  createServiceFactory({
    loginService,
    authStore,
  })
</script>

<Layout>
  <Page title="Page">Some content</Page>
</Layout>
