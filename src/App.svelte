<script lang="ts">
  import { AuthStoreImpl, LoginServiceImpl } from './auth'
  import { createServiceFactory } from './utils'
  import Layout from './layout'

  const loginService = new LoginServiceImpl()
  const authStore = new AuthStoreImpl({ authenticated: false })

  createServiceFactory({
    loginService,
    authStore,
  })
</script>

<Layout />
