<script lang="ts">
  import { AdminGuard } from '../../auth/guards'
  import type { Navigator } from '../../router'
  import Route from '../../router/Route.svelte'
  import type { UserNavigator } from './routes'
  import UserListPage from './UserListPage.svelte'

  export let navigator: Navigator<UserNavigator>
</script>

<Route path={navigator.routes.usersList} exact>
  <AdminGuard>
    <UserListPage />
  </AdminGuard>
</Route>
