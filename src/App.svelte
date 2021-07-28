<script lang="ts">
  import { AuthStoreImpl, LoginServiceImpl, LoginToolbar } from './auth'
  import { createServiceFactory } from './utils'

  const loginService = new LoginServiceImpl()
  const authStore = new AuthStoreImpl({ authenticated: false })

  createServiceFactory({
    loginService,
    authStore,
  })
</script>

<header>
  <LoginToolbar />
</header>
<main />
