<script lang="ts">
  import { Route } from 'svelte-routing'
  import SignupPage from './SignupPage.svelte';
</script>

<Route path="/signup"><SignupPage /></Route>
<Route path="/auth/user/edit"><div>Edit user page :)</div></Route>
