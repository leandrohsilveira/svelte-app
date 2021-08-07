<script lang="ts">
  import { Page } from '../../components'
  import type { UserRole } from '../../user'
  import { getInstance } from '../../utils'
  import AuthenticatedGuard from './AuthenticatedGuard.svelte'

  export let some: UserRole[] = []
  export let every: UserRole[] = []

  const roles = getInstance('authStore').loggedRoles

  $: someRoles = some.length > 0 ? some.some(hasRole($roles)) : true
  $: everyRoles = every.length > 0 ? every.every(hasRole($roles)) : true

  function hasRole(roles: UserRole[]) {
    return (role: UserRole) => (roles ?? []).indexOf(role) >= 0
  }
</script>

<AuthenticatedGuard>
  {#if someRoles && everyRoles}
    <slot />
  {:else}
    <slot name="forbidden">
      <Page title="Forbidden">
        Oops! Your user does not have permission to access this page :(
      </Page>
    </slot>
  {/if}
  <svelte:fragment slot="forbidden">
    <slot name="unauthorized" />
  </svelte:fragment>
</AuthenticatedGuard>
