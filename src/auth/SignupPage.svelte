<script lang="ts">
  import { Page } from '../components'
  import UserForm from '../user/UserForm/UserForm.svelte'
</script>

<Page title="Sign-up">
  <UserForm edit={false} saveButtonLabel="Sign-up" />
</Page>
