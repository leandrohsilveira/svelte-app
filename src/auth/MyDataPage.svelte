<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Page } from '../components'
  import appFactory from '../factories'
  import { UserForm } from '../user'

  type Events = {
    saveSuccessful: void
    cancel: void
  }

  const { loggedName, loggedUsername } = appFactory.authStore

  const dispatch = createEventDispatcher<Events>()

  function handleSave() {
    dispatch('saveSuccessful')
  }

  function handleCancel() {
    dispatch('cancel')
  }
</script>

<Page title="My personal data">
  <UserForm
    edit={true}
    saveButtonLabel="Save"
    name={$loggedName}
    username={$loggedUsername}
    on:submit={handleSave}
    on:cancel={handleCancel}
  />
</Page>
