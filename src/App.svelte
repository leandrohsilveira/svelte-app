<script lang="ts">
  import { BrowserRouter, Route } from './router'
  import { AuthRouter } from './auth'
  import { Page } from './components'
  import Layout from './layout'
  import { RequireMatch } from './router'
  import rootNavigator from './routes'
  import { UserRouter } from './user'
  import { userNavigator } from './navigators'
  import appFactory from './factories'

  appFactory.create()
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
      <UserRouter navigator={userNavigator} />
      <svelte:fragment slot="noMatch">
        <Page title="Not found">
          Oops! the requested page does not exists :(
        </Page>
      </svelte:fragment>
    </RequireMatch>
  </Layout>
</BrowserRouter>
