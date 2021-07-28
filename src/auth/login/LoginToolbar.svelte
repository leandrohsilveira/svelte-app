<script lang="ts">
  import { getInstance } from '../../utils'
  import type { LoginSubmitEventDetail } from './LoginEvents'
  import LoginForm from './LoginForm.svelte'

  export let isLoggingIn = false

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
</script>

{#if isLoggingIn}
  <span>Logging in...</span>
{:else if !$isAuthenticated}
  <LoginForm on:submit={handleSubmit} />
{:else}
  <span>Logged in as {$loggedName} ({$loggedUsername})</span>
{/if}
