<script lang="ts">
  import { Route } from 'svelte-routing'
  import rootNavigator from '../routes';
  import { AnonymousGuard, AuthenticatedGuard } from './guards'
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
  <AuthenticatedGuard><div>Edit user page :)</div></AuthenticatedGuard>
</Route>
