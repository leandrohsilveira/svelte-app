<script lang="ts">
  import { Route } from '../router'
  import rootNavigator from '../routes'
  import authNavigator from './routes'
  import { AnonymousGuard, AuthenticatedGuard } from './guards'
  import MyDataPage from './MyDataPage.svelte'
  import SignupPage from './SignupPage.svelte'
</script>

<Route path={authNavigator.routes.signup} exact>
  <AnonymousGuard>
    <SignupPage
      on:signUpSucessful={rootNavigator.handlers.home}
      on:cancel={rootNavigator.handlers.home}
    />
  </AnonymousGuard>
</Route>
<Route path={authNavigator.routes.editCurrentUser} exact>
  <AuthenticatedGuard>
    <MyDataPage
      on:saveSuccessful={rootNavigator.handlers.home}
      on:cancel={rootNavigator.handlers.home}
    />
  </AuthenticatedGuard>
</Route>
