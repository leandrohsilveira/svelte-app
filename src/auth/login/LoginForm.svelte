<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Field } from '../../components'
  import { isValid, required, validate } from '../../utils'

  import type { LoginEvents } from './LoginEvents'

  export let username = ''
  export let password = ''

  $: usernameErrors = validate(required())(username)
  $: passwordErrors = validate(required())(password)
  $: isFormValid = isValid(usernameErrors, passwordErrors)

  const dispatch = createEventDispatcher<LoginEvents>()

  function handleSubmit() {
    if (isFormValid) dispatch('submit', { username, password })
  }
</script>

<form class="horizontal" on:submit|preventDefault={handleSubmit}>
  <Field errors={usernameErrors}>
    <input
      name="username"
      autocomplete="username"
      placeholder="Username"
      bind:value={username}
    />
  </Field>
  <Field errors={passwordErrors}>
    <input
      name="password"
      type="password"
      autocomplete="current-password"
      placeholder="Password"
      bind:value={password}
    />
  </Field>

  <button class="button button-outline" disabled={!isFormValid} type="submit">
    Login
  </button>
</form>

<style>
  form.horizontal {
    display: flex;
  }

  form.horizontal > :global(.field):not(:last-child),
  form.horizontal > :global(button):not(:last-child) {
    margin-right: 10px;
  }
</style>
