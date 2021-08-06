<script lang="ts">
  import { BrowserRouter, Route } from './router'
  import { AuthRouter, AuthStoreImpl, LoginServiceImpl } from './auth'
  import { createServiceFactory } from './utils'
  import { Page } from './components'
  import Layout from './layout'
  import { LocalStorageService } from './utils'
  import { RequireMatch } from './router'
  import rootNavigator from './routes'

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
    <RequireMatch>
      <Route path={rootNavigator.routes.home} exact>
        <Page title="Home">Wellcome to the app :)</Page>
      </Route>
      <Route path={rootNavigator.routes.about} exact>
        <Page title="About us">About us :)</Page>
      </Route>
      <Route path={rootNavigator.routes.contact} exact>
        <Page title="Contact us">Contact us :)</Page>
      </Route>
      <AuthRouter />
      <svelte:fragment slot="noMatch">
        <Page title="Not found">
          Oops! the requested page does not exists :(
        </Page>
      </svelte:fragment>
    </RequireMatch>
  </Layout>
</BrowserRouter>
