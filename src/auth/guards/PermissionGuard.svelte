<script lang="ts">
  import { Page } from '../../components'
  import appFactory from '../../factories'
  import type { UserRole } from '../../user'
  import AuthenticatedGuard from './AuthenticatedGuard.svelte'

  const { loggedRoles } = appFactory.authStore

  export let displayNotAllowed = true
  export let some: UserRole[] = []
  export let every: UserRole[] = []

  $: someRoles = some.length > 0 ? some.some(hasRole($loggedRoles)) : true
  $: everyRoles = every.length > 0 ? every.every(hasRole($loggedRoles)) : true

  function hasRole(roles: UserRole[]) {
    return (role: UserRole) => (roles ?? []).indexOf(role) >= 0
  }
</script>

<AuthenticatedGuard {displayNotAllowed}>
  {#if someRoles && everyRoles}
    <slot />
  {:else if displayNotAllowed}
    <slot name="forbidden">
      <Page title="Forbidden">
        Oops! Your user does not have permission to access this page :(
      </Page>
    </slot>
  {/if}
</AuthenticatedGuard>
