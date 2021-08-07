<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import type { UserFormData } from '../user'
  import { Page } from '../components'
  import { UserForm } from '../user'
  import appFactory from '../factories'

  type Events = {
    signUpSucessful: void
    cancel: void
  }

  let signingUp = false

  const loginService = appFactory.loginService
  const dispatch = createEventDispatcher<Events>()

  async function handleSignUp(e: CustomEvent<UserFormData>) {
    const data = e.detail
    signingUp = true
    await loginService.signUp(data)
    dispatch('signUpSucessful')
    signingUp = false
  }

  function handleCancel() {
    dispatch('cancel')
  }
</script>

<Page title="Sign-up">
  {#if signingUp}
    <div>Signing Up...</div>
  {:else}
    <UserForm
      edit={false}
      saveButtonLabel="Sign-up"
      on:submit={handleSignUp}
      on:cancel={handleCancel}
    />
  {/if}
</Page>
