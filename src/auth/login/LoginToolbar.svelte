<script lang="ts">
  import { fade } from 'svelte/transition'
  import Stacked from '../../layout/Stacked.svelte'
  import { getInstance } from '../../utils'
  import type { LoginSubmitEventDetail } from './LoginEvents'
  import LoginForm from './LoginForm.svelte'

  export let isLoggingIn = false

  const fadeOptions = { duration: 250 }
  const loginService = getInstance('loginService')
  const authStore = getInstance('authStore')
  const isAuthenticated = authStore.isAuthenticated
  const loggedName = authStore.loggedName
  const loggedUsername = authStore.loggedUsername

  async function handleSubmit(event: CustomEvent<LoginSubmitEventDetail>) {
    const { username, password } = event.detail
    isLoggingIn = true
    const result = await loginService.login(username, password)
    isLoggingIn = false
    authStore.setAuthenticated(result.username, result.name, result.roles)
  }

  function handleLogoutClick() {
    authStore.setAnonymous()
  }
</script>

<Stacked width={510} height={70} horizontal="right" vertical="middle">
  {#if isLoggingIn}
    <div transition:fade={fadeOptions}><span>Logging in...</span></div>
  {:else if !$isAuthenticated}
    <div transition:fade={fadeOptions}>
      <LoginForm on:submit={handleSubmit} />
    </div>
  {:else}
    <div transition:fade={fadeOptions}>
      <span>Logged in as {$loggedName} ({$loggedUsername})</span>
      <button class="button button-clear" on:click={handleLogoutClick}
        >Logout</button
      >
    </div>
  {/if}
</Stacked>
