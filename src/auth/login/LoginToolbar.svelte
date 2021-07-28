<script lang="ts">
  import { getInstance } from '../../utils'
  import {
    isAuthenticated,
    loggedName,
    loggedUsername,
    setAuthenticated,
  } from '../authStore'
  import type { LoginSubmitEventDetail } from './LoginEvents'
  import LoginForm from './LoginForm.svelte'

  export let isLoggingIn = false

  const loginService = getInstance('loginService')

  async function handleSubmit(event: CustomEvent<LoginSubmitEventDetail>) {
    const { username, password } = event.detail
    isLoggingIn = true
    const result = await loginService.login(username, password)
    isLoggingIn = false
    setAuthenticated(result.username, result.name, result.roles)
  }
</script>

{#if isLoggingIn}
  <span>Logging in...</span>
{:else if !$isAuthenticated}
  <LoginForm on:submit={handleSubmit} />
{:else}
  <span>Logged in as {$loggedName} ({$loggedUsername})</span>
{/if}
