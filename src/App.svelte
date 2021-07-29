<script lang="ts">
  import { Router, Route } from 'svelte-routing'
  import { AuthStoreImpl, LoginServiceImpl } from './auth'
  import { createServiceFactory } from './utils'
  import { Page } from './components'
  import Layout from './layout'

  const loginService = new LoginServiceImpl()
  const authStore = new AuthStoreImpl({ authenticated: false })

  createServiceFactory({
    loginService,
    authStore,
  })
</script>

<Router>
  <Layout>
    <Route path="/">
      <Page title="Home">Wellcome to the app :)</Page>
    </Route>
    <Route path="/about">
      <Page title="About us">About us :)</Page>
    </Route>
    <Route path="/contact">
      <Page title="Contact us">Contact us :)</Page>
    </Route>
  </Layout>
</Router>
