<script lang="ts">
  import { UserRole } from '../../user/user-roles'

  import PermissionGuard from './PermissionGuard.svelte'

  export let displayNotAllowed = true

  const permissions = [UserRole.ADMIN]
</script>

<PermissionGuard every={permissions} {displayNotAllowed}>
  <slot />
</PermissionGuard>
