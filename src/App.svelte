<script lang="ts">
  import { LoginServiceImpl, LoginToolbar } from './auth'
  import { createServiceFactory } from './utils'

  const loginService = new LoginServiceImpl()

  createServiceFactory({
    loginService,
  })
</script>

<header>
  <LoginToolbar />
</header>
<main />
