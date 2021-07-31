<script lang="ts">
  import { fade } from 'svelte/transition'
  import { Icon, Stacked } from '../components'
  import { getInstance } from '../utils'
  import { LoginForm } from './login'
  import type { LoginSubmitEventDetail } from './login'
  import { Person } from '../icons'

  export let isLoggingIn = false

  const fadeOptions = { duration: 250 }
  const loginService = getInstance('loginService')
  const authStore = getInstance('authStore')
  const isAuthenticated = authStore.isAuthenticated
  const loggedName = authStore.loggedName

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

<Stacked width="510px" horizontal="right" vertical="middle">
  {#if isLoggingIn}
    <div transition:fade={fadeOptions}><span>Logging in...</span></div>
  {:else if !$isAuthenticated}
    <div transition:fade={fadeOptions}>
      <LoginForm on:submit={handleSubmit} />
    </div>
  {:else}
    <div class="user" transition:fade={fadeOptions}>
      <Icon><Person /></Icon>
      <span data-testid="loggedName">{$loggedName}</span>
      <button class="button button-clear" on:click={handleLogoutClick}>
        Logout
      </button>
    </div>
  {/if}
</Stacked>

<style>
  .user {
    display: flex;
    align-items: center;
  }

  .user > span {
    margin-left: 5px;
  }
</style>
