<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { ButtonContainer } from '../../components'
  import type { UserFormEvents } from './UserFormEvents'

  import UserInfoForm from './UserInfoForm.svelte'
  import UserPasswordForm from './UserPasswordForm.svelte'

  export let edit: boolean
  export let saveButtonLabel: string

  export let name: string = ''
  export let username: string = ''
  export let password: string = ''

  let isInfoValid = false
  let isPasswordValid = false
  let showPassword = !edit

  $: isValid = isInfoValid && isPasswordValid

  const dispatch = createEventDispatcher<UserFormEvents>()

  function handleSubmit() {
    if (isValid)
      dispatch('submit', {
        name,
        username,
        password,
      })
  }

  function handleCancel() {
    dispatch('cancel')
  }
</script>

<form on:submit={handleSubmit}>
  <UserInfoForm bind:name bind:username bind:valid={isInfoValid} />
  {#if edit}
    <div class="change-password-check">
      <input
        type="checkbox"
        name="change-password"
        bind:checked={showPassword}
      />
    </div>
  {/if}
  {#if showPassword}
    <UserPasswordForm {edit} bind:password bind:valid={isPasswordValid} />
  {/if}
  <ButtonContainer>
    <button type="submit" disabled={!isValid}>{saveButtonLabel}</button>
    <button type="button" class="button button-outline" on:click={handleCancel}>
      Cancel
    </button>
  </ButtonContainer>
</form>
