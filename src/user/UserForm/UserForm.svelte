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

  let showPassword = !edit
  let isInfoValid = false
  let isPasswordValid = false

  $: isValid = isInfoValid && (!showPassword || isPasswordValid)

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

<form on:submit|preventDefault={handleSubmit}>
  <UserInfoForm bind:name bind:username bind:valid={isInfoValid} {edit} />
  {#if edit}
    <div class="change-password-check">
      <input
        type="checkbox"
        name="change-password"
        bind:checked={showPassword}
      />
      <small class="change-password">Change password</small>
    </div>
  {/if}
  {#if showPassword}
    <UserPasswordForm bind:password bind:valid={isPasswordValid} {edit} />
  {/if}
  <ButtonContainer>
    <button type="submit" disabled={!isValid}>{saveButtonLabel}</button>
    <button type="button" class="button button-outline" on:click={handleCancel}>
      Cancel
    </button>
  </ButtonContainer>
</form>

<style>
  .change-password-check {
    display: flex;
    align-items: center;
    margin-bottom: 2em;
  }
  .change-password-check > .change-password {
    margin-left: 1em;
  }
</style>
