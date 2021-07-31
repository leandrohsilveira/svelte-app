<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  import { Page } from '../components'
  import { UserForm } from '../user'

  type Events = {
    signUpSucessful: void
    cancel: void
  }

  const dispatch = createEventDispatcher<Events>()

  function handleSignUp() {
    dispatch('signUpSucessful')
  }

  function handleCancel() {
    dispatch('cancel')
  }
</script>

<Page title="Sign-up">
  <UserForm
    edit={false}
    saveButtonLabel="Sign-up"
    on:submit={handleSignUp}
    on:cancel={handleCancel}
  />
</Page>
