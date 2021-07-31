<script lang="ts">
  import { Route } from 'svelte-routing'
  import { AnonymousGuard, AuthenticatedGuard } from './guards'
  import SignupPage from './SignupPage.svelte'
</script>

<Route path="/signup">
  <AnonymousGuard><SignupPage /></AnonymousGuard>
</Route>
<Route path="/auth/user/edit">
  <AuthenticatedGuard><div>Edit user page :)</div></AuthenticatedGuard>
</Route>
