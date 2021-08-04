<script lang="ts">
  import { Route } from '../router'
  import rootNavigator from '../routes'
  import { AnonymousGuard, AuthenticatedGuard } from './guards'
  import MyDataPage from './MyDataPage.svelte'
  import SignupPage from './SignupPage.svelte'
</script>

<Route path="/signup">
  <AnonymousGuard>
    <SignupPage
      on:signUpSucessful={rootNavigator.home}
      on:cancel={rootNavigator.home}
    />
  </AnonymousGuard>
</Route>
<Route path="/auth/user/edit">
  <AuthenticatedGuard>
    <MyDataPage
      on:saveSuccessful={rootNavigator.home}
      on:cancel={rootNavigator.home}
    />
  </AuthenticatedGuard>
</Route>
