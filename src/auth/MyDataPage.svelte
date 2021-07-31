<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Page } from '../components'
  import { UserForm } from '../user'
  import { getInstance } from '../utils'

  type Events = {
    saveSuccessful: void
    cancel: void
  }

  const { loggedName, loggedUsername } = getInstance('authStore')

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
