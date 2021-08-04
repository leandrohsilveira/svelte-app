<script lang="ts">
  import { BrowserRouter, Route } from './router'
  import { AuthRouter, AuthStoreImpl, LoginServiceImpl } from './auth'
  import { createServiceFactory } from './utils'
  import { Page } from './components'
  import Layout from './layout'
  import { LocalStorageService } from './utils'

  const storageService = new LocalStorageService(window.localStorage)
  const loginService = new LoginServiceImpl()
  const authStore = new AuthStoreImpl({ authenticated: false }, storageService)

  createServiceFactory({
    loginService,
    authStore,
    storageService,
  })
</script>

<BrowserRouter>
  <Layout>
    <Route path="/" exact>
      <Page title="Home">Wellcome to the app :)</Page>
    </Route>
    <Route path="/about">
      <Page title="About us">About us :)</Page>
    </Route>
    <Route path="/contact">
      <Page title="Contact us">Contact us :)</Page>
    </Route>
    <AuthRouter />
  </Layout>
</BrowserRouter>
